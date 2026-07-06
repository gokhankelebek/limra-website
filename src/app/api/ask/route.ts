import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/concierge";

export const runtime = "nodejs";

// Set ANTHROPIC_API_KEY in Vercel to activate the concierge.
// ASK_LIMRA_MODEL can override the model (e.g. claude-haiku-4-5 for cost).
const MODEL = process.env.ASK_LIMRA_MODEL || "claude-opus-4-8";
const ENABLED = Boolean(process.env.ANTHROPIC_API_KEY);

const MAX_TURNS = 16;
const MAX_CHARS = 1000;

// Best-effort per-instance rate limit (serverless instances each keep
// their own window; good enough to blunt casual abuse).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 60_000;
  const list = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 1000) hits.clear();
  return list.length > 10;
}

export async function GET() {
  return Response.json({ enabled: ENABLED });
}

type Turn = { role: "user" | "assistant"; content: string };

function sanitize(input: unknown): Turn[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_TURNS)
    return null;
  const turns: Turn[] = [];
  for (const t of input) {
    if (
      !t ||
      (t.role !== "user" && t.role !== "assistant") ||
      typeof t.content !== "string" ||
      t.content.length === 0
    )
      return null;
    turns.push({ role: t.role, content: t.content.slice(0, MAX_CHARS) });
  }
  if (turns[0].role !== "user" || turns[turns.length - 1].role !== "user")
    return null;
  return turns;
}

export async function POST(req: Request) {
  if (!ENABLED) {
    return Response.json({ error: "Concierge not configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const messages = sanitize((body as { messages?: unknown })?.messages);
  if (!messages) {
    return Response.json({ error: "Invalid messages" }, { status: 400 });
  }

  const client = new Anthropic();
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 700,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages,
  });

  // Await the first event before responding: connection/auth/billing
  // failures surface as a diagnosable status instead of a broken stream.
  const iterator = stream[Symbol.asyncIterator]();
  let first: IteratorResult<Anthropic.MessageStreamEvent>;
  try {
    first = await iterator.next();
  } catch (err) {
    console.error("ask-limra upstream error", err);
    const status = err instanceof Anthropic.APIError ? err.status : 0;
    const type =
      err instanceof Anthropic.APIError
        ? (err.type ?? "api_error")
        : "connection_error";
    const message =
      err instanceof Anthropic.APIError ? err.message : "connection failed";
    return Response.json(
      { error: "upstream", status, type, message },
      { status: 502 }
    );
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: Anthropic.MessageStreamEvent) => {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      };
      try {
        if (!first.done) emit(first.value);
        for (;;) {
          const next = await iterator.next();
          if (next.done) break;
          emit(next.value);
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode(
              "I'd rather stay with Limra — the menu, the hours, or finding us."
            )
          );
        }
      } catch (err) {
        console.error("ask-limra stream error", err);
        controller.enqueue(
          encoder.encode(
            "\n\nSomething slipped in the kitchen. Try again in a moment, or call us."
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

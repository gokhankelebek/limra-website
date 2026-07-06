"use client";

import { useEffect, useRef, useState } from "react";
import Medallion from "./Medallion";
import { CONTACT } from "@/data/contact";

type Turn = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What should I try first?",
  "What's vegan here?",
  "When do you open?",
  "Where are you?",
];

/**
 * Ask Limra — the menu concierge. Renders nothing until /api/ask reports
 * the service is configured, so the site works with or without it.
 */
export default function AskLimra() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/ask")
      .then((r) => r.json())
      .then((d) => setEnabled(Boolean(d.enabled)))
      .catch(() => setEnabled(false));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [turns, open]);

  if (!enabled) return null;

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setInput("");
    setBusy(true);
    const history: Turn[] = [...turns, { role: "user", content: question }];
    setTurns([...history, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setTurns([...history, { role: "assistant", content: answer }]);
      }
    } catch {
      setTurns([
        ...history,
        {
          role: "assistant",
          content: `Something slipped. Try again in a moment, or call us at ${CONTACT.phoneDisplay}.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-30">
      {open && (
        <div className="mb-3 flex max-h-[70vh] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-olive/20 bg-cream">
          {/* Header */}
          <div className="flex items-center gap-3 bg-olive-deep px-4 py-3 text-cream">
            <Medallion variant="seal" className="h-8 w-8 text-cream" />
            <div className="min-w-0 flex-1">
              <p className="font-roman text-[0.72rem] uppercase tracking-[0.22em]">
                Ask Limra
              </p>
              <p className="truncate font-body text-xs font-light text-cream/60">
                The menu, the hours, the story
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center text-cream/70 transition-colors hover:text-cream"
            >
              <span aria-hidden className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
            {turns.length === 0 ? (
              <div>
                <p className="font-body text-sm font-light italic leading-relaxed text-ink/60">
                  Ask about a dish, dietary needs, hours — anything Limra.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-olive/30 px-3.5 py-1.5 font-body text-sm font-light text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {turns.map((t, i) =>
                  t.role === "user" ? (
                    <p
                      key={i}
                      className="ml-8 rounded-2xl rounded-br-sm bg-olive px-4 py-2.5 font-body text-sm font-light leading-relaxed text-cream"
                    >
                      {t.content}
                    </p>
                  ) : (
                    <p
                      key={i}
                      className="whitespace-pre-wrap font-body text-sm font-light leading-relaxed text-ink/85"
                    >
                      {t.content}
                      {busy && i === turns.length - 1 && (
                        <span className="ml-1 inline-block h-3.5 w-px animate-pulse bg-terracotta align-middle" />
                      )}
                    </p>
                  )
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            className="flex items-center gap-2 border-t border-olive/15 px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the menu…"
              aria-label="Your question"
              className="flex-1 bg-transparent px-2 py-1.5 font-body text-sm font-light text-ink placeholder:text-ink/35 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-full bg-terracotta px-4 py-2 font-roman text-[0.62rem] uppercase tracking-[0.16em] text-cream transition-colors hover:bg-terracotta-deep disabled:opacity-50"
            >
              Ask
            </button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        aria-label={open ? "Close Ask Limra" : "Open Ask Limra"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-olive text-cream ring-1 ring-cream/40 transition-colors hover:bg-olive-deep"
      >
        <Medallion className="h-9 w-9" title="Ask Limra" />
      </button>
    </div>
  );
}

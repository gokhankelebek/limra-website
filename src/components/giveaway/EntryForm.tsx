"use client";

import { useEffect, useRef, useState } from "react";
import { GIVEAWAY } from "@/data/giveaway.config";

type Status = "idle" | "sending" | "sent" | "error" | "fallback" | "closed";

const field =
  "w-full rounded-[2px] border border-olive/25 bg-cream-soft px-4 py-3 font-body text-base text-ink placeholder:text-ink/35 transition-colors focus:border-olive focus:outline-none";
const labelCls = "label block font-roman uppercase text-olive/70";
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

/**
 * Giveaway entry form. Posts multipart data to /api/giveaway, which mirrors
 * the entry into the owners' Google Form and emails it with the screenshot.
 */
export default function EntryForm({ googleFormUrl }: { googleFormUrl: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [screenshotDelivered, setScreenshotDelivered] = useState(true);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [ready, setReady] = useState(true);

  // If neither delivery path is configured, send guests to the Google Form.
  useEffect(() => {
    fetch("/api/giveaway")
      .then((r) => r.json())
      .then((d) => setReady(Boolean(d.enabled)))
      .catch(() => setReady(true));
  }, []);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return setFileName(null);
    if (!f.type.startsWith("image/")) {
      e.target.value = "";
      setFileName(null);
      setMessage("The screenshot must be an image file.");
      return;
    }
    if (f.size > MAX_IMAGE_BYTES) {
      e.target.value = "";
      setFileName(null);
      setMessage("The screenshot must be under 8 MB.");
      return;
    }
    setMessage(null);
    setFileName(f.name);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setMessage(null);
    try {
      const res = await fetch("/api/giveaway", { method: "POST", body: new FormData(form) });
      const body = (await res.json().catch(() => ({}))) as { error?: string; screenshotDelivered?: boolean };
      if (res.ok) {
        setScreenshotDelivered(body.screenshotDelivered !== false);
        setStatus("sent");
        form.reset();
        setFileName(null);
      } else if (res.status === 503) {
        setStatus("fallback");
      } else if (res.status === 409) {
        setStatus("closed");
      } else if (res.status === 422 || res.status === 429) {
        setStatus("idle");
        setMessage(res.status === 429 ? "One moment, then try again." : body.error || "Please check the form.");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!ready) {
    return (
      <div className="rounded-[2px] border border-olive/20 bg-cream-soft p-10 text-center">
        <p className="font-display text-3xl text-olive">Almost there.</p>
        <p className="mx-auto mt-4 max-w-md font-body text-base font-light leading-relaxed text-ink/70">
          The entry form is opening on Google today.
        </p>
        <a
          href={googleFormUrl}
          className="mt-6 inline-flex items-center justify-center rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
        >
          Enter on Google Forms
        </a>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[2px] border border-olive/20 bg-cream-soft p-10 text-center">
        <p className="font-display text-3xl text-olive">You are in.</p>
        <p className="mx-auto mt-4 max-w-md font-body text-base font-light leading-relaxed text-ink/70">
          Winners are announced on {GIVEAWAY.instagramHandle} on {GIVEAWAY.announceDate}. Keep
          following, and keep your post up until then.
        </p>
        {!screenshotDelivered && (
          <p className="mx-auto mt-4 max-w-md font-body text-sm font-light italic leading-relaxed text-terracotta">
            Your screenshot did not come through. Please send it to {GIVEAWAY.instagramHandle} by
            DM so we can verify your entry.
          </p>
        )}
      </div>
    );
  }

  if (status === "closed") {
    return (
      <p role="status" className="rounded-[2px] border border-olive/20 bg-cream-soft px-6 py-5 text-center font-body text-base font-light leading-relaxed text-ink/80">
        Entries are closed. Winners will be announced on Instagram on {GIVEAWAY.announceDate}.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" encType="multipart/form-data" noValidate={false}>
      {/* Honeypot: hidden from people, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="gw-name" className={labelCls}>Full name</label>
          <input id="gw-name" name="name" required autoComplete="name" maxLength={120} className={`mt-2 ${field}`} />
          <p className="mt-1.5 font-body text-xs font-light italic text-ink/50">Must match your photo ID.</p>
        </div>
        <div>
          <label htmlFor="gw-handle" className={labelCls}>Instagram handle</label>
          <div className="relative mt-2">
            <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-body text-base text-ink/50">@</span>
            <input id="gw-handle" name="handle" required autoComplete="off" autoCapitalize="none" maxLength={60} className={`${field} pl-8`} placeholder="yourname" />
          </div>
          <p className="mt-1.5 font-body text-xs font-light italic text-ink/50">The account you posted from.</p>
        </div>
        <div>
          <label htmlFor="gw-email" className={labelCls}>Email</label>
          <input id="gw-email" name="email" type="email" required autoComplete="email" maxLength={160} className={`mt-2 ${field}`} />
        </div>
        <div>
          <label htmlFor="gw-phone" className={labelCls}>Phone</label>
          <input id="gw-phone" name="phone" type="tel" required autoComplete="tel" maxLength={40} className={`mt-2 ${field}`} />
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>Did you post a Post or a Story?</legend>
        <div className="mt-3 flex flex-wrap gap-6">
          {(["Post", "Story"] as const).map((v, i) => (
            <label key={v} className="flex items-center gap-2.5 font-body text-base text-ink">
              <input type="radio" name="postType" value={v} defaultChecked={i === 0} className="h-4 w-4 accent-olive" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="gw-url" className={labelCls}>Link to your post</label>
        <input id="gw-url" name="postUrl" type="url" inputMode="url" maxLength={300} placeholder="https://www.instagram.com/p/…" className={`mt-2 ${field}`} />
        <p className="mt-1.5 font-body text-xs font-light italic text-ink/50">Leave blank for a Story.</p>
      </div>

      <fieldset>
        <legend className={labelCls}>Did you use {GIVEAWAY.hashtag}?</legend>
        <div className="mt-3 flex flex-wrap gap-6">
          {(["Yes", "No"] as const).map((v, i) => (
            <label key={v} className="flex items-center gap-2.5 font-body text-base text-ink">
              <input type="radio" name="hashtag" value={v} defaultChecked={i === 1} className="h-4 w-4 accent-olive" />
              {v}
            </label>
          ))}
        </div>
        <p className="mt-2 font-body text-xs font-light italic text-ink/50">Yes earns the bonus entry.</p>
      </fieldset>

      <div>
        <label htmlFor="gw-shot" className={labelCls}>Screenshot of your post or story</label>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-[2px] border border-olive/40 px-5 py-2.5 font-roman text-[0.7rem] uppercase tracking-[0.18em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
          >
            {fileName ? "Change image" : "Choose image"}
          </button>
          <span className="font-body text-sm font-light text-ink/60">{fileName ?? "No file chosen"}</span>
          <input ref={fileRef} id="gw-shot" name="screenshot" type="file" accept="image/*" onChange={onFile} className="sr-only" />
        </div>
        <p className="mt-1.5 font-body text-xs font-light italic text-ink/50">
          Required for Stories and private accounts. Or DM it to {GIVEAWAY.instagramHandle}.
        </p>
      </div>

      <label className="flex items-start gap-3 font-body text-sm leading-relaxed text-ink/80">
        <input type="checkbox" name="eligible" value="yes" required className="mt-1 h-4 w-4 shrink-0 accent-olive" />
        <span>
          I am a North Carolina resident, 18 or older, and I have read the{" "}
          <a href="/giveaway/rules" className="text-olive underline underline-offset-4 hover:text-terracotta">Official Rules</a>.
        </span>
      </label>

      {message && (
        <p role="alert" className="font-body text-sm font-light italic text-terracotta">{message}</p>
      )}
      {status === "error" && (
        <p role="alert" className="font-body text-sm font-light italic text-terracotta">
          Something slipped. Try again in a moment, or enter on{" "}
          <a href={googleFormUrl} className="underline underline-offset-4">Google Forms</a>.
        </p>
      )}
      {status === "fallback" && (
        <p role="alert" className="font-body text-sm font-light italic text-terracotta">
          The site form is not connected yet. Please{" "}
          <a href={googleFormUrl} className="underline underline-offset-4">enter on Google Forms</a>.
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Enter the giveaway"}
        </button>
      </div>
    </form>
  );
}

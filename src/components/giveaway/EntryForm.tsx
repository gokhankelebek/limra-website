"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GIVEAWAY } from "@/data/giveaway.config";

type Status = "idle" | "sending" | "sent" | "error" | "fallback" | "closed";

const field =
  "w-full rounded-[2px] border border-olive/25 bg-cream-soft px-4 py-3 font-body text-base text-ink placeholder:text-ink/35 transition-colors focus:border-olive focus:outline-none";
const labelCls = "label block font-roman uppercase text-olive/70";
const hint = "mt-1.5 font-body text-xs font-light italic text-ink/50";
const check = "mt-1 h-4 w-4 shrink-0 accent-olive";
const STORAGE_KEY = "limra-giveaway-entered";

// The handle this device already entered with, if any (null on the server
// and before hydration, so the first client render matches the HTML).
const subscribeStorage = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};
const readPriorHandle = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

/**
 * Giveaway entry form. Posts to /api/giveaway, which records the entry in
 * the owners' Google Form. Verification screenshots go by Instagram DM.
 * `previewKey` (dry-run mode) is forwarded so test entries are tagged TEST.
 */
export default function EntryForm({
  googleFormUrl,
  previewKey,
}: {
  googleFormUrl: string;
  previewKey?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [postType, setPostType] = useState<"Post" | "Story">("Post");
  const [isPrivate, setIsPrivate] = useState(false);
  const priorHandle = useSyncExternalStore(subscribeStorage, readPriorHandle, () => null);
  const [ready, setReady] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch("/api/giveaway")
      .then((r) => r.json())
      .then((d) => setReady(Boolean(d.enabled)))
      .catch(() => setReady(true));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setMessage(null);
    const data = new FormData(form);
    if (priorHandle) data.set("repeat", "yes");
    const qs = previewKey ? `?preview=${encodeURIComponent(previewKey)}` : "";
    try {
      const res = await fetch(`/api/giveaway${qs}`, { method: "POST", body: data });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        const handle = String(data.get("handle") || "").replace(/^@+/, "");
        try {
          window.localStorage.setItem(STORAGE_KEY, handle);
        } catch {
          /* ignore */
        }
        setStatus("sent");
        form.reset();
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
          Keep your post up and keep following {GIVEAWAY.instagramHandle} until prizes are
          delivered. Winners are announced on Instagram on {GIVEAWAY.announceDate}.
        </p>
        <p className="mx-auto mt-4 max-w-md font-body text-sm font-light italic leading-relaxed text-terracotta">
          Posted a Story, or entering from a private account? Send a screenshot to{" "}
          {GIVEAWAY.instagramHandle} by DM within 24 hours so we can verify your entry.
        </p>
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

  const needsScreenshot = postType === "Story" || isPrivate;

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
      {/* Honeypot: hidden from people, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {priorHandle && (
        <p role="status" className="rounded-[2px] border border-olive/20 bg-cream-soft px-4 py-3 font-body text-sm font-light leading-relaxed text-ink/75">
          It looks like this phone already entered as @{priorHandle}. Each person gets one entry
          (plus the hashtag bonus); entering again does not add more. If that was someone else,
          go ahead.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="gw-name" className={labelCls}>Full name</label>
          <input id="gw-name" name="name" required autoComplete="name" maxLength={120} className={`mt-2 ${field}`} />
          <p className={hint}>Must match your photo ID.</p>
        </div>
        <div>
          <label htmlFor="gw-handle" className={labelCls}>Instagram username</label>
          <div className="relative mt-2">
            <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-body text-base text-ink/50">@</span>
            <input
              id="gw-handle"
              name="handle"
              required
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={31}
              pattern="@?[A-Za-z0-9._]{1,30}"
              title="Letters, numbers, dots and underscores"
              className={`${field} pl-8`}
              placeholder="yourname"
            />
          </div>
          <p className={hint}>The account you posted from.</p>
        </div>
        <div>
          <label htmlFor="gw-phone" className={labelCls}>Phone</label>
          <input id="gw-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" maxLength={40} placeholder="(919) 555-0100" className={`mt-2 ${field}`} />
          <p className={hint}>US number. We use it to reach winners.</p>
        </div>
        <div>
          <label htmlFor="gw-email" className={labelCls}>Email <span className="normal-case tracking-normal text-olive/50">(optional)</span></label>
          <input id="gw-email" name="email" type="email" autoComplete="email" maxLength={160} className={`mt-2 ${field}`} />
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>How did you share?</legend>
        <div className="mt-3 flex flex-wrap gap-6">
          {(["Post", "Story"] as const).map((v) => (
            <label key={v} className="flex items-center gap-2.5 font-body text-base text-ink">
              <input
                type="radio"
                name="postType"
                value={v}
                checked={postType === v}
                onChange={() => setPostType(v)}
                className="h-4 w-4 accent-olive"
              />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      {postType === "Post" && (
        <div>
          <label htmlFor="gw-url" className={labelCls}>Link to your post</label>
          <input
            id="gw-url"
            name="postUrl"
            type="url"
            required
            inputMode="url"
            maxLength={300}
            placeholder="https://www.instagram.com/p/…"
            className={`mt-2 ${field}`}
          />
          <p className={hint}>Open the post, tap the three dots, then Copy link.</p>
        </div>
      )}

      <label className="flex items-start gap-3 font-body text-sm leading-relaxed text-ink/80">
        <input type="checkbox" name="privateAccount" value="yes" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} className={check} />
        <span>My Instagram account is private.</span>
      </label>

      <p
        className={`border-l-2 pl-4 font-body text-sm leading-relaxed transition-colors ${
          needsScreenshot ? "border-terracotta text-ink/80" : "border-olive/20 text-ink/55"
        }`}
      >
        Posted a Story, or entering from a private account? Send a screenshot to{" "}
        <a href={GIVEAWAY.instagramUrl} target="_blank" rel="noopener" className="text-olive underline underline-offset-4 hover:text-terracotta">
          {GIVEAWAY.instagramHandle}
        </a>{" "}
        by DM within 24 hours so we can verify your entry.
      </p>

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
        <p className={hint}>Yes earns the bonus entry.</p>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className={labelCls}>Confirmations</legend>
        <label className="mt-3 flex items-start gap-3 font-body text-sm leading-relaxed text-ink/80">
          <input type="checkbox" name="adult" value="yes" required className={check} />
          <span>I am 18 or older.</span>
        </label>
        <label className="flex items-start gap-3 font-body text-sm leading-relaxed text-ink/80">
          <input type="checkbox" name="resident" value="yes" required className={check} />
          <span>I am a legal resident of North Carolina.</span>
        </label>
        <label className="flex items-start gap-3 font-body text-sm leading-relaxed text-ink/80">
          <input type="checkbox" name="rules" value="yes" required className={check} />
          <span>
            I have read and agree to the{" "}
            <a href="/giveaway/rules" className="text-olive underline underline-offset-4 hover:text-terracotta">Official Rules</a>.
          </span>
        </label>
        <label className="flex items-start gap-3 font-body text-sm leading-relaxed text-ink/80">
          <input type="checkbox" name="notSponsored" value="yes" required className={check} />
          <span>I understand this promotion is not sponsored, endorsed, or administered by Instagram or Meta.</span>
        </label>
      </fieldset>

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

"use client";

import { useState } from "react";
import { CONTACT, SOCIALS } from "@/data/contact";

// Mailchimp embedded-form action URL, e.g.
// https://xxxx.usNN.list-manage.com/subscribe/post?u=USERID&id=AUDIENCEID
// Set NEXT_PUBLIC_MAILCHIMP_ACTION in Vercel to activate the form.
const MC_ACTION = process.env.NEXT_PUBLIC_MAILCHIMP_ACTION || "";

type Status = "idle" | "sending" | "done" | "error";

function subscribeJsonp(email: string): Promise<{ result: string; msg: string }> {
  return new Promise((resolve, reject) => {
    const cb = `__limraMc${Date.now()}`;
    const url =
      MC_ACTION.replace("/post?", "/post-json?") +
      `&EMAIL=${encodeURIComponent(email)}&c=${cb}`;
    const w = window as unknown as Record<string, unknown>;
    const script = document.createElement("script");
    const cleanup = () => {
      delete w[cb];
      script.remove();
    };
    w[cb] = (data: { result: string; msg: string }) => {
      cleanup();
      resolve(data);
    };
    script.src = url;
    script.onerror = () => {
      cleanup();
      reject(new Error("network"));
    };
    document.body.appendChild(script);
  });
}

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  if (!MC_ACTION) {
    // List not connected yet — offer the channels that work today.
    return (
      <div className="text-center">
        <p className="font-body text-base font-light italic text-ink/60">
          The list opens shortly. Follow along in the meantime —
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-olive/40 px-6 py-2.5 font-roman text-[0.7rem] uppercase tracking-[0.18em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
            >
              {s.label}
            </a>
          ))}
          <a
            href={CONTACT.phoneHref}
            className="rounded-full bg-olive px-6 py-2.5 font-roman text-[0.7rem] uppercase tracking-[0.18em] text-cream transition-colors hover:bg-olive-deep"
          >
            Call us
          </a>
        </div>
      </div>
    );
  }

  if (status === "done") {
    return (
      <p className="text-center font-body text-lg font-light italic leading-relaxed text-ink/75">
        One warm hello, on its way. We&apos;ll write when the doors open.
      </p>
    );
  }

  return (
    <form
      className="mx-auto max-w-md"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!email || status === "sending") return;
        setStatus("sending");
        try {
          const res = await subscribeJsonp(email);
          setStatus(res.result === "success" ? "done" : "error");
        } catch {
          setStatus("error");
        }
      }}
    >
      <div className="flex flex-col items-stretch gap-4 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          className="flex-1 border-b border-olive/30 bg-transparent px-1 py-3 font-body text-lg font-light text-ink placeholder:text-ink/35 focus:border-olive focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 rounded-full bg-olive px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-olive-deep disabled:opacity-60"
        >
          {status === "sending" ? "One moment" : "Notify me"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-4 text-center font-body text-sm font-light italic text-terracotta">
          Something slipped. Try again, or call us at {CONTACT.phoneDisplay}.
        </p>
      )}
      <p className="mt-5 text-center font-body text-sm font-light italic text-ink/50">
        No spam, ever. Just one warm hello.
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { CATERING_INTERESTS } from "@/data/catering";
import { CONTACT } from "@/data/contact";

type Status = "idle" | "sending" | "sent" | "error" | "fallback";

const field =
  "w-full rounded-[2px] border border-olive/25 bg-cream-soft px-4 py-3 font-body text-base text-ink placeholder:text-ink/35 transition-colors focus:border-olive focus:outline-none";
const labelCls = "label block font-roman uppercase text-olive/70";

export default function CateringForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [interests, setInterests] = useState<string[]>([]);

  const toggle = (name: string) =>
    setInterests((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          eventDate: data.get("eventDate"),
          guests: data.get("guests"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
          interests,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setInterests([]);
      } else if (res.status === 503) {
        setStatus("fallback");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[2px] border border-olive/20 bg-cream-soft p-10 text-center">
        <p className="font-display text-3xl text-olive">Thank you.</p>
        <p className="mx-auto mt-4 max-w-md font-body text-base font-light leading-relaxed text-ink/70">
          Your inquiry is with us. We will be in touch to shape the table
          around your event. Hoş geldiniz.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Honeypot — hidden from people, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cat-name" className={labelCls}>
            Name
          </label>
          <input id="cat-name" name="name" required className={`mt-2 ${field}`} />
        </div>
        <div>
          <label htmlFor="cat-guests" className={labelCls}>
            Guests
          </label>
          <input
            id="cat-guests"
            name="guests"
            inputMode="numeric"
            placeholder="e.g. 40"
            className={`mt-2 ${field}`}
          />
        </div>
        <div>
          <label htmlFor="cat-email" className={labelCls}>
            Email
          </label>
          <input
            id="cat-email"
            name="email"
            type="email"
            className={`mt-2 ${field}`}
          />
        </div>
        <div>
          <label htmlFor="cat-phone" className={labelCls}>
            Phone
          </label>
          <input
            id="cat-phone"
            name="phone"
            type="tel"
            className={`mt-2 ${field}`}
          />
        </div>
        <div>
          <label htmlFor="cat-date" className={labelCls}>
            Event date
          </label>
          <input
            id="cat-date"
            name="eventDate"
            type="date"
            className={`mt-2 ${field}`}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>What can we bring?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATERING_INTERESTS.map((name) => {
            const on = interests.includes(name);
            return (
              <button
                key={name}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(name)}
                className={`rounded-[2px] border px-3.5 py-1.5 font-roman text-[0.7rem] uppercase tracking-[0.14em] transition-colors ${
                  on
                    ? "border-terracotta bg-terracotta text-cream"
                    : "border-olive/30 text-olive/70 hover:border-olive"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="cat-message" className={labelCls}>
          Tell us about the event
        </label>
        <textarea
          id="cat-message"
          name="message"
          rows={4}
          placeholder="The occasion, where you're gathering, anything we should know."
          className={`mt-2 ${field} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="font-body text-sm text-terracotta-deep">
          Something slipped. Please try again, or call {CONTACT.phoneDisplay}.
        </p>
      )}
      {status === "fallback" && (
        <p className="font-body text-sm leading-relaxed text-ink/70">
          Our inbox isn&apos;t taking messages just yet. Please call{" "}
          <a
            href={CONTACT.phoneHref}
            className="text-terracotta underline underline-offset-4"
          >
            {CONTACT.phoneDisplay}
          </a>{" "}
          and we&apos;ll set it up by hand.
        </p>
      )}

      <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-[2px] bg-terracotta px-10 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        <span className="font-body text-sm font-light text-ink/50">
          Or call{" "}
          <a
            href={CONTACT.phoneHref}
            className="text-olive underline-offset-4 hover:underline"
          >
            {CONTACT.phoneDisplay}
          </a>
        </span>
      </div>
    </form>
  );
}

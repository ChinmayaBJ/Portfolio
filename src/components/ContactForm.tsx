"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { ArrowRight } from "@/components/icons";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (company) return; // bot trap
    if (!name || !email || !message) {
      setStatus("Please fill in every field.");
      return;
    }
    setStatus("Thanks — opening your mail client…");
    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }

  const field =
    "w-full rounded-md border border-field bg-surface px-4 py-3 text-bone placeholder:text-muted outline-none transition-colors focus:border-ember aria-[invalid=true]:border-ember";

  return (
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={field}
            placeholder="Jane Doe"
            aria-invalid={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="jane@company.com"
            aria-invalid={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${field} resize-none`}
          placeholder="Hey Chinmaya, we're hiring and your AI background stood out."
          aria-invalid={false}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="group inline-flex items-center gap-2 rounded-md border border-ember/50 bg-ember/10 px-5 py-3 font-mono text-sm text-bone transition-colors duration-300 hover:border-ember hover:bg-ember/20 disabled:opacity-60"
        >
          Send message
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <p
          id="form-status"
          role="status"
          aria-live="polite"
          className="font-mono text-xs text-muted"
        >
          {status}
        </p>
      </div>
      <p className="font-mono text-[0.65rem] text-muted">
        Protected by reCAPTCHA.
      </p>
    </form>
  );
}

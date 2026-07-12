'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const SERVICES = [
  'Rolling Shutter Profiles',
  'Shutter Accessories',
  'Steel Pipes & Tubes',
  'Roofing Sheets',
  'Pre-Engineered Sheds',
  'Plain Sheets & Slit Coils',
  'Custom Fabrication (Fabrica)',
  'Other',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'w-full bg-bg-card border border-border-subtle text-text-primary text-base px-4 py-3 focus:outline-none focus:border-abs-blue transition-colors duration-200 placeholder:text-text-muted';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

    if (!endpoint) {
      setStatus('error');
      setMessage('The contact form is not yet configured. Please email us directly instead.');
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setStatus('success');
      setMessage('Thanks, we’ll be in touch shortly.');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-bg-card border border-border-subtle rounded p-10 flex flex-col items-center text-center gap-4">
        <CheckCircle2 className="w-10 h-10 text-abs-blue" aria-hidden="true" />
        <p className="text-text-primary font-semibold text-lg">Message sent</p>
        <p className="text-text-muted text-sm max-w-sm">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-text-muted text-xs uppercase tracking-widest mb-2"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className={inputClasses}
            placeholder="Rajesh"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-text-muted text-xs uppercase tracking-widest mb-2"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className={inputClasses}
            placeholder="Sharma"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-text-muted text-xs uppercase tracking-widest mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClasses}
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-text-muted text-xs uppercase tracking-widest mb-2"
        >
          Service Required
        </label>
        <select id="service" name="service" required defaultValue="" className={inputClasses}>
          <option value="" disabled>
            Select a product or service
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-text-muted text-xs uppercase tracking-widest mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClasses}
          placeholder="Tell us what you're building, quantity, grade, and timeline help us respond faster."
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-3 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center gap-3 bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

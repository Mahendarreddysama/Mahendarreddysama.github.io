"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import { CONTACT_SERVICES, EMPTY_CONTACT_FORM } from "@/content/contact";
import { primaryNavigation } from "@/content/site";
import { createContactTarget, validateContactForm } from "@/lib/validation/contact";
import { ANALYTICS_EVENTS, emitAnalytics } from "@/lib/analytics/events";

export default function ContactExperience({ whatsapp }) {
  const [form, setForm] = useState(EMPTY_CONTACT_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const update = (event) => setForm((value) => ({ ...value, [event.target.name]: event.target.value }));
  const error = (name) => errors[name] ? <small id={`${name}-error`}>{errors[name]}</small> : null;

  const submit = (event) => {
    event.preventDefault();
    const result = validateContactForm(form);
    setErrors(result.errors);
    if (!result.valid) return;
    const target = createContactTarget({ form: result.value, whatsapp });
    setSent(true);
    emitAnalytics(ANALYTICS_EVENTS.CONTACT_SUBMIT, { service: result.value.service, channel: target.channel });
    if (target.url) location.assign(target.url);
  };

  return <>
    <SiteHeader items={primaryNavigation} activeHref="/contact" className="contact-header" />
    <main id="main-content" className="contact-page">
      <section className="contact-hero">
        <Image src="/images/hero-studio.webp" alt="PrimeShow production crew collaborating on a cinematic set" fill priority sizes="100vw" />
        <div className="contact-hero-shade" />
        <div className="container">
          <Link href="/" className="back-link"><ArrowLeft /> Home</Link>
          <div className="eyebrow">Start a conversation</div>
          <h1>Let&apos;s Create Something <em>Extraordinary.</em></h1>
          <p>Whether you&apos;re a filmmaker, distributor, investor, theatre partner, or brand, we&apos;d love to hear from you.</p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-page-grid">
          <div>
            <div className="eyebrow">Collaborate with PrimeShow</div>
            <h2>Every great story begins with a conversation.</h2>
            <p>Share the essentials and we&apos;ll open your preferred communication channel with a clean, pre-filled message.</p>
          </div>
          <form className="contact-form" onSubmit={submit} noValidate aria-describedby="form-status">
            <label>Full Name *<input name="name" autoComplete="name" value={form.name} onChange={update} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{error("name")}</label>
            <label>Company / Organization<input name="company" autoComplete="organization" value={form.company} onChange={update} /></label>
            <label>Email Address *<input name="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={update} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{error("email")}</label>
            <label>Phone Number *<input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={update} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />{error("phone")}</label>
            <label>Service Required<select name="service" value={form.service} onChange={update}>{CONTACT_SERVICES.map((service) => <option key={service}>{service}</option>)}</select></label>
            <label className="full">Message *<textarea name="message" rows="6" value={form.message} onChange={update} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />{error("message")}</label>
            <button className="button button-gold full" type="submit"><span>Send Enquiry</span><ArrowRight /></button>
            <p id="form-status" className="form-status" aria-live="polite">{sent && <><CheckCircle2 /> Your enquiry is ready to send.</>}</p>
          </form>
        </div>
      </section>
    </main>
  </>;
}

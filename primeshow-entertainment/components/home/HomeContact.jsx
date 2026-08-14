"use client";

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { siteConfig } from "@/content/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const contactEmail = "primeshowenter2020@gmail.com";

export default function HomeContact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    const body = [
      "Hello PrimeShow Entertainment,",
      "",
      "I would like to start a conversation.",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      "",
      "Message:",
      form.message,
    ].join("\n");
    window.location.href = createWhatsAppUrl(siteConfig.whatsapp, body);
  };

  return (
    <section id="contact" className="home-contact section" aria-labelledby="home-contact-title">
      <div className="home-contact-glow" aria-hidden="true" />
      <div className="container home-contact-grid">
        <div className="home-contact-copy">
          <div className="eyebrow">Contact</div>
          <h2 id="home-contact-title">Let&apos;s create<br />the <em>next big-screen</em><br />experience.</h2>
          <div className="home-contact-details">
            <a href={`mailto:${contactEmail}`} className="home-contact-detail">
              <span className="contact-icon"><Mail aria-hidden="true" /></span>
              <span><small>Email</small><strong>{contactEmail}</strong></span>
            </a>
            <a href={createWhatsAppUrl(siteConfig.whatsapp)} className="home-contact-detail" target="_blank" rel="noopener noreferrer">
              <span className="contact-icon"><FaWhatsapp aria-hidden="true" /></span>
              <span><small>WhatsApp</small><strong>+91 78429 85404</strong></span>
            </a>
            <div className="home-contact-detail">
              <span className="contact-icon"><MapPin aria-hidden="true" /></span>
              <span><small>Office</small><strong className="office-address">{siteConfig.locationLines.map((line) => <span key={line}>{line}</span>)}</strong></span>
            </div>
          </div>
          <div className="home-contact-socials" aria-label="PrimeShow social channels">
            {[
              ["Instagram", siteConfig.social.instagram, FaInstagram],
              ["YouTube", siteConfig.social.youtube, FaYoutube],
              ["Twitter", siteConfig.social.x, FaTwitter],
              ["Facebook", siteConfig.social.facebook, FaFacebookF],
            ].map(([label, href, Icon]) => href ? (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`PrimeShow on ${label}`}><Icon aria-hidden="true" /></a>
            ) : (
              <span key={label} title={label} aria-label={label}><Icon aria-hidden="true" /></span>
            ))}
          </div>
        </div>

        <form className="home-contact-form" onSubmit={submit}>
          <label><span>Your Name</span><input required name="name" autoComplete="name" placeholder="Your Name" value={form.name} onChange={update} /></label>
          <label><span>Email</span><input required name="email" type="email" autoComplete="email" placeholder="Email" value={form.email} onChange={update} /></label>
          <label className="contact-field-wide"><span>Phone Number</span><input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone Number" value={form.phone} onChange={update} /></label>
          <label className="contact-field-wide contact-message"><span>Message</span><textarea required name="message" rows="5" placeholder="Tell us about your project, script or collaboration idea..." value={form.message} onChange={update} /></label>
          <button type="submit" className="home-contact-submit"><span>Send Message</span><Send aria-hidden="true" /></button>
        </form>
      </div>
    </section>
  );
}

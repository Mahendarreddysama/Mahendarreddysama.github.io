import { createWhatsAppUrl } from "../whatsapp.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{7,18}$/;
export function normalizeContactForm(form) { return Object.fromEntries(Object.entries(form).map(([key, value]) => [key, String(value || "").trim()])); }
export function validateContactForm(form) { const value = normalizeContactForm(form); const errors = {}; if (value.name.length < 2) errors.name = "Enter your full name."; if (!EMAIL_PATTERN.test(value.email)) errors.email = "Enter a valid email address."; if (!PHONE_PATTERN.test(value.phone)) errors.phone = "Enter a valid phone number."; if (value.message.length < 10) errors.message = "Tell us a little more about your enquiry."; return { value, errors, valid: Object.keys(errors).length === 0 }; }
export function createContactMessage(form) { return ["Hello PrimeShow Entertainment,", "", "I would like to collaborate.", "", `Name: ${form.name}`, form.company ? `Company: ${form.company}` : "", `Email: ${form.email}`, `Phone: ${form.phone}`, `Service: ${form.service}`, "", "Message:", form.message, "", "Thank you."].filter(Boolean).join("\n"); }
export function createContactTarget({ form, whatsapp }) { const message = createContactMessage(form); return { channel: "whatsapp", url: createWhatsAppUrl(whatsapp, message) }; }

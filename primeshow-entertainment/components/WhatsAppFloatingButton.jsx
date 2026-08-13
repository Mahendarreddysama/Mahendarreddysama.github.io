"use client";

import { FaWhatsapp } from "react-icons/fa";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export default function WhatsAppFloatingButton({ number }) {
  return (
    <a
      className="whatsapp-float"
      href={createWhatsAppUrl(number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with PrimeShow Entertainment on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}

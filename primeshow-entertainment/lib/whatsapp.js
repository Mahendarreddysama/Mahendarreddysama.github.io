export function createWhatsAppUrl(number, message = "Hello PrimeShow Entertainment, I would like to start a conversation.") {
  const cleanNumber = String(number || "").replace(/\D/g, "");
  const base = cleanNumber ? `https://wa.me/${cleanNumber}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}

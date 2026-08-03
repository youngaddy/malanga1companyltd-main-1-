import { MessageCircle } from "lucide-react";
import { whatsappUrl, COMPANY_NAME } from "@/lib/contact";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl(`Hello ${COMPANY_NAME}, I'd like to enquire about a property.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-20 z-30 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-white shadow-2xl shadow-black/20 transition-transform hover:scale-105 md:right-8 md:bottom-8 md:px-5 md:py-4"
    >
      <MessageCircle className="size-5" />
      <span className="hidden text-sm sm:inline">Chat on WhatsApp</span>
    </a>
  );
}

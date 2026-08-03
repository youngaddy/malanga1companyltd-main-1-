import { Phone, MessageCircle } from "lucide-react";
import { PHONE_TEL, whatsappUrl, COMPANY_NAME } from "@/lib/contact";

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-glass-border bg-background/85 px-3 py-2 backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-clay px-4 py-3 text-sm font-bold text-primary-foreground"
          aria-label="Call Malanga 1"
        >
          <Phone className="size-4" /> Call
        </a>
        <a
          href={whatsappUrl(`Hello ${COMPANY_NAME}, I'd like to enquire.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white"
          aria-label="WhatsApp Malanga 1"
        >
          <MessageCircle className="size-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}

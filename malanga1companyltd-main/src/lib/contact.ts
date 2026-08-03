// Central contact details for Malanga 1 Company Limited
export const COMPANY_NAME = "Malanga 1 Company Limited";
export const COMPANY_SHORT = "MALANGA 1";
export const PHONE_DISPLAY = "053 400 7070";
export const PHONE_TEL = "+233534007070";
export const WHATSAPP_NUMBER = "233534007070"; // international, no +
export const EMAIL = "Mallanga1ltd@gmail.com";
export const ADDRESS = [
  "Naa Luro Estates (Choggu Yapalsi)",
  "Kumbungu Main Road",
  "Tamale, Ghana",
];
export const TIKTOK_URL = "https://tiktok.com/@malanga1companyltd";
export const FACEBOOK_URL = "https://facebook.com/malanga1companyltd";
export const INSTAGRAM_URL = "https://instagram.com/malanga1companyltd";

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

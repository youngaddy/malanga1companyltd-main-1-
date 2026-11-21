import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ContactMessageInput {
  name: string;
  phone: string;
  email?: string;
  message: string;
  propertyId?: string;
}

/**
 * Saves a website enquiry to Firestore. The `messages` collection is
 * write-only for the public and readable only by the admin account.
 */
export async function submitContactMessage(input: ContactMessageInput): Promise<void> {
  await addDoc(collection(db, "messages"), {
    name: input.name,
    phone: input.phone,
    email: input.email || "",
    message: input.message,
    propertyId: input.propertyId || "",
    createdAt: serverTimestamp(),
  });
}

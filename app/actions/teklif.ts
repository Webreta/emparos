"use server";

import { z } from "zod";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { sectors, type Sector } from "@/lib/sectors";
import { sendQuoteNotification } from "@/lib/mailer";

export type QuoteState = { ok?: boolean; error?: string };

const quoteSchema = z.object({
  sector: z.enum(["gida", "muhendislik"]),
  name: z.string().trim().min(2, "Ad soyad girin."),
  company: z.string().trim().max(200).optional(),
  email: z.email("Geçerli bir e-posta adresi girin."),
  phone: z.string().trim().max(40).optional(),
  product: z.string().trim().max(200).optional(),
  quantity: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Talebinizi birkaç cümleyle açıklayın."),
  // Bot tuzağı: gerçek kullanıcı bu alanı görmez ve doldurmaz
  website: z.string().max(0).optional(),
});

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

// Alt site teklif formu: kaydı `submissions` tablosuna yazar, ardından e-posta bildirimi dener.
// Giriş gerektirmez (herkese açık form).
export async function sendQuoteRequest(
  _prev: QuoteState,
  formData: FormData
): Promise<QuoteState> {
  const parsed = quoteSchema.safeParse({
    sector: str(formData, "sector"),
    name: str(formData, "name"),
    company: str(formData, "company"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    product: str(formData, "product"),
    quantity: str(formData, "quantity"),
    message: str(formData, "message"),
    website: str(formData, "website"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }

  const data = parsed.data;
  const sector: Sector = sectors[data.sector];

  // Ürün grubu seçimi yalnızca o sektörün listesinden gelebilir
  const productTitle = sector.items.find((i) => i.slug === data.product)?.title;

  const meta: Record<string, string> = { type: "teklif", sector: sector.name };
  if (data.company) meta.company = data.company;
  if (productTitle) meta.product = productTitle;
  if (data.quantity) meta.quantity = data.quantity;

  try {
    await db.insert(submissions).values({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
      meta,
    });
  } catch (err) {
    console.error("Teklif kaydı yazılamadı:", err);
    return { error: "Talebiniz kaydedilemedi. Lütfen tekrar deneyin ya da bizi arayın." };
  }

  // E-posta gitmese de kayıt DB'de; kullanıcıya başarı döneriz, hatayı loglarız
  try {
    await sendQuoteNotification({
      sectorName: sector.name,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      product: productTitle,
      quantity: data.quantity,
      message: data.message,
    });
  } catch (err) {
    console.error("Teklif bildirimi gönderilemedi:", err);
  }

  return { ok: true };
}

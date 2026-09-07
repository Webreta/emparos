import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Build sırasında (Docker imajı) DATABASE_URL yoktur; postgres.js bağlantıyı ilk sorguda kurduğu için
// burada fırlatmak yerine uyarı verip yer tutucu adresle devam edilir. Çalışma anında değişken zorunludur.
const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/emparos";
if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL tanımlı değil; veritabanı sorguları çalışma anında başarısız olur.");
}

// Tek uzun ömürlü Node süreci — global cache ile dev'de hot-reload'da
// bağlantı sızıntısını önlüyoruz.
const globalForDb = globalThis as unknown as {
  pgClient?: ReturnType<typeof postgres>;
};

const client =
  globalForDb.pgClient ??
  postgres(connectionString, { max: 10, connect_timeout: 10 });
if (process.env.NODE_ENV !== "production") globalForDb.pgClient = client;

export const db = drizzle(client, { schema });

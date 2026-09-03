# Emparos

Kurumsal site + yönetim paneli. Türkçe içerik, Türkçe URL'ler (`/admin/giris`).

## Referans proje

Teknoloji ve admin panel mantığı **birebir** `github.com/Webreta/ege-yatcilik` ile aynıdır.
Auth, panel layout'u, form/action kalıpları, upload ve teknik ayarlar oradan uyarlanır.
Kaynak dosyalara hızlı bakmak için: `curl -g https://raw.githubusercontent.com/Webreta/ege-yatcilik/HEAD/<yol>`
(klon yavaş — `medya/` klasörü büyük).

## Stack

Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4 (`@theme` token'ları `app/globals.css` içinde),
Drizzle ORM + PostgreSQL (postgres.js), bcryptjs, zod v4, nodemailer, sharp. `output: "standalone"`, Easypanel deploy.

## Kurallar

- Auth: middleware yalnızca iyimser cookie kontrolü yapar; gerçek doğrulama `requireUser`/`requireAdmin`/`requireSection`
  (lib/auth/session.ts) ile panel layout'unda ve her server action'da.
- Session token'ın sha256 hash'i DB'de tutulur, ham token yalnızca cookie'de (30 gün, 15 gün kala uzatılır).
- Roller: `admin` (tümü) / `editor` (`permissions` jsonb ile sekme bazlı). Sekmeler `ADMIN_SECTIONS` sabitinde.
- Panel formları: client `useActionState` → server action (`requireSection` → zod → DB → `revalidatePath`) → `{ ok?, error? }`;
  `SavedToast` ve `ConfirmSubmit` bileşenleri.
- Bölüm ayarları `site_settings` (key → jsonb) tablosunda; `lib/<bölüm>-settings.ts` tip+default, `lib/data/<bölüm>.ts` get/upsert.
- Yüklemeler `public/uploads/<subdir>/` altına; `app/uploads/[...yol]/route.ts` servis eder.
- DB komutları: `npm run db:generate` → `db:migrate` → `db:seed`. Yerel Postgres: `docker compose up -d` (port 5434).
- Yorumlar ve kullanıcıya görünen tüm metinler Türkçe.

## Müşteri brief'i (dosyalar/Webreta Web Site Konsept ve Bilgi Formu(3).docx)

- Firma: **Emparos Global** — Mansuroğlu Mah. 286/1 Sk. No:1 İç Kapı No:215 Bayraklı/İzmir, +90 544 979 26 20, info@emparos.com. Sosyal medya yok.
- Renkler: mavi + turuncu tonları (kurumsal kimlik dosyaları paylaşılacak; logo henüz yok → wordmark kullanılıyor).
- Beğenilen siteler: seta-global.com (farklı iş kolları tek sitede, her biri farklı renk notası/tasarım — firma yapısı benzer, bu mantıkla ilerlenecek), halitlar.com.
- Menü: Ana Sayfa, Hakkımızda, Ürünler/Hizmetler, Galeri, Blog, İletişim.
- 3 ana iş kolu: **Ambalaj Çözümleri** (direkt kraftorapack.com'a yönlendirme), **Gıda, İçecek ve Temizlik Ürünleri** (Coca-Cola, Red Bull, Haribo, kağıt havlu, tuvalet kağıdı; ref: katalog.israglobal.net, halitlar.com), **Mühendislik Çözümleri** (ref: 360muh.com/danismanlik — yönetim, İK, iş geliştirme, üretim, yalın dönüşüm, veri analizi/raporlama, proje yönetimi danışmanlığı).
- Metinleri Webreta (AI destekli) hazırlayacak. Öne çıkan: ürün/hizmetler. Hava: sade-minimal + kurumsal-ciddi.
- Ekstra: çoklu dil (kraftorapack.com benzeri), WhatsApp butonu.

## Durum

İskelet kuruldu: auth, panel (Genel + Teknik), uploads, SMTP, SEO, kullanıcı yönetimi hazır. Site yapısı: `(kurumsal)` grubu = tam ekran cover (3 panel) + transparan ortası logolu `CoverHeader` + cover içinde kalan sayfalar (hakkımızda, iletişim, sektörler, merak-ettikleriniz — `CoverPage` şablonu); `/gida` ve `/muhendislik` = kendi header/footer/renk temasıyla alt siteler (`lib/sectors.ts`, `components/sector/*`). İş kolu verileri `lib/divisions.ts`. Yerel Postgres port **5434**.

Gıda alt sitesi (2026-09-03): tema lacivert+gold (`navy-*`/`gold-*` token'ları); ana sayfada hero → eşit kutulu logo kaydırağı (`markalar()` ilk 30) → 2'li ürün grubu kartları (3:1 banner alanı boş, `banner` alanı bekliyor). Ürün listesi sayfası: solda akordeon filtre (`CategoryFilter`, çoklu seçim `?k=slug,slug`, `?k=tumu` = tüm ürünler), sağda 3'lü grid. `/gida/markalar`: katalogdan türetilen ~150 marka (`lib/gida-markalar.ts`), logolar `public/gida/markalar/` (Haribo referanslı normalize, 280x112 PNG; üretim betiği session scratchpad'indeydi, gerekirse yeniden yazılır).

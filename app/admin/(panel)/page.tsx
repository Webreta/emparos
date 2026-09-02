import { requireSection } from "@/lib/auth/session";

// Genel içerikler sekmesi: site bölümleri netleştikçe formlar buraya eklenecek
export default async function AdminGeneralContentPage() {
  await requireSection("genel");
  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold text-navy-900">Genel İçerikler</h1>
      <p className="mt-6 rounded-2xl border border-line bg-white p-6 text-sm text-muted">
        Ana sayfa ve site geneli içerik formları, tasarım tamamlandığında bu
        sekmeye eklenecek.
      </p>
    </div>
  );
}

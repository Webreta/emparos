// Sabit kurumsal bilgiler (formdan). Panelden düzenlenebilir alanlar
// site_settings tablosuna taşındıkça buradaki değerler varsayılan olarak kalır.
export const site = {
  name: "Emparos Global",
  shortName: "Emparos",
  address: "Mansuroğlu Mah. 286/1 Sk. No: 1 İç Kapı No: 215 Bayraklı / İzmir",
  phone: "+90 544 979 26 20",
  phoneHref: "tel:+905449792620",
  whatsappHref: "https://wa.me/905449792620",
  email: "info@emparos.com",
  mapsUrl: "",
  // Sosyal hesaplar henüz yok; ikonlar görünsün diye geçici "#" (gerçek adresler gelince değişecek)
  instagram: "#",
  facebook: "#",
  linkedin: "#",
} as const;

import type { Locale } from "@/lib/i18n/config";

// Arayüz metinleri (menü, düğme, form, başlık). İçerik çevirileri lib/i18n/content*.ts içinde.
// Sunucu ve istemci bileşenlerinde `ui[locale]` ile kullanılır.

export type UiDict = {
  nav: {
    home: string;
    sectors: string;
    about: string;
    contact: string;
    brands: string;
    quote: string;
    quoteShort: string;
    faq: string;
    menu: string;
    mainSite: string;
    blog: string;
  };
  home: {
    quoteBtn: string;
    explore: string;
    why: (name: string) => string;
  };
  cta: { title: string; text: string; formBtn: string; whatsapp: string };
  item: {
    products: string;
    viewProducts: string;
    scope: string;
    quoteFood: { title: string; text: string };
    quoteEng: { title: string; text: string };
    formBtn: string;
  };
  catalog: {
    search: string;
    clear: string;
    results: string;
    all: string;
    products: string;
    searchedFor: (q: string) => string;
    count: (n: number) => string;
    noResults: string;
    filter: string;
    clearFilters: string;
    searchFilter: string;
    filterTitle: string;
    show: (n: number) => string;
    close: string;
    selectAll: (g: string) => string;
  };
  brands: {
    title: string;
    heroText: (n: number) => string;
    found: (n: number) => string;
    total: (n: number) => string;
    search: string;
    notFound: string;
    products: (n: number) => string;
  };
  quote: {
    title: string;
    text: string;
    process: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    quantity: string;
    message: string;
    select: string;
    required: string;
    submit: string;
    sending: string;
    thanksTitle: string;
    thanksText: string;
    errors: { name: string; email: string; message: string; check: string; save: string };
  };
  contact: {
    title: string;
    text: string;
    phone: string;
    email: string;
    address: string;
    priceQuote: string;
    fillTitle: string;
    fillText: string;
    formBtn: string;
    waTitle: string;
    waText: string;
    waShort: string;
  };
  footer: { quick: string; contact: string; rights: string; mainSite: string; solutions: string; privacy: string; cookies: string };
  cover: {
    aboutEyebrow: string;
    aboutTitle: string;
    divisionsTitle: string;
    contactEyebrow: string;
    contactTitle: string;
    contactIntro: string;
    address: string;
    phone: string;
    email: string;
    wa: string;
    formName: string;
    formPhone: string;
    formEmail: string;
    formSubject: string;
    formOther: string;
    formMessage: string;
    send: string;
    faqEyebrow: string;
    faqTitle: string;
    sectorsEyebrow: string;
    sectorsTitle: string;
  };
  float: { whatsapp: string };
};

const tr: UiDict = {
  nav: {
    home: "Ana Sayfa",
    sectors: "Sektörler",
    about: "Hakkımızda",
    contact: "İletişim",
    brands: "Markalar",
    quote: "Teklif Alın",
    quoteShort: "Teklif Al",
    faq: "Merak Ettikleriniz",
    menu: "Menü",
    mainSite: "Emparos Global",
    blog: "Blog",
  },
  home: { quoteBtn: "Teklif Alın", explore: "İncele", why: (n) => `Neden ${n}?` },
  cta: {
    title: "İhtiyacınızı konuşalım",
    text: "Size özel teklif için formu doldurun ya da WhatsApp üzerinden hemen yazın.",
    formBtn: "Teklif Formu",
    whatsapp: "WhatsApp",
  },
  item: {
    products: "Ürünler",
    viewProducts: "Ürünleri Gör",
    scope: "Hizmet kapsamı",
    quoteFood: { title: "Bu ürün grubu için teklif alın", text: "Adet ve teslimat noktasını iletin, aynı gün fiyat teklifiyle dönelim." },
    quoteEng: { title: "Bu hizmet için görüşme talep edin", text: "İhtiyacınızı kısaca anlatın, ön değerlendirme için sizinle iletişime geçelim." },
    formBtn: "Teklif Formu",
  },
  catalog: {
    search: "Ürün ara",
    clear: "Aramayı temizle",
    results: "Arama Sonuçları",
    all: "Tüm Ürünler",
    products: "Ürünler",
    searchedFor: (q) => `“${q}” için tüm ürünlerde arandı`,
    count: (n) => `${n} ürün`,
    noResults: "Aradığınız ürün bulunamadı. Farklı bir kelimeyle deneyin.",
    filter: "Filtrele",
    clearFilters: "Filtreleri kaldır",
    searchFilter: "Arama",
    filterTitle: "Ürünleri Filtrele",
    show: (n) => `${n} ürünü göster`,
    close: "Kapat",
    selectAll: (g) => `${g}: tüm alt kategorileri seç`,
  },
  brands: {
    title: "Markalar",
    heroText: (n) => `Katalogumuzda ${n} markanın gıda, içecek ve temizlik ürünleri yer alıyor. Aradığınız markayı bulamazsanız teklif formundan iletin.`,
    found: (n) => `${n} marka bulundu`,
    total: (n) => `Toplam ${n} marka`,
    search: "Marka ara…",
    notFound: "Aradığınız marka bulunamadı.",
    products: (n) => `${n} ürün`,
  },
  quote: {
    title: "Teklif Alın",
    text: "Formu doldurun, aynı gün içinde size özel fiyat teklifiyle dönelim.",
    process: "Süreç",
    name: "Ad Soyad",
    company: "Firma",
    email: "E-posta",
    phone: "Telefon",
    quantity: "Tahmini Miktar",
    message: "Talebiniz",
    select: "Seçin (isteğe bağlı)",
    required: "* işaretli alanlar zorunludur.",
    submit: "Teklif İste",
    sending: "Gönderiliyor…",
    thanksTitle: "Talebiniz alındı",
    thanksText: "Teşekkürler. Ekibimiz talebinizi inceleyip en kısa sürede size fiyat teklifiyle dönecek.",
    errors: {
      name: "Ad soyad girin.",
      email: "Geçerli bir e-posta adresi girin.",
      message: "Talebinizi birkaç cümleyle açıklayın.",
      check: "Formu kontrol edin.",
      save: "Talebiniz kaydedilemedi. Lütfen tekrar deneyin ya da bizi arayın.",
    },
  },
  contact: {
    title: "İletişim",
    text: "Teklif ve bilgi için bize ulaşın. Aynı gün içinde dönüş yapıyoruz.",
    phone: "Telefon",
    email: "E-posta",
    address: "Adres",
    priceQuote: "Fiyat teklifi",
    fillTitle: "Teklif formunu doldurun",
    fillText: "İhtiyacınız olan ürün grubu, adet ve teslimat noktasını iletin; ekibimiz size özel fiyat teklifiyle dönsün.",
    formBtn: "Teklif Formu",
    waTitle: "WhatsApp ile hemen yazın",
    waText: "Hızlı sorularınız için mesaj gönderin, mesai saatleri içinde anında yanıt alın.",
    waShort: "WhatsApp ile yazın",
  },
  footer: {
    quick: "Hızlı Erişim",
    contact: "İletişim",
    rights: "Tüm hakları saklıdır.",
    mainSite: "Emparos Global ana sayfa",
    solutions: "Çözümlerimiz",
    privacy: "Gizlilik",
    cookies: "Çerez Politikası",
  },
  cover: {
    aboutEyebrow: "Connecting Markets. Managing Trust.",
    aboutTitle: "Hakkımızda",
    divisionsTitle: "İş Kollarımız",
    contactEyebrow: "Bize Ulaşın",
    contactTitle: "İletişim",
    contactIntro: "Tedarik, ambalaj ya da danışmanlık; hangi konuda olursa olsun ilk görüşme için bize ulaşın.",
    address: "Adres",
    phone: "Telefon",
    email: "E-posta",
    wa: "WhatsApp ile yazın",
    formName: "Ad Soyad",
    formPhone: "Telefon",
    formEmail: "E-posta",
    formSubject: "Konu seçin",
    formOther: "Diğer",
    formMessage: "Mesajınız",
    send: "Gönder",
    faqEyebrow: "Sık Sorulan Sorular",
    faqTitle: "Merak Ettikleriniz",
    sectorsEyebrow: "Üç iş kolu, tek güvenilir ortak",
    sectorsTitle: "Sektörler",
  },
  float: { whatsapp: "WhatsApp ile yazın" },
};

const en: UiDict = {
  nav: {
    home: "Home",
    sectors: "Sectors",
    about: "About Us",
    contact: "Contact",
    brands: "Brands",
    quote: "Get a Quote",
    quoteShort: "Get a Quote",
    faq: "FAQ",
    menu: "Menu",
    mainSite: "Emparos Global",
    blog: "Blog",
  },
  home: { quoteBtn: "Get a Quote", explore: "Explore", why: (n) => `Why ${n}?` },
  cta: {
    title: "Let's talk about your needs",
    text: "Fill in the form for a tailored offer or message us on WhatsApp right away.",
    formBtn: "Quote Form",
    whatsapp: "WhatsApp",
  },
  item: {
    products: "Products",
    viewProducts: "View Products",
    scope: "Scope of service",
    quoteFood: { title: "Get a quote for this product group", text: "Tell us the quantity and delivery point and we will reply with a price the same day." },
    quoteEng: { title: "Request a meeting for this service", text: "Describe your needs briefly and we will get in touch for a preliminary assessment." },
    formBtn: "Quote Form",
  },
  catalog: {
    search: "Search products",
    clear: "Clear search",
    results: "Search Results",
    all: "All Products",
    products: "Products",
    searchedFor: (q) => `Searched all products for “${q}”`,
    count: (n) => `${n} products`,
    noResults: "No products found. Try a different keyword.",
    filter: "Filter",
    clearFilters: "Clear filters",
    searchFilter: "Search",
    filterTitle: "Filter Products",
    show: (n) => `Show ${n} products`,
    close: "Close",
    selectAll: (g) => `${g}: select all subcategories`,
  },
  brands: {
    title: "Brands",
    heroText: (n) => `Our catalogue covers food, beverage and cleaning products from ${n} brands. If you cannot find a brand, let us know via the quote form.`,
    found: (n) => `${n} brands found`,
    total: (n) => `${n} brands in total`,
    search: "Search brands…",
    notFound: "No brands match your search.",
    products: (n) => `${n} products`,
  },
  quote: {
    title: "Get a Quote",
    text: "Fill in the form and we will send you a tailored price offer within the same day.",
    process: "Process",
    name: "Full Name",
    company: "Company",
    email: "E-mail",
    phone: "Phone",
    quantity: "Estimated Quantity",
    message: "Your Request",
    select: "Select (optional)",
    required: "* Required fields.",
    submit: "Request a Quote",
    sending: "Sending…",
    thanksTitle: "Request received",
    thanksText: "Thank you. Our team will review your request and get back to you with a price offer shortly.",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid e-mail address.",
      message: "Please describe your request in a few sentences.",
      check: "Please check the form.",
      save: "Your request could not be saved. Please try again or call us.",
    },
  },
  contact: {
    title: "Contact",
    text: "Get in touch for quotes and information. We reply within the same day.",
    phone: "Phone",
    email: "E-mail",
    address: "Address",
    priceQuote: "Price quote",
    fillTitle: "Fill in the quote form",
    fillText: "Tell us the product group, quantity and delivery point you need and our team will reply with a tailored price.",
    formBtn: "Quote Form",
    waTitle: "Message us on WhatsApp",
    waText: "Send a message for quick questions and get an instant reply during working hours.",
    waShort: "Message on WhatsApp",
  },
  footer: {
    quick: "Quick Links",
    contact: "Contact",
    rights: "All rights reserved.",
    mainSite: "Emparos Global home page",
    solutions: "Our Solutions",
    privacy: "Privacy",
    cookies: "Cookie Policy",
  },
  cover: {
    aboutEyebrow: "Connecting Markets. Managing Trust.",
    aboutTitle: "About Us",
    divisionsTitle: "Our Business Lines",
    contactEyebrow: "Get in Touch",
    contactTitle: "Contact",
    contactIntro: "Supply, packaging or consulting; whatever the topic, reach out to us for a first conversation.",
    address: "Address",
    phone: "Phone",
    email: "E-mail",
    wa: "Message on WhatsApp",
    formName: "Full Name",
    formPhone: "Phone",
    formEmail: "E-mail",
    formSubject: "Select a subject",
    formOther: "Other",
    formMessage: "Your message",
    send: "Send",
    faqEyebrow: "Frequently Asked Questions",
    faqTitle: "FAQ",
    sectorsEyebrow: "Three business lines, one trusted partner",
    sectorsTitle: "Sectors",
  },
  float: { whatsapp: "Message on WhatsApp" },
};

const fr: UiDict = {
  nav: {
    home: "Accueil",
    sectors: "Secteurs",
    about: "À propos",
    contact: "Contact",
    brands: "Marques",
    quote: "Demander un devis",
    quoteShort: "Devis",
    faq: "FAQ",
    menu: "Menu",
    mainSite: "Emparos Global",
    blog: "Blog",
  },
  home: { quoteBtn: "Demander un devis", explore: "Découvrir", why: (n) => `Pourquoi ${n} ?` },
  cta: {
    title: "Parlons de vos besoins",
    text: "Remplissez le formulaire pour une offre sur mesure ou écrivez-nous directement sur WhatsApp.",
    formBtn: "Formulaire de devis",
    whatsapp: "WhatsApp",
  },
  item: {
    products: "Produits",
    viewProducts: "Voir les produits",
    scope: "Périmètre du service",
    quoteFood: { title: "Demandez un devis pour ce groupe de produits", text: "Indiquez la quantité et le lieu de livraison, nous répondons avec un prix le jour même." },
    quoteEng: { title: "Demandez un entretien pour ce service", text: "Décrivez brièvement votre besoin, nous vous contacterons pour une première évaluation." },
    formBtn: "Formulaire de devis",
  },
  catalog: {
    search: "Rechercher un produit",
    clear: "Effacer la recherche",
    results: "Résultats de recherche",
    all: "Tous les produits",
    products: "Produits",
    searchedFor: (q) => `Recherche de « ${q} » dans tous les produits`,
    count: (n) => `${n} produits`,
    noResults: "Aucun produit trouvé. Essayez un autre mot-clé.",
    filter: "Filtrer",
    clearFilters: "Effacer les filtres",
    searchFilter: "Recherche",
    filterTitle: "Filtrer les produits",
    show: (n) => `Afficher ${n} produits`,
    close: "Fermer",
    selectAll: (g) => `${g} : sélectionner toutes les sous-catégories`,
  },
  brands: {
    title: "Marques",
    heroText: (n) => `Notre catalogue réunit les produits alimentaires, boissons et produits d'entretien de ${n} marques. Si vous ne trouvez pas une marque, indiquez-la dans le formulaire de devis.`,
    found: (n) => `${n} marques trouvées`,
    total: (n) => `${n} marques au total`,
    search: "Rechercher une marque…",
    notFound: "Aucune marque ne correspond à votre recherche.",
    products: (n) => `${n} produits`,
  },
  quote: {
    title: "Demander un devis",
    text: "Remplissez le formulaire et nous vous enverrons une offre de prix personnalisée le jour même.",
    process: "Processus",
    name: "Nom et prénom",
    company: "Société",
    email: "E-mail",
    phone: "Téléphone",
    quantity: "Quantité estimée",
    message: "Votre demande",
    select: "Choisir (facultatif)",
    required: "* Champs obligatoires.",
    submit: "Demander un devis",
    sending: "Envoi en cours…",
    thanksTitle: "Demande reçue",
    thanksText: "Merci. Notre équipe étudiera votre demande et reviendra vers vous rapidement avec une offre de prix.",
    errors: {
      name: "Veuillez saisir votre nom.",
      email: "Veuillez saisir une adresse e-mail valide.",
      message: "Veuillez décrire votre demande en quelques phrases.",
      check: "Veuillez vérifier le formulaire.",
      save: "Votre demande n'a pas pu être enregistrée. Réessayez ou appelez-nous.",
    },
  },
  contact: {
    title: "Contact",
    text: "Contactez-nous pour un devis ou des informations. Nous répondons le jour même.",
    phone: "Téléphone",
    email: "E-mail",
    address: "Adresse",
    priceQuote: "Offre de prix",
    fillTitle: "Remplissez le formulaire de devis",
    fillText: "Indiquez le groupe de produits, la quantité et le lieu de livraison ; notre équipe vous répondra avec un prix sur mesure.",
    formBtn: "Formulaire de devis",
    waTitle: "Écrivez-nous sur WhatsApp",
    waText: "Envoyez un message pour vos questions rapides et obtenez une réponse immédiate pendant les heures de bureau.",
    waShort: "Écrire sur WhatsApp",
  },
  footer: {
    quick: "Accès rapide",
    contact: "Contact",
    rights: "Tous droits réservés.",
    mainSite: "Page d'accueil Emparos Global",
    solutions: "Nos solutions",
    privacy: "Confidentialité",
    cookies: "Politique de cookies",
  },
  cover: {
    aboutEyebrow: "Connecting Markets. Managing Trust.",
    aboutTitle: "À propos",
    divisionsTitle: "Nos activités",
    contactEyebrow: "Contactez-nous",
    contactTitle: "Contact",
    contactIntro: "Approvisionnement, emballage ou conseil : quel que soit le sujet, contactez-nous pour un premier échange.",
    address: "Adresse",
    phone: "Téléphone",
    email: "E-mail",
    wa: "Écrire sur WhatsApp",
    formName: "Nom et prénom",
    formPhone: "Téléphone",
    formEmail: "E-mail",
    formSubject: "Choisir un sujet",
    formOther: "Autre",
    formMessage: "Votre message",
    send: "Envoyer",
    faqEyebrow: "Questions fréquentes",
    faqTitle: "FAQ",
    sectorsEyebrow: "Trois activités, un partenaire de confiance",
    sectorsTitle: "Secteurs",
  },
  float: { whatsapp: "Écrire sur WhatsApp" },
};

export const ui: Record<Locale, UiDict> = { tr, en, fr };

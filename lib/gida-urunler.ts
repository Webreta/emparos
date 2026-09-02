// Gıda alt sitesi: kategori bazlı ürün listeleri (ad + görsel).
// İki kaynak var:
//  1) Elle seçilmiş küçük listeler (Coca-Cola ailesi, Haribo, kağıt ürünleri)
//  2) Toplu katalog (lib/gida-katalog.json): referans katalogdan çekilen 1600+ gıda ürünü.
//     Katalogdaki "grup > alt grup" ikilisi aşağıdaki haritayla ürün grubu + kategoriye bağlanır.
// Görseller public/gida/urunler/ altında; panelden yönetim geldiğinde varsayılanlar bunlardır.

import type { ProductCategory } from "@/lib/sectors";
import katalog from "@/lib/gida-katalog.json";
import temizlikKatalog from "@/lib/temizlik-katalog.json";

export type Product = { name: string; image: string };

type KatalogUrun = { slug: string; name: string; image: string; group: string; vendor: string };

const img = (dir: string, slug: string) => `/gida/urunler/${dir}/${slug}.jpg`;

// ---------- Elle seçilmiş listeler ----------

// İçecek > Coca-Cola Ürün Ailesi (Coca-Cola, Fanta, Cappy, Fuse Tea)
export const cocaColaUrunleri: Product[] = [
  { name: "Coca-Cola Original 330 ml Kutu", image: img("coca-cola", "coca-cola-original-can-of-coke-330-ml") },
  { name: "Coca-Cola Original 1,5 L Pet", image: img("coca-cola", "coca-cola-original-plastic-bottle-15-l") },
  { name: "Coca-Cola Zero Sugar 330 ml Kutu", image: img("coca-cola", "coca-cola-zero-sugar-330-ml") },
  { name: "Coca-Cola Zero Sugar 1 L Pet", image: img("coca-cola", "coca-cola-zero-sugar-1-l") },
  { name: "Coca-Cola Zero Sugar 1,5 L Pet", image: img("coca-cola", "coca-cola-zero-sugar-15-l") },
  { name: "Coca-Cola Light 330 ml Kutu", image: img("coca-cola", "coca-cola-light-can-of-coke-330-ml") },
  { name: "Coca-Cola Light 1,5 L Pet", image: img("coca-cola", "coca-cola-light-plastic-bottle-15-l") },
  { name: "Coca-Cola Şekersiz 200 ml Cam Şişe", image: img("coca-cola", "coca-cola-sugar-free-glass-bottle-200-ml") },
  { name: "Coca-Cola Şekersiz 1 L Pet", image: img("coca-cola", "coca-cola-sugar-free-plastic-bottle-1-l") },
  { name: "Coca-Cola Plus Coffee 250 ml", image: img("coca-cola", "coca-cola-coffee-250-ml") },
  { name: "Fanta Portakal 330 ml Kutu", image: img("coca-cola", "fanta-orange-flavored-soda-can-330-ml") },
  { name: "Fanta Portakal 1 L Pet", image: img("coca-cola", "fanta-orange-flavored-soda-plastic-bottle-1-l") },
  { name: "Cappy Şeftali 330 ml Kutu", image: img("coca-cola", "cappy-fruit-juice-peach-can-330-ml") },
  { name: "Cappy Pulpy Portakal 1 L Pet", image: img("coca-cola", "cappy-fruit-juice-pulpy-orange-particle-plastik-bottle-1-l") },
  { name: "Cappy Karışık Meyve 1 L Pet", image: img("coca-cola", "cappy-fruit-juice-mixed-plastic-bottle-1-l") },
  { name: "Fuse Tea Şeftali 330 ml Kutu", image: img("coca-cola", "fuse-tea-flavored-drink-peach-can-330-ml") },
  { name: "Fuse Tea Şeftali 1,5 L Pet", image: img("coca-cola", "fuse-tea-flavored-drink-peach-plastic-bottle-15-l") },
];

// Şekerleme > Haribo
export const hariboUrunleri: Product[] = [
  { name: "Haribo Altın Ayıcık 80 g", image: img("haribo", "haribo-gold-bears-80-gr") },
  { name: "Haribo Altın Ayıcık 160 g", image: img("haribo", "haribo-gold-bears-160-gr") },
  { name: "Haribo Starmix 80 g", image: img("haribo", "haribo-starmix-80-gr") },
  { name: "Haribo Starmix 160 g", image: img("haribo", "haribo-starmix-160-gr") },
  { name: "Haribo Happy Cola 80 g", image: img("haribo", "haribo-happy-cola-80-gr") },
  { name: "Haribo Happy Cola 160 g", image: img("haribo", "haribo-happy-cola-160-gr") },
  { name: "Haribo Tropifrutti 80 g", image: img("haribo", "haribo-tropifrutti-80-gr") },
  { name: "Haribo Tropifrutti 160 g", image: img("haribo", "haribo-tropifrutti-160-gr") },
  { name: "Haribo Worms 80 g", image: img("haribo", "haribo-worms-80-gr") },
  { name: "Haribo Worms 160 g", image: img("haribo", "haribo-worms-160-gr") },
  { name: "Haribo Berries 80 g", image: img("haribo", "haribo-berries-80-gr") },
  { name: "Haribo Twin Snakes 80 g", image: img("haribo", "haribo-twin-snakes-80-gr") },
  { name: "Haribo Roulette 25 g", image: img("haribo", "haribo-roulette-jelly-candy-stick-25-gr") },
];

// Temizlik & Kağıt > Tuvalet Kağıdı & Kağıt Havlu
export const kagitUrunleri: Product[] = [
  { name: "Selpak Tuvalet Kağıdı 12'li", image: img("kagit", "selpak-toilet-papers-12-pc") },
  { name: "Selpak Parfümlü Tuvalet Kağıdı Lavanta 32'li", image: img("kagit", "selpak-toilet-papers-with-parfume-lavander-32-pc") },
  { name: "Selpak Kağıt Havlu 6'lı", image: img("kagit", "selpak-towel-6-pc") },
  { name: "Selpak Kağıt Havlu 12'li", image: img("kagit", "selpak-towel-12-pc") },
  { name: "Selpak Peçete 75'li", image: img("kagit", "selpak-napkin-75-pc") },
  { name: "Papia Tuvalet Kağıdı 16'lı", image: img("kagit", "papia-toilet-paper-16-pc") },
  { name: "Papia Tuvalet Kağıdı 32'li", image: img("kagit", "papia-toilet-paper-32-pc") },
  { name: "Papia Deluxe Tuvalet Kağıdı 32'li", image: img("kagit", "papia-toilet-paper-deluxe-32-pc") },
  { name: "Papia Kağıt Havlu 8'li", image: img("kagit", "papia-paper-towel-8-pc") },
  { name: "Papia Kutu Mendil 100'lü", image: img("kagit", "papia-tissue-box-100-pc") },
  { name: "Papia Cep Peçetesi 10'lu", image: img("kagit", "papia-napkin-classic-pocket-10-pc") },
  { name: "Solo Tuvalet Kağıdı 24'lü", image: img("kagit", "solo-toilet-paper-24-pc") },
  { name: "Solo Kağıt Havlu 8'li", image: img("kagit", "solo-towel-8-pc") },
  { name: "Solo Peçete 200'lü", image: img("kagit", "solo-napkin-200-pc") },
  { name: "Familia Tuvalet Kağıdı 16'lı", image: img("kagit", "familia-toilet-paper-16-pc") },
  { name: "Familia Kağıt Havlu 12'li", image: img("kagit", "familia-paper-towel-12-pc") },
  { name: "Focus İçten Çekmeli Tuvalet Kağıdı 12'li", image: img("kagit", "focus-toilet-paper-center-pull-12-pc") },
  { name: "Focus Z Katlama Dispenser Peçete 150'li", image: img("kagit", "focus-napkin-z-folder-150-pc") },
  { name: "Focus Optimum Jumbo Rulo Havlu (Fotoselli) 6'lı", image: img("kagit", "focus-towel-optimum-jumbo-roll-tower-photocell-6-pc") },
];

// ---------- Toplu katalog ----------

type KatalogItemKey = "icecek" | "sekerleme" | "gida";

// Katalogdaki "grup > alt grup" → hangi ürün grubu (item) altında, hangi kategori.
// Aynı kategori anahtarına bağlanan birden fazla alt grup tek kategoride birleşir.
type CatDef = { item: KatalogItemKey; slug: string; name: string; desc: string };
const katalogHarita: Record<string, CatDef> = {
  // İçecek
  "Soft Drinks > Carbonated Drinks": { item: "icecek", slug: "gazli-icecekler", name: "Gazlı İçecekler", desc: "Kola, gazoz ve meyveli gazlı içecekler; kutu, pet ve cam şişe." },
  "Soft Drinks > Energy Drink": { item: "icecek", slug: "enerji-icecekleri", name: "Enerji İçecekleri", desc: "Red Bull başta olmak üzere enerji içeceği çeşitleri." },
  "Soft Drinks > Ice Tea": { item: "icecek", slug: "soguk-cay", name: "Soğuk Çay", desc: "Şeftali, limon ve karışık meyveli soğuk çaylar." },
  "Soft Drinks > Juice": { item: "icecek", slug: "meyve-suyu", name: "Meyve Suyu & Nektar", desc: "Meyve suyu, nektar ve meyveli içecekler." },
  "Soft Drinks > Lemonade": { item: "icecek", slug: "limonata", name: "Limonata", desc: "Hazır limonata çeşitleri." },
  "Soft Drinks > Mineral Water": { item: "icecek", slug: "su-maden-suyu", name: "Su & Maden Suyu", desc: "Pet ve cam ambalajda içme suyu, maden suyu ve soda." },
  "Soft Drinks > Tea": { item: "icecek", slug: "cay", name: "Çay", desc: "Siyah çay, bitki çayı ve poşet çay çeşitleri." },
  "Instant Drinks > Tea": { item: "icecek", slug: "cay", name: "Çay", desc: "Siyah çay, bitki çayı ve poşet çay çeşitleri." },
  "Instant Drinks > Coffee": { item: "icecek", slug: "kahve", name: "Kahve", desc: "Hazır kahve, Türk kahvesi ve kapsül kahve çeşitleri." },
  "Instant Drinks > Powder Drinks": { item: "icecek", slug: "toz-icecekler", name: "Toz İçecekler", desc: "Toz içecek ve sıcak çikolata karışımları." },

  // Şekerleme & Atıştırmalık
  "Confectionery > Candy": { item: "sekerleme", slug: "sekerleme", name: "Şekerleme", desc: "Yumuşak şeker, jelibon, bonbon ve lolipop çeşitleri." },
  "Confectionery > Chewing Gum": { item: "sekerleme", slug: "sakiz", name: "Sakız", desc: "Şekerli ve şekersiz sakız, draje ve nefes tazeleyiciler." },
  "Confectionery > Chocolate": { item: "sekerleme", slug: "cikolata", name: "Çikolata", desc: "Tablet, bar ve dolgulu çikolata çeşitleri." },
  "Confectionery > Wafer": { item: "sekerleme", slug: "gofret", name: "Gofret", desc: "Çikolata kaplı ve kremalı gofret çeşitleri." },
  "Ready Dessert > Wafer": { item: "sekerleme", slug: "gofret", name: "Gofret", desc: "Çikolata kaplı ve kremalı gofret çeşitleri." },
  "Confectionery > Marshmallow": { item: "sekerleme", slug: "marshmallow", name: "Marshmallow", desc: "Marshmallow ve yumuşak şekerleme." },
  "Confectionery > Cake": { item: "sekerleme", slug: "kek", name: "Kek", desc: "Tekli ve aile boyu kek, muffin ve rulo pasta." },
  "Baked Goods > Cake": { item: "sekerleme", slug: "kek", name: "Kek", desc: "Tekli ve aile boyu kek, muffin ve rulo pasta." },
  "Baked Goods > Biscuit": { item: "sekerleme", slug: "biskuvi", name: "Bisküvi", desc: "Tatlı bisküvi, kremalı ve çikolatalı bisküvi çeşitleri." },
  "Baby Foods > Biscuit": { item: "sekerleme", slug: "biskuvi", name: "Bisküvi", desc: "Tatlı bisküvi, kremalı ve çikolatalı bisküvi çeşitleri." },
  "Baked Goods > Diet Biscuit": { item: "sekerleme", slug: "diyet-biskuvi", name: "Diyet & Tahıllı Bisküvi", desc: "Şeker ilavesiz, tam tahıllı ve lifli bisküviler." },
  "Grain Products > Diet Biscuit": { item: "sekerleme", slug: "diyet-biskuvi", name: "Diyet & Tahıllı Bisküvi", desc: "Şeker ilavesiz, tam tahıllı ve lifli bisküviler." },
  "Baked Goods > Cracker": { item: "sekerleme", slug: "kraker", name: "Kraker", desc: "Tuzlu kraker, çubuk kraker ve galeta çeşitleri." },
  "Baked Goods > Stick Cracker": { item: "sekerleme", slug: "kraker", name: "Kraker", desc: "Tuzlu kraker, çubuk kraker ve galeta çeşitleri." },
  "Baked Goods > Dry Baker": { item: "sekerleme", slug: "kraker", name: "Kraker", desc: "Tuzlu kraker, çubuk kraker ve galeta çeşitleri." },
  "Baked Goods > Croissant": { item: "sekerleme", slug: "kruvasan", name: "Kruvasan", desc: "Dolgulu kruvasan ve poğaça çeşitleri." },
  "Snack > Chips": { item: "sekerleme", slug: "cips", name: "Cips", desc: "Patates cipsi, mısır cipsi ve çerez çeşitleri." },
  "Turkısh Delight > Delight": { item: "sekerleme", slug: "lokum", name: "Lokum", desc: "Geleneksel ve fındıklı lokum çeşitleri." },

  // Gıda Ürünleri
  "Breakfast Products > Halva": { item: "gida", slug: "kahvaltilik", name: "Kahvaltılık", desc: "Bal, reçel, helva ve tahin." },
  "Breakfast Products > Honey": { item: "gida", slug: "kahvaltilik", name: "Kahvaltılık", desc: "Bal, reçel, helva ve tahin." },
  "Breakfast Products > Jam": { item: "gida", slug: "kahvaltilik", name: "Kahvaltılık", desc: "Bal, reçel, helva ve tahin." },
  "Breakfast Products > Tahini": { item: "gida", slug: "kahvaltilik", name: "Kahvaltılık", desc: "Bal, reçel, helva ve tahin." },
  "Dairy Products > Jam": { item: "gida", slug: "kahvaltilik", name: "Kahvaltılık", desc: "Bal, reçel, helva ve tahin." },
  "Dairy Products > Butter": { item: "gida", slug: "sut-urunleri", name: "Süt Ürünleri", desc: "Süt, peynir, tereyağı, yoğurt ve krema." },
  "Dairy Products > Buttermilk": { item: "gida", slug: "sut-urunleri", name: "Süt Ürünleri", desc: "Süt, peynir, tereyağı, yoğurt ve krema." },
  "Dairy Products > Cheese": { item: "gida", slug: "sut-urunleri", name: "Süt Ürünleri", desc: "Süt, peynir, tereyağı, yoğurt ve krema." },
  "Dairy Products > Cream": { item: "gida", slug: "sut-urunleri", name: "Süt Ürünleri", desc: "Süt, peynir, tereyağı, yoğurt ve krema." },
  "Dairy Products > Ice Cream": { item: "gida", slug: "sut-urunleri", name: "Süt Ürünleri", desc: "Süt, peynir, tereyağı, yoğurt ve krema." },
  "Dairy Products > Milk": { item: "gida", slug: "sut-urunleri", name: "Süt Ürünleri", desc: "Süt, peynir, tereyağı, yoğurt ve krema." },
  "Dairy Products > Yoghurt": { item: "gida", slug: "sut-urunleri", name: "Süt Ürünleri", desc: "Süt, peynir, tereyağı, yoğurt ve krema." },
  "Dairy Products > juice": { item: "gida", slug: "sut-urunleri", name: "Süt Ürünleri", desc: "Süt, peynir, tereyağı, yoğurt ve krema." },
  "Canned Foods > Prepared Foods": { item: "gida", slug: "konserve-hazir-yemek", name: "Konserve & Hazır Yemek", desc: "Konserve sebze, bakliyat ve hazır yemekler." },
  "Canned Foods > Noodle": { item: "gida", slug: "konserve-hazir-yemek", name: "Konserve & Hazır Yemek", desc: "Konserve sebze, bakliyat ve hazır yemekler." },
  "Frozen Foods > Prepared Foods": { item: "gida", slug: "konserve-hazir-yemek", name: "Konserve & Hazır Yemek", desc: "Konserve sebze, bakliyat ve hazır yemekler." },
  "Canned Foods > Olive": { item: "gida", slug: "zeytin-zeytinyagi", name: "Zeytin & Zeytinyağı", desc: "Sofralık zeytin ve zeytinyağı çeşitleri." },
  "Canned Foods > Olive Oil": { item: "gida", slug: "zeytin-zeytinyagi", name: "Zeytin & Zeytinyağı", desc: "Sofralık zeytin ve zeytinyağı çeşitleri." },
  "Oil > Animal Oil": { item: "gida", slug: "zeytin-zeytinyagi", name: "Zeytin & Zeytinyağı", desc: "Sofralık zeytin ve zeytinyağı çeşitleri." },
  "Canned Foods > Sauce": { item: "gida", slug: "sos-baharat", name: "Sos & Baharat", desc: "Ketçap, mayonez, salça, soslar ve baharatlar." },
  "Sauce > Sauce": { item: "gida", slug: "sos-baharat", name: "Sos & Baharat", desc: "Ketçap, mayonez, salça, soslar ve baharatlar." },
  "Sauce > Mayonnaise": { item: "gida", slug: "sos-baharat", name: "Sos & Baharat", desc: "Ketçap, mayonez, salça, soslar ve baharatlar." },
  "Sauce > Flavor": { item: "gida", slug: "sos-baharat", name: "Sos & Baharat", desc: "Ketçap, mayonez, salça, soslar ve baharatlar." },
  "Sauce > Noodle": { item: "gida", slug: "tahil-makarna", name: "Tahıl & Makarna", desc: "Makarna, noodle ve kahvaltılık gevrekler." },
  "Grain Products > Pasta": { item: "gida", slug: "tahil-makarna", name: "Tahıl & Makarna", desc: "Makarna, noodle ve kahvaltılık gevrekler." },
  "Grain Products > Corn Flakes": { item: "gida", slug: "tahil-makarna", name: "Tahıl & Makarna", desc: "Makarna, noodle ve kahvaltılık gevrekler." },
  "Ready Dessert > Puding": { item: "gida", slug: "hazir-tatli", name: "Hazır Tatlı", desc: "Puding, toz tatlı, krem şanti ve pasta malzemeleri." },
  "Ready Dessert > Ready Dessert": { item: "gida", slug: "hazir-tatli", name: "Hazır Tatlı", desc: "Puding, toz tatlı, krem şanti ve pasta malzemeleri." },
  "Ready Dessert > Powder": { item: "gida", slug: "hazir-tatli", name: "Hazır Tatlı", desc: "Puding, toz tatlı, krem şanti ve pasta malzemeleri." },
  "Ready Dessert > Baking Powder": { item: "gida", slug: "hazir-tatli", name: "Hazır Tatlı", desc: "Puding, toz tatlı, krem şanti ve pasta malzemeleri." },
  "Ready Dessert > Sauce": { item: "gida", slug: "hazir-tatli", name: "Hazır Tatlı", desc: "Puding, toz tatlı, krem şanti ve pasta malzemeleri." },
  "Ready Dessert > Wipped Cream": { item: "gida", slug: "hazir-tatli", name: "Hazır Tatlı", desc: "Puding, toz tatlı, krem şanti ve pasta malzemeleri." },
  "Instant Drinks > Soup": { item: "gida", slug: "hazir-corba", name: "Hazır Çorba", desc: "Toz ve bardak çorba çeşitleri." },
  "Baby Foods > Baby Foods": { item: "gida", slug: "bebek-mamasi", name: "Bebek Maması", desc: "Bebek maması, devam sütü ve bebek besinleri." },
  "ANIMAL FEED > Animal Food": { item: "gida", slug: "hayvan-mamasi", name: "Evcil Hayvan Maması", desc: "Kedi ve köpek maması." },
};

// Temizlik & Kağıt (lib/temizlik-katalog.json): yalnızca Türk markaları
// (Bingo, Peros, ABC, Molfix, Sleepy, Selpak, Papia, Solo, Familia, Focus, Canbebe, Evy Baby, PorÇöz, Tursil, Dixi vb.)
type TemizlikCatDef = { slug: string; name: string; desc: string };
const temizlikHarita: Record<string, TemizlikCatDef> = {
  "Detergent > Powder Detergent": { slug: "camasir-deterjani", name: "Çamaşır Deterjanı", desc: "Toz, sıvı, jel ve kapsül çamaşır deterjanları." },
  "Detergent > Liquid Detergent": { slug: "camasir-deterjani", name: "Çamaşır Deterjanı", desc: "Toz, sıvı, jel ve kapsül çamaşır deterjanları." },
  "Detergent > Gel Detergent": { slug: "camasir-deterjani", name: "Çamaşır Deterjanı", desc: "Toz, sıvı, jel ve kapsül çamaşır deterjanları." },
  "Detergent > Capsul Detergent": { slug: "camasir-deterjani", name: "Çamaşır Deterjanı", desc: "Toz, sıvı, jel ve kapsül çamaşır deterjanları." },
  "Detergent > Salt": { slug: "camasir-deterjani", name: "Çamaşır Deterjanı", desc: "Toz, sıvı, jel ve kapsül çamaşır deterjanları." },
  "Detergent > Machine Cleaner": { slug: "camasir-deterjani", name: "Çamaşır Deterjanı", desc: "Toz, sıvı, jel ve kapsül çamaşır deterjanları." },
  "Softener > Liquid Softener": { slug: "yumusatici", name: "Çamaşır Yumuşatıcı", desc: "Sıvı ve konsantre çamaşır yumuşatıcıları." },
  "Softener > Softener Gel": { slug: "yumusatici", name: "Çamaşır Yumuşatıcı", desc: "Sıvı ve konsantre çamaşır yumuşatıcıları." },
  "Concentrated Softener > Softener Gel": { slug: "yumusatici", name: "Çamaşır Yumuşatıcı", desc: "Sıvı ve konsantre çamaşır yumuşatıcıları." },
  "Bleacher > Liquid Bleacher": { slug: "camasir-suyu", name: "Çamaşır Suyu", desc: "Sıvı, jel ve spreyli çamaşır suyu çeşitleri." },
  "Bleacher > Bleacher Gel": { slug: "camasir-suyu", name: "Çamaşır Suyu", desc: "Sıvı, jel ve spreyli çamaşır suyu çeşitleri." },
  "Bleacher > Bleacher Spray": { slug: "camasir-suyu", name: "Çamaşır Suyu", desc: "Sıvı, jel ve spreyli çamaşır suyu çeşitleri." },
  "Bleacher > Bleacher Foam": { slug: "camasir-suyu", name: "Çamaşır Suyu", desc: "Sıvı, jel ve spreyli çamaşır suyu çeşitleri." },
  "Dishwasher Detergent > Dishwasher Gel": { slug: "bulasik-deterjani", name: "Bulaşık Deterjanı", desc: "Elde ve makinede bulaşık deterjanları, tablet ve parlatıcılar." },
  "Dishwasher Detergent > Dishwasher Tab": { slug: "bulasik-deterjani", name: "Bulaşık Deterjanı", desc: "Elde ve makinede bulaşık deterjanları, tablet ve parlatıcılar." },
  "Dishwasher Detergent > Dishwasher Powder": { slug: "bulasik-deterjani", name: "Bulaşık Deterjanı", desc: "Elde ve makinede bulaşık deterjanları, tablet ve parlatıcılar." },
  "Dishwasher Detergent > Dishwasher Salt": { slug: "bulasik-deterjani", name: "Bulaşık Deterjanı", desc: "Elde ve makinede bulaşık deterjanları, tablet ve parlatıcılar." },
  "Dishwasher Detergent > Liquid Dishwasher Cleaner": { slug: "bulasik-deterjani", name: "Bulaşık Deterjanı", desc: "Elde ve makinede bulaşık deterjanları, tablet ve parlatıcılar." },
  "Dishwasher Detergent > Liquid Dishwasher Detergent": { slug: "bulasik-deterjani", name: "Bulaşık Deterjanı", desc: "Elde ve makinede bulaşık deterjanları, tablet ve parlatıcılar." },
  "Dishwasher Detergent > Shiner Liquid": { slug: "bulasik-deterjani", name: "Bulaşık Deterjanı", desc: "Elde ve makinede bulaşık deterjanları, tablet ve parlatıcılar." },
  "Dishwasher Detergent > Dishwasher Cleaner Tab": { slug: "bulasik-deterjani", name: "Bulaşık Deterjanı", desc: "Elde ve makinede bulaşık deterjanları, tablet ve parlatıcılar." },
  "Surface Cleaner > Surface Cleaner Liquid": { slug: "yuzey-temizleyici", name: "Yüzey Temizleyici", desc: "Sıvı, sprey ve krem yüzey temizleyiciler, kireç çözücüler." },
  "Surface Cleaner > Surface Cleaner Spray": { slug: "yuzey-temizleyici", name: "Yüzey Temizleyici", desc: "Sıvı, sprey ve krem yüzey temizleyiciler, kireç çözücüler." },
  "Surface Cleaner > Surface Cleaner  Cream": { slug: "yuzey-temizleyici", name: "Yüzey Temizleyici", desc: "Sıvı, sprey ve krem yüzey temizleyiciler, kireç çözücüler." },
  "Surface Cleaner > Surface Cleaner  Gel": { slug: "yuzey-temizleyici", name: "Yüzey Temizleyici", desc: "Sıvı, sprey ve krem yüzey temizleyiciler, kireç çözücüler." },
  "Surface Cleaner > Surface Cleaner": { slug: "yuzey-temizleyici", name: "Yüzey Temizleyici", desc: "Sıvı, sprey ve krem yüzey temizleyiciler, kireç çözücüler." },
  "Surface Cleaner > Surface Cleaner Wipes": { slug: "yuzey-temizleyici", name: "Yüzey Temizleyici", desc: "Sıvı, sprey ve krem yüzey temizleyiciler, kireç çözücüler." },
  "Surface Cleaner > Drain Opener": { slug: "yuzey-temizleyici", name: "Yüzey Temizleyici", desc: "Sıvı, sprey ve krem yüzey temizleyiciler, kireç çözücüler." },
  "Detergent > Carpet Shampoo": { slug: "yuzey-temizleyici", name: "Yüzey Temizleyici", desc: "Sıvı, sprey ve krem yüzey temizleyiciler, kireç çözücüler." },
  "Toilet Cleaner > Toilet Block": { slug: "tuvalet-temizleyici", name: "Tuvalet Temizleyici", desc: "Klozet blokları, jel ve sıvı tuvalet temizleyiciler." },
  "Toilet Cleaner > Toilet Cleaning Cube": { slug: "tuvalet-temizleyici", name: "Tuvalet Temizleyici", desc: "Klozet blokları, jel ve sıvı tuvalet temizleyiciler." },
  "Toilet Cleaner > Liquid Toilet Cleaner": { slug: "tuvalet-temizleyici", name: "Tuvalet Temizleyici", desc: "Klozet blokları, jel ve sıvı tuvalet temizleyiciler." },
  "Air Fresheners > Room Spray": { slug: "oda-kokusu", name: "Oda Kokusu", desc: "Oda spreyi ve araç kokuları." },
  "Air Fresheners > Automobile Smell": { slug: "oda-kokusu", name: "Oda Kokusu", desc: "Oda spreyi ve araç kokuları." },
  "Disinfectant > Disinfectant Spray": { slug: "dezenfektan", name: "Dezenfektan", desc: "Yüzey ve el dezenfektanları." },
  "Paper > Paper": { slug: "tuvalet-kagidi-kagit-havlu", name: "Tuvalet Kağıdı & Kağıt Havlu", desc: "Tuvalet kağıdı, kağıt havlu, peçete ve kutu mendil." },
  "Paper > Paper Box": { slug: "tuvalet-kagidi-kagit-havlu", name: "Tuvalet Kağıdı & Kağıt Havlu", desc: "Tuvalet kağıdı, kağıt havlu, peçete ve kutu mendil." },
  "Paper > Toilet Paper": { slug: "tuvalet-kagidi-kagit-havlu", name: "Tuvalet Kağıdı & Kağıt Havlu", desc: "Tuvalet kağıdı, kağıt havlu, peçete ve kutu mendil." },
  "Wet Wipes > Wet Wipes": { slug: "islak-mendil", name: "Islak Mendil", desc: "Islak mendil ve ıslak havlu çeşitleri." },
  "Wet Wipes > Wet Wipes Towel": { slug: "islak-mendil", name: "Islak Mendil", desc: "Islak mendil ve ıslak havlu çeşitleri." },
  "DIAPERS > Baby Diapers": { slug: "bebek-bezi", name: "Bebek Bezi", desc: "Bebek bezi ve külot bez çeşitleri." },
  "DIAPERS > Adult Diapers": { slug: "yetiskin-bezi", name: "Yetişkin Bezi", desc: "Yetişkin bezi ve hasta altı bezi." },
};

// Ortak kategori üretici: harita sırasını korur, aynı slug'a düşen alt grupları birleştirir,
// ürünleri Türkçe alfabetik sıralar, boş kategorileri düşürür.
function kategorileriUret(urunler: KatalogUrun[], harita: Record<string, TemizlikCatDef>): ProductCategory[] {
  const cats = new Map<string, ProductCategory>();
  for (const def of Object.values(harita)) {
    if (!cats.has(def.slug)) cats.set(def.slug, { slug: def.slug, name: def.name, desc: def.desc, products: [] });
  }
  for (const p of urunler) {
    const def = harita[`${p.group} > ${p.vendor}`];
    if (!def) continue;
    cats.get(def.slug)!.products!.push({ name: p.name, image: p.image });
  }
  return [...cats.values()]
    .map((c) => ({ ...c, products: c.products!.sort((a, b) => a.name.localeCompare(b.name, "tr")) }))
    .filter((c) => c.products.length > 0);
}

// Belirli bir gıda ürün grubu için katalogdan kategorileri üretir.
export function katalogKategorileri(item: KatalogItemKey): ProductCategory[] {
  const harita: Record<string, TemizlikCatDef> = {};
  for (const [k, def] of Object.entries(katalogHarita)) if (def.item === item) harita[k] = def;
  return kategorileriUret(katalog as KatalogUrun[], harita);
}

// Temizlik & Kağıt grubu kategorileri (yalnızca Türk markaları)
export function temizlikKategorileri(): ProductCategory[] {
  return kategorileriUret(temizlikKatalog as KatalogUrun[], temizlikHarita);
}

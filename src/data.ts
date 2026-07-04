import { RobuxOption, FAQItem, Testimonial, Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "robux-instan",
    name: "Robux Instan (Via Login)",
    category: "Robux",
    description: "Proses cepat via Login akun Roblox Anda. Robux langsung masuk dan siap digunakan tanpa masa tunggu pending.",
    image: "/public/img/robux_instan_cover_1783175145850.jpg",
    tag: "Terlaris",
    startingPrice: "Rp 17.500"
  },
  {
    id: "robux-gamepass",
    name: "Robux Gamepass (Tanpa Login)",
    category: "Robux",
    description: "Proses aman tanpa password menggunakan tautan Gamepass. Robux utuh bersih dengan masa pending 5-7 hari resmi Roblox.",
    image: "/public/img/robux_gamepass_cover_1783175160771.jpg",
    tag: "Terpopuler",
    startingPrice: "Rp 7.100"
  }
];

export const ROBUX_INSTAN_OPTIONS: RobuxOption[] = [
  { id: "ri100", amount: 100, priceIdr: 17500, originalPriceIdr: 22000 },
  { id: "ri200", amount: 200, priceIdr: 34000, originalPriceIdr: 42000 },
  { id: "ri500", amount: 500, priceIdr: 82000, originalPriceIdr: 100000, isPopular: true },
  { id: "ri1000", amount: 1000, priceIdr: 160000, originalPriceIdr: 190000 },
  { id: "ri2000", amount: 2000, priceIdr: 310000, originalPriceIdr: 360000 },
  { id: "ri5000", amount: 5000, priceIdr: 760000, originalPriceIdr: 880000 }
];

export const ROBUX_GAMEPASS_OPTIONS: RobuxOption[] = [
  { id: "rg50", amount: 50, priceIdr: 7100, originalPriceIdr: 9000 },
  { id: "rg80", amount: 80, priceIdr: 12000, originalPriceIdr: 15000 },
  { id: "rg160", amount: 160, priceIdr: 23000, originalPriceIdr: 28000 },
  { id: "rg240", amount: 240, priceIdr: 34000, originalPriceIdr: 40000 },
  { id: "rg400", amount: 400, priceIdr: 55000, originalPriceIdr: 65000 },
  { id: "rg800", amount: 800, priceIdr: 108000, originalPriceIdr: 125000, isPopular: true },
  { id: "rg1700", amount: 1700, priceIdr: 225000, originalPriceIdr: 250000 },
  { id: "rg4500", amount: 4500, priceIdr: 585000, originalPriceIdr: 650000 },
  { id: "rg10000", amount: 10000, priceIdr: 1250000, originalPriceIdr: 1400000 }
];

export const ROBUX_OPTIONS = ROBUX_GAMEPASS_OPTIONS;

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Apa itu TopBux?",
    answer: "TopBux adalah platform penyedia layanan Top Up Robux Roblox legal dan terpercaya khusus untuk pemain di Indonesia. Kami menggunakan metode transfer via Gamepass yang aman, cepat, dan legal tanpa membahayakan akun Roblox Anda."
  },
  {
    id: "faq-2",
    question: "Apakah top up di TopBux aman?",
    answer: "100% Aman! Kami tidak meminta password akun Roblox Anda. Transaksi diproses murni melalui tautan Gamepass dari place atau game milik akun Anda sendiri, sehingga terhindar dari risiko banned."
  },
  {
    id: "faq-3",
    question: "Berapa lama proses pengiriman Robux?",
    answer: "Setelah pembayaran dikonfirmasi oleh Admin kami, proses pengerjaan Gamepass instan dilakukan dalam waktu 5-15 menit. Berdasarkan sistem Roblox, Robux yang masuk via Gamepass memerlukan waktu pending (pending Robux) selama 5-7 hari sebelum siap digunakan di akun Anda. Anda bisa memantau status pending langsung di halaman transaksi Roblox resmi."
  },
  {
    id: "faq-4",
    question: "Apakah perlu memasukkan password akun Roblox?",
    answer: "Tidak perlu sama sekali! Kami hanya membutuhkan Username Roblox dan link Gamepass yang valid dari akun Anda. Jangan pernah memberikan password akun Anda kepada siapapun demi keamanan."
  },
  {
    id: "faq-5",
    question: "Bagaimana jika tautan Gamepass saya tidak valid?",
    answer: "Tenang saja! Admin responsif kami akan memandu Anda melalui WhatsApp langkah demi langkah untuk membuat dan mengonfigurasi Gamepass Anda dengan benar agar transaksi dapat segera diselesaikan."
  },
  {
    id: "faq-6",
    question: "Bagaimana cara menghubungi admin jika ada kendala?",
    answer: "Anda dapat menghubungi kami langsung melalui tombol Hubungi Admin atau ikon WhatsApp di sudut bawah halaman. Kami aktif melayani setiap hari dari jam 08:00 sampai 22:00 WIB."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Setyo Nugroho",
    username: "SetyoRobloxian",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    comment: "Beli Robux di sini gampang banget, admin ramah dibantu diajarin cara buat gamepass-nya karena awalnya bingung. Mantap TopBux!",
    date: "Hari ini",
    robuxBought: 800
  },
  {
    id: "t2",
    name: "Rizky Fauzi",
    username: "Rizky_Gamerz",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    comment: "Pelayanan sangat cepat, setelah transfer langsung diproses. Menunggu pending Robux masuk dan sekarang sudah bisa dipake beli outfit!",
    date: "Kemarin",
    robuxBought: 1700
  },
  {
    id: "t3",
    name: "Amanda Lestari",
    username: "MandaChic",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    comment: "Awalnya ragu tapi ternyata beneran aman dan terpercaya. Harganya paling murah dibandingkan toko sebelah, adminnya juga fast response.",
    date: "2 hari yang lalu",
    robuxBought: 400
  },
  {
    id: "t4",
    name: "Budi Santoso",
    username: "Budi_RobloxDad",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    comment: "Beliin buat anak saya yang main Roblox. Prosesnya aman tanpa perlu login akun anak saya. Sangat recommended untuk para orang tua.",
    date: "3 hari yang lalu",
    robuxBought: 4500
  },
  {
    id: "t5",
    name: "Kevin Wijaya",
    username: "KevvPro",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    comment: "Langganan beli di sini terus buat kebutuhan club Roblox. Gak pernah ngecewain. Gak usah ragu guys!",
    date: "5 hari yang lalu",
    robuxBought: 10000
  }
];

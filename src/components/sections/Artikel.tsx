import { AlertTriangle, ArrowRight, BookOpen, Calendar, CheckCircle, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export interface ArticleSection {
  type: "paragraph" | "heading" | "list" | "warning";
  text: string;
  items?: string[];
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
  sections: ArticleSection[];
}

const ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Tips Aman Transaksi Robux Tanpa Takut Kena Banned Akun",
    summary: "Banyak pengguna khawatir akun mereka ditangguhkan saat membeli Robux. Simak panduan lengkap metode Gamepass resmi yang aman 100% dari Admin Tofav.",
    category: "Keamanan",
    date: "04 Jul 2026",
    author: "Admin Tofav",
    image: "/img/hero_anime_nami_1783176024312.jpg",
    readTime: "5 Menit Baca",
    sections: [
      {
        type: "heading",
        text: "Mengapa Keamanan Akun Roblox Sangat Penting?"
      },
      {
        type: "paragraph",
        text: "Sebagai pemain setia Roblox, memiliki jumlah Robux yang melimpah tentu menjadi impian semua orang untuk membeli gamepass, item kosmetik avatar, dan paket premium. Namun, maraknya situs penjual Robux tidak resmi dan ilegal yang menawarkan harga tidak masuk akal sering kali berujung pada penangguhan akun (banned) secara permanen oleh pihak Roblox."
      },
      {
        type: "warning",
        text: "Waspada terhadap modus 'Robux Generator' atau penawaran harga murah yang meminta data sensitif seperti password akun Anda, email, atau meminta Anda menjalankan script tertentu. Ini adalah penipuan phishing yang bertujuan mencuri akun Roblox Anda!"
      },
      {
        type: "heading",
        text: "Tips Transaksi Robux Aman 100% dari Admin Tofav"
      },
      {
        type: "list",
        text: "Berikut beberapa panduan praktis untuk memastikan akun Anda tetap aman:",
        items: [
          "Gunakan Metode Gamepass Resmi: Metode ini memanfaatkan fitur resmi Roblox Developer Creator Dashboard. Penjual membeli Gamepass yang Anda buat, sehingga Robux ditransfer secara legal melalui sistem ekonomi resmi Roblox tanpa perlu membagikan data login.",
          "Jangan Pernah Bagikan Password atau Cookie .ROBLOSECURITY: Admin resmi TopBux tidak akan pernah meminta data pribadi ini. Seluruh panduan hanya dilakukan melalui sistem website dan WhatsApp Admin resmi.",
          "Pilih Toko yang Memiliki Rekam Jejak Jelas: Cari toko dengan ulasan nyata dan transparan yang didukung oleh layanan CS responsif seperti TopBux, di mana semua status pesanan dipantau secara real-time."
        ]
      },
      {
        type: "heading",
        text: "Kesimpulan"
      },
      {
        type: "paragraph",
        text: "Keamanan akun Anda adalah tanggung jawab utama. Dengan menggunakan metode transfer Gamepass di TopBux, Anda bisa bermain dengan tenang tanpa takut risiko suspend. Top up cerdas, bermain aman!"
      }
    ]
  },
  {
    id: "art-2",
    title: "Kenapa Harus Robux Gamepass? Ini Kelebihan & Kekurangannya",
    summary: "Mengenal perbedaan mendalam antara Robux Instan via login dengan Robux Gamepass via link. Ketahui mana pilihan terbaik untuk kebutuhan gaming Anda.",
    category: "Panduan",
    date: "02 Jul 2026",
    author: "Admin Tofav",
    image: "/img/hero_anime_nami_1783176024312.jpg",
    readTime: "4 Menit Baca",
    sections: [
      {
        type: "heading",
        text: "Memahami Metode Pembelian Robux"
      },
      {
        type: "paragraph",
        text: "Roblox menyediakan beberapa cara untuk mendapatkan mata uang virtual Robux, di antaranya adalah Robux Instan (via login) dan Robux Gamepass (via tautan link gamepass). Banyak pemain pemula bingung memilih mana metode yang terbaik untuk mereka. Berikut adalah ulasan mendalam tentang Robux Gamepass."
      },
      {
        type: "heading",
        text: "Kelebihan Utama Robux Gamepass"
      },
      {
        type: "list",
        text: "Mengapa banyak pemain profesional merekomendasikan metode ini?",
        items: [
          "Tanpa Data Login (100% Aman Privasi): Anda tidak perlu memberikan username dan password akun Roblox Anda. Cukup buat gamepass di dashboard creator Anda lalu masukkan tautannya di form pembelian.",
          "Legal & Sesuai Aturan Roblox: Transaksi terjadi melalui ekosistem transaksi developer resmi Roblox, sehingga bebas dari risiko banned akun.",
          "Bisa Diproses Kapan Saja: Admin dapat langsung membeli gamepass Anda tanpa perlu mengantre login ke dalam akun Anda secara manual."
        ]
      },
      {
        type: "heading",
        text: "Kekurangan Robux Gamepass yang Perlu Diketahui"
      },
      {
        type: "list",
        text: "Ada beberapa hal teknis yang perlu Anda pahami saat membeli Robux Gamepass:",
        items: [
          "Ada Waktu Pending (Penahanan) 5 Hari: Sesuai dengan kebijakan keuangan Roblox (Roblox pending funds policy), setiap hasil penjualan Gamepass akan ditahan oleh sistem selama 5-7 hari sebelum dicairkan menjadi saldo aktif di akun Anda. Ini adalah regulasi resmi dari Roblox, bukan dari toko kami.",
          "Pajak Transaksi Roblox 30%: Roblox memotong 30% dari setiap penjualan gamepass. Namun, di TopBux, sistem kalkulator kami akan otomatis memandu Anda menentukan harga agar nominal bersih yang Anda terima tetap sesuai pesanan."
        ]
      },
      {
        type: "heading",
        text: "Mana yang Harus Anda Pilih?"
      },
      {
        type: "paragraph",
        text: "Jika keamanan privasi akun Anda adalah prioritas nomor satu, maka metode Robux Gamepass adalah opsi mutlak yang paling direkomendasikan. TopBux memastikan proses pembelian Gamepass Anda berlangsung dalam waktu 5-15 menit setelah pembayaran dikonfirmasi."
      }
    ]
  },
  {
    id: "art-3",
    title: "Cara Membuat Gamepass Roblox Sendiri di HP/PC dengan Mudah",
    summary: "Tutorial bergambar langkah demi langkah membuat gamepass atau place Roblox dari dashboard creator agar bisa langsung menerima kiriman Robux dengan cepat.",
    category: "Tutorial",
    date: "28 Jun 2026",
    author: "Admin Tofav",
    image: "/img/hero_anime_nami_1783176024312.jpg",
    readTime: "6 Menit Baca",
    sections: [
      {
        type: "heading",
        text: "Langkah Awal Menjadi Creator Roblox"
      },
      {
        type: "paragraph",
        text: "Untuk menerima transfer Robux melalui metode Gamepass, Anda harus memiliki minimal satu gamepass aktif di akun Roblox Anda. Banyak pengguna berpikir ini sulit dan memerlukan PC canggih, padahal Anda bisa membuatnya dengan sangat mudah baik melalui browser HP maupun komputer."
      },
      {
        type: "heading",
        text: "Panduan Langkah demi Langkah"
      },
      {
        type: "list",
        text: "Ikuti langkah mudah di bawah ini untuk membuat Gamepass pertama Anda:",
        items: [
          "Buka Dashboard Roblox Creator: Kunjungi situs resmi https://create.roblox.com melalui browser Anda dan login menggunakan akun Roblox aktif Anda.",
          "Pilih Experience / Place Anda: Secara default, setiap akun Roblox baru otomatis mendapatkan satu place publik gratis bernama '[Username]'s Place'. Klik place tersebut untuk masuk ke pengaturannya.",
          "Masuk ke Menu Associated Items / Passes: Di menu navigasi samping (klik ikon bar tiga di pojok kiri atas jika di HP), pilih 'Associated Items', lalu klik tab 'Passes'.",
          "Buat Gamepass Baru: Klik tombol 'Create a Pass'. Unggah gambar bebas apa saja, berikan nama yang unik (misal: 'Donasi TopBux'), lalu klik 'Create Pass'.",
          "Atur Harga Penjualan (Set Price): Klik gamepass yang baru dibuat, buka menu navigasi samping, klik 'Sales'. Aktifkan opsi 'Item for Sale', lalu masukkan harga sesuai petunjuk di website TopBux. Klik 'Save Changes'.",
          "Salin Link Gamepass: Buka halaman gamepass tersebut di Roblox, salin tautan URL lengkapnya (contoh: https://www.roblox.com/game-pass/...), lalu masukkan ke form pemesanan kami."
        ]
      },
      {
        type: "heading",
        text: "Selesai & Siap Di-Top Up!"
      },
      {
        type: "paragraph",
        text: "Dengan menyelesaikan langkah-langkah di atas, Anda sekarang siap melakukan top up Robux aman di TopBux kapan saja secara instan. Selamat mencoba dan happy gaming!"
      }
    ]
  }
];

export default function Artikel() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <section id="artikel" className="py-10 bg-white border-y border-slate-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#2563EB] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-blue-100">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Edukasi & Tips Roblox</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            Artikel & Tips Terbaru dari Admin Tofav
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-sans leading-relaxed">
            Dapatkan informasi terpercaya seputar tips bermain Roblox, panduan membuat gamepass, keamanan akun, dan update harga Robux termurah hanya di TopBux.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group cursor-pointer"
              onClick={() => openArticle(article)}
            >
              {/* Image Container with Hover Effect */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-[#2563EB] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                  {article.category}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4 text-left">
                <div className="space-y-2.5">
                  <div className="flex items-center text-[11px] text-slate-400 font-medium space-x-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#2563EB]" />
                      {article.author}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-semibold text-slate-400 font-mono">
                    {article.readTime}
                  </span>
                  <button className="text-xs font-bold text-[#2563EB] hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer group-hover:translate-x-1 duration-200">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Detail Reader Modal Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col text-left"
            >
              {/* Modal Header bar */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                  <span className="bg-[#2563EB] text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                    {selectedArticle.category}
                  </span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <button
                  onClick={closeArticle}
                  className="p-1.5 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                  aria-label="Tutup Artikel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body Content */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                
                {/* Visual Image Banner */}
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent flex items-end p-6">
                    <h1 className="font-heading font-black text-lg sm:text-2xl text-white tracking-tight leading-tight">
                      {selectedArticle.title}
                    </h1>
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold border-b border-slate-100 pb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedArticle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#2563EB]" />
                    Diposting oleh {selectedArticle.author}
                  </span>
                </div>

                {/* Structured Rich Body content (SEO Optimised) */}
                <div className="space-y-5 font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedArticle.sections.map((sec, sIdx) => {
                    switch (sec.type) {
                      case "heading":
                        return (
                          <h3 key={sIdx} className="font-heading font-extrabold text-base sm:text-lg text-slate-900 pt-3 flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-[#2563EB] rounded-full shrink-0" />
                            {sec.text}
                          </h3>
                        );
                      case "warning":
                        return (
                          <div key={sIdx} className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">{sec.text}</span>
                          </div>
                        );
                      case "list":
                        return (
                          <div key={sIdx} className="space-y-3">
                            {sec.text && <p className="font-medium text-slate-800">{sec.text}</p>}
                            <ul className="space-y-2.5 pl-1.5">
                              {sec.items?.map((item, iIdx) => (
                                <li key={iIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600">
                                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span className="font-medium leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      case "paragraph":
                      default:
                        return (
                          <p key={sIdx} className="font-sans leading-relaxed text-slate-600 text-xs sm:text-sm">
                            {sec.text}
                          </p>
                        );
                    }
                  })}
                </div>

                {/* Internal SEO Tag badges */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full">#RobuxMurah</span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full">#RobuxGamepass</span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full">#KeamananRoblox</span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full">#TopUpRoblox</span>
                </div>

              </div>

              {/* Modal Footer bar */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button
                  onClick={closeArticle}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-xl text-xs sm:text-sm shadow-md shadow-blue-500/10 cursor-pointer transition-colors"
                >
                  Selesai Membaca
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

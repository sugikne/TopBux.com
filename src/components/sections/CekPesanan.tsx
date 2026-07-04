import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, ShieldCheck, Calendar, Phone, ArrowRight, HelpCircle, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface SavedOrder {
  id: string;
  name: string;
  username: string;
  whatsappNumber: string;
  nominalRobux: number;
  productType: string;
  priceIdr: number;
  status: "Diproses" | "Pending" | "Selesai";
  date: string;
}

// Initial seed orders so the user can search immediately with these usernames!
const SEED_ORDERS: SavedOrder[] = [
  {
    id: "TBX-91823",
    name: "Setyo Nugroho",
    username: "SetyoRobloxian",
    whatsappNumber: "085333049716",
    nominalRobux: 800,
    productType: "Robux Gamepass",
    priceIdr: 108000,
    status: "Selesai",
    date: "04 Jul 2026"
  },
  {
    id: "TBX-48102",
    name: "Rizky Fauzi",
    username: "Rizky_Gamerz",
    whatsappNumber: "08123456789",
    nominalRobux: 1700,
    productType: "Robux Gamepass",
    priceIdr: 225000,
    status: "Diproses",
    date: "04 Jul 2026"
  },
  {
    id: "TBX-29481",
    name: "Amanda Lestari",
    username: "MandaChic",
    whatsappNumber: "08234567890",
    nominalRobux: 400,
    productType: "Robux Instan",
    priceIdr: 65000,
    status: "Pending",
    date: "03 Jul 2026"
  }
];

export default function CekPesanan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SavedOrder[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setErrorMsg("Silakan masukkan Username Roblox atau Nomor WhatsApp Anda");
      return;
    }

    // Load actual orders from local storage
    const stored = localStorage.getItem("topbux_orders");
    let allOrders: SavedOrder[] = [...SEED_ORDERS];
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SavedOrder[];
        // Merge user placed orders at the top of seed orders
        allOrders = [...parsed, ...SEED_ORDERS];
      } catch (err) {
        console.error("Error parsing stored orders:", err);
      }
    }

    // Filter matching searchQuery
    const matches = allOrders.filter(
      (order) =>
        order.username.toLowerCase().includes(query) ||
        order.whatsappNumber.includes(query) ||
        order.id.toLowerCase().includes(query)
    );

    setSearchResults(matches);
    setHasSearched(true);
  };

  const getStatusBadge = (status: "Diproses" | "Pending" | "Selesai") => {
    switch (status) {
      case "Selesai":
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
            <CheckCircle2 className="w-3.5 h-3.5 fill-blue-50 text-blue-600" />
            Selesai
          </span>
        );
      case "Diproses":
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-[#2563EB] px-3 py-1 rounded-full text-xs font-bold border border-blue-100 animate-pulse">
            <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
            Sedang Diproses
          </span>
        );
      case "Pending":
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            Menunggu Pembayaran / Pending
          </span>
        );
    }
  };

  return (
    <section id="cek-pesanan" className="py-10 bg-[#F8FAFC] border-y border-slate-100 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title Block */}
        <div className="text-center mb-6 space-y-3">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Cek Pesanan
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-sans max-w-xl mx-auto leading-relaxed">
            Masukkan nomor pesananmu untuk melihat status terkini.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="block text-sm font-extrabold text-slate-700">
                Nomor Pesanan / Username Roblox
              </label>
              
              <div className="flex gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    placeholder="TG-20240601-0001 atau SetyoRobloxian"
                    className="w-full bg-white border border-slate-200 px-4 py-3.5 rounded-2xl text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all font-semibold text-slate-800"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold p-3.5 sm:p-4 rounded-2xl transition-all shadow-md shadow-blue-500/15 flex items-center justify-center shrink-0 w-12 h-12 sm:w-14 sm:h-14 cursor-pointer active:scale-95"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 font-semibold flex items-center gap-1.5 pl-2 animate-fade-in text-left">
                <AlertCircle className="w-4 h-4" />
                {errorMsg}
              </p>
            )}

            {/* Bottom shop redirection link */}
            <div className="pt-2 text-left">
              <p className="text-sm text-slate-500 font-medium">
                Belum ada pesanan?{" "}
                <span
                  onClick={() => {
                    // Navigate to product listing
                    const el = document.getElementById("produk");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.location.reload();
                    }
                  }}
                  className="text-[#2563EB] hover:text-blue-700 font-extrabold underline cursor-pointer transition-colors"
                >
                  Belanja dulu di sini
                </span>
              </p>
            </div>
          </form>

          {/* Quick suggestions helpers */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span className="text-xs text-slate-400 font-bold">Cobain username demo:</span>
            <button 
              onClick={() => { setSearchQuery("SetyoRobloxian"); setHasSearched(false); }}
              className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-3 py-1.5 rounded-xl transition-colors border border-slate-150"
            >
              SetyoRobloxian
            </button>
            <button 
              onClick={() => { setSearchQuery("Rizky_Gamerz"); setHasSearched(false); }}
              className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-3 py-1.5 rounded-xl transition-colors border border-slate-150"
            >
              Rizky_Gamerz
            </button>
            <button 
              onClick={() => { setSearchQuery("MandaChic"); setHasSearched(false); }}
              className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-3 py-1.5 rounded-xl transition-colors border border-slate-150"
            >
              MandaChic
            </button>
          </div>
        </div>

        {/* Search Results Drawer */}
        <AnimatePresence>
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-8 space-y-4"
            >
              {searchResults.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3">
                  <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-slate-800">
                    Pesanan Tidak Ditemukan
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-sans">
                    Username atau nomor WhatsApp <span className="font-semibold text-slate-700">"{searchQuery}"</span> belum terdaftar di pesanan baru kami. Pastikan Anda sudah checkout via WhatsApp terlebih dahulu.
                  </p>
                  <button 
                    onClick={() => {
                      const topupSec = document.getElementById("topup");
                      if (topupSec) topupSec.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs text-[#2563EB] font-bold hover:underline cursor-pointer inline-block pt-1"
                  >
                    Lakukan Pemesanan Baru &rarr;
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-heading font-extrabold text-sm text-slate-500 px-2 uppercase tracking-wider">
                    Ditemukan {searchResults.length} Transaksi Terkait
                  </h3>
                  
                  {searchResults.map((order) => (
                    <motion.div
                      key={order.id}
                      className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm p-5 sm:p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200">
                            {order.id}
                          </span>
                          <h4 className="font-heading font-extrabold text-slate-800 text-base mt-2 flex items-center gap-1.5">
                            <span>{order.username}</span>
                            <span className="text-xs text-slate-400 font-normal">({order.name})</span>
                          </h4>
                        </div>
                        <div className="shrink-0">
                          {getStatusBadge(order.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Tipe Produk</p>
                          <p className="text-xs font-bold text-slate-700 mt-1">{order.productType}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Jumlah Robux</p>
                          <p className="text-xs font-extrabold text-slate-800 mt-1">{order.nominalRobux} R$</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Total Harga</p>
                          <p className="text-xs font-extrabold text-[#2563EB] mt-1">Rp {order.priceIdr.toLocaleString("id-ID")}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Tanggal</p>
                          <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-300" />
                            {order.date}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
                          <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                          <span>Garansi Legal & Diproses Cepat</span>
                        </div>
                        
                        <a
                          href={`https://wa.me/6285333049716?text=Halo%20Admin%20Tofav%2C%20saya%20ingin%20bertanya%20mengenai%20status%20transaksi%20saya%20dengan%20ID%20${order.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-[#2563EB] hover:text-blue-700 transition-colors flex items-center gap-1.5 border border-blue-100 hover:bg-blue-50 bg-white px-3.5 py-2 rounded-xl cursor-pointer shadow-sm self-end sm:self-auto"
                        >
                          <Phone className="w-3.5 h-3.5 fill-blue-50 text-[#2563EB]" />
                          <span>Hubungi Admin WA</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

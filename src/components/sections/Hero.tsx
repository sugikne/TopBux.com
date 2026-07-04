import { motion } from "motion/react";
import { Shield, Sparkles, Send, Zap, Users, Play } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="home" className="relative pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden bg-[#F8FAFC]">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/5 to-brand-primary/5 rounded-full blur-3xl -z-10 -mr-40 -mt-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-50 text-[#2563EB] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-blue-100"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>⚡ Proses Instan via Gamepass</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1]">
                Top Up Robux <br className="hidden sm:inline" />
                <span className="text-[#2563EB]">
                  Aman & Instan.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Beli Robux Roblox via Gamepass dengan proses cepat, harga kompetitif, dan pelayanan ramah. Cukup isi data, kirim pesanan melalui WhatsApp, lalu Robux akan segera diproses.
              </p>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => onNavigate("topup")}
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-blue-500/10 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                Top Up Sekarang
              </button>
              <a
                href="https://wa.me/6285333049716"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold py-3.5 px-8 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                Hubungi Admin
              </a>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 max-w-md mx-auto lg:mx-0"
            >
              <div>
                <p className="font-heading font-extrabold text-2xl text-slate-900">5 Mins</p>
                <p className="text-xs text-slate-500">Rata-rata Proses</p>
              </div>
              <div className="border-x border-slate-100 px-4">
                <p className="font-heading font-extrabold text-2xl text-slate-900">10k+</p>
                <p className="text-xs text-slate-500">Pelanggan Puas</p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-2xl text-slate-900">100%</p>
                <p className="text-xs text-slate-500">Legal & Garansi</p>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Image - Hidden on Mobile, Shown on Desktop */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full max-w-[340px]  mx-auto lg:ml-auto group"
            >
              <motion.img 
                src="/public/img/1.png" 
                alt="TopBux Anime Nami Gamer" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Small floating badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/50 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-extrabold text-[#2563EB] tracking-wider uppercase">Proses Kilat</span>
                  <h4 className="font-heading font-black text-xs text-slate-800">Robux & Gamepass</h4>
                </div>
                <div className="bg-[#2563EB] text-white p-1.5 rounded-lg shrink-0">
                  <Shield className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

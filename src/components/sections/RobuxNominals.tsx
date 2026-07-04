import { motion } from "motion/react";
import { ROBUX_INSTAN_OPTIONS, ROBUX_GAMEPASS_OPTIONS } from "../../data";
import { RobuxOption } from "../../types";
import { Check, Sparkles, Shield, Clock } from "lucide-react";

interface RobuxNominalsProps {
  selectedProductId: string;
  selectedNominal: number | null;
  onSelectNominal: (option: RobuxOption) => void;
}

export default function RobuxNominals({
  selectedProductId,
  selectedNominal,
  onSelectNominal,
}: RobuxNominalsProps) {
  const isInstant = selectedProductId === "robux-instan";
  const options = isInstant ? ROBUX_INSTAN_OPTIONS : ROBUX_GAMEPASS_OPTIONS;

  // Load custom pricing ratios dynamically
  const instanRatio = Number(localStorage.getItem("topbux_ratio_instan") || "175");
  const gamepassRatio = Number(localStorage.getItem("topbux_ratio_gamepass") || "135");
  const currentRatio = isInstant ? instanRatio : gamepassRatio;
  const hasCustomRatio = !!(localStorage.getItem("topbux_ratio_instan") || localStorage.getItem("topbux_ratio_gamepass"));

  return (
    <section id="nominals" className="py-20 bg-slate-50/50 border-t border-slate-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#2563EB] font-bold text-xs tracking-widest uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Daftar Paket {isInstant ? "Robux Instan" : "Robux Gamepass"}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Pilih Nominal {isInstant ? "Instan (Via Login)" : "Gamepass (Tanpa Login)"}
          </h2>
          <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
            {isInstant 
              ? "Proses cepat via login akun Roblox. Robux langsung masuk dan bisa segera digunakan untuk belanja di game favorit Anda."
              : "Proses aman tanpa password via Gamepass Link. Memerlukan waktu pending 5 hari sebelum masuk sepenuhnya ke saldo Anda."
            }
          </p>
        </div>

        {/* Nominals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {options.map((option, index) => {
            const isSelected = selectedNominal === option.amount;
            
            // Apply dynamic prices if ratios exist in admin settings
            const priceIdr = hasCustomRatio ? (option.amount * currentRatio) : option.priceIdr;
            const originalPriceIdr = hasCustomRatio ? Math.round(priceIdr * 1.25) : option.originalPriceIdr;

            const discountPercentage = originalPriceIdr
              ? Math.round(
                  ((originalPriceIdr - priceIdr) /
                    originalPriceIdr) *
                    100
                )
              : 0;

            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => onSelectNominal({ ...option, priceIdr, originalPriceIdr })}
                className={`group relative rounded-xl p-4 border text-left cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-[#2563EB] bg-blue-50/10 shadow-sm ring-1 ring-[#2563EB]"
                    : "border-slate-200 hover:border-slate-300 bg-white hover:shadow-sm"
                }`}
              >
                {/* Popular badge */}
                {option.isPopular && (
                  <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 bg-[#2563EB] text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
                    <Sparkles className="w-2.5 h-2.5 fill-white" />
                    Terpopuler
                  </span>
                )}

                {/* Discount badge */}
                {discountPercentage > 0 && (
                  <span className="absolute top-3 right-3 bg-red-50 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded-md border border-red-100">
                    -{discountPercentage}%
                  </span>
                )}

                {/* Card Header Content */}
                <div className="flex items-center space-x-2.5 mb-4">
                  {/* Roblox styled Tilt Square */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transform rotate-12 transition-transform duration-300 group-hover:rotate-6 ${
                    isSelected ? "bg-[#2563EB] text-white" : "bg-slate-100 text-slate-700"
                  }`}>
                    <div className={`w-3 h-3 transform rotate-12 ${
                      isSelected ? "bg-slate-900" : "bg-slate-500"
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-tight">
                      {option.amount.toLocaleString("id-ID")}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium -mt-0.5">Robux R$</p>
                  </div>
                </div>

                {/* Pricing Block */}
                <div className="space-y-0.5 mb-4">
                  {originalPriceIdr && (
                    <p className="text-[10px] text-slate-400 line-through">
                      Rp {originalPriceIdr.toLocaleString("id-ID")}
                    </p>
                  )}
                  <p className="font-heading font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                    Rp {priceIdr.toLocaleString("id-ID")}
                  </p>
                  <p className="text-[9px] text-slate-400 font-medium">Harga Net / Pas</p>
                </div>

                {/* Selection button/indicator */}
                <div className="pt-1">
                  {isSelected ? (
                    <button className="w-full bg-[#2563EB] text-white text-[11px] font-bold py-1.5 px-3 rounded-full flex items-center justify-center gap-1 transition-all">
                      <Check className="w-3.5 h-3.5" />
                      Terpilih
                    </button>
                  ) : (
                    <button className="w-full bg-slate-50 group-hover:bg-[#2563EB] group-hover:text-white text-slate-600 text-[11px] font-bold py-1.5 px-3 rounded-full transition-all flex items-center justify-center">
                      Pilih Nominal
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Informative Disclaimer */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 max-w-4xl mx-auto flex items-start space-x-3.5 shadow-sm">
          {isInstant ? (
            <>
              <Shield className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900">Jaminan Keamanan Login:</span> Akun Anda dijamin <span className="font-bold text-[#2563EB]">100% aman</span>. Password hanya digunakan sekali oleh Admin untuk memproses top up secara legal dan langsung dihapus setelah transaksi selesai. Sangat disarankan untuk mengubah password setelah transaksi berhasil demi kenyamanan bersama.
              </div>
            </>
          ) : (
            <>
              <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900">Info Kurs & Pending Roblox:</span> Roblox mengenakan pajak sebesar <span className="font-bold text-slate-900">30%</span> pada setiap transaksi Gamepass. Harga di atas sudah mencakup pajak tersebut, sehingga Robux yang Anda terima akan <span className="font-bold text-[#2563EB]">utuh bersih</span>. Robux akan berstatus <span className="font-semibold">pending selama 5-7 hari</span> sebelum masuk saldo utama (aturan resmi Roblox).
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { ShoppingCart, MessageSquare, PackageCheck, ChevronRight } from "lucide-react";

export default function HowToBuy() {
  const steps = [
    {
      num: 1,
      title: "Pesan Produk",
      desc: "Pilih produk Robux dan isi data akun Roblox kamu.",
      icon: ShoppingCart,
    },
    {
      num: 2,
      title: "Bayar via WA",
      desc: "Lanjut ke WhatsApp admin & kirim bukti transfer.",
      icon: MessageSquare,
    },
    {
      num: 3,
      title: "Item Terkirim",
      desc: "Robux masuk ke akunmu. Selesai & happy gaming!",
      icon: PackageCheck,
    },
  ];

  return (
    <section id="carabeli" className="py-10 bg-slate-50/35 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center">
            <span className="bg-blue-50 text-[#2563EB] font-bold text-xs px-4 py-1.5 rounded-full border border-blue-100 uppercase tracking-wide">
              Mudah & Cepat
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Cara Beli Robux di TopBux
          </h2>
          <p className="font-sans text-slate-500 text-sm sm:text-base">
            Cuma 3 langkah gampang & cepat.
          </p>
        </div>

        {/* Steps Flow Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex flex-col lg:flex-row items-center w-full lg:w-auto flex-1">
                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center flex flex-col items-center justify-center flex-grow w-full min-h-[220px] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Icon Block with offset number badge */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/15">
                      <Icon className="w-7 h-7" />
                    </div>
                    {/* Number Badge */}
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-slate-950 text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {step.num}
                    </span>
                  </div>

                  {/* Step Info */}
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Arrow Connector between steps */}
                {index < steps.length - 1 && (
                  <div className="flex items-center justify-center py-4 lg:py-0 lg:px-4 text-blue-300 shrink-0">
                    <ChevronRight className="w-6 h-6 rotate-90 lg:rotate-0" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

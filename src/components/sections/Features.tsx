import { motion } from "motion/react";
import { Zap, Shield, Package, Users } from "lucide-react";

export default function Features() {
  const stats = [
    {
      title: "Kilat",
      subtitle: "Proses Cepat",
      icon: Zap,
      iconBg: "bg-amber-100 text-amber-600",
    },
    {
      title: "100%",
      subtitle: "Aman & Terpercaya",
      icon: Shield,
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "1.000+",
      subtitle: "Pesanan Selesai",
      icon: Package,
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      title: "500+",
      subtitle: "Pelanggan Puas",
      icon: Users,
      iconBg: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section id="features" className="py-6 sm:py-8 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white px-6 py-5 rounded-2xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:border-slate-300 hover:shadow-md transition-all duration-300"
              >
                {/* Icon Container with custom bg */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                  <Icon className="w-5 h-5 fill-current" />
                </div>
                
                {/* Title and Subtitle */}
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
                    {stat.title}
                  </span>
                  <span className="font-sans text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                    {stat.subtitle}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


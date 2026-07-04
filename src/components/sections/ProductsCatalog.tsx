import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Product } from "../../types";
import { PRODUCTS } from "../../data";

interface ProductsCatalogProps {
  selectedProductId: string;
  onSelectProduct: (productId: string) => void;
}

export default function ProductsCatalog({
  selectedProductId,
  onSelectProduct,
}: ProductsCatalogProps) {
  // Filter products by category (only Robux products)
  const robuxProducts = PRODUCTS.filter((p) => p.category === "Robux");

  return (
    <section id="produk" className="py-10 bg-white border-y border-slate-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            Daftar Harga Robux Termurah
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-sans leading-relaxed">
            Top up <span className="font-semibold text-slate-800">Robux Roblox</span> via Login & via Gamepass. Proses cepat, aman, dilayani admin resmi. Pilih produk untuk lihat paket & harga, atau baca dulu <span className="text-[#2563EB] font-medium hover:underline cursor-pointer">cara pemesanan</span> dan <span className="text-[#2563EB] font-medium hover:underline cursor-pointer">tips Roblox</span>.
          </p>
        </div>

        {/* ROBUS CATEGORY */}
        <div>
          <div className="flex items-center space-x-2.5 mb-6">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h3 className="font-heading font-extrabold text-xl text-slate-900 tracking-tight">
              Pilihan Paket Robux
            </h3>
            <span className="text-xs text-slate-400 font-medium mt-1">
              {robuxProducts.length} tipe produk
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl gap-6">
            {robuxProducts.map((product) => {
              const isSelected = selectedProductId === product.id;
              return (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => onSelectProduct(product.id)}
                  className={`group bg-white rounded-2xl border text-left cursor-pointer transition-all duration-300 overflow-hidden flex flex-col h-full ${
                    isSelected
                      ? "border-[#2563EB] ring-2 ring-[#2563EB]/10 shadow-md"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  {/* Image container */}
                  <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {product.tag && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-[#2563EB] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">
                        <Sparkles className="w-2.5 h-2.5 fill-white" />
                        {product.tag}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div className="space-y-2">
                      <h4 className="font-heading font-extrabold text-base text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Mulai</span>
                      <span className="font-heading font-extrabold text-sm text-[#2563EB]">
                        {product.startingPrice}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

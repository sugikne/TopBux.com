import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../../data";
import { Star, ChevronLeft, ChevronRight, Quote, ShoppingBag } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
        ),
      4500
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimoni" className="py-10 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <span className="text-[#2563EB] font-bold text-xs tracking-widest uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Testimoni Pembeli
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Apa Kata Mereka?
          </h2>
          <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
            Lebih dari ribuan transaksi diproses secara aman. Berikut adalah ulasan nyata dari para pelanggan setia TopBux.
          </p>
        </div>

        {/* Carousel Slider Block */}
        <div className="relative max-w-3xl mx-auto">
          
          {/* Main Slider Container */}
          <div className="overflow-hidden min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {TESTIMONIALS.map((testi, idx) => {
                if (idx !== activeIndex) return null;
                return (
                  <motion.div
                    key={testi.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="w-full bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm relative text-center flex flex-col justify-between"
                  >
                    {/* Quotation icon */}
                    <div className="absolute top-6 left-6 text-slate-100 select-none">
                      <Quote className="w-14 h-14" />
                    </div>

                    {/* Content Block */}
                    <div className="space-y-6 relative z-10">
                      {/* Rating stars */}
                      <div className="flex justify-center space-x-1">
                        {[...Array(testi.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="font-sans text-base sm:text-lg text-slate-700 italic leading-relaxed">
                        "{testi.comment}"
                      </p>

                      {/* Avatar & User Details */}
                      <div className="flex flex-col items-center space-y-2 pt-2">
                        <img
                          src={testi.avatarUrl}
                          alt={testi.name}
                          className="w-14 h-14 rounded-full border border-slate-200 shadow-sm object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-heading font-bold text-slate-900 text-base">{testi.name}</h4>
                          <p className="text-xs text-slate-400">@{testi.username}</p>
                        </div>
                      </div>
                    </div>

                    {/* Extra badge indicating the amount bought */}
                    <div className="mt-6 flex justify-center">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-[#2563EB] px-3 py-1.5 rounded-full border border-blue-100">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Membeli {testi.robuxBought.toLocaleString("id-ID")} Robux
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 -mx-4 sm:-mx-12 flex justify-between pointer-events-none z-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-[#2563EB] hover:scale-105 transition-all pointer-events-auto flex items-center justify-center cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-[#2563EB] hover:scale-105 transition-all pointer-events-auto flex items-center justify-center cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2.5 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === index
                    ? "bg-[#2563EB] w-6"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

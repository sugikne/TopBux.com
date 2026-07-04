import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQ_ITEMS } from "../../data";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-10 bg-slate-50 border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <span className="text-[#2563EB] font-bold text-xs tracking-widest uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Tanya Jawab Umum
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
            Punya pertanyaan mengenai Top Up Robux di TopBux? Temukan jawaban lengkapnya langsung di bawah ini.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#2563EB] shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full text-left px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-heading font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-blue-50 text-[#2563EB]" : ""
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-slate-600 text-xs sm:text-sm border-t border-slate-50 leading-relaxed font-sans whitespace-pre-line">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support CTA */}
        <div className="mt-12 text-center p-6 bg-blue-50/20 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
          <div className="text-left space-y-1">
            <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base">Belum Menemukan Jawaban?</h4>
            <p className="text-xs text-slate-500 font-sans">Hubungi Admin kami via live chat WhatsApp untuk konsultasi gratis.</p>
          </div>
          <a
            href="https://wa.me/6285333049716"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            Tanya Admin Sekarang
          </a>
        </div>

      </div>
    </section>
  );
}

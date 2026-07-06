import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import ProductsCatalog from "./components/sections/ProductsCatalog";
import RobuxNominals from "./components/sections/RobuxNominals";
import HowToBuy from "./components/sections/HowToBuy";
import OrderForm from "./components/sections/OrderForm";
import FAQ from "./components/sections/FAQ";
import Testimonials from "./components/sections/Testimonials";
import CekPesanan from "./components/sections/CekPesanan";
import Artikel from "./components/sections/Artikel";
import AdminPanel from "./components/sections/AdminPanel";
import { Phone, ArrowUp, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";
import { RobuxOption } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [currentView, setCurrentView] = useState<'home' | 'produk' | 'product-detail' | 'cek-pesanan' | 'artikel' | 'faq'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>("robux-instan");
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [waNotification, setWaNotification] = useState<string | null>(null);
  const [isAdminActive, setIsAdminActive] = useState(false);

  // Secret Admin Panel listener from query parameter
  useEffect(() => {
    const checkQueryParam = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("page") === "admin" || params.get("admin") === "true") {
        setIsAdminActive(true);
      } else {
        setIsAdminActive(false);
      }
    };

    checkQueryParam();
    window.addEventListener("popstate", checkQueryParam);
    return () => window.removeEventListener("popstate", checkQueryParam);
  }, []);

  // Clear package selection when product switches
  useEffect(() => {
    setSelectedNominal(null);
  }, [selectedProductId]);

  // Monitor scroll height to show/hide "Scroll to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Occasional notification bubble above floating WhatsApp button (appears for 6 seconds every 18 seconds)
  useEffect(() => {
    const messages = [
      "Kak, Admin Tofav online! Yuk chat ✨",
      "Proses kilat tanpa pending, aman 100%! ⚡",
      "Ada pertanyaan? Admin siap bantu di WA! 👋",
      "Semua nominal Robux ready stock hari ini! 🛡️"
    ];
    let index = 0;

    // Show first message after 4 seconds
    const firstTimeout = setTimeout(() => {
      setWaNotification(messages[0]);
      // Hide after 6 seconds
      setTimeout(() => setWaNotification(null), 6000);
    }, 4000);

    // Repeated interval of 18 seconds
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setWaNotification(messages[index]);
      // Hide after 6 seconds
      setTimeout(() => setWaNotification(null), 6000);
    }, 18000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  // Use Intersection Observer to highlight active navigation link automatically as user scrolls
  useEffect(() => {
    const sections = ["home", "produk", "nominals", "cek-pesanan", "artikel", "faq"];
    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (sectionId === "nominals" || sectionId === "produk") {
                setActiveSection("produk");
              } else {
                setActiveSection(sectionId);
              }
            }
          });
        },
        { threshold: 0.15, rootMargin: "-80px 0px -20% 0px" }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Dedicated view switching or scrolling based on selected navigation
  const handleNavigate = (id: string) => {
    setActiveSection(id);
    setSelectedNominal(null);

    if (id === "home") {
      setCurrentView("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "produk") {
      setCurrentView("produk");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "cek-pesanan") {
      setCurrentView("cek-pesanan");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "artikel") {
      setCurrentView("artikel");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "faq") {
      setCurrentView("faq");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentView("home");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const scrollToSection = (targetId: string, id: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  // Sync selected nominal and scroll to form section instantly
  const handleSelectNominal = (option: RobuxOption) => {
    setSelectedNominal(option.amount);
    
    // Smooth scroll down to the order form
    const formElement = document.getElementById("topup");
    if (formElement) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = formElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const renderViewContent = () => {
    switch (currentView) {
      case "home":
        return (
          /* Main Content with tight, clean section layouts */
          <main className="flex-1 space-y-2 sm:space-y-3 md:space-y-4 animate-fade-in">
            {/* Hero Section */}
            <Hero onNavigate={(sectionId) => {
              if (sectionId === "topup") {
                setSelectedProductId("robux-instan");
                setCurrentView("product-detail");
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                handleNavigate(sectionId);
              }
            }} />

            {/* Features Keunggulan Section */}
            <div>
              <Features />
            </div>

            {/* Products Catalog Selection Section */}
            <ProductsCatalog
              selectedProductId={selectedProductId}
              onSelectProduct={(productId) => {
                setSelectedProductId(productId);
                setCurrentView("product-detail");
                window.scrollTo({ top: 0 });
              }}
            />

            {/* Timeline "How to Buy" Section */}
            <div>
              <HowToBuy />
            </div>

            {/* Carousel Testimonial Section */}
            <div>
              <Testimonials />
            </div>

            {/* Accordion FAQ Section */}
            <div className="pb-8" id="faq">
              <FAQ />
            </div>
          </main>
        );
      case "produk":
        return (
          <main className="flex-1 bg-slate-50 pt-24 pb-16 animate-fade-in">
            {/* Breadcrumb and Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
              <div className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
                <span 
                  className="hover:text-[#2563EB] cursor-pointer transition-colors" 
                  onClick={() => {
                    setCurrentView('home');
                    setSelectedNominal(null);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  Home
                </span>
                <span>/</span>
                <span className="text-slate-600 font-medium">
                  Produk
                </span>
              </div>

              <button
                onClick={() => {
                  setCurrentView('home');
                  setSelectedNominal(null);
                  window.scrollTo({ top: 0 });
                }}
                className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer"
              >
                ← Kembali ke Beranda
              </button>
            </div>

            <ProductsCatalog
              selectedProductId={selectedProductId}
              onSelectProduct={(productId) => {
                setSelectedProductId(productId);
                setCurrentView("product-detail");
                window.scrollTo({ top: 0 });
              }}
            />
          </main>
        );
      case "product-detail":
        return (
          /* Dedicated Product View with Nominal list and Order Form */
          <main className="flex-1 bg-slate-50 pt-24 pb-16 animate-fade-in">
            {/* Breadcrumb and Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
              <div className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
                <span 
                  className="hover:text-[#2563EB] cursor-pointer transition-colors" 
                  onClick={() => {
                    setCurrentView('home');
                    setSelectedNominal(null);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  Home
                </span>
                <span>/</span>
                <span 
                  className="hover:text-[#2563EB] cursor-pointer transition-colors" 
                  onClick={() => {
                    setCurrentView('produk');
                    setSelectedNominal(null);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  Produk
                </span>
                <span>/</span>
                <span className="text-slate-600 font-medium">
                  {selectedProductId === "robux-instan" ? "Robux Instan (Via Login)" : "Robux Gamepass (Tanpa Login)"}
                </span>
              </div>

              <button
                onClick={() => {
                  setCurrentView('produk');
                  setSelectedNominal(null);
                  window.scrollTo({ top: 0 });
                }}
                className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer"
              >
                ← Kembali ke Pilihan Produk
              </button>
            </div>

            {/* Nominal Packages Grid */}
            <div id="nominals" className="scroll-mt-24">
              <RobuxNominals
                selectedProductId={selectedProductId}
                selectedNominal={selectedNominal}
                onSelectNominal={handleSelectNominal}
              />
            </div>

            {/* Input Order Form Section */}
            <div className="scroll-mt-24 pb-16">
              <OrderForm
                selectedProductId={selectedProductId}
                selectedNominal={selectedNominal}
                onSelectNominal={(amount) => setSelectedNominal(amount)}
              />
            </div>
          </main>
        );
      case "cek-pesanan":
        return (
          <main className="flex-1 bg-slate-50 pt-24 pb-16 animate-fade-in">
            {/* Breadcrumb and Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
              <div className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
                <span 
                  className="hover:text-[#2563EB] cursor-pointer transition-colors" 
                  onClick={() => {
                    setCurrentView('home');
                    setSelectedNominal(null);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  Home
                </span>
                <span>/</span>
                <span className="text-slate-600 font-medium">
                  Cek Pesanan
                </span>
              </div>

              <button
                onClick={() => {
                  setCurrentView('home');
                  setSelectedNominal(null);
                  window.scrollTo({ top: 0 });
                }}
                className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer"
              >
                ← Kembali ke Beranda
              </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CekPesanan />
            </div>
          </main>
        );
      case "artikel":
        return (
          <main className="flex-1 bg-slate-50 pt-24 pb-16 animate-fade-in">
            {/* Breadcrumb and Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
              <div className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
                <span 
                  className="hover:text-[#2563EB] cursor-pointer transition-colors" 
                  onClick={() => {
                    setCurrentView('home');
                    setSelectedNominal(null);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  Home
                </span>
                <span>/</span>
                <span className="text-slate-600 font-medium">
                  Artikel & Edukasi
                </span>
              </div>

              <button
                onClick={() => {
                  setCurrentView('home');
                  setSelectedNominal(null);
                  window.scrollTo({ top: 0 });
                }}
                className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer"
              >
                ← Kembali ke Beranda
              </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Artikel />
            </div>
          </main>
        );
      case "faq":
        return (
          <main className="flex-1 bg-slate-50 pt-24 pb-16 animate-fade-in">
            {/* Breadcrumb and Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
              <div className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
                <span 
                  className="hover:text-[#2563EB] cursor-pointer transition-colors" 
                  onClick={() => {
                    setCurrentView('home');
                    setSelectedNominal(null);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  Home
                </span>
                <span>/</span>
                <span className="text-slate-600 font-medium">
                  Tanya Jawab (FAQ)
                </span>
              </div>

              <button
                onClick={() => {
                  setCurrentView('home');
                  setSelectedNominal(null);
                  window.scrollTo({ top: 0 });
                }}
                className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer"
              >
                ← Kembali ke Beranda
              </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FAQ />
            </div>
          </main>
        );
      default:
        return null;
    }
  };

  if (isAdminActive) {
    return (
      <AdminPanel 
        onClose={() => {
          setIsAdminActive(false);
          const url = new URL(window.location.href);
          url.searchParams.delete("page");
          url.searchParams.delete("admin");
          window.history.pushState({}, "", url.toString());
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 overflow-x-hidden selection:bg-brand-primary/10 selection:text-brand-primary">
      
      {/* Navigation Menu */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {renderViewContent()}

      {/* Footer Area */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating UI Elements: Scroll To Top & Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        
        {/* Scroll To Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full bg-white border border-slate-200/80 text-slate-700 hover:text-brand-primary shadow-lg flex items-center justify-center cursor-pointer transition-all hover:-translate-y-0.5"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Quick Chat Button Container */}
        <div className="relative flex items-center">
          {/* Animated Occasional Notification Bubble */}
          <AnimatePresence>
            {waNotification && (
              <motion.div
                initial={{ opacity: 0, x: 20, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, y: 10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute right-20 sm:right-24 bottom-3 bg-white text-slate-800 text-xs font-bold py-3 px-4 rounded-2xl shadow-xl border border-slate-100 whitespace-normal sm:whitespace-nowrap z-50 flex items-center gap-2.5 max-w-[180px] sm:max-w-none"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563EB]"></span>
                </span>
                <span className="font-sans text-slate-800 font-bold">{waNotification}</span>
                {/* Arrow */}
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-t border-r border-slate-100/50 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/628213142504"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#2563EB] shadow-2xl flex items-center justify-center relative group overflow-visible bg-white cursor-pointer shrink-0"
            title="Hubungi Admin WhatsApp"
          >
            {/* Circular Anime Avatar */}
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src="/img/1.png" 
                alt="Admin Avatar" 
                className="w-full h-full object-cover object-top scale-110"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Glowing Ping effect to invite interaction (Blue theme) */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#2563EB] border-2 border-white text-[8px] text-white font-extrabold items-center justify-center">1</span>
            </span>

            {/* Small WhatsApp Brand Badge at bottom-right */}
            <span className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#2563EB] rounded-full flex items-center justify-center border-2 border-white shadow-md text-white">
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-[#2563EB]" />
            </span>
            
            {/* Tooltip on hover */}
            <span className="absolute right-16 sm:right-20 bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg whitespace-nowrap pointer-events-none border border-slate-800">
              Ada pertanyaan? Tanya Admin! 👋
            </span>
          </motion.a>
        </div>

      </div>

    </div>
  );
}

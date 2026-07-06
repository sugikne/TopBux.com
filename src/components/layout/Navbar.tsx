import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Shield, ChevronDown, MessageCircle, Instagram, Flame, ExternalLink } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isMobileContactOpen, setIsMobileContactOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsContactDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Produk", id: "produk" },
    { name: "Cek Pesanan", id: "cek-pesanan" },
    { name: "Artikel", id: "artikel" },
    { name: "Bantuan", id: "faq" },
  ];

  const contactOptions = [
    { name: "WhatsApp Official", handle: "@AdminTopBux", url: "https://wa.me/628213142504", icon: MessageCircle, color: "text-emerald-500 hover:bg-emerald-50" },
    { name: "Instagram Shop", handle: "@topbux.id", url: "https://www.instagram.com/topbux.id/?utm_source=ig_web_button_share_sheet", icon: Instagram, color: "text-pink-500 hover:bg-pink-50" },
    { name: "TikTok Store", handle: "@topbux_official", url: "https://www.tiktok.com/@topbux.id?is_from_webapp=1&sender_device=pc", icon: Flame, color: "text-slate-900 hover:bg-slate-50" },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    setIsMobileContactOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Sebelah Kiri */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLinkClick("home")}
            className="flex items-center text-left group shrink-0 cursor-pointer"
          >
            <img 
              src="/img/Logo.png" 
              alt="TopBux Logo" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.button>

          {/* Menus & Button - Sebelah Kanan */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <nav className="flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeSection === link.id
                      ? "text-[#2563EB] font-extrabold bg-blue-50/50"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>

            {/* Custom Interactive Contact Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                className="px-6 py-2.5 rounded-full text-sm font-extrabold shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5 border bg-[#2563EB] text-white border-[#2563EB] hover:bg-blue-700"
              >
                <span>Contact</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isContactDropdownOpen ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {isContactDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-64 bg-white rounded-2xl border border-slate-150 shadow-xl py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hubungi Admin</p>
                      <p className="text-xs text-slate-500">Fast Response & Safe Order</p>
                    </div>
                    {contactOptions.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <a
                          key={opt.name}
                          href={opt.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${opt.color}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                              <Icon className="w-4 h-4 shrink-0" />
                            </div>
                            <div className="text-left">
                              <p className="font-extrabold text-slate-800 text-xs">{opt.name}</p>
                              <p className="text-[11px] text-slate-400 font-medium">{opt.handle}</p>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#2563EB]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-white border-b border-slate-100 shadow-inner overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between cursor-pointer ${
                    activeSection === link.id
                      ? "bg-blue-50 text-[#2563EB] font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-500"
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  )}
                </motion.button>
              ))}

              {/* Mobile Contact Accordion */}
              <div className="pt-2 border-t border-slate-100 mt-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsMobileContactOpen(!isMobileContactOpen)}
                  className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                >
                  <span>Contact Us</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isMobileContactOpen ? "rotate-180" : ""}`} />
                </motion.button>

                {isMobileContactOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-2 mt-1">
                    {contactOptions.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <a
                          key={opt.name}
                          href={opt.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-[#2563EB]" />
                          <div className="flex-1">
                            <p className="text-xs font-bold text-slate-800">{opt.name}</p>
                            <p className="text-[10px] text-slate-400">{opt.handle}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

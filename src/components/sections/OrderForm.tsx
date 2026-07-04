import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ROBUX_INSTAN_OPTIONS, ROBUX_GAMEPASS_OPTIONS } from "../../data";
import { OrderFormData } from "../../types";
import { Send, Sparkles, HelpCircle, Check, ShieldAlert, AlertCircle, Info, Lock, Eye, EyeOff } from "lucide-react";

interface OrderFormProps {
  selectedProductId: string;
  selectedNominal: number | null;
  onSelectNominal: (amount: number) => void;
}

export default function OrderForm({
  selectedProductId,
  selectedNominal,
  onSelectNominal,
}: OrderFormProps) {
  const isInstant = selectedProductId === "robux-instan";
  const currentOptions = isInstant ? ROBUX_INSTAN_OPTIONS : ROBUX_GAMEPASS_OPTIONS;

  // Form States
  const [formData, setFormData] = useState<OrderFormData & { password?: string }>({
    name: "",
    username: "",
    gamepassUrl: "",
    password: "",
    nominalRobux: selectedNominal || (isInstant ? 100 : 800),
    whatsappNumber: "",
    note: "",
  });

  // Toggle Password Visibility
  const [showPasswordText, setShowPasswordText] = useState(false);

  // Anti-bot Honeypot State
  const [honeypot, setHoneypot] = useState("");

  // Validation States
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData | "password", string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGamepassHelper, setShowGamepassHelper] = useState(false);

  // Keep form nominal state in sync when selected from parent grid
  useEffect(() => {
    if (selectedNominal) {
      setFormData((prev) => ({ ...prev, nominalRobux: selectedNominal }));
    }
  }, [selectedNominal]);

  // Handle Form Inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "nominalRobux" ? parseInt(value, 10) : value,
    }));

    // Clear error for this field
    if (errors[name as keyof OrderFormData | "password"]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Safe parameter sanitization for WhatsApp message URL
  const sanitizeText = (text: string): string => {
    return text.replace(/<[^>]*>/g, "").trim();
  };

  // Generate the formatted WhatsApp Message text
  const generateMessageText = () => {
    const nama = sanitizeText(formData.name || "-");
    const username = sanitizeText(formData.username || "-");
    const gamepass = sanitizeText(formData.gamepassUrl || "-");
    const password = sanitizeText(formData.password || "-");
    const nominal = formData.nominalRobux ? `${formData.nominalRobux} Robux` : "-";
    const nomor = sanitizeText(formData.whatsappNumber || "-");
    const catatan = sanitizeText(formData.note || "Tidak ada catatan.");

    if (isInstant) {
      return `Halo Admin TopBux,

Saya ingin membeli Robux Instan (Via Login).

Nama:
${nama}

Username Roblox:
${username}

Password Akun:
${password}

Nominal:
${nominal}

Nomor WhatsApp:
${nomor}

Catatan:
${catatan}

Mohon segera diproses ya min.
Terima kasih!`;
    }

    return `Halo Admin TopBux,

Saya ingin membeli Robux Gamepass (Tanpa Login).

Nama:
${nama}

Username Roblox:
${username}

Link Gamepass:
${gamepass}

Nominal:
${nominal}

Nomor WhatsApp:
${nomor}

Catatan:
${catatan}

Mohon segera diproses ya min.
Terima kasih!`;
  };

  // Handle form validation and checkout submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot check
    if (honeypot) {
      console.warn("Spam bot detected!");
      return;
    }

    const tempErrors: Partial<Record<keyof OrderFormData | "password", string>> = {};

    if (!formData.name.trim()) {
      tempErrors.name = "Nama lengkap wajib diisi";
    }
    if (!formData.username.trim()) {
      tempErrors.username = "Username Roblox wajib diisi";
    }

    if (isInstant) {
      if (!formData.password?.trim()) {
        tempErrors.password = "Password Roblox wajib diisi untuk pengiriman instan";
      }
    } else {
      if (!formData.gamepassUrl.trim()) {
        tempErrors.gamepassUrl = "Tautan Gamepass wajib diisi";
      } else if (!formData.gamepassUrl.startsWith("http://") && !formData.gamepassUrl.startsWith("https://")) {
        tempErrors.gamepassUrl = "Tautan harus dimulai dengan http:// atau https://";
      }
    }

    if (!formData.nominalRobux) {
      tempErrors.nominalRobux = "Pilih nominal Robux terlebih dahulu";
    }
    if (!formData.whatsappNumber.trim()) {
      tempErrors.whatsappNumber = "Nomor WhatsApp aktif wajib diisi";
    } else {
      const waRegex = /^[0-9+() \-]{8,16}$/;
      if (!waRegex.test(formData.whatsappNumber)) {
        tempErrors.whatsappNumber = "Masukkan nomor WhatsApp yang valid (contoh: 085333049716)";
      }
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(tempErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Success validation
    setIsSubmitted(true);
    
    // Save order to localStorage for tracking & admin integrations
    try {
      const selectedOption = currentOptions.find(opt => opt.amount === formData.nominalRobux);
      const calculatedPrice = selectedOption ? selectedOption.priceIdr : (formData.nominalRobux * (isInstant ? 175 : 135));
      const orderId = `TBX-${Math.floor(10000 + Math.random() * 90000)}`;
      const today = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
      
      const newSavedOrder = {
        id: orderId,
        name: formData.name,
        username: formData.username,
        whatsappNumber: formData.whatsappNumber,
        nominalRobux: formData.nominalRobux,
        productType: isInstant ? "Robux Instan" : "Robux Gamepass",
        priceIdr: calculatedPrice,
        status: "Pending",
        date: today
      };

      const existing = localStorage.getItem("topbux_orders");
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newSavedOrder);
      localStorage.setItem("topbux_orders", JSON.stringify(list));
    } catch (e) {
      console.error("Error saving order:", e);
    }
    
    // Construct WhatsApp message and redirect after a short delay for animation
    setTimeout(() => {
      const textMessage = generateMessageText();
      const encodedText = encodeURIComponent(textMessage);
      const waUrl = `https://wa.me/6285333049716?text=${encodedText}`;
      
      // Open in a new window/tab safely
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setIsSubmitted(false);
    }, 800);
  };

  return (
    <section id="topup" className="py-10 bg-slate-50 border-y border-slate-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#2563EB_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <span className="text-[#2563EB] font-bold text-xs tracking-widest uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Form Pemesanan Kilat
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Isi Data Pembelian Lo
          </h2>
          <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
            Lengkapin formulir di bawah ini dengan bener ya, bro. Semua data lo dijamin aman dan langsung dikirim ke WhatsApp admin!
          </p>
        </div>

        {/* Form and Preview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Bot Honeypot input (Hidden from human users) */}
              <div className="hidden">
                <label htmlFor="website_honeypot">Leave this blank</label>
                <input
                  type="text"
                  id="website_honeypot"
                  name="website_honeypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nama */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2" htmlFor="name">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: Nugroho"
                    className={`w-full bg-slate-50 border px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.name
                        ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                        : "border-slate-200 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Username Roblox */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2" htmlFor="username">
                    Username Roblox <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Contoh: RobloxPro99"
                    className={`w-full bg-slate-50 border px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.username
                        ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                        : "border-slate-200 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                    }`}
                  />
                  {errors.username && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>

              {/* Link Gamepass or Password Input depending on product type */}
              <div>
                {isInstant ? (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs sm:text-sm font-bold text-slate-700" htmlFor="password">
                        Password Akun Roblox <span className="text-red-500">*</span>
                      </label>
                      <div className="text-xs text-[#2563EB] font-bold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        Aman & Rahasia 100%
                      </div>
                    </div>
                    
                    <div className="relative">
                      <input
                        type={showPasswordText ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password || ""}
                        onChange={handleChange}
                        placeholder="Masukkan Password Akun Roblox Anda"
                        className={`w-full bg-slate-50 border px-4 py-3 rounded-xl text-sm pr-12 focus:outline-none focus:ring-1 transition-all ${
                          errors.password
                            ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswordText(!showPasswordText)}
                        className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.password}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs sm:text-sm font-bold text-slate-700" htmlFor="gamepassUrl">
                        Link Gamepass Roblox <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowGamepassHelper(!showGamepassHelper)}
                        className="text-xs text-[#2563EB] hover:text-blue-700 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        Cara buat Gamepass?
                      </button>
                    </div>
                    
                    <input
                      type="text"
                      id="gamepassUrl"
                      name="gamepassUrl"
                      value={formData.gamepassUrl}
                      onChange={handleChange}
                      placeholder="Contoh: https://www.roblox.com/game-pass/1234567/MyRobuxGamepass"
                      className={`w-full bg-slate-50 border px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                        errors.gamepassUrl
                          ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                          : "border-slate-200 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                      }`}
                    />
                    
                    {errors.gamepassUrl && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.gamepassUrl}
                      </p>
                    )}

                    {/* Gamepass Quick Helper box */}
                    <AnimatePresence>
                      {showGamepassHelper && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 overflow-hidden bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-xs text-slate-600 space-y-2 leading-relaxed"
                        >
                          <p className="font-bold text-[#2563EB] flex items-center gap-1">
                            <Info className="w-4 h-4 shrink-0" />
                            Cara Cepat Membuat Link Gamepass:
                          </p>
                          <ol className="list-decimal pl-4 space-y-1.5">
                            <li>Buka dashboard Roblox Create Anda (<span className="font-semibold select-all">create.roblox.com</span>).</li>
                            <li>Pilih salah satu Game (Place) default Anda.</li>
                            <li>Di menu sebelah kiri, cari sub-menu <span className="font-semibold">Associated Items</span> lalu pilih tab <span className="font-semibold">Passes</span>.</li>
                            <li>Klik <span className="font-semibold">Create a Pass</span>, unggah gambar bebas, isi nama bebas, lalu simpan.</li>
                            <li>Buka Gamepass tersebut, klik menu <span className="font-semibold">Sales</span> di kiri, aktifkan <span className="font-semibold">Item for Sale</span> dan set harga Robux yang sesuai.</li>
                            <li>Salin link URL halaman Gamepass tersebut (misal: roblox.com/game-pass/...) dan tempel ke kolom formulir di atas.</li>
                          </ol>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nominal Robux Select Dropdown (Synced with Grid) */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2" htmlFor="nominalRobux">
                    Nominal Robux <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="nominalRobux"
                      name="nominalRobux"
                      value={formData.nominalRobux}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB]/40 focus:border-[#2563EB] appearance-none cursor-pointer"
                    >
                      {currentOptions.map((opt) => (
                        <option key={opt.id} value={opt.amount}>
                          {opt.amount} Robux - Rp {opt.priceIdr.toLocaleString("id-ID")}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2" htmlFor="whatsappNumber">
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="Contoh: 085333049716"
                    className={`w-full bg-slate-50 border px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.whatsappNumber
                        ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                        : "border-slate-200 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                    }`}
                  />
                  {errors.whatsappNumber && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.whatsappNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Notes (Optional) */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2" htmlFor="note">
                  Catatan untuk Admin (Opsional)
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Contoh: Tolong diproses cepet ya bwang, mau gacha skin nih"
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-blue-500/10 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm ${
                    isSubmitted ? "opacity-80 cursor-wait" : ""
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sabar ya, lagi buka WhatsApp Admin...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 fill-white text-white" />
                      Yuk Kirim Pesanan ke WA Admin!
                    </>
                  )}
                </button>
              </div>

              {/* Safety notice */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-[11px] sm:text-xs text-slate-500">
                <ShieldAlert className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Tenang, data lo aman kok! Semuanya langsung dikirim ke WhatsApp resmi admin tanpa bocor.</span>
              </div>

            </form>
          </div>

          {/* Real-time WhatsApp Smartphone Message Preview Side */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center">
            
            <div className="w-full max-w-[340px] bg-slate-950 rounded-[44px] p-3.5 shadow-xl border-4 border-slate-800 relative aspect-[9/18] flex flex-col justify-between overflow-hidden">
              {/* Speaker & Notch details */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Screen Workspace */}
              <div className="flex-1 bg-slate-100 rounded-[32px] overflow-hidden flex flex-col justify-between relative pt-6 text-[11px]">
                
                {/* Simulated App Header */}
                <div className="bg-[#075e54] text-white py-3 px-4 flex items-center space-x-2 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-extrabold font-heading text-white">
                    TB
                  </div>
                  <div>
                    <h5 className="font-bold text-[11px]">Admin TopBux (Official)</h5>
                    <p className="text-[8px] text-teal-100 font-medium">Online • Responsif</p>
                  </div>
                </div>

                {/* Simulated Chat Messages Area */}
                <div className="flex-1 p-3 space-y-3 overflow-y-auto no-scrollbar flex flex-col justify-end">
                  
                  {/* Recipient Greeting bubble */}
                  <div className="max-w-[85%] bg-white p-2.5 rounded-2xl shadow-sm text-slate-700 self-start leading-relaxed text-[10px]">
                    Halo bro! Selamat datang di <span className="font-bold text-[#2563EB]">TopBux</span>. Lengkapin form dulu ya biar Robux lo bisa langsung diproses kilat! ⚡
                  </div>

                  {/* Real-time dynamic message preview bubble */}
                  <div className="max-w-[85%] bg-[#dcf8c6] p-2.5 rounded-2xl shadow-sm text-slate-800 self-end leading-relaxed text-[10px] space-y-2 relative border border-[#c7e5ae]">
                    <div className="font-medium text-slate-800 whitespace-pre-line break-words leading-tight">
                      {generateMessageText()}
                    </div>
                    <div className="text-[8px] text-slate-500 text-right mt-1 font-mono">
                      Just now ✓✓
                    </div>
                  </div>

                </div>

                {/* Simulated Input area */}
                <div className="bg-white p-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-full py-1.5 px-3.5 text-slate-400 text-[10px]">
                    Terkirim via WhatsApp...
                  </div>
                  <div className="w-7 h-7 bg-[#128c7e] rounded-full flex items-center justify-center text-white text-xs shadow-sm">
                    ➔
                  </div>
                </div>

              </div>
            </div>

            <div className="text-center mt-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 fill-blue-50/20 animate-pulse" />
                Preview Pesan Real-Time
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

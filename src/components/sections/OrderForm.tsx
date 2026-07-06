import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ROBUX_INSTAN_OPTIONS, ROBUX_GAMEPASS_OPTIONS } from "../../data";
import { OrderFormData } from "../../types";
import { Send, Sparkles, HelpCircle, Check, ShieldAlert, AlertCircle, Info, Lock, Eye, EyeOff, Copy, CheckCircle2, Search, X, PackageSearch, Clock, PackageCheck } from "lucide-react";

interface OrderFormProps {
  selectedProductId: string;
  selectedNominal: number | null;
  onSelectNominal: (amount: number) => void;
}

interface SavedOrderRecord {
  id: string;
  name: string;
  username: string;
  whatsappNumber: string;
  nominalRobux: number;
  productType: string;
  priceIdr: number;
  status: "Diproses" | "Pending" | "Selesai";
  date: string;
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

  // Order Success State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastOrderId, setLastOrderId] = useState("");
  const [isIdCopied, setIsIdCopied] = useState(false);

  // Check Order Status State
  const [showCheckOrderModal, setShowCheckOrderModal] = useState(false);
  const [checkOrderId, setCheckOrderId] = useState("");
  const [checkResult, setCheckResult] = useState<SavedOrderRecord | null | "not-found">(null);

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
  const generateMessageText = (orderIdForMessage?: string) => {
    const nama = sanitizeText(formData.name || "-");
    const username = sanitizeText(formData.username || "-");
    const gamepass = sanitizeText(formData.gamepassUrl || "-");
    const password = sanitizeText(formData.password || "-");
    const nominal = formData.nominalRobux ? `${formData.nominalRobux} Robux` : "-";
    const nomor = sanitizeText(formData.whatsappNumber || "-");
    const catatan = sanitizeText(formData.note || "Tidak ada catatan.");
    const orderIdLine = orderIdForMessage ? `\n\nNomor Pesanan:\n${orderIdForMessage}` : "";

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
${catatan}${orderIdLine}

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
${catatan}${orderIdLine}

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
        tempErrors.whatsappNumber = "Masukkan nomor WhatsApp yang valid (contoh: 08213142504)";
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

    const orderId = `TBX-${Math.floor(10000 + Math.random() * 90000)}`;

    // Save order to localStorage for tracking & admin integrations
    try {
      const selectedOption = currentOptions.find(opt => opt.amount === formData.nominalRobux);
      const calculatedPrice = selectedOption ? selectedOption.priceIdr : (formData.nominalRobux * (isInstant ? 175 : 135));
      const today = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });

      const newSavedOrder: SavedOrderRecord = {
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

    // Construct WhatsApp message (with order number included) and redirect after a short delay
    setTimeout(() => {
      const textMessage = generateMessageText(orderId);
      const encodedText = encodeURIComponent(textMessage);
      const waUrl = `https://wa.me/628213142504?text=${encodedText}`;

      // Open in a new window/tab safely
      window.open(waUrl, "_blank", "noopener,noreferrer");

      setIsSubmitted(false);
      setLastOrderId(orderId);
      setShowSuccessModal(true);
    }, 800);
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(lastOrderId).then(() => {
      setIsIdCopied(true);
      setTimeout(() => setIsIdCopied(false), 2000);
    }).catch(() => {
      // Clipboard API unavailable, silently ignore
    });
  };

  const handleCheckOrder = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const existing = localStorage.getItem("topbux_orders");
      const list: SavedOrderRecord[] = existing ? JSON.parse(existing) : [];
      const found = list.find(
        (o) => o.id.trim().toLowerCase() === checkOrderId.trim().toLowerCase()
      );
      setCheckResult(found || "not-found");
    } catch (e) {
      setCheckResult("not-found");
    }
  };

  const openCheckOrderModal = (prefillId?: string) => {
    setCheckOrderId(prefillId || "");
    setCheckResult(null);
    setShowCheckOrderModal(true);
  };

  const statusBadgeClass = (status: SavedOrderRecord["status"]) => {
    if (status === "Selesai") return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    if (status === "Diproses") return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  };

  const statusIcon = (status: SavedOrderRecord["status"]) => {
    if (status === "Selesai") return <PackageCheck className="w-4 h-4" />;
    if (status === "Diproses") return <PackageSearch className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
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
          <button
            type="button"
            onClick={() => openCheckOrderModal()}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2563EB] hover:text-blue-700 transition-colors cursor-pointer underline underline-offset-2"
          >
            <Search className="w-3.5 h-3.5" />
            Sudah pernah order? Cek Status Pesanan
          </button>
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

      {/* Success Modal with Order ID */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative text-center"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
                Pesanan Berhasil Dibuat!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
                Chat WhatsApp ke admin sudah dibuka di tab baru. Simpan nomor pesanan ini untuk cek status kapan saja.
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between gap-3 mb-5">
                <span className="font-mono font-extrabold text-lg sm:text-xl text-[#2563EB] tracking-wider">
                  {lastOrderId}
                </span>
                <button
                  onClick={handleCopyOrderId}
                  className="shrink-0 bg-white border border-blue-200 hover:bg-blue-100 text-[#2563EB] p-2 rounded-xl transition-colors cursor-pointer"
                  title="Salin Nomor Pesanan"
                >
                  {isIdCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    openCheckOrderModal(lastOrderId);
                  }}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  Cek Status Sekarang
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Check Order Status Modal */}
      <AnimatePresence>
        {showCheckOrderModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative"
            >
              <button
                onClick={() => setShowCheckOrderModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-1.5 flex items-center gap-2">
                <PackageSearch className="text-[#2563EB] w-5 h-5" />
                Cek Status Pesanan
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Masukkan Nomor Pesanan kamu (contoh: TBX-12345) untuk melihat status terbaru.
              </p>

              <form onSubmit={handleCheckOrder} className="space-y-3">
                <input
                  type="text"
                  value={checkOrderId}
                  onChange={(e) => setCheckOrderId(e.target.value)}
                  placeholder="TBX-12345"
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all"
                />
                <button
                  type="submit"
                  className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Cek Sekarang
                </button>
              </form>

              {/* Search Result */}
              {checkResult === "not-found" && (
                <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4 text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Nomor pesanan tidak ditemukan. Pastikan format sudah benar.
                </div>
              )}

              {checkResult && checkResult !== "not-found" && (
                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-slate-900">{checkResult.id}</span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${statusBadgeClass(checkResult.status)}`}>
                      {statusIcon(checkResult.status)}
                      {checkResult.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p><span className="font-semibold text-slate-700">Username:</span> {checkResult.username}</p>
                    <p><span className="font-semibold text-slate-700">Produk:</span> {checkResult.productType} — {checkResult.nominalRobux} R$</p>
                    <p><span className="font-semibold text-slate-700">Total:</span> Rp {checkResult.priceIdr.toLocaleString("id-ID")}</p>
                    <p><span className="font-semibold text-slate-700">Tanggal:</span> {checkResult.date}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
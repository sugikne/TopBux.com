import { Shield, Phone, Clock, Mail, ExternalLink } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <footer className="bg-white text-slate-800 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <button
              onClick={() => handleLinkClick("home")}
              className="flex items-center text-left group"
            >
              <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                <img 
                  src="/img/Logo.png" 
                  alt="TopBux Logo" 
                  className="h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              TopBux melayani top up Robux Roblox via Gamepass dengan proses cepat, aman, harga kompetitif, dan pelayanan terpercaya.
            </p>
            <div className="flex space-x-3 pt-1">
              <a
                href="https://wa.me/628213142504"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-100 text-[#2563EB] hover:text-white hover:bg-[#2563EB] transition-all shadow-sm"
                aria-label="WhatsApp Support"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-slate-900 text-base tracking-wide">Navigasi</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Home", id: "home" },
                { name: "Top Up Robux", id: "topup" },
                { name: "Cara Pembelian", id: "carabeli" },
                { name: "FAQ", id: "faq" },
                { name: "Testimoni", id: "testimoni" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="hover:text-[#2563EB] hover:translate-x-1 transition-all text-slate-600 cursor-pointer text-left font-medium"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Jam Operasional */}
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-slate-900 text-base tracking-wide">Jam Operasional</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2.5 text-slate-700 font-medium">
                <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Setiap Hari: 08.00 - 22.00 WIB</span>
              </li>
              <li className="text-xs text-slate-500 leading-relaxed pl-6.5 font-medium font-sans">
                Pemesanan di luar jam kerja tetap diterima dan akan diproses segera setelah admin kembali online.
              </li>
            </ul>
          </div>

          {/* Kontak Admin */}
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-slate-900 text-base tracking-wide">Kontak Utama</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/628213142504"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2.5 text-slate-600 hover:text-[#2563EB] group transition-colors font-medium"
                >
                  <Phone className="w-4 h-4 text-[#2563EB] group-hover:scale-110 transition-transform shrink-0" />
                  <span>+62 8213142504 (WhatsApp)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li className="flex items-center space-x-2.5 text-slate-700 font-medium">
                <Mail className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>topbuxid@gmail.com</span>
              </li>
              <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium leading-relaxed font-sans">
                <span className="font-extrabold text-amber-600">Penting:</span> Pembelian resmi hanya diproses melalui admin WhatsApp di atas. Hati-hati terhadap penipuan mengatasnamakan TopBux.
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-8"></div>

        {/* Bottom Area */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
          <div>
            <p>© {currentYear} TopBux. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <span>Top Up Robux Roblox Aman & Instan via Gamepass</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

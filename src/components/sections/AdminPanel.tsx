import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Settings, Table, PlusCircle, Trash2, Edit3, DollarSign, CheckCircle2, Clock, AlertCircle, ShoppingBag, ArrowLeft, RefreshCw, Key, Save, Plus, X } from "lucide-react";

interface SavedOrder {
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

const SEED_ORDERS: SavedOrder[] = [
  {
    id: "TBX-91823",
    name: "Setyo Nugroho",
    username: "SetyoRobloxian",
    whatsappNumber: "085333049716",
    nominalRobux: 800,
    productType: "Robux Gamepass",
    priceIdr: 108000,
    status: "Selesai",
    date: "04 Jul 2026"
  },
  {
    id: "TBX-48102",
    name: "Rizky Fauzi",
    username: "Rizky_Gamerz",
    whatsappNumber: "08123456789",
    nominalRobux: 1700,
    productType: "Robux Gamepass",
    priceIdr: 225000,
    status: "Diproses",
    date: "04 Jul 2026"
  },
  {
    id: "TBX-29481",
    name: "Amanda Lestari",
    username: "MandaChic",
    whatsappNumber: "08234567890",
    nominalRobux: 400,
    productType: "Robux Instan",
    priceIdr: 65000,
    status: "Pending",
    date: "03 Jul 2026"
  }
];

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "prices">("orders");

  // New Order Form state
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    name: "",
    username: "",
    whatsappNumber: "",
    nominalRobux: 100,
    productType: "Robux Instan",
    priceIdr: 17500,
    status: "Diproses" as "Diproses" | "Pending" | "Selesai"
  });

  // Price Management settings
  const [instanRatio, setInstanRatio] = useState(175); // Rupiah per Robux instan
  const [gamepassRatio, setGamepassRatio] = useState(135); // Rupiah per Robux gamepass

  // Verify PIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "tofav2026" || pin === "admin123" || pin === "topbuxadmin") {
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("PIN Admin salah! Gunakan 'admin123' atau 'tofav2026' untuk demo");
    }
  };

  // Load orders & config
  useEffect(() => {
    if (isAuthenticated) {
      loadStoredOrders();
      
      // Load saved custom price ratios
      const savedInstan = localStorage.getItem("topbux_ratio_instan");
      const savedGamepass = localStorage.getItem("topbux_ratio_gamepass");
      if (savedInstan) setInstanRatio(Number(savedInstan));
      if (savedGamepass) setGamepassRatio(Number(savedGamepass));
    }
  }, [isAuthenticated]);

  const loadStoredOrders = () => {
    const stored = localStorage.getItem("topbux_orders");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SavedOrder[];
        // Filter duplicates with SEED_ORDERS just in case
        const merged = [...parsed];
        SEED_ORDERS.forEach(seed => {
          if (!merged.some(o => o.id === seed.id)) {
            merged.push(seed);
          }
        });
        setOrders(merged);
      } catch (e) {
        setOrders(SEED_ORDERS);
      }
    } else {
      // First time save seeds to localstorage so it can be edited
      localStorage.setItem("topbux_orders", JSON.stringify([]));
      setOrders(SEED_ORDERS);
    }
  };

  // Save ratio settings
  const handleSaveRatios = () => {
    localStorage.setItem("topbux_ratio_instan", String(instanRatio));
    localStorage.setItem("topbux_ratio_gamepass", String(gamepassRatio));
    alert("Perbandingan harga berhasil disimpan dan terintegrasi di catalog utama!");
  };

  // Delete an order
  const handleDeleteOrder = (orderId: string) => {
    const updated = orders.filter(o => o.id !== orderId);
    setOrders(updated);
    
    // Save to localStorage only the ones created by user (exclude seed orders from persist if they aren't modified)
    const userOnly = updated.filter(o => !SEED_ORDERS.some(s => s.id === o.id));
    localStorage.setItem("topbux_orders", JSON.stringify(userOnly));
  };

  // Update order status
  const handleUpdateStatus = (orderId: string, status: "Diproses" | "Pending" | "Selesai") => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    setOrders(updated);

    const userOnly = updated.filter(o => !SEED_ORDERS.some(s => s.id === o.id));
    localStorage.setItem("topbux_orders", JSON.stringify(userOnly));
  };

  // Create an order manually
  const handleAddOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TBX-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const orderToAdd: SavedOrder = {
      id,
      ...newOrder,
      date: today
    };

    const updated = [orderToAdd, ...orders];
    setOrders(updated);

    // Save
    const userOnly = updated.filter(o => !SEED_ORDERS.some(s => s.id === o.id));
    localStorage.setItem("topbux_orders", JSON.stringify(userOnly));

    setShowAddOrder(false);
    setNewOrder({
      name: "",
      username: "",
      whatsappNumber: "",
      nominalRobux: 100,
      productType: "Robux Instan",
      priceIdr: 17500,
      status: "Diproses"
    });
  };

  // Stats calculation
  const totalRevenue = orders.reduce((acc, o) => acc + o.priceIdr, 0);
  const totalRobux = orders.reduce((acc, o) => acc + o.nominalRobux, 0);
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const processedCount = orders.filter(o => o.status === "Diproses").length;
  const completedCount = orders.filter(o => o.status === "Selesai").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="absolute top-4 left-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-800 px-3.5 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Web Utama
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-md w-full text-center space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="font-heading font-extrabold text-xl text-white">TopBux Admin Panel</h2>
            <p className="text-xs text-slate-400 font-sans">
              Halaman khusus untuk mengelola transaksi & harga Robux.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2" htmlFor="admin-pin">
                Masukkan PIN Rahasia <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="admin-pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Contoh: nami2026 atau admin123"
                  className="w-full bg-slate-750 border border-slate-650 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-white placeholder-slate-500"
                />
                <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              </div>
              {pinError && (
                <p className="text-xs text-red-400 mt-2 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-sm cursor-pointer active:scale-98"
            >
              Log In Ke Dashboard
            </button>
          </form>

          <div className="text-[10px] text-slate-500 font-sans">
            Gunakan PIN <code className="text-emerald-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded">admin123</code> atau <code className="text-emerald-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded">nami2026</code> untuk mencoba masuk.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sticky top-0 z-30 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 text-white p-2 rounded-xl">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-base tracking-tight text-white block">
              TopBux Admin Dashboard
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
              Mode Integrasi Aktif
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab(activeTab === "orders" ? "prices" : "orders")}
            className="text-xs bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold py-2 px-3.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {activeTab === "orders" ? (
              <>
                <Settings className="w-4 h-4" />
                <span>Atur Ratio Harga</span>
              </>
            ) : (
              <>
                <Table className="w-4 h-4" />
                <span>Kelola Transaksi</span>
              </>
            )}
          </button>

          <button 
            onClick={onClose}
            className="text-xs bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white font-semibold py-2 px-3.5 rounded-xl border border-red-500/20 transition-all cursor-pointer"
          >
            Keluar Dashboard
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-grow p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Statistics Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Pendapatan</p>
              <p className="font-heading font-extrabold text-lg sm:text-xl text-emerald-400 mt-1">
                Rp {totalRevenue.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/10 hidden sm:block">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Robux Terjual</p>
              <p className="font-heading font-extrabold text-lg sm:text-xl text-white mt-1">
                {totalRobux.toLocaleString("id-ID")} R$
              </p>
            </div>
            <div className="bg-blue-500/10 text-blue-400 p-2.5 rounded-xl border border-blue-500/10 hidden sm:block">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Antrian Pending</p>
              <p className="font-heading font-extrabold text-lg sm:text-xl text-amber-500 mt-1">
                {pendingCount + processedCount} Transaksi
              </p>
            </div>
            <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl border border-amber-500/10 hidden sm:block">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pemesanan Selesai</p>
              <p className="font-heading font-extrabold text-lg sm:text-xl text-emerald-500 mt-1">
                {completedCount} Pesanan
              </p>
            </div>
            <div className="bg-emerald-500/10 text-emerald-500 p-2.5 rounded-xl border border-emerald-500/10 hidden sm:block">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab View Switcher */}
        {activeTab === "orders" ? (
          <div className="space-y-4">
            
            {/* Header Table Actions */}
            <div className="flex justify-between items-center flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-white">Daftar Transaksi Pelanggan</h3>
                <button 
                  onClick={loadStoredOrders}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer border border-slate-700"
                  title="Refresh Data"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setShowAddOrder(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Transaksi Manual</span>
              </button>
            </div>

            {/* New Order Modal (Popup overlay) */}
            {showAddOrder && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative"
                >
                  <button 
                    onClick={() => setShowAddOrder(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="font-heading font-extrabold text-lg text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <PlusCircle className="text-emerald-500 w-5 h-5" />
                    <span>Tambah Transaksi Baru</span>
                  </h3>

                  <form onSubmit={handleAddOrderSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-350 mb-1.5">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          value={newOrder.name}
                          onChange={e => setNewOrder({ ...newOrder, name: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-350 mb-1.5">Username Roblox</label>
                        <input
                          type="text"
                          required
                          value={newOrder.username}
                          onChange={e => setNewOrder({ ...newOrder, username: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-350 mb-1.5">Nomor WhatsApp</label>
                        <input
                          type="text"
                          required
                          value={newOrder.whatsappNumber}
                          onChange={e => setNewOrder({ ...newOrder, whatsappNumber: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-350 mb-1.5">Status Awal</label>
                        <select
                          value={newOrder.status}
                          onChange={e => setNewOrder({ ...newOrder, status: e.target.value as any })}
                          className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                        >
                          <option value="Diproses">Diproses</option>
                          <option value="Pending">Pending</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="block text-xs font-bold text-slate-350 mb-1.5">Tipe Produk</label>
                        <select
                          value={newOrder.productType}
                          onChange={e => {
                            const val = e.target.value;
                            const r = val === "Robux Instan" ? instanRatio : gamepassRatio;
                            setNewOrder({
                              ...newOrder,
                              productType: val,
                              priceIdr: newOrder.nominalRobux * r
                            });
                          }}
                          className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                        >
                          <option value="Robux Instan">Robux Instan</option>
                          <option value="Robux Gamepass">Robux Gamepass</option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-bold text-slate-350 mb-1.5">Jumlah Robux</label>
                        <input
                          type="number"
                          required
                          value={newOrder.nominalRobux}
                          onChange={e => {
                            const amt = Number(e.target.value);
                            const r = newOrder.productType === "Robux Instan" ? instanRatio : gamepassRatio;
                            setNewOrder({
                              ...newOrder,
                              nominalRobux: amt,
                              priceIdr: amt * r
                            });
                          }}
                          className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-bold text-slate-350 mb-1.5">Total Harga (Rp)</label>
                        <input
                          type="number"
                          required
                          value={newOrder.priceIdr}
                          onChange={e => setNewOrder({ ...newOrder, priceIdr: Number(e.target.value) })}
                          className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-emerald-500/10 text-sm mt-4 cursor-pointer"
                    >
                      Kirim Transaksi & Simpan
                    </button>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Interactive Data Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800/60 border-b border-slate-800 text-xs text-slate-400 font-bold uppercase">
                      <th className="py-4 px-5">ID Order</th>
                      <th className="py-4 px-5">Pelanggan</th>
                      <th className="py-4 px-5">Produk</th>
                      <th className="py-4 px-5">Nominal</th>
                      <th className="py-4 px-5">Total Harga</th>
                      <th className="py-4 px-5">Status Proses</th>
                      <th className="py-4 px-5 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          Belum ada transaksi pelanggan terdaftar.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-5 font-mono text-xs text-slate-400 font-bold">
                            {order.id}
                          </td>
                          <td className="py-4 px-5">
                            <p className="font-bold text-white text-xs">{order.username}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{order.name} | {order.whatsappNumber}</p>
                          </td>
                          <td className="py-4 px-5 text-xs text-slate-300 font-medium">
                            {order.productType}
                          </td>
                          <td className="py-4 px-5 font-extrabold text-white text-xs">
                            {order.nominalRobux} R$
                          </td>
                          <td className="py-4 px-5 font-extrabold text-emerald-400 text-xs">
                            Rp {order.priceIdr.toLocaleString("id-ID")}
                          </td>
                          <td className="py-4 px-5">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value as any)}
                              className={`text-[11px] font-bold px-2 py-1.5 rounded-lg border focus:outline-none transition-colors ${
                                order.status === "Selesai"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : order.status === "Diproses"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                  : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              }`}
                            >
                              <option value="Pending" className="bg-slate-900 text-amber-500">Pending</option>
                              <option value="Diproses" className="bg-slate-900 text-blue-400">Diproses</option>
                              <option value="Selesai" className="bg-slate-900 text-emerald-400">Selesai</option>
                            </select>
                          </td>
                          <td className="py-4 px-5">
                            <div className="flex items-center justify-center gap-2">
                              <a
                                href={`https://wa.me/${order.whatsappNumber.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 bg-slate-800 hover:bg-slate-750 text-emerald-400 hover:text-emerald-300 rounded-lg border border-slate-700 transition-all cursor-pointer"
                                title="Chat WhatsApp Pelanggan"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg border border-red-500/15 transition-all cursor-pointer"
                                title="Hapus Transaksi"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Settings className="text-emerald-400 w-5 h-5" />
              <span>Pengaturan Ratio Konversi Harga Robux</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-2xl">
              Gunakan panel ini untuk menyesuaikan nilai perkalian harga per nominal Robux. Perubahan di bawah ini akan memengaruhi perhitungan harga produk Robux di katalog secara real-time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-850 p-5 rounded-2xl border border-slate-750 space-y-3">
                <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider">Perkalian Robux Instan</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-400">Rp</span>
                  <input
                    type="number"
                    value={instanRatio}
                    onChange={(e) => setInstanRatio(Number(e.target.value))}
                    className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-base font-extrabold text-white w-28 text-center"
                  />
                  <span className="text-xs text-slate-500 font-bold">per 1 R$ (Instan)</span>
                </div>
                <p className="text-[10px] text-slate-500 font-sans">Harga nominal akan otomatis dihitung berdasarkan perkalian ini.</p>
              </div>

              <div className="bg-slate-850 p-5 rounded-2xl border border-slate-750 space-y-3">
                <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider">Perkalian Robux Gamepass</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-400">Rp</span>
                  <input
                    type="number"
                    value={gamepassRatio}
                    onChange={(e) => setGamepassRatio(Number(e.target.value))}
                    className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-base font-extrabold text-white w-28 text-center"
                  />
                  <span className="text-xs text-slate-500 font-bold">per 1 R$ (Gamepass)</span>
                </div>
                <p className="text-[10px] text-slate-500 font-sans">Harga nominal akan otomatis dihitung berdasarkan perkalian ini.</p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-slate-800">
              <button
                onClick={handleSaveRatios}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-98"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perkalian Harga</span>
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

 import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Settings, Table, PlusCircle, Trash2, Edit3, DollarSign, CheckCircle2, Clock, AlertCircle, ShoppingBag, ArrowLeft, RefreshCw, Key, Save, Plus, X, Package, Tag } from "lucide-react";

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

type DiscountType = "none" | "percent" | "nominal";

interface Product {
  id: string;
  name: string;
  nominalRobux: number;
  price: number;
  type: "Instan" | "Gamepass";
  discountType: DiscountType;
  discountValue: number;
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

const SEED_PRODUCTS: Product[] = [
  {
    id: "PRD-001",
    name: "Paket Robux Instan 80",
    nominalRobux: 80,
    price: 14000,
    type: "Instan",
    discountType: "none",
    discountValue: 0
  },
  {
    id: "PRD-002",
    name: "Paket Robux Instan 400",
    nominalRobux: 400,
    price: 70000,
    type: "Instan",
    discountType: "percent",
    discountValue: 10
  },
  {
    id: "PRD-003",
    name: "Paket Robux Gamepass 800",
    nominalRobux: 800,
    price: 108000,
    type: "Gamepass",
    discountType: "nominal",
    discountValue: 5000
  }
];

function calcFinalPrice(product: Product): number {
  if (product.discountType === "percent") {
    return Math.round(product.price - (product.price * product.discountValue) / 100);
  }
  if (product.discountType === "nominal") {
    return Math.max(0, product.price - product.discountValue);
  }
  return product.price;
}

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "produk" | "prices">("orders");

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

  const [instanRatio, setInstanRatio] = useState(175);
  const [gamepassRatio, setGamepassRatio] = useState(135);

  // Product CRUD state
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    nominalRobux: 80,
    price: 14000,
    type: "Instan" as "Instan" | "Gamepass",
    discountType: "none" as DiscountType,
    discountValue: 0
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "tofav2026" || pin === "admin123" || pin === "topbuxadmin") {
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("PIN Admin salah! Gunakan 'admin123' atau 'tofav2026' untuk demo");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadStoredOrders();
      loadStoredProducts();
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
      localStorage.setItem("topbux_orders", JSON.stringify([]));
      setOrders(SEED_ORDERS);
    }
  };

  const loadStoredProducts = () => {
    const stored = localStorage.getItem("topbux_products");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Product[];
        setProducts(parsed);
      } catch (e) {
        setProducts(SEED_PRODUCTS);
        localStorage.setItem("topbux_products", JSON.stringify(SEED_PRODUCTS));
      }
    } else {
      localStorage.setItem("topbux_products", JSON.stringify(SEED_PRODUCTS));
      setProducts(SEED_PRODUCTS);
    }
  };

  const persistProducts = (list: Product[]) => {
    setProducts(list);
    localStorage.setItem("topbux_products", JSON.stringify(list));
  };

  const handleSaveRatios = () => {
    localStorage.setItem("topbux_ratio_instan", String(instanRatio));
    localStorage.setItem("topbux_ratio_gamepass", String(gamepassRatio));
    alert("Perbandingan harga berhasil disimpan dan terintegrasi di catalog utama!");
  };

  const handleDeleteOrder = (orderId: string) => {
    const updated = orders.filter(o => o.id !== orderId);
    setOrders(updated);
    const userOnly = updated.filter(o => !SEED_ORDERS.some(s => s.id === o.id));
    localStorage.setItem("topbux_orders", JSON.stringify(userOnly));
  };

  const handleUpdateStatus = (orderId: string, status: "Diproses" | "Pending" | "Selesai") => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    setOrders(updated);
    const userOnly = updated.filter(o => !SEED_ORDERS.some(s => s.id === o.id));
    localStorage.setItem("topbux_orders", JSON.stringify(userOnly));
  };

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

  // Product CRUD handlers
  const openAddProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      name: "",
      nominalRobux: 80,
      price: 14000,
      type: "Instan",
      discountType: "none",
      discountValue: 0
    });
    setShowProductModal(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      nominalRobux: product.nominalRobux,
      price: product.price,
      type: product.type,
      discountType: product.discountType,
      discountValue: product.discountValue
    });
    setShowProductModal(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProductId) {
      const updated = products.map(p =>
        p.id === editingProductId
          ? { ...p, ...productForm }
          : p
      );
      persistProducts(updated);
    } else {
      const newProduct: Product = {
        id: `PRD-${Math.floor(100 + Math.random() * 900)}`,
        ...productForm
      };
      persistProducts([newProduct, ...products]);
    }

    setShowProductModal(false);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    persistProducts(updated);
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.priceIdr, 0);
  const totalRobux = orders.reduce((acc, o) => acc + o.nominalRobux, 0);
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const processedCount = orders.filter(o => o.status === "Diproses").length;
  const completedCount = orders.filter(o => o.status === "Selesai").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="absolute top-4 left-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-blue-100 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Web Utama
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl border border-blue-100 shadow-2xl max-w-md w-full text-center space-y-6"
        >
          <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="font-heading font-extrabold text-xl text-slate-900">TopBux Admin Panel</h2>
            <p className="text-xs text-slate-500 font-sans">
              Halaman khusus untuk mengelola transaksi & harga Robux.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2" htmlFor="admin-pin">
                Masukkan PIN Rahasia <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="admin-pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Contoh: nami2026 atau admin123"
                  className="w-full bg-blue-50/60 border border-blue-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400"
                />
                <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              </div>
              {pinError && (
                <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 text-sm cursor-pointer active:scale-98"
            >
              Log In Ke Dashboard
            </button>
          </form>

          
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 text-slate-800 flex flex-col">
      {/* Admin Header */}
      <header className="bg-white border-b border-blue-100 py-4 px-6 sticky top-0 z-30 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-xl">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-base tracking-tight text-slate-900 block">
              TopBux Admin Dashboard
            </span>
            <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
              Mode Integrasi Aktif
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`text-xs font-semibold py-2 px-3.5 rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "orders"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            }`}
          >
            <Table className="w-4 h-4" />
            <span className="hidden sm:inline">Transaksi</span>
          </button>

          <button
            onClick={() => setActiveTab("produk")}
            className={`text-xs font-semibold py-2 px-3.5 rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "produk"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Produk</span>
          </button>

          <button
            onClick={() => setActiveTab("prices")}
            className={`text-xs font-semibold py-2 px-3.5 rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "prices"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Ratio Harga</span>
          </button>

          <button 
            onClick={onClose}
            className="text-xs bg-red-50 hover:bg-red-500 text-red-500 hover:text-white font-semibold py-2 px-3.5 rounded-xl border border-red-200 transition-all cursor-pointer"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-grow p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Statistics Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Pendapatan</p>
              <p className="font-heading font-extrabold text-lg sm:text-xl text-blue-600 mt-1">
                Rp {totalRevenue.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="bg-blue-500/10 text-blue-600 p-2.5 rounded-xl border border-blue-500/10 hidden sm:block">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Robux Terjual</p>
              <p className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 mt-1">
                {totalRobux.toLocaleString("id-ID")} R$
              </p>
            </div>
            <div className="bg-blue-500/10 text-blue-600 p-2.5 rounded-xl border border-blue-500/10 hidden sm:block">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm flex items-center justify-between">
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

          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pemesanan Selesai</p>
              <p className="font-heading font-extrabold text-lg sm:text-xl text-blue-600 mt-1">
                {completedCount} Pesanan
              </p>
            </div>
            <div className="bg-blue-500/10 text-blue-600 p-2.5 rounded-xl border border-blue-500/10 hidden sm:block">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab View Switcher */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            
            {/* Header Table Actions */}
            <div className="flex justify-between items-center flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-slate-900">Daftar Transaksi Pelanggan</h3>
                <button 
                  onClick={loadStoredOrders}
                  className="p-1.5 bg-white hover:bg-blue-50 text-slate-600 rounded-lg transition-colors cursor-pointer border border-blue-100"
                  title="Refresh Data"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setShowAddOrder(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Transaksi Manual</span>
              </button>
            </div>

            {/* New Order Modal (Popup overlay) */}
            {showAddOrder && (
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative"
                >
                  <button 
                    onClick={() => setShowAddOrder(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-6 flex items-center gap-2 border-b border-blue-100 pb-3">
                    <PlusCircle className="text-blue-600 w-5 h-5" />
                    <span>Tambah Transaksi Baru</span>
                  </h3>

                  <form onSubmit={handleAddOrderSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          value={newOrder.name}
                          onChange={e => setNewOrder({ ...newOrder, name: e.target.value })}
                          className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Username Roblox</label>
                        <input
                          type="text"
                          required
                          value={newOrder.username}
                          onChange={e => setNewOrder({ ...newOrder, username: e.target.value })}
                          className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Nomor WhatsApp</label>
                        <input
                          type="text"
                          required
                          value={newOrder.whatsappNumber}
                          onChange={e => setNewOrder({ ...newOrder, whatsappNumber: e.target.value })}
                          className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Status Awal</label>
                        <select
                          value={newOrder.status}
                          onChange={e => setNewOrder({ ...newOrder, status: e.target.value as any })}
                          className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                        >
                          <option value="Diproses">Diproses</option>
                          <option value="Pending">Pending</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Tipe Produk</label>
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
                          className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                        >
                          <option value="Robux Instan">Robux Instan</option>
                          <option value="Robux Gamepass">Robux Gamepass</option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Jumlah Robux</label>
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
                          className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Total Harga (Rp)</label>
                        <input
                          type="number"
                          required
                          value={newOrder.priceIdr}
                          onChange={e => setNewOrder({ ...newOrder, priceIdr: Number(e.target.value) })}
                          className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/10 text-sm mt-4 cursor-pointer"
                    >
                      Kirim Transaksi & Simpan
                    </button>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Interactive Data Table */}
            <div className="bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-50 border-b border-blue-100 text-xs text-slate-500 font-bold uppercase">
                      <th className="py-4 px-5">ID Order</th>
                      <th className="py-4 px-5">Pelanggan</th>
                      <th className="py-4 px-5">Produk</th>
                      <th className="py-4 px-5">Nominal</th>
                      <th className="py-4 px-5">Total Harga</th>
                      <th className="py-4 px-5">Status Proses</th>
                      <th className="py-4 px-5 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50 text-sm">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          Belum ada transaksi pelanggan terdaftar.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="py-4 px-5 font-mono text-xs text-slate-500 font-bold">
                            {order.id}
                          </td>
                          <td className="py-4 px-5">
                            <p className="font-bold text-slate-900 text-xs">{order.username}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{order.name} | {order.whatsappNumber}</p>
                          </td>
                          <td className="py-4 px-5 text-xs text-slate-600 font-medium">
                            {order.productType}
                          </td>
                          <td className="py-4 px-5 font-extrabold text-slate-900 text-xs">
                            {order.nominalRobux} R$
                          </td>
                          <td className="py-4 px-5 font-extrabold text-blue-600 text-xs">
                            Rp {order.priceIdr.toLocaleString("id-ID")}
                          </td>
                          <td className="py-4 px-5">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value as any)}
                              className={`text-[11px] font-bold px-2 py-1.5 rounded-lg border focus:outline-none transition-colors ${
                                order.status === "Selesai"
                                  ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                  : order.status === "Diproses"
                                  ? "bg-sky-500/10 text-sky-600 border-sky-500/20"
                                  : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              }`}
                            >
                              <option value="Pending" className="bg-white text-amber-500">Pending</option>
                              <option value="Diproses" className="bg-white text-sky-600">Diproses</option>
                              <option value="Selesai" className="bg-white text-blue-600">Selesai</option>
                            </select>
                          </td>
                          <td className="py-4 px-5">
                            <div className="flex items-center justify-center gap-2">
                              <a
                                href={`https://wa.me/${order.whatsappNumber.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 rounded-lg border border-blue-100 transition-all cursor-pointer"
                                title="Chat WhatsApp Pelanggan"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg border border-red-100 transition-all cursor-pointer"
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
        )}

        {activeTab === "produk" && (
          <div className="space-y-4">
            {/* Header Actions */}
            <div className="flex justify-between items-center flex-wrap gap-3">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">Kelola Produk Robux</h3>
              <button
                onClick={openAddProductModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk</span>
              </button>
            </div>

            {/* Add/Edit Product Modal */}
            {showProductModal && (
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative"
                >
                  <button 
                    onClick={() => setShowProductModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-6 flex items-center gap-2 border-b border-blue-100 pb-3">
                    <Package className="text-blue-600 w-5 h-5" />
                    <span>{editingProductId ? "Edit Produk" : "Tambah Produk Baru"}</span>
                  </h3>

                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Nama Produk</label>
                      <input
                        type="text"
                        required
                        value={productForm.name}
                        onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                        placeholder="Contoh: Paket Robux Instan 400"
                        className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Tipe Produk</label>
                        <select
                          value={productForm.type}
                          onChange={e => setProductForm({ ...productForm, type: e.target.value as "Instan" | "Gamepass" })}
                          className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                        >
                          <option value="Instan">Robux Instan</option>
                          <option value="Gamepass">Robux Gamepass</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Nominal Robux</label>
                        <input
                          type="number"
                          required
                          value={productForm.nominalRobux}
                          onChange={e => setProductForm({ ...productForm, nominalRobux: Number(e.target.value) })}
                          className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Harga Normal (Rp)</label>
                      <input
                        type="number"
                        required
                        value={productForm.price}
                        onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                        className="w-full bg-blue-50/60 border border-blue-100 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                      />
                    </div>

                    <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Diskon Produk</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1.5">Jenis Diskon</label>
                          <select
                            value={productForm.discountType}
                            onChange={e => setProductForm({ ...productForm, discountType: e.target.value as DiscountType, discountValue: 0 })}
                            className="w-full bg-white border border-blue-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                          >
                            <option value="none">Tanpa Diskon</option>
                            <option value="percent">Persen (%)</option>
                            <option value="nominal">Nominal (Rp)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1.5">
                            Nilai Diskon {productForm.discountType === "percent" ? "(%)" : productForm.discountType === "nominal" ? "(Rp)" : ""}
                          </label>
                          <input
                            type="number"
                            disabled={productForm.discountType === "none"}
                            value={productForm.discountValue}
                            onChange={e => setProductForm({ ...productForm, discountValue: Number(e.target.value) })}
                            className="w-full bg-white border border-blue-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>

                      {productForm.discountType !== "none" && (
                        <p className="text-xs text-slate-500">
                          Harga akhir:{" "}
                          <span className="font-extrabold text-blue-600">
                            Rp {calcFinalPrice({ ...productForm, id: "", } as Product).toLocaleString("id-ID")}
                          </span>
                          {" "}
                          <span className="line-through text-slate-400 ml-1">
                            Rp {productForm.price.toLocaleString("id-ID")}
                          </span>
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/10 text-sm mt-2 cursor-pointer"
                    >
                      {editingProductId ? "Simpan Perubahan" : "Tambah Produk"}
                    </button>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-50 border-b border-blue-100 text-xs text-slate-500 font-bold uppercase">
                      <th className="py-4 px-5">ID Produk</th>
                      <th className="py-4 px-5">Nama Produk</th>
                      <th className="py-4 px-5">Tipe</th>
                      <th className="py-4 px-5">Nominal</th>
                      <th className="py-4 px-5">Harga</th>
                      <th className="py-4 px-5">Diskon</th>
                      <th className="py-4 px-5 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50 text-sm">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          Belum ada produk terdaftar.
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => {
                        const finalPrice = calcFinalPrice(product);
                        const hasDiscount = product.discountType !== "none" && product.discountValue > 0;
                        return (
                          <tr key={product.id} className="hover:bg-blue-50/50 transition-colors">
                            <td className="py-4 px-5 font-mono text-xs text-slate-500 font-bold">
                              {product.id}
                            </td>
                            <td className="py-4 px-5 font-bold text-slate-900 text-xs">
                              {product.name}
                            </td>
                            <td className="py-4 px-5">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                                product.type === "Instan"
                                  ? "bg-sky-500/10 text-sky-600"
                                  : "bg-blue-500/10 text-blue-600"
                              }`}>
                                {product.type === "Instan" ? "Robux Instan" : "Robux Gamepass"}
                              </span>
                            </td>
                            <td className="py-4 px-5 font-extrabold text-slate-900 text-xs">
                              {product.nominalRobux} R$
                            </td>
                            <td className="py-4 px-5">
                              {hasDiscount ? (
                                <div className="flex flex-col">
                                  <span className="text-[10px] text-slate-400 line-through">
                                    Rp {product.price.toLocaleString("id-ID")}
                                  </span>
                                  <span className="font-extrabold text-blue-600 text-xs">
                                    Rp {finalPrice.toLocaleString("id-ID")}
                                  </span>
                                </div>
                              ) : (
                                <span className="font-extrabold text-blue-600 text-xs">
                                  Rp {product.price.toLocaleString("id-ID")}
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-5">
                              {hasDiscount ? (
                                <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-red-500/10 text-red-500">
                                  {product.discountType === "percent"
                                    ? `-${product.discountValue}%`
                                    : `-Rp ${product.discountValue.toLocaleString("id-ID")}`}
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium text-slate-400">-</span>
                              )}
                            </td>
                            <td className="py-4 px-5">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => openEditProductModal(product)}
                                  className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 rounded-lg border border-blue-100 transition-all cursor-pointer"
                                  title="Edit Produk"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="p-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg border border-red-100 transition-all cursor-pointer"
                                  title="Hapus Produk"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "prices" && (
          <div className="bg-white rounded-3xl border border-blue-100 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-blue-100 pb-3">
              <Settings className="text-blue-600 w-5 h-5" />
              <span>Pengaturan Ratio Konversi Harga Robux</span>
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-2xl">
              Gunakan panel ini untuk menyesuaikan nilai perkalian harga per nominal Robux. Perubahan di bawah ini akan memengaruhi perhitungan harga produk Robux di katalog secara real-time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 space-y-3">
                <h4 className="font-bold text-xs text-slate-600 uppercase tracking-wider">Perkalian Robux Instan</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-500">Rp</span>
                  <input
                    type="number"
                    value={instanRatio}
                    onChange={(e) => setInstanRatio(Number(e.target.value))}
                    className="bg-white border border-blue-200 px-3 py-2 rounded-xl text-base font-extrabold text-slate-900 w-28 text-center"
                  />
                  <span className="text-xs text-slate-400 font-bold">per 1 R$ (Instan)</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans">Harga nominal akan otomatis dihitung berdasarkan perkalian ini.</p>
              </div>

              <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 space-y-3">
                <h4 className="font-bold text-xs text-slate-600 uppercase tracking-wider">Perkalian Robux Gamepass</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-500">Rp</span>
                  <input
                    type="number"
                    value={gamepassRatio}
                    onChange={(e) => setGamepassRatio(Number(e.target.value))}
                    className="bg-white border border-blue-200 px-3 py-2 rounded-xl text-base font-extrabold text-slate-900 w-28 text-center"
                  />
                  <span className="text-xs text-slate-400 font-bold">per 1 R$ (Gamepass)</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans">Harga nominal akan otomatis dihitung berdasarkan perkalian ini.</p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-blue-100">
              <button
                onClick={handleSaveRatios}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-98"
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
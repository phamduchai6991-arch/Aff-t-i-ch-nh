import React, { useState, useEffect, useMemo } from 'react';
import { FinancialProduct, Lead, ProductCategory, AdminUser } from './types';
import { getProducts, getLeads } from './utils/storage';
import { verifyCurrentSession, logoutAdmin } from './services/api';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ApplicationGuideModal } from './components/ApplicationGuideModal';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { LoanCalculator } from './components/LoanCalculator';
import { QuickChecker } from './components/QuickChecker';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminPortal } from './components/admin/AdminPortal';
import { 
  CreditCard, 
  Banknote, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck, 
  Layers 
} from 'lucide-react';

export default function App() {
  // Navigation view: 'public' or 'admin'
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');

  // Admin authentication state
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isVerifyingAuth, setIsVerifyingAuth] = useState(true);

  // Products and leads
  const [products, setProducts] = useState<FinancialProduct[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rate' | 'limit'>('popular');

  // Public Modals state
  const [guideModalProduct, setGuideModalProduct] = useState<FinancialProduct | null>(null);
  const [applyModalProduct, setApplyModalProduct] = useState<FinancialProduct | null>(null);

  // Check URL hash or path on load & verify session
  useEffect(() => {
    async function init() {
      // Check if URL specifies admin
      if (window.location.hash === '#admin' || window.location.pathname.startsWith('/admin')) {
        setViewMode('admin');
      }

      // Verify stored admin session
      const user = await verifyCurrentSession();
      if (user) {
        setCurrentUser(user);
      }
      setIsVerifyingAuth(false);

      // Load products and leads
      const prods = await getProducts();
      setProducts(prods);

      const lds = await getLeads();
      setLeads(lds);
    }
    init();

    // Listen to hash change
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
      } else {
        setViewMode('public');
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    // Subtle shortcut: Ctrl+Shift+A or Alt+A to toggle Admin
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        window.location.hash = '#admin';
        setViewMode('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSwitchToAdmin = () => {
    window.location.hash = '#admin';
    setViewMode('admin');
  };

  const handleSwitchToPublic = () => {
    window.location.hash = '';
    setViewMode('public');
  };

  const handleAdminLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
  };

  const handleAdminLogout = async () => {
    await logoutAdmin();
    setCurrentUser(null);
  };

  const handleUpdateProduct = (updated: FinancialProduct) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  // Filtered & Sorted products for public view
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.provider.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'rate') {
        const rateA = parseFloat(a.interestRate.replace(/[^0-9.]/g, '')) || 99;
        const rateB = parseFloat(b.interestRate.replace(/[^0-9.]/g, '')) || 99;
        return rateA - rateB;
      }
      if (sortBy === 'limit') {
        const limitA = parseInt(a.maxLimit.replace(/[^0-9]/g, '')) || 0;
        const limitB = parseInt(b.maxLimit.replace(/[^0-9]/g, '')) || 0;
        return limitB - limitA;
      }
      return (b.clicksCount || 0) - (a.clicksCount || 0);
    });
  }, [products, activeCategory, searchQuery, sortBy]);

  const loansList = useMemo(() => {
    return filteredProducts.filter(p => p.category === 'loan');
  }, [filteredProducts]);

  const cardsList = useMemo(() => {
    return filteredProducts.filter(p => p.category === 'card');
  }, [filteredProducts]);

  const handleOpenGeneralApply = () => {
    const defaultProduct = products[0] || null;
    setApplyModalProduct(defaultProduct);
  };

  const handleApplyCalculatedLoan = (amount: string, tenor: string) => {
    const loanProd = products.find(p => p.category === 'loan') || products[0];
    if (loanProd) {
      setApplyModalProduct({
        ...loanProd,
        maxLimit: amount,
        tenor: tenor
      });
    }
  };

  // --- RENDER ADMIN BACKEND IF IN ADMIN MODE ---
  if (viewMode === 'admin') {
    if (isVerifyingAuth) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs font-mono">
          Đang xác thực hệ thống Backend...
        </div>
      );
    }

    if (!currentUser) {
      return (
        <AdminLogin
          onSuccess={handleAdminLoginSuccess}
          onBackToHome={handleSwitchToPublic}
        />
      );
    }

    return (
      <AdminPortal
        currentUser={currentUser}
        onLogout={handleAdminLogout}
        onBackToHome={handleSwitchToPublic}
        products={products}
        onUpdateProduct={handleUpdateProduct}
      />
    );
  }

  // --- RENDER PUBLIC WEBSITE ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenAdmin={handleSwitchToAdmin}
        onOpenQuickApply={handleOpenGeneralApply}
        leadsCount={leads.length}
      />

      {/* Hero Section */}
      <Hero
        activeTab={activeCategory}
        onSelectTab={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenQuickApply={handleOpenGeneralApply}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Sort & Quick Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeCategory === 'loan' 
                ? 'Các gói Vay Tín Chấp Tiêu Dùng' 
                : activeCategory === 'card' 
                ? 'Các loại Thẻ Tín Dụng Ngân Hàng' 
                : 'Danh sách các gói vay & Thẻ tín dụng'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hiển thị {filteredProducts.length} gói ưu đãi lãi suất tốt nhất hôm nay
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Sắp xếp theo:</span>
            <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200">
              <button
                onClick={() => setSortBy('popular')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  sortBy === 'popular' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Phổ biến nhất
              </button>
              <button
                onClick={() => setSortBy('rate')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  sortBy === 'rate' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lãi suất thấp
              </button>
              <button
                onClick={() => setSortBy('limit')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  sortBy === 'limit' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hạn mức cao
              </button>
            </div>
          </div>
        </div>

        {/* Section 1: Vay Tín Chấp */}
        {(activeCategory === 'all' || activeCategory === 'loan') && loansList.length > 0 && (
          <section id="goi-vay" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Banknote className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Vay Tín Chấp Tiêu Dùng Online
                  </h3>
                  <p className="text-xs text-slate-500">
                    Giải ngân siêu tốc từ 15 phút đến 24 giờ · Không cần thế chấp tài sản
                  </p>
                </div>
              </div>

              {activeCategory === 'all' && (
                <button
                  onClick={() => setActiveCategory('loan')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Xem thêm gói vay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loansList.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenGuide={(prod) => setGuideModalProduct(prod)}
                  onOpenApply={(prod) => setApplyModalProduct(prod)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Thẻ Tín Dụng */}
        {(activeCategory === 'all' || activeCategory === 'card') && cardsList.length > 0 && (
          <section id="the-tin-dung" className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Mở Thẻ Tín Dụng Ngân Hàng
                  </h3>
                  <p className="text-xs text-slate-500">
                    Miễn lãi tới 55 ngày · Hoàn tiền chi tiêu ăn uống, mua sắm lên tới 15%
                  </p>
                </div>
              </div>

              {activeCategory === 'all' && (
                <button
                  onClick={() => setActiveCategory('card')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Xem thêm thẻ tín dụng</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cardsList.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenGuide={(prod) => setGuideModalProduct(prod)}
                  onOpenApply={(prod) => setApplyModalProduct(prod)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <p className="text-sm font-semibold text-slate-700">
              Không tìm thấy gói vay hoặc thẻ tín dụng phù hợp với "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-blue-600 hover:underline"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          </div>
        )}

        {/* Section: 4-Step Application Flow */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
              Quy trình nhanh gọn 4 bước
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Đăng ký và nhận giải ngân dễ dàng
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Chỉ mất 5 phút đăng ký trên điện thoại, tiền chuyển thẳng vào tài khoản ATM của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Chọn gói & Điền thông tin',
                desc: 'Lựa chọn gói vay hoặc thẻ tín dụng phù hợp, nhập thông tin liên hệ cơ bản trên VayNhanh247.'
              },
              {
                step: '02',
                title: 'Nhận link đối tác & Tự thao tác',
                desc: 'Hệ thống lưu hồ sơ và hiển thị ngay đường link chính thức của ngân hàng để bạn tự làm thủ tục.'
              },
              {
                step: '03',
                title: 'Định danh eKYC bằng CCCD',
                desc: 'Chụp ảnh 2 mặt CCCD gắn chip và quét khuôn mặt theo hướng dẫn của hệ thống AI ngân hàng.'
              },
              {
                step: '04',
                title: 'Phê duyệt & Nhận tiền',
                desc: 'Nhận thông báo duyệt hạn mức sau 15 phút. Tiền giải ngân về tài khoản hoặc thẻ gửi tận nhà.'
              }
            ].map((st) => (
              <div key={st.step} className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="text-2xl font-black text-blue-600 font-mono">
                  {st.step}
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Interactive Tool 1: Smart Eligibility Checker */}
      <QuickChecker
        products={products}
        onSelectProduct={(prod) => setApplyModalProduct(prod)}
      />

      {/* Interactive Tool 2: Loan Repayment Calculator */}
      <LoanCalculator
        onApplyCalculatedLoan={handleApplyCalculatedLoan}
      />

      {/* Section: FAQ & Anti-fraud warnings */}
      <FaqSection />

      {/* Footer */}
      <Footer
        onOpenAdmin={handleSwitchToAdmin}
      />

      {/* Floating Action Buttons */}
      <FloatingActions
        onOpenConsultation={handleOpenGeneralApply}
        onOpenAdmin={handleSwitchToAdmin}
        leadsCount={leads.length}
      />

      {/* Modal 1: Step-by-step Application Guide */}
      <ApplicationGuideModal
        product={guideModalProduct}
        onClose={() => setGuideModalProduct(null)}
        onProceedToApply={(prod) => {
          setGuideModalProduct(null);
          setApplyModalProduct(prod);
        }}
      />

      {/* Modal 2: Lead Capture & Post-Submission Direct Affiliate Link */}
      <LeadCaptureModal
        product={applyModalProduct}
        onClose={() => setApplyModalProduct(null)}
        onLeadSuccess={(newLead) => {
          setLeads(prev => [newLead, ...prev]);
        }}
      />
    </div>
  );
}

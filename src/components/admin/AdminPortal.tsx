import React, { useState, useEffect } from 'react';
import { Lead, FinancialProduct, AdminUser, AnalyticsData, ApplicationStep } from '../../types';
import { 
  fetchLeads, 
  updateLeadStatusAndNotes, 
  addLeadActivity, 
  deleteLeadById, 
  batchUpdateLeads, 
  batchDeleteLeads,
  fetchAnalytics, 
  logoutAdmin 
} from '../../services/api';
import { saveCustomProduct, formatCurrencyVND } from '../../utils/storage';
import { VIETNAM_PROVINCES, INCOME_RANGES, LOAN_AMOUNTS, CARD_LIMITS } from '../../data/financialProducts';
import { 
  Users, 
  BarChart3, 
  Link2, 
  UserPlus, 
  Download, 
  Search, 
  Phone, 
  MessageSquare, 
  Trash2, 
  CheckCircle, 
  Save, 
  ExternalLink,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  LogOut,
  Home,
  ChevronRight,
  Eye,
  Plus,
  RefreshCw,
  X,
  FileSpreadsheet,
  ArrowUpRight,
  HelpCircle,
  BookOpen,
  Edit3,
  Layers,
  Sparkles
} from 'lucide-react';

interface AdminPortalProps {
  currentUser: AdminUser;
  onLogout: () => void;
  onBackToHome: () => void;
  products: FinancialProduct[];
  onUpdateProduct: (product: FinancialProduct) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentUser,
  onLogout,
  onBackToHome,
  products,
  onUpdateProduct
}) => {
  const [activeMenu, setActiveMenu] = useState<'leads' | 'dashboard' | 'create_lead' | 'affiliates' | 'guides'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  // Selected Lead Drawer / Detail modal
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [newActivityNote, setNewActivityNote] = useState('');
  const [newActivityType, setNewActivityType] = useState<'call' | 'zalo' | 'system'>('call');

  // Affiliate link editing
  const [editingAffiliateId, setEditingAffiliateId] = useState<string | null>(null);
  const [affiliateInputUrl, setAffiliateInputUrl] = useState('');

  // Guide & Bank Customization State
  const [selectedBankId, setSelectedBankId] = useState<string>(products[0]?.id || 'vpbank-fast');
  const [editingProduct, setEditingProduct] = useState<FinancialProduct | null>(null);
  const [guideSaveMessage, setGuideSaveMessage] = useState('');
  const [previewGuideModal, setPreviewGuideModal] = useState<FinancialProduct | null>(null);

  // Synchronize editing product when selectedBankId or products change
  useEffect(() => {
    const found = products.find(p => p.id === selectedBankId);
    if (found) {
      setEditingProduct(JSON.parse(JSON.stringify(found)));
    } else if (products.length > 0) {
      setSelectedBankId(products[0].id);
      setEditingProduct(JSON.parse(JSON.stringify(products[0])));
    }
  }, [selectedBankId, products]);

  // Manual Lead Creation Form
  const [manualForm, setManualForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    province: VIETNAM_PROVINCES[0],
    productId: products[0]?.id || 'vpbank-fast',
    loanAmount: '30.000.000 đ',
    monthlyIncome: 'Từ 5 - 10 triệu / tháng',
    employmentType: 'Đi làm hưởng lương (Công ty/Cơ quan)',
    hasBadDebt: 'none' as const,
    notes: ''
  });
  const [manualSuccessMsg, setManualSuccessMsg] = useState('');

  // Load leads and analytics
  const loadData = async () => {
    setIsLoading(true);
    try {
      const leadsRes = await fetchLeads({
        search: searchQuery,
        status: statusFilter,
        category: categoryFilter
      });
      setLeads(leadsRes.leads);

      const analyticsData = await fetchAnalytics();
      if (analyticsData) setAnalytics(analyticsData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchQuery, statusFilter, categoryFilter]);

  // Handle single status change
  const handleStatusChange = async (leadId: string, newStatus: any) => {
    await updateLeadStatusAndNotes(leadId, { status: newStatus });
    loadData();
    if (viewingLead && viewingLead.id === leadId) {
      setViewingLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Handle adding activity/call note
  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingLead || !newActivityNote.trim()) return;

    await addLeadActivity(viewingLead.id, newActivityType, newActivityNote.trim());
    setNewActivityNote('');
    loadData();

    // Update local viewing lead activities
    const updatedActivities = viewingLead.activities ? [...viewingLead.activities] : [];
    updatedActivities.unshift({
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: newActivityType,
      note: newActivityNote.trim()
    });
    setViewingLead({ ...viewingLead, activities: updatedActivities });
  };

  // Delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa hồ sơ khách hàng này khỏi hệ thống?')) {
      await deleteLeadById(leadId);
      if (viewingLead?.id === leadId) setViewingLead(null);
      loadData();
    }
  };

  // Batch status update
  const handleBatchStatus = async (status: string) => {
    if (selectedLeadIds.length === 0) return;
    await batchUpdateLeads(selectedLeadIds, status);
    setSelectedLeadIds([]);
    loadData();
  };

  // Batch delete
  const handleBatchDelete = async () => {
    if (selectedLeadIds.length === 0) return;
    if (confirm(`Bạn có chắc muốn xóa ${selectedLeadIds.length} hồ sơ đã chọn?`)) {
      await batchDeleteLeads(selectedLeadIds);
      setSelectedLeadIds([]);
      loadData();
    }
  };

  // Toggle select all
  const handleToggleSelectAll = () => {
    if (selectedLeadIds.length === leads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(leads.map(l => l.id));
    }
  };

  // Handle Manual Lead Create
  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.fullName || !manualForm.phoneNumber) {
      alert('Vui lòng điền họ tên và số điện thoại');
      return;
    }

    const prod = products.find(p => p.id === manualForm.productId) || products[0];

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...manualForm,
          productName: prod?.name || 'Gói vay tư vấn',
          productCategory: prod?.category || 'loan'
        })
      });
      if (res.ok) {
        setManualSuccessMsg('Đã tạo hồ sơ khách hàng mới thành công!');
        setManualForm({
          fullName: '',
          phoneNumber: '',
          email: '',
          province: VIETNAM_PROVINCES[0],
          productId: products[0]?.id || 'vpbank-fast',
          loanAmount: '30.000.000 đ',
          monthlyIncome: 'Từ 5 - 10 triệu / tháng',
          employmentType: 'Đi làm hưởng lương (Công ty/Cơ quan)',
          hasBadDebt: 'none',
          notes: ''
        });
        loadData();
        setTimeout(() => setManualSuccessMsg(''), 4000);
      }
    } catch {
      alert('Lỗi tạo hồ sơ');
    }
  };

  // Handle Affiliate link update
  const handleSaveAffiliate = (prod: FinancialProduct) => {
    if (!affiliateInputUrl.trim()) return;
    const updated = { ...prod, affiliateUrl: affiliateInputUrl.trim() };
    saveCustomProduct(updated);
    onUpdateProduct(updated);
    setEditingAffiliateId(null);
    alert('Đã cập nhật link affiliate thành công!');
  };

  // --- GUIDE & STEPS EDITOR HANDLERS ---
  const handleStepChange = (index: number, field: keyof ApplicationStep, value: string) => {
    if (!editingProduct) return;
    const steps = [...editingProduct.applicationSteps];
    steps[index] = { ...steps[index], [field]: value };
    setEditingProduct({ ...editingProduct, applicationSteps: steps });
  };

  const handleAddStep = () => {
    if (!editingProduct) return;
    const steps = [...editingProduct.applicationSteps];
    steps.push({
      stepNumber: steps.length + 1,
      title: `Bước ${steps.length + 1}: Thao tác trên cổng ${editingProduct.provider}`,
      description: 'Nhập thông tin hướng dẫn chi tiết dành cho khách hàng...',
      tip: 'Mẹo tăng tỷ lệ duyệt nhanh hồ sơ'
    });
    setEditingProduct({ ...editingProduct, applicationSteps: steps });
  };

  const handleRemoveStep = (index: number) => {
    if (!editingProduct || editingProduct.applicationSteps.length <= 1) {
      alert('Cần có ít nhất 1 bước hướng dẫn');
      return;
    }
    const steps = editingProduct.applicationSteps
      .filter((_, idx) => idx !== index)
      .map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    setEditingProduct({ ...editingProduct, applicationSteps: steps });
  };

  const handleRequirementChange = (index: number, value: string) => {
    if (!editingProduct) return;
    const reqs = [...editingProduct.requirements];
    reqs[index] = value;
    setEditingProduct({ ...editingProduct, requirements: reqs });
  };

  const handleAddRequirement = () => {
    if (!editingProduct) return;
    const reqs = [...editingProduct.requirements, 'Điều kiện mới cần bổ sung'];
    setEditingProduct({ ...editingProduct, requirements: reqs });
  };

  const handleRemoveRequirement = (index: number) => {
    if (!editingProduct || editingProduct.requirements.length <= 1) return;
    const reqs = editingProduct.requirements.filter((_, idx) => idx !== index);
    setEditingProduct({ ...editingProduct, requirements: reqs });
  };

  const handleSaveGuideProduct = async () => {
    if (!editingProduct) return;
    await saveCustomProduct(editingProduct);
    onUpdateProduct(editingProduct);
    setGuideSaveMessage(`Đã lưu hướng dẫn & thông tin cho ${editingProduct.name} thành công!`);
    setTimeout(() => setGuideSaveMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans antialiased">
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand lockup */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md shadow-blue-500/20">
                SKV
              </span>
              <div>
                <span className="font-extrabold tracking-tight text-white text-sm">
                  sosanhkhoanvay<span className="text-blue-500">.com</span>
                </span>
                <span className="block text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
                  Admin Console
                </span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveMenu('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'leads'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Quản lý Leads (CRM)</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeMenu === 'leads' ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveMenu('guides')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'guides'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Tùy chỉnh Hướng dẫn Bank</span>
              </div>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Báo cáo & Thống kê</span>
            </button>

            <button
              onClick={() => setActiveMenu('create_lead')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'create_lead'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Tạo Lead thủ công</span>
            </button>

            <button
              onClick={() => setActiveMenu('affiliates')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'affiliates'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>Cấu hình Link Affiliate</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: User profile & public site button */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-900/60">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-xs">
              ĐH
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">
                {currentUser.displayName}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Đang đăng nhập ({currentUser.username})</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onBackToHome}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Mở giao diện khách hàng"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Xem Web</span>
            </button>

            <button
              onClick={onLogout}
              className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Đăng xuất khỏi hệ thống"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT WORKSPACE --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <h1 className="text-base sm:text-lg font-bold text-white">
              {activeMenu === 'leads' && 'Quản Lý Khách Hàng Tiềm Năng (Leads CRM)'}
              {activeMenu === 'guides' && 'Tùy Chỉnh Hướng Dẫn & Thông Tin Từng Ngân Hàng'}
              {activeMenu === 'dashboard' && 'Thống Kê Doanh Thu & Hiệu Quả Tiếp Thị'}
              {activeMenu === 'create_lead' && 'Thêm Mới Hồ Sơ Khách Hàng (Telesale Entry)'}
              {activeMenu === 'affiliates' && 'Cấu Hình Link Tiếp Thị Liên Kết (Affiliate)'}
            </h1>
          </div>

          {/* Quick actions in top bar */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={loadData}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors cursor-pointer"
              title="Tải lại dữ liệu mới nhất"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <a
              href="/api/leads/export/csv"
              download
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              title="Tải toàn bộ danh sách khách hàng định dạng CSV/Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Xuất file Excel/CSV</span>
            </a>
          </div>
        </header>

        {/* --- VIEW: GUIDE & BANK CUSTOMIZATION (NEW) --- */}
        {activeMenu === 'guides' && (
          <div className="p-6 space-y-6">
            {/* Overview Banner */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Trình chỉnh sửa Hướng dẫn nộp hồ sơ đa ngân hàng</span>
                </div>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Tại đây bạn có thể thay đổi các bước hướng dẫn (Step 1, 2, 3, 4...), mẹo duyệt hồ sơ, điều kiện giấy tờ hoặc đường dẫn affiliate riêng cho từng ngân hàng. Thay đổi sẽ cập nhật ngay lập tức ra ngoài giao diện trang chủ cho khách hàng xem!
                </p>
              </div>

              {guideSaveMessage && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">{guideSaveMessage}</span>
                </div>
              )}
            </div>

            {/* Bank Selector Tabs (Vay & Thẻ) */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Chọn ngân hàng / sản phẩm muốn chỉnh sửa:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {products.map((prod) => {
                  const isSelected = selectedBankId === prod.id;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedBankId(prod.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`w-6 h-6 rounded text-[10px] font-bold flex items-center justify-center ${
                          isSelected ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {prod.providerInitial}
                        </span>
                        <span className="font-bold text-xs truncate">{prod.provider}</span>
                      </div>
                      <div className="text-[11px] truncate opacity-90">{prod.name}</div>
                      <div className="text-[10px] mt-1 opacity-75 font-mono">
                        {prod.category === 'loan' ? 'Vay tín chấp' : 'Thẻ tín dụng'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Product Editor Form */}
            {editingProduct && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-8">
                {/* Product Title & Basic Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${editingProduct.themeColor} text-white font-extrabold text-sm flex items-center justify-center shadow-md`}>
                      {editingProduct.providerInitial}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white flex items-center gap-2">
                        <span>Đang sửa hướng dẫn: {editingProduct.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-normal">
                          {editingProduct.category === 'loan' ? 'Gói Vay' : 'Thẻ Tín Dụng'}
                        </span>
                      </h2>
                      <p className="text-xs text-slate-400">
                        Nhà cung cấp: <span className="font-semibold text-white">{editingProduct.provider}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setPreviewGuideModal(editingProduct)}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>Xem thử popup</span>
                    </button>

                    <button
                      onClick={handleSaveGuideProduct}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Lưu Hướng Dẫn & Áp Dụng</span>
                    </button>
                  </div>
                </div>

                {/* Section 1: Hướng Dẫn Từng Bước (Steps Editor) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-blue-400" />
                        <span>1. Các bước hướng dẫn nộp hồ sơ ({editingProduct.applicationSteps.length} bước)</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Khách hàng sẽ đọc hướng dẫn này khi bấm "Xem hướng dẫn" ngoài trang chủ.
                      </p>
                    </div>

                    <button
                      onClick={handleAddStep}
                      className="px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm bước tiếp theo</span>
                    </button>
                  </div>

                  {/* Steps List */}
                  <div className="space-y-4">
                    {editingProduct.applicationSteps.map((step, idx) => (
                      <div key={idx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-3 relative">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-blue-400 font-mono">
                            BƯỚC {step.stepNumber || idx + 1}
                          </span>
                          <button
                            onClick={() => handleRemoveStep(idx)}
                            className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-700 rounded transition-colors"
                            title="Xóa bước này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Title input */}
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            Tiêu đề bước:
                          </label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                            placeholder="Ví dụ: Bấm nút 'Đến trang đăng ký chính thức'..."
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        {/* Description textarea */}
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            Mô tả chi tiết cách thức thao tác:
                          </label>
                          <textarea
                            rows={2}
                            value={step.description}
                            onChange={(e) => handleStepChange(idx, 'description', e.target.value)}
                            placeholder="Mô tả cụ thể khách hàng cần điền gì, chụp ảnh gì..."
                            className="w-full p-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        {/* Tip input */}
                        <div>
                          <label className="block text-[11px] font-semibold text-amber-400 mb-1">
                            Mẹo nhỏ tăng tỷ lệ duyệt 99% (nếu có):
                          </label>
                          <input
                            type="text"
                            value={step.tip || ''}
                            onChange={(e) => handleStepChange(idx, 'tip', e.target.value)}
                            placeholder="Ví dụ: Đứng ở nơi đủ ánh sáng để hệ thống AI quét CCCD..."
                            className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-amber-200 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2: Điều Kiện & Giấy Tờ Cần Chuẩn Bị (Requirements) */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>2. Điều kiện & Giấy tờ cần chuẩn bị ({editingProduct.requirements.length} điều kiện)</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Các tiêu chí bắt buộc (tuổi, CCCD, thu nhập, tình trạng CIC...).
                      </p>
                    </div>

                    <button
                      onClick={handleAddRequirement}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm điều kiện</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {editingProduct.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs text-blue-400 font-bold shrink-0">✓</span>
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => handleRequirementChange(idx, e.target.value)}
                          placeholder="Ví dụ: Công dân Việt Nam tuổi từ 20 đến 60..."
                          className="flex-1 px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={() => handleRemoveRequirement(idx)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded"
                          title="Xóa điều kiện này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Affiliate Link & Parameters */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-blue-400" />
                    <span>3. Đường link Affiliate & Thông số hiển thị</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Đường dẫn Affiliate đích (KH bấm vào sẽ mở link này):
                      </label>
                      <input
                        type="url"
                        value={editingProduct.affiliateUrl}
                        onChange={(e) => setEditingProduct({ ...editingProduct, affiliateUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3.5 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-blue-300 font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Hạn mức tối đa hiển thị:
                      </label>
                      <input
                        type="text"
                        value={editingProduct.maxLimit}
                        onChange={(e) => setEditingProduct({ ...editingProduct, maxLimit: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Lãi suất hiển thị:
                      </label>
                      <input
                        type="text"
                        value={editingProduct.interestRate}
                        onChange={(e) => setEditingProduct({ ...editingProduct, interestRate: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-semibold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Thời gian duyệt hồ sơ:
                      </label>
                      <input
                        type="text"
                        value={editingProduct.approvalSpeed}
                        onChange={(e) => setEditingProduct({ ...editingProduct, approvalSpeed: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Thu nhập tối thiểu yêu cầu:
                      </label>
                      <input
                        type="text"
                        value={editingProduct.minIncome}
                        onChange={(e) => setEditingProduct({ ...editingProduct, minIncome: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Save Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Bấm lưu để đồng bộ thay đổi vào cơ sở dữ liệu và hiển thị ngay ngoài website.
                  </div>
                  <button
                    onClick={handleSaveGuideProduct}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Tất Cả Cập Nhật Của {editingProduct.provider}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- VIEW 1: LEADS MANAGEMENT (CRM) --- */}
        {activeMenu === 'leads' && (
          <div className="p-6 space-y-5">
            {/* Filter & Search Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                {/* Search Box */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo Tên, SĐT, Tỉnh, Gói vay..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category filter */}
                <div className="flex items-center gap-2 w-full md:w-auto text-xs">
                  <span className="text-slate-400 text-[11px] whitespace-nowrap">Hình thức:</span>
                  <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg border border-slate-700">
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        categoryFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setCategoryFilter('loan')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        categoryFilter === 'loan' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Vay tín chấp
                    </button>
                    <button
                      onClick={() => setCategoryFilter('card')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        categoryFilter === 'card' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Thẻ tín dụng
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-800 text-xs">
                {[
                  { key: 'all', label: 'Tất cả trạng thái' },
                  { key: 'new', label: 'Mới đăng ký' },
                  { key: 'contacted', label: 'Đang liên hệ' },
                  { key: 'appointment', label: 'Hẹn gọi lại' },
                  { key: 'disbursed', label: 'Đã giải ngân / Mở thẻ' },
                  { key: 'rejected', label: 'Từ chối / Nợ xấu' }
                ].map(st => (
                  <button
                    key={st.key}
                    onClick={() => setStatusFilter(st.key)}
                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      statusFilter === st.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Batch Action Toolbar when checkboxes selected */}
            {selectedLeadIds.length > 0 && (
              <div className="bg-blue-950/60 border border-blue-800/80 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-blue-200">
                  Đã chọn {selectedLeadIds.length} khách hàng
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBatchStatus('contacted')}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium cursor-pointer"
                  >
                    Đổi: Đang gọi
                  </button>
                  <button
                    onClick={() => handleBatchStatus('disbursed')}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium cursor-pointer"
                  >
                    Đổi: Đã giải ngân
                  </button>
                  <button
                    onClick={handleBatchDelete}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa các mục đã chọn</span>
                  </button>
                </div>
              </div>
            )}

            {/* Leads Table */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/80 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-3 w-8">
                        <input
                          type="checkbox"
                          checked={selectedLeadIds.length === leads.length && leads.length > 0}
                          onChange={handleToggleSelectAll}
                          className="rounded bg-slate-800 border-slate-700 text-blue-600"
                        />
                      </th>
                      <th className="py-3 px-3">Mã & Thời gian</th>
                      <th className="py-3 px-3">Khách hàng & Liên hệ</th>
                      <th className="py-3 px-3">Tỉnh thành & Nghề nghiệp</th>
                      <th className="py-3 px-3">Gói tài chính & Nhu cầu</th>
                      <th className="py-3 px-3">Trạng thái chăm sóc</th>
                      <th className="py-3 px-3">Nhật ký Telesale</th>
                      <th className="py-3 px-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-500">
                          <Users className="w-8 h-8 mx-auto opacity-30 mb-2" />
                          <span>Chưa có hồ sơ nào phù hợp với bộ lọc hiện tại</span>
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => {
                        const isSelected = selectedLeadIds.includes(lead.id);
                        return (
                          <tr
                            key={lead.id}
                            className={`hover:bg-slate-800/40 transition-colors ${
                              isSelected ? 'bg-blue-950/20' : ''
                            }`}
                          >
                            <td className="py-3 px-3 align-top">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  if (isSelected) {
                                    setSelectedLeadIds(selectedLeadIds.filter(id => id !== lead.id));
                                  } else {
                                    setSelectedLeadIds([...selectedLeadIds, lead.id]);
                                  }
                                }}
                                className="rounded bg-slate-800 border-slate-700 text-blue-600 mt-1"
                              />
                            </td>

                            {/* ID and Created Time */}
                            <td className="py-3 px-3 align-top whitespace-nowrap">
                              <span className="font-mono font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded">
                                {lead.id}
                              </span>
                              <div className="text-[10px] text-slate-400 mt-1">
                                {new Date(lead.createdAt).toLocaleString('vi-VN', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </td>

                            {/* Customer info & Quick Call */}
                            <td className="py-3 px-3 align-top">
                              <div className="font-bold text-white text-xs">{lead.fullName}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <a
                                  href={`tel:${lead.phoneNumber}`}
                                  className="text-blue-400 hover:text-blue-300 font-mono font-semibold flex items-center gap-1 hover:underline"
                                  title="Gọi điện ngay"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{lead.phoneNumber}</span>
                                </a>
                                <a
                                  href={`https://zalo.me/${lead.phoneNumber}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-1.5 py-0.2 bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 rounded text-[10px] font-bold"
                                  title="Nhắn tin Zalo"
                                >
                                  Zalo
                                </a>
                              </div>
                            </td>

                            {/* Province & Employment */}
                            <td className="py-3 px-3 align-top">
                              <div className="text-slate-200 font-medium">{lead.province}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{lead.employmentType}</div>
                              <div className="text-[10px] text-slate-500">Lương: {lead.monthlyIncome}</div>
                            </td>

                            {/* Financial Package & Requested Amount */}
                            <td className="py-3 px-3 align-top">
                              <div className="font-medium text-slate-200 line-clamp-1">{lead.productName}</div>
                              <div className="font-bold text-emerald-400 font-mono mt-0.5">
                                {lead.loanAmount}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {lead.hasBadDebt === 'none' ? 'CIC: Tốt 100%' : (lead.hasBadDebt === 'cic_low' ? 'CIC: Chậm nhẹ' : 'CIC: Có nợ chú ý')}
                              </div>
                            </td>

                            {/* Status Selector */}
                            <td className="py-3 px-3 align-top">
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                className={`text-[11px] font-semibold py-1 px-2 rounded-lg border focus:outline-none transition-colors ${
                                  lead.status === 'disbursed'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : lead.status === 'contacted'
                                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                    : lead.status === 'appointment'
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : lead.status === 'rejected'
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : 'bg-slate-800 text-slate-300 border-slate-700'
                                }`}
                              >
                                <option value="new">Mới đăng ký</option>
                                <option value="contacted">Đang gọi tư vấn</option>
                                <option value="appointment">Hẹn gọi lại sau</option>
                                <option value="disbursed">Đã giải ngân / Mở thẻ</option>
                                <option value="rejected">Từ chối / Không đạt</option>
                              </select>
                            </td>

                            {/* Telesale Note Summary */}
                            <td className="py-3 px-3 align-top max-w-xs">
                              <div
                                onClick={() => setViewingLead(lead)}
                                className="cursor-pointer group flex items-start justify-between text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800/80"
                                title="Bấm để xem chi tiết lịch sử cuộc gọi"
                              >
                                <span className="line-clamp-2 text-[11px] italic">
                                  {lead.notes || 'Chưa có ghi chú, bấm để thêm...'}
                                </span>
                                <MessageSquare className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 shrink-0 ml-1.5 mt-0.5" />
                              </div>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3 px-3 align-top text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => setViewingLead(lead)}
                                  className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                                  title="Xem chi tiết hồ sơ & lịch sử tương tác"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                                  title="Xóa hồ sơ này"
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

        {/* --- VIEW 2: DASHBOARD & ANALYTICS --- */}
        {activeMenu === 'dashboard' && (
          <div className="p-6 space-y-6">
            {/* KPI 4-Card Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Tổng Leads thu thập
                </div>
                <div className="text-3xl font-extrabold text-white mt-1 font-mono">
                  {analytics?.total || leads.length}
                </div>
                <div className="text-[11px] text-blue-400 mt-1 flex items-center gap-1">
                  <span>Vay tín chấp: {analytics?.loansCount || 0}</span>
                  <span>·</span>
                  <span>Thẻ: {analytics?.cardsCount || 0}</span>
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Đã giải ngân / Mở thẻ thành công
                </div>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
                  {analytics?.disbursed || leads.filter(l => l.status === 'disbursed').length}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">
                  Tỷ lệ chuyển đổi: {analytics?.conversionRate || '0%'}
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Đang trong quy trình chăm sóc
                </div>
                <div className="text-3xl font-extrabold text-amber-400 mt-1 font-mono">
                  {analytics?.contacted || leads.filter(l => l.status === 'contacted' || l.status === 'appointment').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Khách mới cần gọi ngay: {analytics?.newLeads || 0}
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Hoa hồng tạm tính (Affiliate)
                </div>
                <div className="text-3xl font-extrabold text-blue-400 mt-1 font-mono">
                  {formatCurrencyVND(analytics?.estimatedCommission || 0)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Ước tính 450.000đ / hồ sơ thành công
                </div>
              </div>
            </div>

            {/* Performance breakdown by bank */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                  <span>Phân bổ hồ sơ theo Tổ chức & Ngân hàng</span>
                </h3>
                <div className="space-y-3">
                  {products.map(prod => {
                    const count = leads.filter(l => l.productId === prod.id || l.productName.includes(prod.provider)).length;
                    const percent = leads.length > 0 ? ((count / leads.length) * 100).toFixed(0) : 0;
                    return (
                      <div key={prod.id} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-slate-300">{prod.name}</span>
                          <span className="text-slate-400 font-mono">{count} leads ({percent}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Cẩm nang Telesale chuyển đổi hồ sơ cao</span>
                </h3>
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                    <span className="font-bold text-white block mb-1">1. Tốc độ gọi điện là chìa khóa vàng:</span>
                    Khách hàng vay tiền online thường nộp hồ sơ ở nhiều nơi. Nếu bạn liên hệ trong vòng 5-10 phút đầu tiên, tỷ lệ họ hoàn tất hồ sơ qua link của bạn đạt 70%.
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                    <span className="font-bold text-white block mb-1">2. Hướng dẫn eKYC không bị từ chối:</span>
                    Nhắc khách ngồi nơi sáng rõ, chụp ảnh CCCD không bị lóa và dùng sim chính chủ đã đăng ký thông tin với nhà mạng.
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                    <span className="font-bold text-white block mb-1">3. Tận dụng Zalo ZNS / Chat 1-1:</span>
                    Nếu khách không nghe máy, gửi ngay tin nhắn Zalo kèm link hướng dẫn và hotline hỗ trợ.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 3: MANUAL LEAD CREATION --- */}
        {activeMenu === 'create_lead' && (
          <div className="p-6 max-w-3xl">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Thêm Mới Khách Hàng (Tạo Lead Thủ Công)</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Nhập thông tin khi khách gọi điện qua hotline, nhắn tin Zalo hoặc tư vấn trực tiếp ngoài website.
                </p>
              </div>

              {manualSuccessMsg && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{manualSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleCreateManualLead} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Họ và tên khách hàng <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={manualForm.fullName}
                      onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Số điện thoại di động <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={manualForm.phoneNumber}
                      onChange={(e) => setManualForm({ ...manualForm, phoneNumber: e.target.value })}
                      placeholder="0912 345 678"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Tỉnh / Thành phố
                    </label>
                    <select
                      value={manualForm.province}
                      onChange={(e) => setManualForm({ ...manualForm, province: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    >
                      {VIETNAM_PROVINCES.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Gói tài chính khách quan tâm
                    </label>
                    <select
                      value={manualForm.productId}
                      onChange={(e) => setManualForm({ ...manualForm, productId: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.provider} - {p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Số tiền muốn vay / Hạn mức thẻ
                    </label>
                    <select
                      value={manualForm.loanAmount}
                      onChange={(e) => setManualForm({ ...manualForm, loanAmount: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    >
                      {[...LOAN_AMOUNTS, ...CARD_LIMITS].map(amt => (
                        <option key={amt} value={amt}>{amt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Thu nhập hàng tháng
                    </label>
                    <select
                      value={manualForm.monthlyIncome}
                      onChange={(e) => setManualForm({ ...manualForm, monthlyIncome: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    >
                      {INCOME_RANGES.map(inc => (
                        <option key={inc} value={inc}>{inc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ghi chú cuộc gọi ban đầu
                  </label>
                  <textarea
                    rows={3}
                    value={manualForm.notes}
                    onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                    placeholder="Khách cần vay sửa nhà, thu nhập tiền mặt 8 triệu, hẹn 10h sáng mai gửi link..."
                    className="w-full p-3 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lưu Hồ Sơ Khách Hàng Vào Hệ Thống</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- VIEW 4: AFFILIATE CAMPAIGN MANAGER --- */}
        {activeMenu === 'affiliates' && (
          <div className="p-6 space-y-5">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-white block mb-1">
                    Gắn link tiếp thị liên kết (Affiliate Links) của bạn:
                  </span>
                  Mỗi khi khách hàng hoàn tất form đăng ký trên website, họ sẽ bấm nút chuyển sang đường link bên dưới để tự thao tác. Hãy dán link affiliate từ mạng tiếp thị bạn tham gia (AccessTrade, Masoffer, Adpia, Hyperlead...) để ghi nhận chuyển đổi và nhận hoa hồng.
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {products.map(prod => (
                <div key={prod.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${prod.themeColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {prod.providerInitial}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{prod.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {prod.category === 'loan' ? 'Vay tín chấp' : 'Thẻ tín dụng'} · Hoa hồng dự kiến: <span className="font-semibold text-emerald-400">{prod.commissionEstimate || 'Theo chính sách đối tác'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 tabular-nums">
                      Lượt chuyển tiếp: <span className="font-bold text-blue-400">{prod.clicksCount} clicks</span>
                    </div>
                  </div>

                  {editingAffiliateId === prod.id ? (
                    <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                      <input
                        type="url"
                        value={affiliateInputUrl}
                        onChange={(e) => setAffiliateInputUrl(e.target.value)}
                        placeholder="https://go.isclix.com/deep_link/..."
                        className="flex-1 w-full px-3 py-2 text-xs bg-slate-800 border border-blue-500 rounded-xl text-white font-mono focus:outline-none"
                      />
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleSaveAffiliate(prod)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Lưu link</span>
                        </button>
                        <button
                          onClick={() => setEditingAffiliateId(null)}
                          className="px-3 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs transition-colors cursor-pointer"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 text-xs font-mono text-slate-300">
                      <span className="truncate flex-1 text-slate-400">{prod.affiliateUrl}</span>
                      <div className="flex items-center gap-3 shrink-0 font-sans">
                        <button
                          onClick={() => {
                            setEditingAffiliateId(prod.id);
                            setAffiliateInputUrl(prod.affiliateUrl);
                          }}
                          className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                        >
                          Đổi link
                        </button>
                        <a
                          href={prod.affiliateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-slate-400 hover:text-white"
                          title="Thử mở link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- PREVIEW GUIDE MODAL (FOR ADMIN) --- */}
      {previewGuideModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${previewGuideModal.themeColor} text-white font-bold text-xs flex items-center justify-center`}>
                  {previewGuideModal.providerInitial}
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-blue-600 uppercase">
                    Xem trước giao diện hướng dẫn khách hàng
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {previewGuideModal.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setPreviewGuideModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Giấy tờ & Điều kiện chuẩn bị:
              </h4>
              <ul className="space-y-1.5 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100 text-xs text-slate-700">
                {previewGuideModal.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Quy trình thao tác:
              </h4>
              <div className="space-y-3">
                {previewGuideModal.applicationSteps.map((step) => (
                  <div key={step.stepNumber} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="font-bold text-slate-900">{step.title}</div>
                      <div className="text-slate-600 leading-relaxed">{step.description}</div>
                      {step.tip && (
                        <div className="text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200">
                          <strong>Mẹo:</strong> {step.tip}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPreviewGuideModal(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Đóng xem thử
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- LEAD DETAIL & CALL LOG DRAWER MODAL --- */}
      {viewingLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-end p-0 animate-in fade-in duration-150">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-lg h-full flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  CRM
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Hồ sơ: {viewingLead.fullName}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Mã hồ sơ: {viewingLead.id}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewingLead(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-slate-300">
              {/* Quick Contact Action Strip */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${viewingLead.phoneNumber}`}
                  className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Gọi {viewingLead.phoneNumber}</span>
                </a>
                <a
                  href={`https://zalo.me/${viewingLead.phoneNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-700 text-center"
                >
                  <span>Chat Zalo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Status and Details Card */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-slate-400">Trạng thái xử lý:</span>
                  <select
                    value={viewingLead.status}
                    onChange={(e) => handleStatusChange(viewingLead.id, e.target.value)}
                    className="bg-slate-900 border border-slate-600 rounded-lg text-white font-semibold py-1 px-2.5 focus:outline-none"
                  >
                    <option value="new">Mới đăng ký</option>
                    <option value="contacted">Đang gọi tư vấn</option>
                    <option value="appointment">Hẹn gọi lại sau</option>
                    <option value="disbursed">Đã giải ngân / Mở thẻ</option>
                    <option value="rejected">Từ chối / Nợ xấu</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Khu vực:</span>
                    <span className="font-semibold text-white">{viewingLead.province}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Nhu cầu:</span>
                    <span className="font-semibold text-emerald-400 font-mono">{viewingLead.loanAmount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Thu nhập:</span>
                    <span className="font-semibold text-white">{viewingLead.monthlyIncome}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Lịch sử CIC:</span>
                    <span className="font-semibold text-white">
                      {viewingLead.hasBadDebt === 'none' ? 'Tốt (Không nợ xấu)' : 'Có chú ý / chậm nhẹ'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Gói tài chính:</span>
                    <span className="font-semibold text-blue-400">{viewingLead.productName}</span>
                  </div>
                </div>
              </div>

              {/* Add Activity / Call Log Form */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-3">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  <span>Thêm nhật ký cuộc gọi / Chăm sóc</span>
                </div>

                <form onSubmit={handleAddActivity} className="space-y-2">
                  <div className="flex gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setNewActivityType('call')}
                      className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                        newActivityType === 'call' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      Gọi điện
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewActivityType('zalo')}
                      className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                        newActivityType === 'zalo' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      Tin nhắn Zalo
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewActivityType('system')}
                      className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                        newActivityType === 'system' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      Ghi chú khác
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={newActivityNote}
                    onChange={(e) => setNewActivityNote(e.target.value)}
                    placeholder="Nhập nội dung đã trao đổi với khách hàng..."
                    className="w-full p-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    Lưu ghi chú cuộc gọi
                  </button>
                </form>
              </div>

              {/* Timeline History */}
              <div className="space-y-3">
                <div className="font-bold text-white text-xs uppercase tracking-wider">
                  Lịch sử tương tác ({viewingLead.activities?.length || 0})
                </div>

                <div className="space-y-2.5 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {viewingLead.activities && viewingLead.activities.length > 0 ? (
                    viewingLead.activities.map((act) => (
                      <div key={act.id} className="relative flex items-start gap-3 pl-1">
                        <div className="w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-slate-600 z-10">
                          {act.type === 'call' ? '📞' : act.type === 'zalo' ? '💬' : '📝'}
                        </div>
                        <div className="flex-1 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                          <div className="text-[10px] text-slate-400">
                            {new Date(act.timestamp).toLocaleString('vi-VN')}
                          </div>
                          <div className="text-slate-200 mt-1 leading-relaxed">
                            {act.note}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-500 text-xs py-2 pl-6">
                      Chưa có lịch sử cuộc gọi. Thêm ghi chú đầu tiên ở trên.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

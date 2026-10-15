import React, { useState } from 'react';
import { Lead, FinancialProduct } from '../types';
import { formatDateTime, exportLeadsToCsv, updateLead, deleteLead, saveCustomProduct } from '../utils/storage';
import { 
  X, 
  Users, 
  Link2, 
  Download, 
  Search, 
  Phone, 
  MessageSquare, 
  Trash2, 
  CheckCircle, 
  Save, 
  ExternalLink,
  Filter,
  BarChart3,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onRefreshLeads: () => void;
  products: FinancialProduct[];
  onUpdateProduct: (product: FinancialProduct) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  leads,
  onRefreshLeads,
  products,
  onUpdateProduct
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'leads' | 'affiliate_links' | 'stats'>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [editingAffiliateProductId, setEditingAffiliateProductId] = useState<string | null>(null);
  const [affiliateInputUrl, setAffiliateInputUrl] = useState('');

  // Filtered leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phoneNumber.includes(searchQuery) ||
      l.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.productName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle status update
  const handleStatusChange = async (leadId: string, newStatus: any) => {
    await updateLead(leadId, { status: newStatus });
    onRefreshLeads();
  };

  // Handle note save
  const handleSaveNotes = async (leadId: string) => {
    await updateLead(leadId, { notes: noteContent });
    setEditingNotesId(null);
    onRefreshLeads();
  };

  // Handle delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (confirm('Bạn có chắc muốn xóa hồ sơ khách hàng này?')) {
      await deleteLead(leadId);
      onRefreshLeads();
    }
  };

  // Handle save affiliate link
  const handleSaveAffiliateLink = (prod: FinancialProduct) => {
    if (!affiliateInputUrl.trim()) return;
    const updated = { ...prod, affiliateUrl: affiliateInputUrl.trim() };
    saveCustomProduct(updated);
    onUpdateProduct(updated);
    setEditingAffiliateProductId(null);
    alert('Đã cập nhật link affiliate thành công!');
  };

  // Stats calculation
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const contactedCount = leads.filter(l => l.status === 'contacted' || l.status === 'appointment').length;
  const disbursedCount = leads.filter(l => l.status === 'disbursed').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              CRM
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Trung Tâm Quản Trị Leads & Tiếp Thị Affiliate
              </h2>
              <p className="text-xs text-slate-500">
                Chăm sóc khách hàng vay vốn, quản lý đường dẫn hoa hồng đối tác
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 border-b border-slate-200 bg-white flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'leads'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Khách hàng đăng ký ({totalLeads})</span>
            </button>

            <button
              onClick={() => setActiveTab('affiliate_links')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'affiliate_links'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Cấu hình Link Affiliate ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'stats'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Hiệu quả chuyển đổi</span>
            </button>
          </div>

          {activeTab === 'leads' && (
            <button
              onClick={() => exportLeadsToCsv(leads)}
              disabled={leads.length === 0}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50"
              title="Xuất file Excel / CSV toàn bộ khách hàng để chia cho telesales"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Xuất Excel/CSV</span>
            </button>
          )}
        </div>

        {/* Tab 1: Leads CRM List */}
        {activeTab === 'leads' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo Tên, SĐT, Tỉnh, Gói vay..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
                <span className="text-slate-400 text-[11px] whitespace-nowrap">Trạng thái:</span>
                {[
                  { key: 'all', label: 'Tất cả' },
                  { key: 'new', label: 'Mới' },
                  { key: 'contacted', label: 'Đang gọi' },
                  { key: 'appointment', label: 'Hẹn lại' },
                  { key: 'disbursed', label: 'Đã giải ngân' },
                  { key: 'rejected', label: 'Thất bại' }
                ].map(st => (
                  <button
                    key={st.key}
                    onClick={() => setStatusFilter(st.key)}
                    className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap font-medium ${
                      statusFilter === st.key
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Users className="w-10 h-10 mx-auto opacity-40" />
                <p className="text-xs">Không tìm thấy khách hàng nào phù hợp bộ lọc.</p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-3">Mã & Thời gian</th>
                        <th className="py-3 px-3">Khách hàng & Liên hệ</th>
                        <th className="py-3 px-3">Khu vực / Nghề nghiệp</th>
                        <th className="py-3 px-3">Gói & Nhu cầu vốn</th>
                        <th className="py-3 px-3">Trạng thái chăm sóc</th>
                        <th className="py-3 px-3">Ghi chú Telesale</th>
                        <th className="py-3 px-3 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* ID & Time */}
                          <td className="py-3 px-3 align-top whitespace-nowrap">
                            <span className="font-mono font-bold text-slate-900">{lead.id}</span>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {formatDateTime(lead.createdAt)}
                            </div>
                          </td>

                          {/* Customer & Phone Action */}
                          <td className="py-3 px-3 align-top">
                            <div className="font-bold text-slate-900">{lead.fullName}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <a
                                href={`tel:${lead.phoneNumber}`}
                                className="text-blue-600 hover:underline font-mono font-medium flex items-center gap-1"
                                title="Bấm để gọi ngay"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{lead.phoneNumber}</span>
                              </a>
                              <a
                                href={`https://zalo.me/${lead.phoneNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-1.5 py-0.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[10px] font-bold"
                                title="Nhắn tin Zalo trực tiếp"
                              >
                                Zalo
                              </a>
                            </div>
                          </td>

                          {/* Province & Employment */}
                          <td className="py-3 px-3 align-top">
                            <div className="text-slate-800 font-medium">{lead.province}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{lead.employmentType}</div>
                            <div className="text-[10px] text-slate-400">Lương: {lead.monthlyIncome}</div>
                          </td>

                          {/* Product & Loan Amount */}
                          <td className="py-3 px-3 align-top">
                            <div className="font-medium text-slate-900">{lead.productName}</div>
                            <div className="font-bold text-emerald-700 tabular-nums mt-0.5">
                              {lead.loanAmount}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {lead.hasBadDebt === 'none' ? 'CIC: Tốt' : (lead.hasBadDebt === 'cic_low' ? 'CIC: Chậm nhẹ' : 'CIC: Có nợ xấu')}
                            </div>
                          </td>

                          {/* Status Select */}
                          <td className="py-3 px-3 align-top">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className={`text-[11px] font-semibold py-1 px-2 rounded-md border focus:outline-none transition-colors ${
                                lead.status === 'disbursed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : lead.status === 'contacted'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : lead.status === 'appointment'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : lead.status === 'rejected'
                                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                                  : 'bg-slate-100 text-slate-800 border-slate-300'
                              }`}
                            >
                              <option value="new">Mới đăng ký</option>
                              <option value="contacted">Đang gọi tư vấn</option>
                              <option value="appointment">Hẹn gọi lại sau</option>
                              <option value="disbursed">Đã giải ngân / Mở thẻ</option>
                              <option value="rejected">Không đủ điều kiện</option>
                            </select>
                          </td>

                          {/* Telesale Note */}
                          <td className="py-3 px-3 align-top max-w-xs">
                            {editingNotesId === lead.id ? (
                              <div className="space-y-1">
                                <textarea
                                  value={noteContent}
                                  onChange={(e) => setNoteContent(e.target.value)}
                                  rows={2}
                                  className="w-full text-xs p-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleSaveNotes(lead.id)}
                                    className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold"
                                  >
                                    Lưu
                                  </button>
                                  <button
                                    onClick={() => setEditingNotesId(null)}
                                    className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px]"
                                  >
                                    Hủy
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  setEditingNotesId(lead.id);
                                  setNoteContent(lead.notes || '');
                                }}
                                className="cursor-pointer group flex items-start justify-between text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-100"
                                title="Bấm để chỉnh sửa ghi chú telesale"
                              >
                                <span className="line-clamp-2 italic">
                                  {lead.notes || 'Bấm để thêm ghi chú...'}
                                </span>
                                <MessageSquare className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0 ml-1 mt-0.5" />
                              </div>
                            )}
                          </td>

                          {/* Delete Action */}
                          <td className="py-3 px-3 align-top text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                              title="Xóa hồ sơ này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Affiliate Links Configuration */}
        {activeTab === 'affiliate_links' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Dành cho Nhà tiếp thị liên kết (Affiliate Marketer): </span>
                Bạn có thể dán đường link affiliate của riêng bạn (từ AccessTrade, Masoffer, Adpia, Hyperlead...) vào từng ngân hàng dưới đây. Khi khách hàng đăng ký xong trên web, hệ thống sẽ tự động chuyển hướng khách qua đường link của bạn!
              </div>
            </div>

            <div className="space-y-3">
              {products.map((prod) => (
                <div key={prod.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${prod.themeColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {prod.providerInitial}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {prod.category === 'loan' ? 'Vay tín chấp' : 'Thẻ tín dụng'} · Hoa hồng ước tính: <span className="font-semibold text-emerald-700">{prod.commissionEstimate || 'Theo chính sách đối tác'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 tabular-nums">
                      Lượt click chuyển tiếp: <span className="font-bold text-blue-600">{prod.clicksCount}</span>
                    </div>
                  </div>

                  {editingAffiliateProductId === prod.id ? (
                    <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                      <input
                        type="url"
                        value={affiliateInputUrl}
                        onChange={(e) => setAffiliateInputUrl(e.target.value)}
                        placeholder="https://accesstrade.vn/click?..."
                        className="flex-1 w-full px-3 py-1.5 text-xs bg-white border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 font-mono"
                      />
                      <div className="flex items-center gap-1.5 w-full sm:w-auto">
                        <button
                          onClick={() => handleSaveAffiliateLink(prod)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Lưu link</span>
                        </button>
                        <button
                          onClick={() => setEditingAffiliateProductId(null)}
                          className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-slate-200 text-xs font-mono text-slate-600">
                      <span className="truncate flex-1">{prod.affiliateUrl}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingAffiliateProductId(prod.id);
                            setAffiliateInputUrl(prod.affiliateUrl);
                          }}
                          className="text-xs text-blue-600 hover:underline font-sans font-semibold"
                        >
                          Đổi link
                        </button>
                        <a
                          href={prod.affiliateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-slate-400 hover:text-slate-700"
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

        {/* Tab 3: Performance & Conversion Stats */}
        {activeTab === 'stats' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* KPI 4-Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Tổng khách nộp đơn</div>
                <div className="text-2xl font-extrabold text-slate-900 tabular-nums mt-1">{totalLeads}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Lưu trữ trên hệ thống</div>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <div className="text-[11px] text-blue-700 uppercase font-semibold">Khách mới cần gọi</div>
                <div className="text-2xl font-extrabold text-blue-700 tabular-nums mt-1">{newLeadsCount}</div>
                <div className="text-[10px] text-blue-500 mt-0.5">Chưa liên hệ</div>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <div className="text-[11px] text-amber-700 uppercase font-semibold">Đang chăm sóc</div>
                <div className="text-2xl font-extrabold text-amber-700 tabular-nums mt-1">{contactedCount}</div>
                <div className="text-[10px] text-amber-600 mt-0.5">Đã gọi / hẹn lại</div>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <div className="text-[11px] text-emerald-700 uppercase font-semibold">Đã giải ngân / Mở thẻ</div>
                <div className="text-2xl font-extrabold text-emerald-700 tabular-nums mt-1">{disbursedCount}</div>
                <div className="text-[10px] text-emerald-600 mt-0.5">
                  Tỷ lệ: {totalLeads > 0 ? ((disbursedCount / totalLeads) * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>

            {/* Practical Advice for Affiliate Marketer */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Chiến lược tối ưu hóa hoa hồng tài chính 2026</span>
              </h3>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li>
                  <span className="font-semibold text-white">1. Telesale trong vòng 15 phút:</span> Tỷ lệ chuyển đổi giải ngân tăng gấp 3 lần nếu chuyên viên gọi điện hỗ trợ KH chuẩn bị CCCD ngay sau khi họ điền form.
                </li>
                <li>
                  <span className="font-semibold text-white">2. Phân loại đối tượng:</span> Với khách thu nhập lương chuyển khoản &gt; 10 triệu, hướng dẫn mở thẻ VIB / Sacombank để nhận hoa hồng cao nhất (400k - 800k/thẻ). Với khách cần tiền gấp, ưu tiên giải ngân VPBank Fast hoặc MCredit.
                </li>
                <li>
                  <span className="font-semibold text-white">3. Remaketing & Chăm sóc lại:</span> Tải file CSV định kỳ để gửi tin nhắn Zalo ZNS hoặc gọi lại vào các ngày 5 hoặc 20 hàng tháng (ngày nhận lương).
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div>
            <span>Dữ liệu được bảo mật an toàn cho cá nhân và doanh nghiệp.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors"
          >
            Đóng bảng quản trị
          </button>
        </div>
      </div>
    </div>
  );
};

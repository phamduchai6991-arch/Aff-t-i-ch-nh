import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap, Search } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  activeTab: 'all' | ProductCategory;
  onSelectTab: (tab: 'all' | ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenQuickApply: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onOpenQuickApply
}) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-12 pb-16 lg:pt-16 lg:pb-20">
      {/* Subtle radial glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -z-10 w-96 h-96 bg-slate-50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Natural human editorial kicker */}
          <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase flex items-center justify-center gap-2">
            <span>sosanhkhoanvay.com</span>
            <span aria-hidden="true">·</span>
            <span>Nền tảng kết nối & so sánh tài chính uy tín</span>
          </div>

          {/* Marquee Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
            So sánh gói vay tín chấp & thẻ tín dụng duyệt nhanh 15 phút
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Kết nối trực tiếp tới các ngân hàng và tổ chức tài chính hàng đầu Việt Nam. Lãi suất ưu đãi từ 0.99%/tháng, quy trình online 100%, bảo mật và hoàn toàn miễn phí làm hồ sơ. Hotline: <a href="tel:0583345345" className="font-bold text-blue-600 hover:underline">0583 345 345</a>.
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenQuickApply}
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Đăng ký nhận tư vấn ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:0583345345"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Hotline: 0583 345 345</span>
            </a>
          </div>

          {/* Trust proof indicators (Adjacent claim-to-proof) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Đối tác 15+ Ngân hàng được cấp phép</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Duyệt hồ sơ online trong 15 phút</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Không thu phí làm hồ sơ</span>
            </span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-12 max-w-4xl mx-auto bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Functional Category Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 w-full sm:w-auto">
              <button
                onClick={() => onSelectTab('all')}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất cả sản phẩm
              </button>
              <button
                onClick={() => onSelectTab('loan')}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'loan'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Vay tín chấp tiêu dùng
              </button>
              <button
                onClick={() => onSelectTab('card')}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'card'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mở thẻ tín dụng
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm VPBank, VIB, MCredit..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

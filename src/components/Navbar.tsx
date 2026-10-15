import React, { useState } from 'react';
import { ShieldCheck, SlidersHorizontal, Users, PhoneCall, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenQuickApply: () => void;
  leadsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenQuickApply, leadsCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:bg-blue-700 transition-colors">
              VN
            </span>
            <span className="text-slate-900 font-extrabold tracking-tight">
              VayNhanh<span className="text-blue-600">247</span>
            </span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#goi-vay" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Vay tín chấp
            </a>
            <a href="#the-tin-dung" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Thẻ tín dụng
            </a>
            <a href="#tinh-lai-suat" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Tính lãi suất
            </a>
            <a href="#kiem-tra-duyet" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Kiểm tra hồ sơ
            </a>
            <a href="#faq-hoi-dap" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Hỏi đáp & Hướng dẫn
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Admin CRM toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Admin Backend Portal Access Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              title="Vào hệ thống Quản trị Backend (Mã PIN: 6991 hoặc admin / duchai168)"
              aria-label="Vào trang quản trị Backend"
            >
              <Users className="w-3.5 h-3.5 text-slate-700" />
              <span className="hidden sm:inline">Quản trị Backend</span>
              {leadsCount > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {leadsCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenQuickApply}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Đăng ký tư vấn</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <a
            href="#goi-vay"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Vay tín chấp online
          </a>
          <a
            href="#the-tin-dung"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Mở thẻ tín dụng
          </a>
          <a
            href="#tinh-lai-suat"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Công cụ tính lãi vay
          </a>
          <a
            href="#kiem-tra-duyet"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Kiểm tra tỷ lệ duyệt
          </a>
          <a
            href="#faq-hoi-dap"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Hỏi đáp & Cam kết an toàn
          </a>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs font-medium text-slate-600 flex items-center gap-1.5 py-1"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Quản lý Leads ({leadsCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { ShieldCheck, SlidersHorizontal, Users, PhoneCall, Menu, X, Phone } from 'lucide-react';

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
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2 text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-sm group-hover:bg-blue-700 transition-colors">
              SKV
            </span>
            <span className="text-slate-900 font-extrabold tracking-tight">
              sosanhkhoanvay<span className="text-blue-600">.com</span>
            </span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
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
              Kiểm tra duyệt
            </a>
            <a href="#faq-hoi-dap" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Hỏi đáp & Hướng dẫn
            </a>
          </nav>

          {/* Zone 3: Hotline + Admin CRM toggle + Primary Action */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Direct Clickable Hotline */}
            <a
              href="tel:0583345345"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50/80 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
              title="Gọi hotline tư vấn miễn phí 24/7"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>0583 345 345</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenQuickApply}
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
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
          <div className="pb-2 border-b border-slate-100">
            <a
              href="tel:0583345345"
              className="flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-blue-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline tư vấn: 0583 345 345</span>
            </a>
          </div>
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
        </div>
      )}
    </header>
  );
};

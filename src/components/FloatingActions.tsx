import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, Users } from 'lucide-react';

interface FloatingActionsProps {
  onOpenConsultation: () => void;
  onOpenAdmin: () => void;
  leadsCount: number;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenConsultation,
  onOpenAdmin,
  leadsCount
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      <div className="flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Admin Quick CRM Link Button */}
        <button
          onClick={onOpenAdmin}
          className="relative px-3.5 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-1.5 border border-slate-700"
          title="Vào hệ thống Quản trị Backend (Mã PIN: 6991 hoặc admin / duchai168)"
        >
          <Users className="w-3.5 h-3.5 text-blue-400" />
          <span>Quản trị Backend</span>
          {leadsCount > 0 && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {leadsCount}
            </span>
          )}
        </button>

        {/* Zalo Chat Consultation button */}
        <button
          onClick={onOpenConsultation}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-full text-xs font-bold shadow-lg transition-all flex items-center gap-2 group border border-blue-500"
          title="Tư vấn khoản vay miễn phí"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Tư vấn khoản vay 1-1</span>
        </button>

        {/* Scroll To Top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-white text-slate-700 hover:text-slate-900 rounded-full shadow-md border border-slate-200 hover:bg-slate-50 transition-all"
            aria-label="Lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, MessageSquare } from 'lucide-react';

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
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      <div className="flex flex-col items-end gap-2.5 pointer-events-auto">

        {/* Direct Zalo Chat button */}
        <a
          href="https://zalo.me/0583345345"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white rounded-full text-xs font-bold shadow-lg transition-all flex items-center gap-2 border border-sky-400"
          title="Nhắn tin Zalo tư vấn: 0583 345 345"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span>Chat Zalo: 0583 345 345</span>
        </a>

        {/* Direct Phone Hotline Button */}
        <a
          href="tel:0583345345"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-full text-xs font-bold shadow-lg transition-all flex items-center gap-2 group border border-emerald-400"
          title="Gọi Hotline tư vấn 24/7"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <Phone className="w-3.5 h-3.5 text-white" />
          <span>Hotline: 0583 345 345</span>
        </a>

        {/* Scroll To Top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-white text-slate-700 hover:text-slate-900 rounded-full shadow-md border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
            aria-label="Lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

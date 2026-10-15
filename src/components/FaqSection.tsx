import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/financialProducts';
import { ChevronDown, ShieldAlert, CheckCircle2, Lock, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-hoi-dap" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
            Hỏi đáp & Cam kết minh bạch
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Những câu hỏi thường gặp khi vay online
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Giải đáp mọi thắc mắc về điều kiện, quy trình bảo mật và quyền lợi của khách hàng khi đăng ký tài chính trực tuyến.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 bg-white"
                >
                  <button
                    onClick={() => toggleItem(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Safety & Compliance Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-amber-50/70 border border-amber-200/90 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Cảnh báo an toàn tài chính quan trọng</span>
              </div>
              <ul className="text-xs text-amber-950 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700 shrink-0">1.</span>
                  <span><strong>Tuyệt đối không chuyển tiền cọc:</strong> Ngân hàng chính quy không bao giờ bắt khách nộp phí bảo hiểm hay tiền cọc trước khi giải ngân.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700 shrink-0">2.</span>
                  <span><strong>Chỉ đăng ký link chính thức:</strong> Chúng tôi chỉ cung cấp đường dẫn đã được xác thực an toàn tới hệ thống ngân hàng nhà nước cấp phép.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700 shrink-0">3.</span>
                  <span><strong>Bảo mật mã OTP:</strong> Không bao giờ chia sẻ mã OTP gửi về điện thoại cho bất kỳ ai, kể cả người tự xưng là nhân viên ngân hàng.</span>
                </li>
              </ul>
            </div>

            {/* Trust commitments */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Cam kết từ VayNhanh247
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Miễn phí 100% dịch vụ giới thiệu và tư vấn</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dữ liệu khách hàng được mã hóa bảo mật</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hỗ trợ đối soát và nhắc lịch trả nợ đúng hạn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

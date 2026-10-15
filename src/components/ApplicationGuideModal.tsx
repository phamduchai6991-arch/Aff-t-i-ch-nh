import React from 'react';
import { FinancialProduct } from '../types';
import { X, CheckCircle, Clock, ShieldCheck, AlertCircle, ArrowRight, Smartphone, FileText } from 'lucide-react';

interface ApplicationGuideModalProps {
  product: FinancialProduct | null;
  onClose: () => void;
  onProceedToApply: (product: FinancialProduct) => void;
}

export const ApplicationGuideModal: React.FC<ApplicationGuideModalProps> = ({
  product,
  onClose,
  onProceedToApply
}) => {
  if (!product) return null;

  const isLoan = product.category === 'loan';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-modal-title"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${product.themeColor} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
              {product.providerInitial}
            </div>
            <div>
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Hướng dẫn đăng ký từng bước
              </div>
              <h2 id="guide-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                {product.name}
              </h2>
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

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div>
              <div className="text-[11px] text-slate-500 uppercase">Hạn mức</div>
              <div className="font-bold text-slate-900 mt-0.5">{product.maxLimit}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase">Lãi suất</div>
              <div className="font-bold text-emerald-600 mt-0.5">{product.interestRate}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase">Thời gian duyệt</div>
              <div className="font-bold text-slate-900 mt-0.5">{product.approvalSpeed}</div>
            </div>
          </div>

          {/* Section: Giấy tờ & Điều kiện cần chuẩn bị */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>1. Điều kiện và giấy tờ cần chuẩn bị</span>
            </h3>
            <ul className="space-y-2 bg-blue-50/40 p-4 rounded-xl border border-blue-100">
              {product.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Các bước đăng ký chi tiết */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>2. Quy trình thao tác 4 bước đơn giản</span>
            </h3>
            
            <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {product.applicationSteps.map((step) => (
                <div key={step.stepNumber} className="relative flex items-start gap-3.5 pl-1">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs z-10">
                    {step.stepNumber}
                  </div>
                  <div className="flex-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                    {step.tip && (
                      <div className="mt-2 text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/60 flex items-start gap-1.5">
                        <span className="font-semibold shrink-0">Mẹo nhỏ:</span>
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Lời khuyên duyệt 99% */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Bí quyết duyệt hồ sơ nhanh trong ngày</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Hãy chuẩn bị CCCD gốc gắn chip, ngồi ở nơi đủ ánh sáng và dùng sim điện thoại chính chủ. Sau khi hoàn tất đăng ký nhận link ở bước tiếp theo, bạn chỉ mất khoảng 3 - 5 phút để hoàn tất thủ tục trên trang chính thức của {product.provider}.
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Đóng lại
          </button>

          <button
            onClick={() => {
              onClose();
              onProceedToApply(product);
            }}
            className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-lg transition-all shadow-sm flex items-center gap-2"
          >
            <span>Đăng ký nhận link {isLoan ? 'vay' : 'mở thẻ'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

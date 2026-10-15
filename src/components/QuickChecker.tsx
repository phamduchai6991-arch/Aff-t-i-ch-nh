import React, { useState } from 'react';
import { FinancialProduct } from '../types';
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

interface QuickCheckerProps {
  products: FinancialProduct[];
  onSelectProduct: (product: FinancialProduct) => void;
}

export const QuickChecker: React.FC<QuickCheckerProps> = ({ products, onSelectProduct }) => {
  const [purpose, setPurpose] = useState<'loan' | 'card'>('loan');
  const [incomeLevel, setIncomeLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [documents, setDocuments] = useState<string[]>(['cccd']);
  const [cicStatus, setCicStatus] = useState<'clean' | 'slight_delay' | 'new_to_credit'>('clean');
  const [evaluated, setEvaluated] = useState(false);

  const toggleDocument = (doc: string) => {
    if (documents.includes(doc)) {
      setDocuments(documents.filter(d => d !== doc));
    } else {
      setDocuments([...documents, doc]);
    }
  };

  // Evaluate recommendations
  const getRecommendation = () => {
    let score = 75;
    if (incomeLevel === 'medium') score += 15;
    if (incomeLevel === 'high') score += 20;
    if (documents.includes('bhyt') || documents.includes('contract')) score += 10;
    if (cicStatus === 'clean') score += 10;
    if (cicStatus === 'slight_delay') score -= 15;

    score = Math.min(99, Math.max(50, score));

    // Filter matching products
    const matching = products
      .filter(p => p.category === purpose)
      .slice(0, 2);

    return {
      score,
      level: score >= 90 ? 'Rất cao (98%)' : score >= 75 ? 'Cao (85%)' : 'Khả quan (70%)',
      products: matching
    };
  };

  const result = getRecommendation();

  return (
    <section id="kiem-tra-duyet" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
            Hỗ trợ phân tích tín dụng tự động
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kiểm tra tỷ lệ duyệt hồ sơ trong 1 phút
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Không ảnh hưởng đến điểm tín dụng CIC của bạn. Hệ thống gợi ý gói vay và thẻ ngân hàng có khả năng giải ngân thành công cao nhất.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {!evaluated ? (
            <div className="space-y-6">
              {/* Question 1: Purpose */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Nhu cầu tài chính hiện tại của bạn là gì?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPurpose('loan')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      purpose === 'loan'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="text-sm font-semibold">Cần vay tiền mặt tiêu dùng</div>
                    <div className="text-xs text-slate-500 font-normal mt-0.5">Nhận tiền giải ngân về tài khoản ATM</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurpose('card')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      purpose === 'card'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="text-sm font-semibold">Muốn mở thẻ tín dụng</div>
                    <div className="text-xs text-slate-500 font-normal mt-0.5">Chi tiêu trước, trả sau 0% lãi suất</div>
                  </button>
                </div>
              </div>

              {/* Question 2: Income */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Mức thu nhập hàng tháng của bạn
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { key: 'low', label: 'Dưới 6 triệu / tháng' },
                    { key: 'medium', label: 'Từ 6 - 15 triệu / tháng' },
                    { key: 'high', label: 'Trên 15 triệu / tháng' }
                  ].map(inc => (
                    <button
                      key={inc.key}
                      type="button"
                      onClick={() => setIncomeLevel(inc.key as any)}
                      className={`p-2.5 text-xs rounded-xl border text-center transition-all ${
                        incomeLevel === inc.key
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                      }`}
                    >
                      {inc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Available Documents */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  3. Các giấy tờ bạn hiện đang có sẵn (chọn tất cả mục phù hợp)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'cccd', label: 'CCCD gắn chip gốc' },
                    { id: 'bhyt', label: 'Thẻ BHYT công ty cấp' },
                    { id: 'contract', label: 'Hợp đồng lao động / Sao kê' },
                    { id: 'utility', label: 'Hóa đơn điện / Nước' }
                  ].map(doc => {
                    const isChecked = documents.includes(doc.id);
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => toggleDocument(doc.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all flex items-center gap-2 ${
                          isChecked
                            ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                          isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                        <span>{doc.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 4: CIC Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  4. Lịch sử thanh toán khoản vay trước đây
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { key: 'clean', label: 'Thanh toán đúng hạn / Không nợ xấu' },
                    { key: 'slight_delay', label: 'Từng chậm thanh toán vài ngày' },
                    { key: 'new_to_credit', label: 'Chưa từng vay hoặc mở thẻ bao giờ' }
                  ].map(c => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setCicStatus(c.key as any)}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        cicStatus === c.key
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit check button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setEvaluated(true)}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Xem kết quả phân tích & Gói duyệt cao nhất</span>
                </button>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-lg shrink-0">
                    {result.score}%
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Tỷ lệ hồ sơ được phê duyệt:
                    </div>
                    <div className="text-lg font-extrabold text-emerald-950">
                      {result.level} - Rất khả quan
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setEvaluated(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Kiểm tra lại</span>
                </button>
              </div>

              {/* Recommended Top 2 Packages */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  2 Gói phù hợp nhất với hồ sơ của bạn:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.products.map(prod => (
                    <div key={prod.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-all flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${prod.themeColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                            {prod.providerInitial}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-blue-600">{prod.provider}</div>
                            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{prod.name}</h4>
                          </div>
                        </div>

                        <div className="text-xs text-slate-600 space-y-1 pt-1">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Hạn mức:</span>
                            <span className="font-bold text-slate-900">{prod.maxLimit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Lãi suất:</span>
                            <span className="font-bold text-emerald-600">{prod.interestRate}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProduct(prod)}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Đăng ký nhận link {prod.provider}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

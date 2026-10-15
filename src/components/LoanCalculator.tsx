import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { formatCurrencyVND } from '../utils/storage';

interface LoanCalculatorProps {
  onApplyCalculatedLoan: (amount: string, tenor: string) => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onApplyCalculatedLoan }) => {
  const [loanAmount, setLoanAmount] = useState<number>(50000000); // 50 triệu
  const [tenorMonths, setTenorMonths] = useState<number>(12); // 12 tháng
  const [annualRate, setAnnualRate] = useState<number>(14.4); // 14.4%/năm (tương đương 1.2%/tháng)
  const [method, setMethod] = useState<'reducing' | 'flat'>('reducing'); // Dư nợ giảm dần vs Dư nợ gốc

  // Calculations
  const calculation = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const principalPerMonth = Math.round(loanAmount / tenorMonths);

    if (method === 'flat') {
      // Dư nợ ban đầu
      const monthlyInterest = Math.round(loanAmount * monthlyRate);
      const totalPaymentPerMonth = principalPerMonth + monthlyInterest;
      const totalInterest = monthlyInterest * tenorMonths;
      const totalRepayment = loanAmount + totalInterest;

      return {
        firstMonthPayment: totalPaymentPerMonth,
        monthlyInterest,
        principalPerMonth,
        totalInterest,
        totalRepayment,
        schedule: Array.from({ length: Math.min(6, tenorMonths) }, (_, i) => ({
          month: i + 1,
          principal: principalPerMonth,
          interest: monthlyInterest,
          total: totalPaymentPerMonth,
          remaining: Math.max(0, loanAmount - principalPerMonth * (i + 1))
        }))
      };
    } else {
      // Dư nợ giảm dần (Phổ biến nhất tại Ngân hàng)
      let currentBalance = loanAmount;
      let totalInterest = 0;
      const schedule = [];

      for (let m = 1; m <= tenorMonths; m++) {
        const interest = Math.round(currentBalance * monthlyRate);
        totalInterest += interest;
        const total = principalPerMonth + interest;
        currentBalance = Math.max(0, currentBalance - principalPerMonth);

        if (m <= 6) {
          schedule.push({
            month: m,
            principal: principalPerMonth,
            interest,
            total,
            remaining: currentBalance
          });
        }
      }

      const firstMonthInterest = Math.round(loanAmount * monthlyRate);
      const firstMonthPayment = principalPerMonth + firstMonthInterest;

      return {
        firstMonthPayment,
        monthlyInterest: firstMonthInterest,
        principalPerMonth,
        totalInterest,
        totalRepayment: loanAmount + totalInterest,
        schedule
      };
    }
  }, [loanAmount, tenorMonths, annualRate, method]);

  return (
    <section id="tinh-lai-suat" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
            Công cụ tính toán tài chính minh bạch
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ước tính số tiền trả góp hàng tháng
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Chủ động lên kế hoạch tài chính trước khi nộp hồ sơ. Chọn số tiền cần vay và kỳ hạn mong muốn để xem lịch trả chi tiết.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders & Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
            {/* Calculation Method Toggle */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-700">Cách tính lãi:</span>
              <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => setMethod('reducing')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    method === 'reducing'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dư nợ giảm dần (Khuyên dùng)
                </button>
                <button
                  onClick={() => setMethod('flat')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    method === 'flat'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dư nợ gốc ban đầu
                </button>
              </div>
            </div>

            {/* Slider 1: Loan Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Số tiền bạn muốn vay:
                </label>
                <div className="text-lg sm:text-xl font-extrabold text-blue-600 font-mono">
                  {formatCurrencyVND(loanAmount)}
                </div>
              </div>
              <input
                type="range"
                min="10000000"
                max="200000000"
                step="5000000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>10.000.000 đ</span>
                <span>50.000.000 đ</span>
                <span>100.000.000 đ</span>
                <span>200.000.000 đ</span>
              </div>
            </div>

            {/* Slider 2: Tenor Months */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Thời hạn vay:
                </label>
                <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono">
                  {tenorMonths} Tháng
                </div>
              </div>
              <input
                type="range"
                min="6"
                max="48"
                step="6"
                value={tenorMonths}
                onChange={(e) => setTenorMonths(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>6 tháng</span>
                <span>12 tháng</span>
                <span>24 tháng</span>
                <span>36 tháng</span>
                <span>48 tháng</span>
              </div>
            </div>

            {/* Slider 3: Interest Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Lãi suất tham khảo:
                </label>
                <div className="text-base sm:text-lg font-bold text-emerald-600 font-mono">
                  {annualRate}% / năm <span className="text-xs text-slate-500 font-normal">({(annualRate / 12).toFixed(2)}%/tháng)</span>
                </div>
              </div>
              <input
                type="range"
                min="10.8"
                max="24.0"
                step="0.6"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>10.8% (Lương tốt)</span>
                <span>14.4% (Trung bình)</span>
                <span>18.0%</span>
                <span>24.0%</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-2 text-xs text-blue-900">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Bảng tính chỉ mang tính tham khảo. Mức lãi suất và hạn mức chính xác sẽ được ngân hàng phê duyệt sau khi đối soát điểm tín dụng của bạn.
              </span>
            </div>
          </div>

          {/* Right Column: Breakdown Summary & Schedule (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Số tiền trả tháng đầu tiên ({method === 'reducing' ? 'Cao nhất' : 'Cố định'})
              </div>
              <div className="text-3xl font-extrabold text-emerald-400 tabular-nums mt-1 font-mono">
                {formatCurrencyVND(calculation.firstMonthPayment)}
              </div>
              {method === 'reducing' && (
                <div className="text-xs text-slate-400 mt-1">
                  Số tiền sẽ giảm dần đều qua các tháng tiếp theo.
                </div>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Tiền gốc trả mỗi tháng:</span>
                <span className="font-bold text-white font-mono">
                  {formatCurrencyVND(calculation.principalPerMonth)}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tiền lãi tháng đầu:</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {formatCurrencyVND(calculation.monthlyInterest)}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tổng tiền lãi cả kỳ:</span>
                <span className="font-bold text-white font-mono">
                  {formatCurrencyVND(calculation.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800 font-semibold">
                <span className="text-white">Tổng số tiền trả:</span>
                <span className="font-bold text-white font-mono text-sm">
                  {formatCurrencyVND(calculation.totalRepayment)}
                </span>
              </div>
            </div>

            {/* Mini Schedule for first 3-4 months */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Lịch trả nợ mẫu ({calculation.schedule.length} tháng đầu):
              </div>
              <div className="bg-slate-800/80 rounded-xl p-2.5 text-[11px] divide-y divide-slate-700/60 font-mono">
                {calculation.schedule.slice(0, 4).map((row) => (
                  <div key={row.month} className="py-1.5 flex justify-between items-center text-slate-300">
                    <span>Tháng {row.month}:</span>
                    <span className="text-white font-medium">{formatCurrencyVND(row.total)}</span>
                    <span className="text-slate-400 text-[10px]">Gốc còn: {formatCurrencyVND(row.remaining)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA directly from calculator */}
            <button
              onClick={() => onApplyCalculatedLoan(formatCurrencyVND(loanAmount), `${tenorMonths} tháng`)}
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Đăng ký vay {formatCurrencyVND(loanAmount)} ngay</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

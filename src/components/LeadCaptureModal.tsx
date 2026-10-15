import React, { useState } from 'react';
import { FinancialProduct, Lead } from '../types';
import { VIETNAM_PROVINCES, INCOME_RANGES, LOAN_AMOUNTS, CARD_LIMITS } from '../data/financialProducts';
import { createLead, recordAffiliateClick } from '../utils/storage';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  Info,
  Clock
} from 'lucide-react';

interface LeadCaptureModalProps {
  product: FinancialProduct | null;
  onClose: () => void;
  onLeadSuccess: (newLead: Lead) => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  product,
  onClose,
  onLeadSuccess
}) => {
  if (!product) return null;

  const isLoan = product.category === 'loan';

  // Form states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState(VIETNAM_PROVINCES[0]);
  const [loanAmount, setLoanAmount] = useState(isLoan ? LOAN_AMOUNTS[2] : CARD_LIMITS[1]);
  const [monthlyIncome, setMonthlyIncome] = useState(INCOME_RANGES[1]);
  const [employmentType, setEmploymentType] = useState('Đi làm hưởng lương');
  const [hasBadDebt, setHasBadDebt] = useState<'none' | 'cic_low' | 'cic_bad'>('none');
  const [notes, setNotes] = useState('');

  // Status states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [copied, setCopied] = useState(false);

  // Validate VN phone
  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) {
      errs.fullName = 'Vui lòng nhập họ và tên của bạn';
    } else if (fullName.trim().length < 2) {
      errs.fullName = 'Họ tên quá ngắn';
    }

    const cleanPhone = phoneNumber.replace(/[\s.-]/g, '');
    const phoneRegex = /^(0[3|5|7|8|9])([0-9]{8})$/;
    if (!cleanPhone) {
      errs.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phoneNumber = 'Số điện thoại không hợp lệ (gồm 10 số, bắt đầu 03, 05, 07, 08, 09)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const newLead = await createLead({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim() || undefined,
        province,
        productId: product.id,
        productName: product.name,
        productCategory: product.category,
        loanAmount,
        monthlyIncome,
        employmentType,
        hasBadDebt,
        notes: notes.trim() || `Khách hàng đăng ký gói: ${product.name}`
      });

      setSubmittedLead(newLead);
      onLeadSuccess(newLead);
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle direct affiliate click
  const handleOpenAffiliateLink = () => {
    recordAffiliateClick(product.id);
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  // Copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(product.affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-200 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${product.themeColor} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0`}>
              {product.providerInitial}
            </div>
            <div>
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {submittedLead ? 'Hoàn tất hồ sơ' : (isLoan ? 'Đăng ký vay tín chấp' : 'Đăng ký mở thẻ tín dụng')}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
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

        {/* Modal Body: Two Phases */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {!submittedLead ? (
            /* --- PHASE 1: LEAD CAPTURE FORM --- */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Vui lòng điền thông tin chính xác. Hệ thống sẽ lưu hồ sơ của bạn để chuyên viên hỗ trợ và cung cấp ngay đường link đối tác chính thức của {product.provider}.
                </span>
              </div>

              {/* Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Họ và tên của bạn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-300 focus:ring-blue-200 focus:border-blue-600'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Số điện thoại di động <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0912 345 678"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.phoneNumber
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-300 focus:ring-blue-200 focus:border-blue-600'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Province & Loan Amount / Card Limit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tỉnh / Thành phố sinh sống
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 text-slate-800"
                  >
                    {VIETNAM_PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isLoan ? 'Số tiền muốn vay' : 'Hạn mức thẻ mong muốn'}
                  </label>
                  <select
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 text-slate-800"
                  >
                    {(isLoan ? LOAN_AMOUNTS : CARD_LIMITS).map((amt) => (
                      <option key={amt} value={amt}>{amt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Monthly Income & Employment Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Thu nhập bình quân hàng tháng
                  </label>
                  <select
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 text-slate-800"
                  >
                    {INCOME_RANGES.map((inc) => (
                      <option key={inc} value={inc}>{inc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hình thức công việc
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 text-slate-800"
                  >
                    <option value="Đi làm hưởng lương (Công ty/Cơ quan)">Đi làm hưởng lương (Công ty/Cơ quan)</option>
                    <option value="Kinh doanh cá thể / Hộ kinh doanh">Kinh doanh cá thể / Hộ kinh doanh</option>
                    <option value="Lao động tự do / Freelancer">Lao động tự do / Freelancer</option>
                    <option value="Hưu trí / Cán bộ nhà nước">Hưu trí / Cán bộ nhà nước</option>
                  </select>
                </div>
              </div>

              {/* Bad Debt / CIC status radio */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Lịch sử tín dụng CIC của bạn
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setHasBadDebt('none')}
                    className={`p-2.5 text-xs rounded-lg border text-left transition-all ${
                      hasBadDebt === 'none'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-medium">Chưa từng nợ xấu</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Lịch sử tốt 100%</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasBadDebt('cic_low')}
                    className={`p-2.5 text-xs rounded-lg border text-left transition-all ${
                      hasBadDebt === 'cic_low'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-medium">Từng trễ hạn nhẹ</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Dưới 10-30 ngày</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasBadDebt('cic_bad')}
                    className={`p-2.5 text-xs rounded-lg border text-left transition-all ${
                      hasBadDebt === 'cic_bad'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-medium">Có nợ chú ý</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Cần tư vấn hỗ trợ</div>
                  </button>
                </div>
              </div>

              {/* Trust statement */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Bảo mật thông tin chuẩn SSL</span>
                </span>
                <span className="text-emerald-700 font-medium">
                  ✓ 100% Không thu phí
                </span>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Đang ghi nhận hồ sơ...</span>
                  ) : (
                    <>
                      <span>Hoàn tất đăng ký & Nhận link ngay</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* --- PHASE 2: SUCCESS & DIRECT AFFILIATE LINK ACTION --- */
            <div className="space-y-6 text-center py-2 animate-in fade-in zoom-in-95 duration-200">
              {/* Green Success Icon */}
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Đăng ký thành công!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Chào <span className="font-bold text-slate-900">{submittedLead.fullName}</span>, hồ sơ của bạn đã được ghi nhận vào hệ thống ưu tiên thẩm định.
                </p>
                <div className="inline-block bg-slate-100 px-3 py-1 rounded-md text-xs font-mono font-semibold text-slate-700 mt-1">
                  Mã hồ sơ: {submittedLead.id}
                </div>
              </div>

              {/* GIANT PRIMARY ACTION BUTTON: PROCEED TO AFFILIATE LINK */}
              <div className="p-5 bg-gradient-to-b from-blue-50 to-slate-50 rounded-2xl border-2 border-blue-600/30 text-left space-y-4">
                <div className="text-center">
                  <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Bước tiếp theo để giải ngân / phát hành thẻ
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    Tự thao tác nộp hồ sơ trực tuyến tại {product.provider}
                  </div>
                </div>

                {/* Big direct button */}
                <button
                  onClick={handleOpenAffiliateLink}
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Chuyển đến trang đăng ký chính thức của {product.provider}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Copy link option */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={product.affiliateUrl}
                    className="flex-1 px-3 py-2 text-[11px] bg-white border border-slate-200 rounded-lg text-slate-500 font-mono select-all truncate"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                    title="Sao chép link đăng ký"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Instructions on Partner Page */}
              <div className="text-left bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>3 lưu ý quan trọng khi thao tác:</span>
                </div>
                <ol className="list-decimal pl-4 space-y-1.5 text-slate-700">
                  <li>
                    Sử dụng đúng số điện thoại <span className="font-semibold text-slate-900">{submittedLead.phoneNumber}</span> để nhận mã xác nhận OTP của ngân hàng.
                  </li>
                  <li>
                    Chụp ảnh CCCD gắn chip gốc, rõ 4 góc, không chói lóa để hệ thống tự động nhận diện danh tính eKYC.
                  </li>
                  <li>
                    Sau khi bạn đăng ký trên link đối tác, chuyên viên của {product.provider} sẽ chủ động liên hệ hoàn tất hồ sơ trong vòng 15-30 phút.
                  </li>
                </ol>
              </div>

              {/* Close or Finish */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Đóng cửa sổ
                </button>
                <button
                  onClick={handleOpenAffiliateLink}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Mở trang đăng ký ngay</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

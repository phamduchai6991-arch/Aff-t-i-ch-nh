import React from 'react';
import { FinancialProduct } from '../types';
import { ArrowRight, BookOpen, Clock, ShieldCheck, Star } from 'lucide-react';

interface ProductCardProps {
  product: FinancialProduct;
  onOpenGuide: (product: FinancialProduct) => void;
  onOpenApply: (product: FinancialProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenGuide,
  onOpenApply
}) => {
  const isLoan = product.category === 'loan';

  return (
    <article className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden hover:shadow-sm">
      {/* Top Banner & Provider Info */}
      <div className="p-5 sm:p-6 pb-4">
        {/* Unboxed Metadata Header (Zero-Pill Rule) */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-600 uppercase tracking-wider">
              {isLoan ? 'Vay tín chấp' : 'Thẻ tín dụng'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.provider}</span>
          </div>

          <div className="flex items-center gap-1 text-amber-600 font-medium tabular-nums">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{product.rating}</span>
            <span className="text-slate-400">({product.totalReviews})</span>
          </div>
        </div>

        {/* Title and Provider Lockup */}
        <div className="flex items-start gap-3.5 mb-3">
          {/* Provider Emblem */}
          <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${product.themeColor} text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0`}>
            {product.providerInitial}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-1">
              {product.name}
            </h2>
            <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Key Numerical Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-100 my-4">
          <div>
            <div className="text-[11px] font-medium text-slate-500 uppercase">
              {isLoan ? 'Hạn mức tối đa' : 'Hạn mức cấp'}
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 tabular-nums mt-0.5">
              {product.maxLimit}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-500 uppercase">
              {isLoan ? 'Lãi suất chỉ từ' : 'Ưu đãi lãi suất'}
            </div>
            <div className="text-sm sm:text-base font-bold text-emerald-600 tabular-nums mt-0.5">
              {product.interestRate}
            </div>
          </div>
        </div>

        {/* Specs breakdown (Unboxed text with dots) */}
        <div className="space-y-1.5 text-xs text-slate-600 py-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Thời gian xét duyệt:</span>
            </span>
            <span className="font-semibold text-slate-800">{product.approvalSpeed}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Thu nhập tối thiểu:</span>
            </span>
            <span className="font-medium text-slate-800">{product.minIncome}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Kỳ hạn / Miễn lãi:</span>
            <span className="font-medium text-slate-800">{product.tenor}</span>
          </div>
        </div>

        {/* Highlight Benefit Text */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs font-medium text-blue-700 flex items-center gap-1.5">
          <span>✓ {product.highlightBenefit}</span>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-4 sm:p-5 pt-0 bg-white grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onOpenGuide(product)}
          className="px-3 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:scale-98 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
          <span>Hướng dẫn</span>
        </button>

        <button
          onClick={() => onOpenApply(product)}
          className="px-3 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5"
        >
          <span>Đăng ký ngay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};

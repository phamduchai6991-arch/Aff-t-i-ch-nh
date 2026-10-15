import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <span className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                SKV
              </span>
              <span>sosanhkhoanvay<span className="text-blue-500">.com</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Nền tảng công nghệ so sánh khoản vay tiêu dùng tín chấp và thẻ tín dụng ngân hàng hàng đầu tại Việt Nam.
            </p>
            <div className="pt-1 flex items-center gap-2 text-slate-300">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px]">Đối tác tiếp thị liên kết tài chính chính thức</span>
            </div>
          </div>

          {/* Quick links: Loans */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Vay tín chấp tiêu dùng
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#goi-vay" className="hover:text-white transition-colors">Vay tiêu dùng VPBank Online</a></li>
              <li><a href="#goi-vay" className="hover:text-white transition-colors">Vay tiền mặt FE Credit</a></li>
              <li><a href="#goi-vay" className="hover:text-white transition-colors">VIB Vay hoặc Thẻ tín dụng</a></li>
              <li><a href="#goi-vay" className="hover:text-white transition-colors">Thẻ vay VietCredit ATM 24/7</a></li>
              <li><a href="#goi-vay" className="hover:text-white transition-colors">Shinhan Bank (Dành cho KH lương)</a></li>
              <li><a href="#goi-vay" className="hover:text-white transition-colors">Lotte Finance tiêu dùng linh hoạt</a></li>
              <li><a href="#tinh-lai-suat" className="hover:text-white transition-colors">Công cụ tính lãi trả góp</a></li>
            </ul>
          </div>

          {/* Quick links: Cards */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Mở thẻ tín dụng online
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#the-tin-dung" className="hover:text-white transition-colors">Thẻ VPBank StepUp hoàn 15%</a></li>
              <li><a href="#the-tin-dung" className="hover:text-white transition-colors">Thẻ VIB Cash Back & Super Card</a></li>
              <li><a href="#the-tin-dung" className="hover:text-white transition-colors">Thẻ số thế hệ mới Liobank 5 phút</a></li>
              <li><a href="#kiem-tra-duyet" className="hover:text-white transition-colors">Kiểm tra tỷ lệ duyệt mở thẻ</a></li>
            </ul>
          </div>

          {/* Contact & Transparency */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Hỗ trợ & Liên hệ
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Hotline: <a href="tel:0583345345" className="text-white font-bold hover:text-blue-400 transition-colors">0583 345 345</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Email: <a href="mailto:shinhanngoquyen@gmail.com" className="text-white hover:text-blue-400 transition-colors">shinhanngoquyen@gmail.com</a></span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Hà Nội & TP. Hồ Chí Minh, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Required for Financial Affiliates */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong>Tuyên bố miễn trừ trách nhiệm & Thông báo Tiếp thị liên kết (Affiliate Disclosure):</strong> sosanhkhoanvay.com là cổng thông tin so sánh và đối tác tiếp thị liên kết giới thiệu sản phẩm tài chính đến các tổ chức tín dụng và ngân hàng được Ngân hàng Nhà nước Việt Nam cấp phép. Chúng tôi không phải là ngân hàng hay tổ chức tín dụng trực tiếp thẩm định, phê duyệt hoặc giải ngân khoản vay. Mọi quyết định duyệt hồ sơ, lãi suất và hạn mức thuộc thẩm quyền của đơn vị cho vay. Chúng tôi không bao giờ thu bất kỳ khoản phí nào từ phía khách hàng. Hotline hỗ trợ 24/7: 0583 345 345 - Email: shinhanngoquyen@gmail.com.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-slate-400 gap-2">
            <div 
              onClick={onOpenAdmin}
              className="cursor-default select-none"
              title="sosanhkhoanvay.com"
            >
              © 2026 sosanhkhoanvay.com. Mọi quyền được bảo lưu.
            </div>
            <div className="flex gap-4 text-slate-400">
              <span>Chính sách bảo mật</span>
              <span>·</span>
              <span>Điều khoản sử dụng</span>
              <span>·</span>
              <span>Cảnh báo rủi ro</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

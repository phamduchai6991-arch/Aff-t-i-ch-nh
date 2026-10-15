import React, { useState, useEffect } from 'react';
import { loginWithPin, loginWithCredentials } from '../../services/api';
import { AdminUser } from '../../types';
import { ShieldCheck, Lock, User, KeyRound, ArrowLeft, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: (user: AdminUser) => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToHome }) => {
  const [method, setMethod] = useState<'pin' | 'credentials'>('pin');

  // PIN state
  const [pin, setPin] = useState(['', '', '', '']);
  const [pinError, setPinError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Credentials state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [credError, setCredError] = useState('');

  // Handle PIN input change
  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setPinError('');

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      nextInput?.focus();
    }

    // Auto submit when all 4 digits entered
    const fullPin = newPin.join('');
    if (fullPin.length === 4) {
      executePinLogin(fullPin);
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Submit PIN login
  const executePinLogin = async (pinString: string) => {
    setIsSubmitting(true);
    setPinError('');
    try {
      const res = await loginWithPin(pinString);
      if (res.success && res.user) {
        onSuccess(res.user);
      } else {
        setPinError(res.message || 'Mã PIN 4 số không chính xác');
        setPin(['', '', '', '']);
        document.getElementById('pin-input-0')?.focus();
      }
    } catch {
      setPinError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Credentials login
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCredError('');
    try {
      const res = await loginWithCredentials(username, password);
      if (res.success && res.user) {
        onSuccess(res.user);
      } else {
        setCredError(res.message || 'Tài khoản hoặc mật khẩu không đúng');
      }
    } catch {
      setCredError('Lỗi đăng nhập hệ thống');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
      {/* Back button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3.5 py-2 rounded-lg border border-slate-700"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về trang chủ sosanhkhoanvay.com</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Icon */}
        <div className="mx-auto w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-blue-500/20">
          SKV
        </div>
        <h1 className="mt-4 text-center text-2xl font-extrabold tracking-tight text-white">
          Cổng Quản Trị Backend
        </h1>
        <p className="mt-1.5 text-center text-xs text-slate-400">
          sosanhkhoanvay.com – Quản lý Leads & Tiếp thị liên kết tài chính
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-slate-800/90 py-8 px-6 shadow-2xl rounded-2xl border border-slate-700 sm:px-10 space-y-6 backdrop-blur-md">
          {/* Method Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => {
                setMethod('pin');
                setPinError('');
              }}
              className={`py-2 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                method === 'pin'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Mã PIN 4 số</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMethod('credentials');
                setCredError('');
              }}
              className={`py-2 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                method === 'credentials'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Tài khoản & Pass</span>
            </button>
          </div>

          {/* METHOD 1: 4-DIGIT PIN LOGIN */}
          {method === 'pin' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Nhập mã PIN 4 chữ số bảo mật
                </label>
              </div>

              {/* 4 Digit Boxes */}
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`pin-input-${idx}`}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={pin[idx]}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    onKeyDown={(e) => handlePinKeyDown(idx, e)}
                    className="w-13 h-14 text-center text-2xl font-bold font-mono bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {pinError && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs text-center">
                  {pinError}
                </div>
              )}
            </div>
          )}

          {/* METHOD 2: USERNAME / PASSWORD LOGIN */}
          {method === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tên tài khoản
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên tài khoản..."
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {credError && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs text-center">
                  {credError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Đang xác thực...' : 'Đăng nhập Quản Trị'}
              </button>
            </form>
          )}

          {/* Security badge */}
          <div className="pt-4 border-t border-slate-700/60 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Xác thực an toàn cấp Quản Trị Viên (Super Admin)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

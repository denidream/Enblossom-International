import React, { useState } from 'react';
import { X, Lock, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAdmin } = useContent();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
    } else {
      setPassword('');
      setError(false);
    }
  };

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setPassword('');
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#0a2119] text-white rounded-2xl shadow-2xl border border-[#c89e47]/50 overflow-hidden transform transition-all p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#8aab9e] hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-full bg-[#12362b] border border-[#c89e47]/40 flex items-center justify-center mx-auto mb-4 text-[#edd08d] shadow-lg">
          <Lock className="w-7 h-7" />
        </div>

        <div className="text-center mb-6">
          <span className="font-cinzel text-xs tracking-[0.25em] text-[#e5c57b] uppercase font-semibold">
            ADMINISTRATOR ACCESS
          </span>
          <h3 className="font-serif-jp text-xl sm:text-2xl font-bold text-white mt-1">
            Masuk ke Panel Admin
          </h3>
          <p className="text-xs text-[#a1c4b6] mt-1.5 leading-relaxed">
            Kelola teks, foto banner, logo, layanan, tim, dan kontak website secara langsung.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#bedad0] mb-1.5">
              Password Admin
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#759c8c] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoFocus
                placeholder="Masukkan password admin..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full pl-9 pr-3 py-2.5 bg-[#0f2e23] border ${
                  error ? 'border-red-500 ring-1 ring-red-500' : 'border-[#1e5241] focus:border-[#dfba73]'
                } rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#dfba73] tracking-wider`}
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Password salah! Silakan coba lagi (Password: 12345).</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gold-btn text-[#12221a] font-bold text-sm py-2.5 rounded-xl cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Masuk Sekarang</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-[11px] text-[#719789]">
              Gunakan password <code className="bg-[#10382b] text-[#edd08d] px-1.5 py-0.5 rounded font-mono font-bold">12345</code> untuk mengakses fitur admin.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

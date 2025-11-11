'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validasi password match
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement register logic dengan API
      // const response = await fetch('/api/auth/register', { ... });
      console.log('Register:', formData);
      
      // Temporary: redirect ke dashboard
      setTimeout(() => {
        router.push('/admin');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Registrasi gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(180deg,#F6F9FF_0%,#EFF4FF_100%)]">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full h-[139px] px-4 sm:px-6 lg:px-[41px]">
        {/* Logo */}
        <div className="absolute left-4 sm:left-6 lg:left-[41px] top-4 sm:top-6 lg:top-[25px]">
          <Link href="/">
            <Image
              src="/assets/svg/logo.svg"
              alt="EduSafe Logo"
              width={77}
              height={87}
              className="w-12 h-14 sm:w-16 sm:h-[72px] lg:w-[77px] lg:h-[87px] cursor-pointer"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="absolute right-4 sm:right-8 lg:right-[25px] top-8 sm:top-10 lg:top-[52px] flex items-center gap-4 sm:gap-6 lg:gap-[40px] font-nunito">
          <Link 
            href="#about" 
            className="text-gray-800 font-bold text-sm sm:text-base lg:text-[21px] hover:text-[#50B0E5] transition-colors duration-200"
          >
            About Us
          </Link>
          <Link 
            href="#articles" 
            className="text-gray-800 font-bold text-sm sm:text-base lg:text-[21px] hover:text-[#50B0E5] transition-colors duration-200"
          >
            Articles
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="min-h-screen w-full flex items-center justify-center px-6 py-16 pt-[180px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-4xl rounded-[28px] bg-white/95 backdrop-blur border border-slate-200 shadow-[0_30px_60px_rgba(18,38,63,0.08)] px-8 sm:px-12 lg:px-16 py-10 lg:py-14"
        >
          {/* Header */}
          <h1 className="text-[42px] leading-[1.1] font-extrabold text-slate-900 tracking-tight font-jakarta">
            Buat Akun
          </h1>
          <p className="mt-2 text-slate-500 text-base font-['Poppins']">
            Buat akun Edusafe Anda
          </p>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-8">
            {/* Grid 2 kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field 
                label="First Name" 
                placeholder="john.doe@gmail.com"
                id="firstName"
                value={formData.firstName || ''}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                disabled={loading}
              />
              <Field 
                label="Last Name" 
                placeholder="john.doe@gmail.com"
                id="lastName"
                value={formData.lastName || ''}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                disabled={loading}
              />
              <Field 
                label="Email" 
                placeholder="john.doe@gmail.com"
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
              <Field 
                label="Phone Number" 
                placeholder="0812-3456-7890"
                type="tel"
                id="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <Field
              label="Password"
              type="password"
              rightIcon
              placeholder="••••••••••"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              showPassword={formData.showPassword}
              onTogglePassword={() => setFormData({ ...formData, showPassword: !formData.showPassword })}
              required
              disabled={loading}
            />

            <Field
              label="Confirm Password"
              type="password"
              rightIcon
              placeholder="••••••••••"
              id="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              showPassword={formData.showConfirmPassword}
              onTogglePassword={() => setFormData({ ...formData, showConfirmPassword: !formData.showConfirmPassword })}
              required
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 h-12 w-full rounded-xl bg-[#6E89AC] text-white font-semibold shadow-[0_8px_24px_rgba(110,137,172,0.35)] hover:shadow-[0_12px_28px_rgba(110,137,172,0.45)] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-jakarta"
            >
              {loading ? 'Memproses...' : 'Create account'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

/* ===== Reusable Field Component ===== */
function Field({ 
  label, 
  placeholder, 
  type = 'text', 
  rightIcon, 
  id,
  value,
  onChange,
  showPassword,
  onTogglePassword,
  required,
  disabled
}) {
  return (
    <label className="block">
      {/* Label dengan top-line */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm font-semibold text-slate-700 font-['Poppins']">{label}</span>
        <span className="flex-1 border-t border-slate-200/80"></span>
      </div>
      <div className="relative">
        <input
          type={rightIcon && showPassword ? "text" : type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full h-12 rounded-xl border border-slate-300/80 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#6E89AC]/20 focus:border-[#6E89AC] transition-all font-['Poppins'] disabled:opacity-50 disabled:cursor-not-allowed ${rightIcon ? 'pr-11' : ''}`}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-3 grid place-items-center text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="toggle password"
          >
            {showPassword ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
    </label>
  );
}


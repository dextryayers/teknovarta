'use client';

import { useState } from 'react';
import { loginAdmin } from './actions';
import { ShieldCheck, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      // Success Alert
      Swal.fire({
        title: 'Akses Diterima!',
        text: 'Selamat datang kembali, Master.',
        icon: 'success',
        background: '#020617',
        color: '#fff',
        confirmButtonColor: '#dc2626',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        router.push('/welcome');
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-0 sm:p-4">
      <div className="w-full h-full sm:h-auto sm:max-w-md bg-white dark:bg-slate-900 border-none sm:border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-2xl shadow-none sm:shadow-xl overflow-hidden flex flex-col justify-center">
        <div className="bg-slate-950 px-8 py-12 text-center relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-20 blur-[50px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600 opacity-10 blur-[40px] rounded-full"></div>
          <ShieldCheck className="h-14 w-14 text-white mx-auto mb-6 relative z-10" />
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase relative z-10">Admin Portal</h1>
          <p className="text-xs font-semibold text-slate-400 mt-2 tracking-widest uppercase relative z-10">TeknoVarta Master Access</p>
        </div>
        
        <div className="p-8 flex-1 sm:flex-none">
          {error && (
            <div className="mb-8 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm font-semibold border border-red-100 dark:border-red-800 animate-in fade-in slide-in-from-top-1">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
              <input 
                name="username"
                type="text" 
                required
                disabled={isLoading}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-base font-medium focus:border-red-600 outline-none transition-all focus:ring-2 focus:ring-red-600/10"
                placeholder="Enter master username"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-base font-medium focus:border-red-600 outline-none transition-all focus:ring-2 focus:ring-red-600/10 pr-14"
                  placeholder="Enter master password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-2 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 h-14 rounded-xl text-white font-black uppercase tracking-widest text-xs mt-6 shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all"
            >
              {isLoading ? 'Authenticating...' : 'Secure Login'}
            </Button>
          </form>
          
          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase leading-relaxed">
              Unauthorized access is strictly prohibited,<br />monitored, & logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FileText, Users, ShieldAlert, Activity } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Master Dashboard</h1>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Overview System & Analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Artikel</p>
              <h3 className="text-2xl font-black">0</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl flex items-center justify-center">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trafik Hari Ini</p>
              <h3 className="text-2xl font-black">0</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IP Unik</p>
              <h3 className="text-2xl font-black">0</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 opacity-10 rounded-bl-full"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl flex items-center justify-center">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ancaman Keamanan</p>
              <h3 className="text-2xl font-black text-red-600">0</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Grafik Pengunjung</h3>
          <div className="flex items-center justify-center h-64 text-slate-400 text-sm font-semibold italic">
            Belum ada data untuk ditampilkan.
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-slate-800 pb-4 text-red-600 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" /> Log Pembobolan
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl text-center text-xs font-semibold text-slate-500">
              Sistem aman. Tidak ada deteksi akses ilegal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

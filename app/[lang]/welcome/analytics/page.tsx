'use client';

import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  Globe, 
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsPage() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' as const }, color: '#64748b' } },
      y: { grid: { color: 'rgba(0,0,0,0.03)' }, ticks: { font: { size: 10, weight: 'bold' as const }, color: '#64748b' } }
    }
  };

  const trafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Visitors',
      data: [4500, 5200, 4800, 6100, 5900, 7200, 8500],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const attackData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    datasets: [{
      label: 'Attacks Blocked',
      data: [2, 8, 1, 15, 4, 32, 5],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <div className="space-y-10">
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Intelligence <span className="text-red-600">Analytics</span></h1>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Deep insights into visitor behavior and system security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6" />
                 </div>
                 <div>
                    <h3 className="text-sm font-black uppercase tracking-widest">IP Traffic Volume</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Daily session monitoring</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-2xl font-black tabular-nums">12,402</p>
                 <p className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter flex items-center justify-end gap-1">
                    <ArrowUpRight className="h-3 w-3" /> +14.2%
                 </p>
              </div>
           </div>
           <div className="h-80">
              <Line data={trafficData} options={chartOptions} />
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl flex items-center justify-center">
                    <ShieldAlert className="h-6 w-6" />
                 </div>
                 <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-red-600">Security Intrusion</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Threat detection & logs</p>
                 </div>
              </div>
              <div className="text-right text-red-600">
                 <p className="text-2xl font-black tabular-nums">67</p>
                 <p className="text-[10px] font-black uppercase tracking-tighter flex items-center justify-end gap-1 opacity-60">
                    BLOCKED
                 </p>
              </div>
           </div>
           <div className="h-80">
              <Line data={attackData} options={{...chartOptions, scales: {...chartOptions.scales, y: {...chartOptions.scales.y, ticks: { ...chartOptions.scales.y.ticks, color: '#ef4444' }}} }} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-6">
               <Globe className="h-5 w-5 text-slate-400" />
               <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Top Locations</h4>
            </div>
            <div className="space-y-4">
               {[
                 { name: 'Indonesia', val: '65%', color: 'bg-red-600' },
                 { name: 'United States', val: '12%', color: 'bg-blue-600' },
                 { name: 'Singapore', val: '8%', color: 'bg-emerald-600' }
               ].map((loc, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                       <span>{loc.name}</span>
                       <span>{loc.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                       <div className={cn("h-full rounded-full", loc.color)} style={{ width: loc.val }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 col-span-1 md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-4">
               <MapPin className="h-5 w-5 text-slate-400" /> Real-time Security Event Logs
            </h4>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="border-b border-slate-100 dark:border-slate-800">
                     <tr className="text-[9px] font-black uppercase text-slate-400">
                        <th className="pb-4">Timestamp</th>
                        <th className="pb-4">IP Address</th>
                        <th className="pb-4">Method</th>
                        <th className="pb-4">Risk Level</th>
                        <th className="pb-4 text-right">Result</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                     {[
                       { time: '18:42:01', ip: '114.125.10.22', meth: 'SQLi Probe', risk: 'High', res: 'Blocked' },
                       { time: '18:35:44', ip: '192.168.1.1', meth: 'Brute Force', risk: 'Critical', res: 'IP Banned' },
                       { time: '18:22:12', ip: '45.76.121.2', meth: 'XSS Attempt', risk: 'Medium', res: 'Filtered' }
                     ].map((log, i) => (
                       <tr key={i} className="text-xs font-bold text-slate-600 dark:text-slate-400">
                          <td className="py-4 font-mono">{log.time}</td>
                          <td className="py-4 font-mono">{log.ip}</td>
                          <td className="py-4 uppercase tracking-tighter">{log.meth}</td>
                          <td className="py-4">
                             <span className={cn(
                               "px-2 py-0.5 rounded text-[8px] font-black uppercase",
                               log.risk === 'Critical' ? "bg-red-100 text-red-600" : log.risk === 'High' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                             )}>{log.risk}</span>
                          </td>
                          <td className="py-4 text-right">
                             <div className="flex items-center justify-end gap-2 text-emerald-600">
                                <ShieldCheck className="h-3 w-3" /> {log.res}
                             </div>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

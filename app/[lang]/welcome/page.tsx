'use client';

import { 
  FileText, 
  Users, 
  ShieldAlert, 
  TrendingUp, 
  Eye, 
  MousePointer2,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function WelcomeDashboard() {
  // Mock Data for Charts
  const trafficData = {
    labels: ['1 Apr', '5 Apr', '10 Apr', '15 Apr', '20 Apr', '23 Apr'],
    datasets: [
      {
        label: 'Daily Visitors',
        data: [120, 450, 300, 800, 650, 1200],
        fill: true,
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.05)',
        tension: 0.4,
      },
    ],
  };

  const securityData = {
    labels: ['1 Apr', '5 Apr', '10 Apr', '15 Apr', '20 Apr', '23 Apr'],
    datasets: [
      {
        label: 'Failed Login Attempts',
        data: [5, 12, 3, 25, 8, 2],
        fill: true,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.05)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        padding: 12,
        backgroundColor: '#020617',
        titleFont: { size: 10, weight: 'bold' as const },
        bodyFont: { size: 12 },
        cornerRadius: 8
      }
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: { font: { size: 10, weight: 'bold' as const }, color: '#64748b' }
      },
      y: { 
        grid: { color: 'rgba(0,0,0,0.03)' },
        ticks: { font: { size: 10, weight: 'bold' as const }, color: '#64748b' }
      }
    }
  };

  const stats = [
    { label: 'Total Articles', value: '156', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+12%', up: true },
    { label: 'Total Visitors', value: '42.8k', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', trend: '+25%', up: true },
    { label: 'Avg. Stay Time', value: '4m 32s', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', trend: '-2%', up: false },
    { label: 'Security Threats', value: '3', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', trend: '-90%', up: true },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">System <span className="text-red-600">Overview</span></h2>
           <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Real-time performance monitoring & news control</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800"></div>
              ))}
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest px-2">3 Masters Online</p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
           <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                 <div className={`h-12 w-12 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                 </div>
                 <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.trend}
                 </div>
              </div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</h4>
              <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{stat.value}</p>
           </div>
         ))}
      </div>

      {/* Analytics Diagrams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Traffic Diagram */}
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                     <TrendingUp className="h-5 w-5 text-red-600" /> Traffic Visitor
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Growth analysis for last 30 days</p>
               </div>
               <select className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1 outline-none">
                  <option>Monthly</option>
                  <option>Weekly</option>
               </select>
            </div>
            <div className="h-72">
               <Line data={trafficData} options={chartOptions} />
            </div>
         </div>

         {/* Security Diagram */}
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                     <ShieldAlert className="h-5 w-5 text-amber-500" /> Security Analytics
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Unauthorized access attempts monitoring</p>
               </div>
               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <div className="h-72">
               <Line data={securityData} options={chartOptions} />
            </div>
         </div>
      </div>

      {/* Recent Activity / System Logs */}
      <div className="bg-slate-950 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 opacity-5 blur-[100px] group-hover:opacity-10 transition-opacity"></div>
         <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
               <Activity className="h-5 w-5 text-red-600" /> Recent Master Logs
            </h3>
            <button className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">View All Logs</button>
         </div>

         <div className="space-y-4 relative z-10">
            {[
              { msg: 'Master Admin created a new article: "Fitur Rahasia S25 Ultra"', time: '2 mins ago', type: 'article' },
              { msg: 'Unauthorized IP (192.168.1.1) blocked from Login attempt', time: '1 hour ago', type: 'security' },
              { msg: 'System backup completed successfully', time: '5 hours ago', type: 'system' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group/item">
                 <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      log.type === 'article' ? "bg-blue-500" : log.type === 'security' ? "bg-red-500" : "bg-emerald-500"
                    )}></div>
                    <p className="text-xs font-bold text-slate-300 group-hover/item:text-white transition-colors">{log.msg}</p>
                 </div>
                 <span className="text-[10px] font-bold text-slate-600 group-hover/item:text-slate-400">{log.time}</span>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
}

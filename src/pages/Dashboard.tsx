import { CheckCircle2, FileText, PlayCircle, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0056b3] to-[#004494] p-8 md:p-12 shadow-lg text-white">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Welcome to OnboardEase, Jane!
          </h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            We're thrilled to have you on the team. Your onboarding journey is 35% complete. 
            Let's get you settled in with your next tasks.
          </p>
          <button className="bg-[#ff7f50] hover:bg-[#ff632b] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 flex items-center">
            Continue Onboarding <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#ff7f50]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Tasks Pending" 
          value="8" 
          subtitle="2 High Priority"
          icon={CheckCircle2}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard 
          title="Documents" 
          value="3" 
          subtitle="Awaiting Signature"
          icon={FileText}
          color="text-orange-600"
          bgColor="bg-orange-50"
        />
        <StatCard 
          title="Training" 
          value="120m" 
          subtitle="Content Remaining"
          icon={PlayCircle}
          color="text-emerald-600"
          bgColor="bg-emerald-50"
        />
      </div>

      {/* Quick Actions / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2 text-[#0056b3]" />
            Next Up
          </h2>
          <div className="space-y-4">
            {[
              { title: "Complete Employee Profile", time: "Due Today", status: "Urgent" },
              { title: "Sign Non-Disclosure Agreement", time: "Due Tomorrow", status: "Pending" },
              { title: "Watch 'Company Culture' Video", time: "Due in 2 days", status: "Pending" }
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors group">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-slate-300 mr-4 group-hover:bg-[#0056b3] transition-colors"></div>
                  <div>
                    <p className="font-medium text-slate-700">{task.title}</p>
                    <p className="text-sm text-slate-500">{task.time}</p>
                  </div>
                </div>
                {task.status === "Urgent" && (
                  <span className="px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
                    {task.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
             <PlayCircle className="w-5 h-5 mr-2 text-[#0056b3]" />
             Featured Training
          </h2>
          <div className="relative group overflow-hidden rounded-lg">
             <div className="aspect-video bg-slate-100 w-full object-cover relative">
                {/* Mock Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 group-hover:bg-slate-900/10 transition-colors">
                   <PlayCircle className="w-12 h-12 text-white drop-shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                </div>
             </div>
             <div className="mt-3">
                <h3 className="font-medium text-slate-800">Welcome to the Team: CEO Message</h3>
                <p className="text-sm text-slate-500 mt-1">Duration: 5 min • Introduction</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color, bgColor }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
        <div className={cn("p-3 rounded-lg", bgColor)}>
          <Icon className={cn("w-6 h-6", color)} />
        </div>
      </div>
    </div>
  )
}

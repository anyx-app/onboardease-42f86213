import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, FileText, Video, Users, LogOut, Bell, Menu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CheckSquare, label: 'My Checklist', path: '/checklist' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Video, label: 'Training', path: '/training' },
    { icon: Users, label: 'Team', path: '/team' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar - Professional Blue Theme */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#0056b3] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-xl flex flex-col",
          !isSidebarOpen && "-translate-x-full lg:hidden"
        )}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-lg bg-[#ff7f50] flex items-center justify-center mr-3 shadow-lg transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          <span className="font-semibold text-xl tracking-tight text-white/95">OnboardEase</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-white/15 text-white shadow-md backdrop-blur-md border border-white/10 translate-x-1"
                    : "text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1"
                )
              }
            >
              <item.icon className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Profile / Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm mt-auto">
          <div className="flex items-center group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold border border-white/10 shadow-sm">
              JD
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-white truncate group-hover:text-[#ff7f50] transition-colors">Jane Doe</p>
              <p className="text-xs text-white/60 truncate">New Hire</p>
            </div>
            <button className="ml-auto text-white/60 hover:text-white transition-colors p-1">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shadow-sm sticky top-0 z-40 transition-all">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Spacer for desktop layout balance */}
          <div className="hidden lg:block"></div>

          <div className="flex-1 flex justify-end items-center space-x-4">
            <div className="relative group">
              <button className="p-2 text-slate-400 hover:text-[#0056b3] transition-colors rounded-full hover:bg-blue-50">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff7f50] rounded-full border-2 border-white animate-pulse"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}
    </div>
  );
}

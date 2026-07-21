'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Map,
  Bell,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  ChevronDown,
  Camera,
  Upload,
  MessageSquare,
} from 'lucide-react';
import Image from 'next/image';

const clientNavItems = [
  { name: "Vue d'ensemble", path: '/client/dashboard', icon: LayoutDashboard },
  { name: "Mes Sites", path: '/client/mes-sites', icon: Map },
  { name: "Alertes", path: '/client/alertes', icon: Bell },
  { name: "Rapports", path: '/client/rapports', icon: FileText },
  { name: "Appareil photo", path: '/client/appareil-photo', icon: Camera },
  { name: "Envoyer un fichier", path: '/client/envoyer-fichier', icon: Upload },
  { name: "Messagerie", path: '/client/reponses-admin', icon: MessageSquare },
  { name: "Paramètres", path: '/client/settings', icon: Settings },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    router.push('/connexion');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-60 border-r border-neutral-200 bg-white shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-neutral-200 gap-3">
          <img src="/logo-new.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-sm tracking-tight">
            <span style={{ color: '#2d6a0f' }}>Ecosystem</span>{' '}
            <span style={{ color: '#1a3d7c' }}>Monitoring</span>
          </span>
        </div>

        {/* Client badge */}
        <div className="mx-4 mt-4 mb-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Espace Client</p>
          <p className="text-xs font-semibold text-emerald-900 mt-0.5 truncate">Karim Benali</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {clientNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-50/70 text-emerald-700 border border-emerald-500/10 shadow-sm'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-600' : 'text-neutral-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-neutral-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors border border-transparent hover:border-red-100"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-neutral-900/30 backdrop-blur-sm transition-opacity duration-200 ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileOpen(false)}
      >
        <aside
          className={`w-64 h-full bg-white flex flex-col transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-16 flex items-center justify-between px-5 border-b border-neutral-200">
            <span className="font-bold text-sm">
              <span style={{ color: '#2d6a0f' }}>Ecosystem</span>{' '}
              <span style={{ color: '#1a3d7c' }}>Monitoring</span>
            </span>
            <button onClick={() => setIsMobileOpen(false)} className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {clientNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all border ${
                    isActive ? 'bg-emerald-50/70 text-emerald-700 border-emerald-500/10' : 'text-neutral-500 hover:bg-neutral-100 border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-t border-neutral-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Se déconnecter
            </button>
          </div>
        </aside>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 z-40 shadow-sm shadow-neutral-100/40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 border border-neutral-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <nav className="hidden sm:flex items-center gap-2 text-xs font-semibold text-neutral-400">
              <Link href="/client/dashboard" className="font-bold">
                <span style={{ color: '#2d6a0f' }}>Ecosystem</span>{' '}
                <span style={{ color: '#1a3d7c' }}>Monitoring</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/client/dashboard" className="hover:text-neutral-700 transition-colors">Espace Client</Link>
              {pathname.includes('/client/mes-sites') && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-neutral-705 font-bold">Mes Sites</span>
                </>
              )}
              {pathname.includes('/client/alertes') && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-neutral-705 font-bold">Alertes</span>
                </>
              )}
              {pathname.includes('/client/rapports') && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-neutral-705 font-bold">Rapports</span>
                </>
              )}
              {pathname.includes('/client/settings') && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-neutral-705 font-bold">Paramètres</span>
                </>
              )}
              {pathname.includes('/client/appareil-photo') && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-neutral-705 font-bold">Appareil photo</span>
                </>
              )}
              {pathname.includes('/client/envoyer-fichier') && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-neutral-705 font-bold">Envoyer un fichier</span>
                </>
              )}
              {pathname.includes('/client/reponses-admin') && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-neutral-705 font-bold">Messagerie</span>
                </>
              )}
            </nav>
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 border border-neutral-200 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs">
                K
              </div>
              <span className="hidden sm:block">Karim Benali</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2.5 w-52 rounded-2xl border border-neutral-200 bg-white shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-neutral-100">
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Session active</p>
                  <p className="text-xs font-bold text-neutral-800 truncate mt-0.5">karim.benali@organisation.dz</p>
                </div>
                <Link
                  href="/client/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                >
                  <User className="w-4 h-4 text-neutral-400" />
                  Mon profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

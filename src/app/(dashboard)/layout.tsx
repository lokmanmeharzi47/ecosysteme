'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
 LayoutDashboard,
 Flame,
 Map,
 Brain,
 Radio,
 AlertTriangle,
 BarChart3,
 FileText,
 Users as UsersIcon,
 Settings as SettingsIcon,
 ChevronLeft,
 ChevronRight,
 Menu,
 Bell,
 Search,
 LogOut,
 HelpCircle,
 X,
 ChevronDown,
 User,
 MessageSquare
} from 'lucide-react';

const sidebarItems = [
 { name:"Vue d'ensemble", path:"/dashboard", icon: LayoutDashboard },
 { name:"Suivi des Feux", path:"/fire-monitoring", icon: Flame },
 { name:"Carte GIS", path:"/cartographie", icon: Map },
 { name:"Détection IA", path:"/centre-ia", icon: Brain },
 { name:"Capteurs (LoRaWAN)", path:"/capteurs", icon: Radio },
 { name:"Alertes", path:"/alertes", icon: AlertTriangle },
 { name:"Analyses", path:"/analytics", icon: BarChart3 },
 { name:"Rapports", path:"/rapports", icon: FileText },
 { name:"Support Client", path:"/messages", icon: MessageSquare },
 { name:"Utilisateurs", path:"/users", icon: UsersIcon },
 { name:"Paramètres", path:"/settings", icon: SettingsIcon },
];

export default function DashboardLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 const pathname = usePathname();
 const router = useRouter();
 const [isCollapsed, setIsCollapsed] = useState(false);
 const [isMobileOpen, setIsMobileOpen] = useState(false);
 const [isProfileOpen, setIsProfileOpen] = useState(false);
 const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");

 const notifications = [
  { id: 1, title:"Alerte Critique : Incendie Suspect", desc:"Forêt d'Akfadou (Béjaïa) - Confiance IA 94%", time:"Il y a 5 min", unread: true },
  { id: 2, title:"Batterie Faible", desc:"Capteur SOL-B-04 (Mitidja) à 18%", time:"Il y a 42 min", unread: true },
  { id: 3, title:"Maintenance Effectuée", desc:"Recalibration Capteur TEMP-A-01", time:"Il y a 2 heures", unread: false },
 ];

 useEffect(() => {
  setIsMobileOpen(false);
  setIsProfileOpen(false);
  setIsNotificationsOpen(false);
 }, [pathname]);

 const toggleSidebar = () => setIsCollapsed(!isCollapsed);
 const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

 // Generate Breadcrumbs
 const getBreadcrumbs = () => {
  const paths = pathname.split('/').filter(p => p);
  if (paths.length === 0) return [{ label:"Accueil", href:"/dashboard", active: true }];

  return paths.map((path, idx) => {
   const isLast = idx === paths.length - 1;
   let label = path.charAt(0).toUpperCase() + path.slice(1);

   if (path === 'dashboard') label ="Vue d'ensemble";
   else if (path === 'fire-monitoring') label ="Suivi des Feux";
   else if (path === 'cartographie') label ="Carte GIS";
   else if (path === 'centre-ia') label ="Détection IA";
   else if (path === 'capteurs') label ="Capteurs (LoRaWAN)";
   else if (path === 'alertes') label ="Alertes";
   else if (path === 'analytics') label ="Analyses";
   else if (path === 'rapports') label ="Rapports";
   else if (path === 'messages') label ="Support Client";
   else if (path === 'users') label ="Utilisateurs";
   else if (path === 'settings') label ="Paramètres";

   return {
    label,
    href: '/' + paths.slice(0, idx + 1).join('/'),
    active: isLast
   };
  });
 };

 const breadcrumbs = getBreadcrumbs();

 return (
  <div className="flex h-screen overflow-hidden bg-slate-50 font-sans transition-colors duration-200">

   {/* Sidebar - Desktop */}
   <aside
    className={`hidden md:flex flex-col border-r border-neutral-200 bg-white transition-all duration-350 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'
     }`}
   >
    {/* Sidebar Header */}
    <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-5'} border-b border-neutral-200`}>
     <Link href="/dashboard"className={`flex items-center gap-2.5 overflow-hidden ${isCollapsed ? 'justify-center' : ''}`}>
      <img 
       src="/logo-new.png"
       alt="Logo"
       className="w-9 h-9 rounded-xl object-contain shrink-0"
      />
      {!isCollapsed && (
       <span className="font-bold tracking-tight text-sm whitespace-nowrap">
        <span style={{ color: '#2d6a0f' }}>Ecosystem</span>{' '}
        <span style={{ color: '#1a3d7c' }}>Monitoring</span>
       </span>
      )}
     </Link>
    </div>

    {/* Sidebar Navigation */}
    <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5">
     {sidebarItems.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
      return (
       <Link
        key={item.name}
        href={item.path}
        className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3.5'} py-3 rounded-xl text-xs font-bold transition-all group relative ${isActive
         ? 'bg-emerald-50/70 text-emerald-700 border border-emerald-500/10 shadow-sm shadow-emerald-500/5'
         : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 border border-transparent'
         }`}
       >
        <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-emerald-600' : 'text-neutral-450 group-hover:text-neutral-700'}`} />
        {!isCollapsed && <span className="truncate">{item.name}</span>}
        {isCollapsed && (
         <span className="absolute left-20 scale-0 group-hover:scale-100 bg-neutral-900 text-white text-[10px] font-bold px-2 py-1.5 rounded-lg shadow-md transition-all duration-150 z-50 whitespace-nowrap">
          {item.name}
         </span>
        )}
       </Link>
      );
     })}
    </nav>

    {/* Sidebar Footer */}
    <div className="p-3 border-t border-neutral-200 bg-neutral-50/40">
     <button
      onClick={toggleSidebar}
      className="w-full flex items-center justify-center p-2 rounded-xl text-neutral-500 hover:bg-neutral-150 hover:text-neutral-800 transition-colors border border-transparent hover:border-neutral-250"
     >
      {isCollapsed ? <ChevronRight className="w-5 h-5"/> : <ChevronLeft className="w-5 h-5"/>}
     </button>
    </div>
   </aside>

   {/* Mobile Drawer Sidebar */}
   <div
    className={`md:hidden fixed inset-0 z-50 bg-neutral-900/30 backdrop-blur-sm transition-opacity duration-200 ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
     }`}
    onClick={toggleMobile}
   >
    <aside
     className={`w-72 h-full bg-white flex flex-col transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
     onClick={(e) => e.stopPropagation()}
    >
     <div className="h-16 flex items-center justify-between px-5 border-b border-neutral-200">
      <Link href="/dashboard"className="flex items-center gap-2.5 overflow-hidden">
       <img 
        src="/logo-new.png"
        alt="Logo"
        className="w-9 h-9 rounded-xl object-contain shrink-0"
       />
       <span className="font-bold tracking-tight text-sm whitespace-nowrap">
        <span style={{ color: '#2d6a0f' }}>Ecosystem</span>{' '}
        <span style={{ color: '#1a3d7c' }}>Monitoring</span>
       </span>
      </Link>
      <button onClick={toggleMobile} className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100">
       <X className="w-6 h-6"/>
      </button>
     </div>

     <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5">
      {sidebarItems.map((item) => {
       const Icon = item.icon;
       const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
       return (
        <Link
         key={item.name}
         href={item.path}
         className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all border ${isActive
          ? 'bg-emerald-50/70 text-emerald-700 border-emerald-500/10'
          : 'text-neutral-500 hover:bg-neutral-100 border-transparent'
          }`}
        >
         <Icon className="w-4.5 h-4.5"/>
         <span>{item.name}</span>
        </Link>
       );
      })}
     </nav>
    </aside>
   </div>

   {/* Main Content Area */}
   <div className="flex-1 flex flex-col overflow-hidden">

    {/* Top Navbar */}
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 z-40 shadow-sm shadow-neutral-100/40">

     {/* Top Navbar Left: Toggle Mobile / Breadcrumbs */}
     <div className="flex items-center gap-4">
      <button
       onClick={toggleMobile}
       className="md:hidden p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 border border-neutral-200"
      >
       <Menu className="w-5 h-5"/>
      </button>

      {/* Breadcrumb Navigation */}
      <nav className="hidden sm:flex items-center gap-2 text-xs font-semibold text-neutral-400">
       <Link href="/dashboard"className="hover:text-neutral-900 transition-colors font-bold">
        <span style={{ color: '#2d6a0f' }}>Ecosystem</span>{' '}
        <span style={{ color: '#1a3d7c' }}>Monitoring</span>
       </Link>
       {breadcrumbs.map((bc, idx) => (
        <React.Fragment key={idx}>
         <span className="text-neutral-300">/</span>
         {bc.active ? (
          <span className="text-neutral-800 font-bold truncate max-w-[120px] md:max-w-[200px]">
           {bc.label}
          </span>
         ) : (
          <Link href={bc.href} className="hover:text-neutral-900 transition-colors truncate max-w-[120px]">
           {bc.label}
          </Link>
         )}
        </React.Fragment>
       ))}
      </nav>
     </div>

     {/* Top Navbar Right: Global Search, Notifications, Profile */}
     <div className="flex items-center gap-3">

      {/* Global Search Bar */}
      <div className="hidden lg:relative lg:block w-72">
       <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-neutral-400"/>
       </span>
       <input
        type="text"
        placeholder="Rechercher capteurs, alertes, zones..."
        className="w-full bg-neutral-100/80 border border-transparent focus:border-emerald-500 focus:bg-white rounded-xl pl-10 pr-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 outline-none transition-all"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
       />
      </div>

      {/* Notifications Bell Button & Dropdown */}
      <div className="relative">
       <button
        onClick={() => {
         setIsNotificationsOpen(!isNotificationsOpen);
         setIsProfileOpen(false);
        }}
        className="p-2.5 rounded-xl text-neutral-500 hover:bg-neutral-100 transition-colors relative border border-neutral-200"
        aria-label="Alerts and notifications"
       >
        <Bell className="w-4 h-4"/>
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"/>
       </button>

       {isNotificationsOpen && (
        <div className="absolute right-0 mt-2.5 w-80 md:w-96 rounded-2xl border border-neutral-200 bg-white shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
         <div className="flex items-center justify-between px-4 pb-2 border-b border-neutral-200">
          <span className="font-bold text-neutral-850 text-xs">Notifications</span>
          <button className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700">Tout marquer lu</button>
         </div>
         <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
          {notifications.map((notif) => (
           <div key={notif.id} className={`p-4 hover:bg-neutral-50/50 transition-colors ${notif.unread ? 'bg-neutral-50/20' : ''}`}>
            <div className="flex items-start justify-between gap-2">
             <h4 className="text-xs font-bold text-neutral-905">{notif.title}</h4>
             {notif.unread && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1"/>}
            </div>
            <p className="text-[11px] text-neutral-450 mt-1 leading-normal">{notif.desc}</p>
            <span className="text-[9px] text-neutral-400 block mt-2 font-medium">{notif.time}</span>
           </div>
          ))}
         </div>
         <div className="text-center pt-2.5 border-t border-neutral-200">
          <Link href="/alertes"className="text-xs font-bold text-neutral-500 hover:text-neutral-800 block py-1">
           Voir toutes les alertes
          </Link>
         </div>
        </div>
       )}
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-neutral-200"/>

      {/* Profile Dropdown */}
      <div className="relative">
       <button
        onClick={() => {
         setIsProfileOpen(!isProfileOpen);
         setIsNotificationsOpen(false);
        }}
        className="flex items-center gap-2 p-1 border border-neutral-200 rounded-xl hover:bg-slate-50 transition-colors"
       >
        <div className="w-8 h-8 rounded-lg bg-emerald-700/10 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
         CD
        </div>
        <div className="hidden sm:block text-left shrink-0">
         <div className="text-xs font-bold text-neutral-850 leading-tight">Dr. C. Durand</div>
         <div className="text-[10px] text-neutral-400 font-semibold leading-none mt-0.5">Admin Scientifique</div>
        </div>
        <ChevronDown className="w-4 h-4 text-neutral-400 hidden sm:block"/>
       </button>

       {isProfileOpen && (
        <div className="absolute right-0 mt-2.5 w-56 rounded-2xl border border-neutral-200 bg-white shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
         <div className="px-4 py-2 border-b border-neutral-200">
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Session active</p>
          <p className="text-xs font-bold text-neutral-850 truncate mt-0.5">claire.durand@Ecosystem Monitoring.dz</p>
         </div>
         <Link href="/settings"className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors">
          <User className="w-4 h-4 text-neutral-400"/>
          Mon Profil
         </Link>
         <Link href="/settings"className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors">
          <SettingsIcon className="w-4 h-4 text-neutral-400"/>
          Paramètres IA
         </Link>
         <a href="https://nextjs.org/docs"target="_blank"rel="noopener noreferrer"className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors">
          <HelpCircle className="w-4 h-4 text-neutral-400"/>
          Documentation
         </a>
         <div className="border-t border-neutral-200 my-1"/>
         <Link href="/"className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-650 hover:bg-red-50 transition-colors">
          <LogOut className="w-4 h-4"/>
          Déconnexion
         </Link>
        </div>
       )}
      </div>

     </div>
    </header>

    {/* Dashboard Main Scrollable Area */}
    <main className="flex-1 overflow-y-auto bg-slate-50/50">
     {children}
    </main>
   </div>

  </div>
 );
}

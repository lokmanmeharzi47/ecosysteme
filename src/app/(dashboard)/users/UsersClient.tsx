'use client';

import React, { useState } from 'react';
import {
 Users as UsersIcon,
 UserPlus,
 Search,
 Trash2,
 UserMinus,
 CheckCircle,
 XCircle,
 X,
 UserCheck,
 Shield
} from 'lucide-react';

interface User {
 id: string;
 name: string;
 email: string;
 role: 'admin' | 'client';
 status: 'Actif' | 'Suspendu';
 lastLogin: string;
}

export default function UsersClient({ initialUsers }: { initialUsers: User[] }) {
 const [users, setUsers] = useState<User[]>(initialUsers);
 const [search, setSearch] = useState("");
 const [roleFilter, setRoleFilter] = useState("all");
 const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 const [newUser, setNewUser] = useState({
  name:"",
  email:"",
  role:"client"as User['role'],
  status:"Actif"as User['status']
 });

 const handleSuspend = (id: string) => {
  setUsers(prev => prev.map(u => {
   if (u.id === id) {
    const nextStatus = u.status === 'Actif' ? 'Suspendu' as const : 'Actif' as const;
    return { ...u, status: nextStatus };
   }
   return u;
  }));
 };

 const handleDelete = (id: string, name: string) => {
  if (confirm(`Voulez-vous supprimer définitivement l'utilisateur ${name} ?`)) {
   setUsers(prev => prev.filter(u => u.id !== id));
  }
 };

 const handleAddUser = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newUser.name || !newUser.email) return;

  const userToAdd: User = {
   id: Date.now().toString(),
   name: newUser.name,
   email: newUser.email,
   role: newUser.role,
   status: newUser.status,
   lastLogin:"Jamais"
  };

  setUsers([userToAdd, ...users]);
  setIsAddModalOpen(false);
  setNewUser({ name:"", email:"", role:"client", status:"Actif"});
 };

 const filteredUsers = users.filter(u => {
  const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
   u.email.toLowerCase().includes(search.toLowerCase());
  const matchRole = roleFilter ==="all"|| u.role === roleFilter;
  return matchSearch && matchRole;
 });

 const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
 };

 return (
  <div className="p-5 md:p-8 space-y-8 max-w-[1600px] mx-auto text-xs">

   {/* Page Header */}
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
    <div>
     <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
      <UsersIcon className="w-6 h-6 text-emerald-600"/>
      Gestion des Utilisateurs & Rôles
     </h1>
     <p className="text-xs font-bold text-neutral-450 mt-1">
      Gérez les autorisations d'accès à la console pour les administrateurs, ingénieurs DGF, agents ANF et Protection Civile.
     </p>
    </div>

    <button
     onClick={() => setIsAddModalOpen(true)}
     className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-500/10"
    >
     <UserPlus className="w-3.5 h-3.5"/>
     Inviter un Collaborateur
    </button>
   </div>

   {/* Toolbar / Filters */}
   <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

    <div className="flex-1 relative max-w-md">
     <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
      <Search className="h-4 w-4 text-neutral-400"/>
     </span>
     <input
      type="text"
      placeholder="Rechercher par nom, email..."
      className="w-full bg-slate-50 border border-neutral-200 focus:border-emerald-500 focus:bg-white rounded-xl pl-10 pr-4 py-2 text-[11px] outline-none text-slate-900 transition-all font-semibold placeholder-neutral-400"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
     />
    </div>

    <div className="flex items-center gap-2">
     <span className="text-xs font-bold text-neutral-450 uppercase tracking-widest text-[9px]">Filtrer par Rôle</span>
     <select
      value={roleFilter}
      onChange={(e) => setRoleFilter(e.target.value)}
      className="bg-slate-50 border border-neutral-200 rounded-xl px-3 py-1.5 font-bold text-neutral-700 outline-none focus:border-emerald-500 transition-colors"
     >
      <option value="all">Tous les rôles</option>
      <option value="admin">Admin</option>
      <option value="client">Client</option>
     </select>
    </div>

   </div>

   {/* Users Table */}
   <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
     <table className="w-full text-left border-collapse text-xs">
      <thead>
       <tr className="bg-slate-50/70 text-neutral-500 font-bold border-b border-neutral-200">
        <th className="p-4">Collaborateur</th>
        <th className="p-4">Rôle</th>
        <th className="p-4">Dernière Connexion</th>
        <th className="p-4">Statut</th>
        <th className="p-4 text-right">Actions</th>
       </tr>
      </thead>
      <tbody className="divide-y divide-neutral-100 text-neutral-700 font-semibold">
       {filteredUsers.map((u) => (
        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
         <td className="p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-700/10 text-emerald-700 font-bold flex items-center justify-center shrink-0">
           {getInitials(u.name)}
          </div>
          <div>
           <div className="font-bold text-slate-900 text-xs">{u.name}</div>
           <div className="text-[10px] text-neutral-400 font-semibold mt-0.5">{u.email}</div>
          </div>
         </td>
         <td className="p-4">
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
           <Shield className={`w-3.5 h-3.5 ${u.role === 'admin' ? 'text-indigo-500' : 'text-neutral-450'
            }`} />
           {u.role === 'admin' ? 'Administrateur' : 'Client'}
          </span>
         </td>
         <td className="p-4 font-mono text-neutral-450">{u.lastLogin}</td>
         <td className="p-4">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${u.status === 'Actif'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
            : 'bg-red-55 text-red-700 border-red-100'
           }`}>
           {u.status === 'Actif' ? (
            <CheckCircle className="w-3.5 h-3.5"/>
           ) : (
            <XCircle className="w-3.5 h-3.5"/>
           )}
           {u.status}
          </span>
         </td>
         <td className="p-4 text-right">
          <div className="flex items-center justify-end gap-1.5">
           <button
            onClick={() => handleSuspend(u.id)}
            className={`p-1.5 rounded-lg hover:bg-slate-100 border border-neutral-200 text-neutral-400 ${u.status === 'Actif' ? 'hover:text-amber-500' : 'hover:text-emerald-500'
             }`}
            title={u.status === 'Actif' ? 'Suspendre' : 'Réactiver'}
           >
            {u.status === 'Actif' ? <UserMinus className="w-4 h-4"/> : <UserCheck className="w-4 h-4"/>}
           </button>
           <button
            onClick={() => handleDelete(u.id, u.name)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 border border-neutral-200"
            title="Supprimer"
           >
            <Trash2 className="w-4 h-4"/>
           </button>
          </div>
         </td>
        </tr>
       ))}
       {filteredUsers.length === 0 && (
        <tr>
         <td colSpan={5} className="p-8 text-center text-neutral-450">
          Aucun collaborateur trouvé.
         </td>
        </tr>
       )}
      </tbody>
     </table>
    </div>
   </div>

   {/* Modal: Invite User */}
   {isAddModalOpen && (
    <div className="fixed inset-0 z-50 bg-neutral-900/30 backdrop-blur-sm flex items-center justify-center p-4">
     <div className="bg-white border border-neutral-200 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">

      <div className="flex items-center justify-between p-5 border-b border-neutral-200 bg-slate-50/50">
       <h3 className="font-bold text-sm text-slate-850">Inviter un Nouveau Collaborateur</h3>
       <button onClick={() => setIsAddModalOpen(false)} className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-slate-100">
        <X className="w-5 h-5"/>
       </button>
      </div>

      <form onSubmit={handleAddUser} className="p-5 space-y-4">
       <div className="space-y-1.5">
        <label className="font-bold text-neutral-450 uppercase tracking-widest text-[9px]">Nom Complet</label>
        <input
         type="text"
         required
         placeholder="ex. Kamel Benali"
         className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none text-slate-900 font-semibold focus:border-emerald-500 focus:bg-white"
         value={newUser.name}
         onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
       </div>

       <div className="space-y-1.5">
        <label className="font-bold text-neutral-450 uppercase tracking-widest text-[9px]">Adresse Email Professionnelle</label>
        <input
         type="email"
         required
         placeholder="ex. k.benali@protectioncivile.dz"
         className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none text-slate-900 font-semibold font-mono focus:border-emerald-500 focus:bg-white"
         value={newUser.email}
         onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
       </div>

       <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
         <label className="font-bold text-neutral-450 uppercase tracking-widest text-[9px]">Rôle Console</label>
         <select
          className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none text-neutral-700 font-bold focus:border-emerald-500"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
         >
          <option value="admin">Administrateur</option>
          <option value="client">Client</option>
         </select>
        </div>
        <div className="space-y-1.5">
         <label className="font-bold text-neutral-450 uppercase tracking-widest text-[9px]">Statut Initial</label>
         <select
          className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none text-neutral-700 font-bold focus:border-emerald-500"
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value as any })}
         >
          <option value="Actif">Actif</option>
          <option value="Suspendu">Suspendu</option>
         </select>
        </div>
       </div>

       <div className="flex justify-end gap-2.5 pt-5 border-t border-neutral-200">
        <button
         type="button"
         onClick={() => setIsAddModalOpen(false)}
         className="px-4 py-2 border border-neutral-200 rounded-xl hover:bg-slate-50 font-bold text-neutral-600 text-xs shadow-sm"
        >
         Annuler
        </button>
        <button
         type="submit"
         className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold text-xs shadow-md shadow-emerald-500/10"
        >
         Inviter
        </button>
       </div>
      </form>

     </div>
    </div>
   )}

  </div>
 );
}

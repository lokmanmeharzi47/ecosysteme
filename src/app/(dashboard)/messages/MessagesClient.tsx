'use client';

import React, { useState } from 'react';
import { 
 MessageSquare, 
 Send, 
 Clock, 
 Inbox,
 Building
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface Message {
 id: string;
 sender: 'admin' | 'client';
 senderName: string;
 avatarLetter: string;
 avatarBg: string;
 content: string;
 time: string;
}

interface OrgThread {
 id: string;
 organizationName: string;
 date: string;
 messages: Message[];
}

export default function MessagesClient({ 
 initialThreads,
 userId
}: { 
 initialThreads: OrgThread[];
 userId: string;
}) {
 const [threads, setThreads] = useState<OrgThread[]>(initialThreads);
 const [activeThreadId, setActiveThreadId] = useState(initialThreads[0]?.id);
 const [replyText, setReplyText] = useState("");

 const activeThread = threads.find(t => t.id === activeThreadId) || threads[0] || {} as OrgThread;
 const supabase = createClient();

 const handleSendReply = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!replyText.trim() || !activeThreadId) return;

  const currentText = replyText;
  setReplyText("");

  try {
   const { data: insertedMsg, error } = await supabase
    .from('messages')
    .insert({
     sender_id: userId,
     organization_id: activeThreadId, // thread ID is the org ID
     content: currentText
    })
    .select()
    .single();

   if (error) throw error;

   const newMsg: Message = {
    id: insertedMsg.id,
    sender: 'admin',
    senderName: 'Moi (Admin)',
    avatarLetter: 'A',
    avatarBg: 'bg-blue-600',
    content: currentText,
    time: new Date(insertedMsg.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})
   };

   const updatedThreads = threads.map(t => {
    if (t.id === activeThreadId) {
     return {
      ...t,
      messages: [...t.messages, newMsg],
      date: newMsg.time
     };
    }
    return t;
   });

   setThreads(updatedThreads);
  } catch (error) {
   console.error('Error sending message:', error);
   alert('Error sending message');
   setReplyText(currentText); // revert
  }
 };

 return (
  <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto text-xs">
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
    <div>
     <h1 className="text-xl font-black text-neutral-900 font-sans flex items-center gap-2">
      <MessageSquare className="w-5 h-5 text-emerald-600"/>
      Support Client & Messagerie
     </h1>
     <p className="text-xs text-neutral-500 font-semibold mt-0.5">
      Échangez en temps réel avec les différentes organisations clientes.
     </p>
    </div>
   </div>

   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    {/* Left Side: Threads List */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm h-fit space-y-4">
     <h3 className="font-bold text-neutral-800 text-sm border-b border-neutral-100 pb-2.5 flex items-center gap-1.5">
      <Inbox className="w-4.5 h-4.5 text-emerald-600"/>
      Organisations
     </h3>

     <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
      {threads.length === 0 && (
       <p className="text-neutral-400 font-semibold p-4 text-center">Aucune organisation trouvée.</p>
      )}
      {threads.map((thread) => {
       const isActive = thread.id === activeThreadId;
       const lastMessage = thread.messages[thread.messages.length - 1];
       return (
        <div
         key={thread.id}
         onClick={() => setActiveThreadId(thread.id)}
         className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left space-y-2 ${
          isActive 
           ? 'border-blue-500 bg-blue-50/10 shadow-sm' 
           : 'border-neutral-200 hover:border-neutral-350'
         }`}
        >
         <div className="flex items-start justify-between gap-2">
          <span className="font-bold text-neutral-850 truncate leading-snug max-w-[80%] flex items-center gap-1.5">
           <Building className="w-3.5 h-3.5 text-neutral-400"/>
           {thread.organizationName}
          </span>
         </div>
         
         {lastMessage && (
          <p className="text-[10px] text-neutral-450 line-clamp-2 font-semibold">
           {lastMessage.content}
          </p>
         )}

         <div className="flex justify-between items-center text-[9px] text-neutral-400 font-semibold pt-1 border-t border-neutral-200/40">
          <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5"/>{thread.date}</span>
         </div>
        </div>
       );
      })}
     </div>
    </div>

    {/* Right Side: Conversation Panel */}
    <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden min-h-[500px]">
     
     <div className="p-4 border-b border-neutral-200 bg-neutral-50/50 flex items-center justify-between">
      <div>
       <h3 className="font-black text-neutral-900 text-sm flex items-center gap-2">
        <Building className="w-4 h-4 text-neutral-400"/>
        {activeThread?.organizationName || 'Sélectionnez une organisation'}
       </h3>
      </div>
     </div>

     <div className="p-5 flex-1 space-y-4 overflow-y-auto bg-slate-50/30">
      {activeThread?.messages?.length === 0 && (
       <p className="text-center text-neutral-400 font-semibold mt-10">Aucun message avec cette organisation.</p>
      )}
      {activeThread?.messages?.map((msg) => {
       const isAdmin = msg.sender === 'admin';
       return (
        <div key={msg.id} className={`flex gap-3 max-w-[85%] ${isAdmin ? 'ml-auto flex-row-reverse' : ''}`}>
         
         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${msg.avatarBg}`}>
          {msg.avatarLetter}
         </div>

         <div className="space-y-1.5">
          <div className={`flex items-center gap-1.5 text-[9px] text-neutral-400 font-semibold ${isAdmin ? 'justify-end' : ''}`}>
           <span className="text-neutral-700 font-bold">{msg.senderName}</span>
           <span>•</span>
           <span>{msg.time}</span>
          </div>

          <div className={`p-4 rounded-2xl border text-neutral-850 leading-relaxed font-semibold shadow-sm ${
           isAdmin 
            ? 'bg-blue-600 border-blue-600 text-white rounded-tr-none' 
            : 'bg-white border-neutral-200 rounded-tl-none'
          }`}>
           {msg.content}
          </div>
         </div>

        </div>
       );
      })}
     </div>

     <div className="p-4 border-t border-neutral-200 bg-white">
      <form onSubmit={handleSendReply} className="flex gap-2 items-center">
       <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Rédiger votre message..."
        disabled={!activeThreadId}
        className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all font-semibold disabled:opacity-50"
       />
       <button
        type="submit"
        disabled={!replyText.trim() || !activeThreadId}
        className="px-4 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 shrink-0 flex items-center justify-center"
       >
        <Send className="w-4 h-4"/>
       </button>
      </form>
     </div>

    </div>
   </div>
  </div>
 );
}

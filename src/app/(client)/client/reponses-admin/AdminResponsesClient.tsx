'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  Clock, 
  CheckCircle, 
  FileText, 
  Download,
  AlertCircle,
  HelpCircle,
  Inbox
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
  attachment?: {
    name: string;
    size: string;
  };
}

interface Thread {
  id: string;
  subject: string;
  sender: string;
  date: string;
  status: 'Validé' | 'En cours' | 'Reçu';
  statusColor: string;
  statusBg: string;
  messages: Message[];
}

export default function AdminResponsesClient({ 
  initialThreadsList,
  userId,
  orgId
}: { 
  initialThreadsList: Thread[];
  userId: string;
  orgId: string;
}) {
  const [threads, setThreads] = useState<Thread[]>(initialThreadsList);
  const [activeThreadId, setActiveThreadId] = useState(initialThreadsList[0]?.id);
  const [replyText, setReplyText] = useState("");

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0] || {} as Thread;

  const supabase = createClient();

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const currentText = replyText;
    setReplyText("");

    try {
      const { data: insertedMsg, error } = await supabase
        .from('messages')
        .insert({
          sender_id: userId,
          organization_id: orgId,
          content: currentText
        })
        .select()
        .single();

      if (error) throw error;

      const newMsg: Message = {
        id: insertedMsg.id,
        sender: 'client',
        senderName: 'Moi (Client)',
        avatarLetter: 'M',
        avatarBg: 'bg-emerald-600',
        content: currentText,
        time: new Date(insertedMsg.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})
      };

      const updatedThreads = threads.map(t => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            messages: [...t.messages, newMsg]
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
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="text-xl font-black text-neutral-900 font-sans flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            Réponses de l&apos;Administration
          </h1>
          <p className="text-xs text-neutral-500 font-semibold mt-0.5">
            Consultez les réponses, commentaires et validations transmis par les administrateurs à la suite de vos dépôts.
          </p>
        </div>
      </div>

      {/* Messaging Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Threads List (1/3 width) */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm h-fit space-y-4">
          <h3 className="font-bold text-neutral-800 text-sm border-b border-neutral-100 pb-2.5 flex items-center gap-1.5">
            <Inbox className="w-4.5 h-4.5 text-emerald-600" />
            Boîte de réception
          </h3>

          <div className="space-y-2">
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              const lastMessage = thread.messages && thread.messages.length > 0 ? thread.messages[thread.messages.length - 1] : null;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left space-y-2 ${
                    isActive 
                      ? 'border-emerald-500 bg-emerald-50/10 shadow-sm' 
                      : 'border-neutral-200 hover:border-neutral-350'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-neutral-850 truncate leading-snug max-w-[70%]">
                      {thread.subject}
                    </span>
                    <span className={`inline-flex items-center px-1.5 py-0.2 rounded text-[8px] font-bold border shrink-0 ${thread.statusColor} ${thread.statusBg}`}>
                      {thread.status}
                    </span>
                  </div>
                  
                  <p className="text-[10px] text-neutral-450 line-clamp-2 font-semibold">
                    {lastMessage?.content || "Aucun message"}
                  </p>

                  <div className="flex justify-between items-center text-[9px] text-neutral-400 font-semibold pt-1 border-t border-neutral-200/40">
                    <span>{thread.sender}</span>
                    <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{thread.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Conversation Panel (2/3 width) */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden min-h-[500px]">
          
          {/* Thread Header */}
          <div className="p-4 border-b border-neutral-200 bg-neutral-50/50 flex items-center justify-between">
            <div>
              <h3 className="font-black text-neutral-900 text-sm">{activeThread?.subject}</h3>
              <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">
                Fil d&apos;échange • ID de transmission : {activeThread?.id}
              </p>
            </div>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${activeThread?.statusColor} ${activeThread?.statusBg}`}>
              {activeThread?.status}
            </span>
          </div>

          {/* Messages Flow Area */}
          <div className="p-5 flex-1 space-y-4 overflow-y-auto bg-slate-50/30">
            {activeThread?.messages?.map((msg) => {
              const isClient = msg.sender === 'client';
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${isClient ? 'ml-auto flex-row-reverse' : ''}`}>
                  
                  {/* Sender Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${msg.avatarBg}`}>
                    {msg.avatarLetter}
                  </div>

                  {/* Message Bubble */}
                  <div className="space-y-1.5">
                    <div className={`flex items-center gap-1.5 text-[9px] text-neutral-400 font-semibold ${isClient ? 'justify-end' : ''}`}>
                      <span className="text-neutral-700 font-bold">{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.time}</span>
                    </div>

                    <div className={`p-4 rounded-2xl border text-neutral-850 leading-relaxed font-semibold shadow-sm ${
                      isClient 
                        ? 'bg-emerald-600 border-emerald-600 text-white rounded-tr-none' 
                        : 'bg-white border-neutral-200 rounded-tl-none'
                    }`}>
                      {msg.content}

                      {/* File attachment widget inside bubble */}
                      {msg.attachment && (
                        <div className={`mt-3 p-2.5 rounded-xl border flex items-center justify-between gap-3 ${
                          isClient 
                            ? 'bg-emerald-700/50 border-emerald-500/30 text-white' 
                            : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                        }`}>
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className={`w-4 h-4 shrink-0 ${isClient ? 'text-emerald-200' : 'text-neutral-400'}`} />
                            <div className="min-w-0">
                              <p className="font-bold truncate text-[10px]">{msg.attachment.name}</p>
                              <p className={`text-[9px] font-semibold mt-0.5 ${isClient ? 'text-emerald-200/80' : 'text-neutral-400'}`}>
                                {msg.attachment.size}
                              </p>
                            </div>
                          </div>
                          <button 
                            type="button"
                            className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                              isClient 
                                ? 'bg-emerald-800/40 border-emerald-500/20 hover:bg-emerald-800/80 text-emerald-100' 
                                : 'bg-white border-neutral-250 hover:bg-neutral-50 text-neutral-600'
                            }`}
                            title="Télécharger"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Quick Reply Form Area */}
          <div className="p-4 border-t border-neutral-200 bg-white">
            <form onSubmit={handleSendReply} className="flex gap-2 items-center">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Rédiger votre réponse à l'administrateur..."
                className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-semibold"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="px-4 py-2.5 bg-[#047857] text-white font-bold rounded-xl hover:bg-[#035f43] transition-colors disabled:opacity-50 shrink-0 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}

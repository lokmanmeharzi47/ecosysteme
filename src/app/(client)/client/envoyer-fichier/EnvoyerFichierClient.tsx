'use client';

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  Clock, 
  User, 
  Send,
  Paperclip
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export interface SentFile {
  id: string;
  name: string;
  size: string;
  date: string;
  recipient: string;
  site: string;
  status: 'Reçu et Validé' | 'En cours de revue' | 'Reçu';
  statusColor: string;
  statusBg: string;
}

export default function EnvoyerFichierClient({ 
  initialSentFiles,
  userId,
  orgId
}: { 
  initialSentFiles: SentFile[];
  userId: string;
  orgId: string;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recipient, setRecipient] = useState("Dr. Claire Durand (Scientifique)");
  const [site, setSite] = useState("Ferme intelligente de Mitidja");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [sentFiles, setSentFiles] = useState<SentFile[]>(initialSentFiles);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(10);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      setUploadProgress(40);

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('reports')
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      setUploadProgress(80);

      const { data: insertedDoc, error: dbError } = await supabase
        .from('client_documents')
        .insert({
          file_url: filePath,
          file_name: selectedFile.name,
          file_size: formatFileSize(selectedFile.size),
          organization_id: orgId,
          uploaded_by: userId,
          status: 'Reçu'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Update UI optimistically
      const newSent: SentFile = {
        id: insertedDoc.id.substring(0, 8).toUpperCase(),
        name: selectedFile.name,
        size: formatFileSize(selectedFile.size),
        date: new Date(insertedDoc.created_at).toLocaleDateString('fr-FR') + " " + new Date(insertedDoc.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}),
        recipient: recipient,
        site: site,
        status: "Reçu",
        statusColor: "text-blue-600 border-blue-200",
        statusBg: "bg-blue-50"
      };
      setSentFiles([newSent, ...sentFiles]);
      setSelectedFile(null);
      setDescription("");
      setSuccess(true);
      
      setUploadProgress(100);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto text-xs">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="text-xl font-black text-neutral-900 font-sans flex items-center gap-2">
            <Upload className="w-5 h-5 text-emerald-600" />
            Transmettre un fichier
          </h1>
          <p className="text-xs text-neutral-500 font-semibold mt-0.5">
            Envoyez des documents d&apos;observation, logs LoRaWAN, ou clichés physiques directement aux administrateurs.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Uploader & form (2/3 width) */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="font-bold text-neutral-850 text-sm border-b border-neutral-100 pb-3 flex items-center gap-1.5">
            <Paperclip className="w-4 h-4 text-emerald-600" />
            Nouveau dépôt de document
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Drag & Drop Area */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                selectedFile 
                  ? 'border-emerald-500 bg-emerald-50/10' 
                  : 'border-neutral-250 hover:border-neutral-350 hover:bg-neutral-50/30'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                onChange={handleFileChange}
                className="hidden" 
              />
              
              {selectedFile ? (
                <div className="space-y-3">
                  <FileText className="w-10 h-10 mx-auto text-emerald-600" />
                  <div>
                    <p className="font-bold text-neutral-850">{selectedFile.name}</p>
                    <p className="text-[10px] text-neutral-450 mt-0.5 font-semibold">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Type inconnu'}
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedFile();
                    }}
                    className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg text-[10px] font-bold transition-all"
                  >
                    Retirer le fichier
                  </button>
                </div>
              ) : (
                <div className="space-y-2 text-neutral-400">
                  <Upload className="w-10 h-10 mx-auto text-neutral-300 opacity-60" />
                  <p className="font-bold text-neutral-650">Glissez-déposez votre fichier ici, ou cliquez pour parcourir</p>
                  <p className="text-[9px] text-neutral-500">Taille maximale autorisée : 50 Mo (PDF, DOCX, CSV, XLSX, ZIP)</p>
                </div>
              )}
            </div>

            {/* Recipient and Site selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Destinataire Admin</label>
                <select 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none font-bold text-neutral-600"
                >
                  <option value="Dr. Claire Durand (Scientifique)">Dr. Claire Durand (Expert Scientifique)</option>
                  <option value="Direction ANF">Direction ANF (Algérie)</option>
                  <option value="Support Technique">Support Technique Central</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Associer au Site</label>
                <select 
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none font-bold text-neutral-600"
                >
                  <option value="Ferme intelligente de Mitidja">Ferme intelligente de Mitidja</option>
                  <option value="Forêt pilote de Chréa">Forêt pilote de Chréa</option>
                  <option value="Zone humide de Réghaïa">Zone humide de Réghaïa</option>
                </select>
              </div>
            </div>

            {/* Description Notes */}
            <div className="space-y-1.5">
              <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Message pour l&apos;Administrateur</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez brièvement le contenu de ce fichier (ex : logs du capteur thermique suite à l'alerte d'hier)."
                rows={3}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-semibold text-neutral-800"
              />
            </div>

            {/* Upload progress indicator */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-neutral-500">
                  <span>Envoi du document en cours...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div className="bg-[#047857] h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}

            {/* Success state */}
            {success && (
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 p-3 rounded-xl shadow-sm animate-in fade-in zoom-in-95">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Le fichier a été envoyé avec succès à l&apos;administrateur et enregistré dans l&apos;historique !</span>
              </div>
            )}

            {/* Submit button */}
            <button 
              type="submit"
              disabled={!selectedFile || uploading}
              className="px-5 py-2.5 bg-[#047857] hover:bg-[#035f43] text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Transmettre le fichier
            </button>
          </form>
        </div>

        {/* Right Column - History of Transmitted Files (1/3 width) */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-neutral-800 text-sm border-b border-neutral-100 pb-2.5 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-600" />
            Historique des dépôts
          </h3>

          <div className="space-y-3.5">
            {sentFiles.map((file) => (
              <div key={file.id} className="p-3 bg-neutral-50 border border-neutral-100 rounded-xl space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-bold text-neutral-800 truncate" title={file.name}>
                      {file.name}
                    </h4>
                    <p className="text-[10px] text-neutral-450 mt-0.5 font-semibold">
                      {file.size} • {file.date}
                    </p>
                  </div>
                  <span className="text-[8px] font-mono text-neutral-400 bg-neutral-150 px-1.5 py-0.5 rounded font-bold shrink-0">
                    {file.id}
                  </span>
                </div>

                <div className="space-y-1 text-[10px] text-neutral-500 font-semibold border-t border-neutral-200/50 pt-2">
                  <div className="flex justify-between">
                    <span>Destinataire :</span>
                    <span className="text-neutral-750">{file.recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Site :</span>
                    <span className="text-neutral-750">{file.site}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-neutral-200/50 pt-2">
                  <span className={`inline-flex items-center px-1.5 py-0.2 rounded text-[8px] font-bold border ${file.statusColor} ${file.statusBg}`}>
                    {file.status}
                  </span>
                  <span className="text-[9px] text-[#047857] font-bold flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3" /> Transmis
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

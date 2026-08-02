'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  Camera, 
  RefreshCw, 
  Trash2, 
  Download, 
  MapPin, 
  AlertCircle, 
  Upload, 
  CheckCircle,
  FileImage,
  Info
} from 'lucide-react';

interface CapturedPhoto {
  id: string;
  dataUrl: string;
  timestamp: string;
  site: string;
  notes: string;
}

export default function AppareilPhotoClient() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [selectedSite, setSelectedSite] = useState("Ferme intelligente de Mitidja");
  const [notes, setNotes] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraActive(true);
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError("Impossible d'accéder à la caméra. Vérifiez vos permissions ou utilisez un simulateur.");
      setCameraActive(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  // Take photo from video stream
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas size matching the video feed
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to base64
        const dataUrl = canvas.toDataURL('image/jpeg');
        
        const newPhoto: CapturedPhoto = {
          id: `IMG-${Math.floor(Math.random() * 9000) + 1000}`,
          dataUrl,
          timestamp: new Date().toLocaleTimeString('fr-FR') + " " + new Date().toLocaleDateString('fr-FR'),
          site: selectedSite,
          notes: notes || "Aucune note additionnelle"
        };
        
        setPhotos([newPhoto, ...photos]);
        setNotes(""); // Reset notes
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2000);
      }
    } else {
      setCameraError("Caméra indisponible ou permissions refusées. Impossible de capturer une image.");
    }
  };

  const deletePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const downloadPhoto = (photo: CapturedPhoto) => {
    // If it's a mock http URL, open in new tab
    if (photo.dataUrl.startsWith('http')) {
      window.open(photo.dataUrl, '_blank');
      return;
    }
    const link = document.createElement('a');
    link.href = photo.dataUrl;
    link.download = `${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto text-xs">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="text-xl font-black text-neutral-900 font-sans flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            Appareil Photo Télémétrique
          </h1>
          <p className="text-xs text-neutral-500 font-semibold mt-0.5">
            Prenez et associez des photos de l&apos;état physique de vos capteurs ou de l&apos;environnement à vos rapports.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns - Live Camera view (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-neutral-850 flex items-center gap-1.5">
              <span>Caméra en direct</span>
            </h2>

            {/* Video View container */}
            <div className="relative aspect-video rounded-xl border border-neutral-200 bg-neutral-950 overflow-hidden flex items-center justify-center">
              {cameraActive ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6 text-neutral-400 space-y-3">
                  <Camera className="w-10 h-10 mx-auto opacity-40 text-neutral-300" />
                  <p className="font-bold">La caméra n&apos;est pas active</p>
                  <p className="text-[10px] text-neutral-500 max-w-sm">
                    Activez la caméra pour scanner ou prendre une photo de l&apos;état de vos capteurs physiques.
                  </p>
                  <button 
                    onClick={startCamera}
                    className="px-4 py-2 bg-[#047857] hover:bg-[#035f43] text-white font-bold rounded-xl transition-all"
                  >
                    Activer l&apos;appareil
                  </button>
                </div>
              )}

              {/* Status and Action overlays */}
              {cameraActive && (
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/30 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Flux vidéo actif
                </div>
              )}
            </div>

            {/* Camera actions bar */}
            {cameraActive && (
              <div className="flex gap-2">
                <button 
                  onClick={stopCamera}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold rounded-xl transition-all"
                >
                  Désactiver
                </button>
                <button 
                  onClick={startCamera}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold rounded-xl transition-all flex items-center gap-1.5"
                  title="Rafraîchir"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retourner
                </button>
              </div>
            )}

            {/* Hidden canvas for screenshots */}
            <canvas ref={canvasRef} className="hidden" />

            {cameraError && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl font-bold flex items-start gap-2">
                <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span>{cameraError}</span>
                  <button 
                    className="block text-[10px] text-[#047857] hover:underline pt-1"
                    disabled
                  >
                    🚀 Action requise : vérifier votre matériel.
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Parameters / Capture Info */}
        <div className="space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-800 text-sm border-b border-neutral-100 pb-2">
              Détails du cliché
            </h3>

            {/* Site Association Dropdown */}
            <div className="space-y-1.5">
              <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Associer au site</label>
              <select 
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none font-bold text-neutral-600"
              >
                <option value="Ferme intelligente de Mitidja">Ferme intelligente de Mitidja</option>
                <option value="Forêt pilote de Chréa">Forêt pilote de Chréa</option>
                <option value="Zone humide de Réghaïa">Zone humide de Réghaïa</option>
              </select>
            </div>

            {/* Observation Notes */}
            <div className="space-y-1.5">
              <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Notes d&apos;observations</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ex : Nettoyage de la lentille thermique du capteur S-082 effectué. Pas de trace de corrosion."
                rows={3}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-semibold text-neutral-800"
              />
            </div>

            {uploadSuccess && (
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl shadow-sm">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Photo capturée et stockée dans la galerie !</span>
              </div>
            )}

            <button 
              onClick={capturePhoto}
              className="w-full py-2.5 bg-[#047857] hover:bg-[#035f43] text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Camera className="w-4 h-4" />
              Prendre la photo
            </button>
          </div>

          {/* Quick instructions info */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 space-y-2">
            <h4 className="font-bold text-neutral-800 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-600" />
              Instructions d&apos;inspection
            </h4>
            <p className="text-[10px] text-neutral-450 leading-relaxed font-semibold">
              En déplacement sur le terrain, vous pouvez utiliser votre smartphone ou tablette pour prendre des clichés géolocalisés des modules de détection précoce (LoRaWAN). Les rapports d&apos;inspection photo sont fusionnés avec les journaux d&apos;activité.
            </p>
          </div>
        </div>

      </div>

      {/* Captured Gallery Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-neutral-900">Photos récemment capturées</h2>
        
        {photos.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center text-neutral-400 font-bold">
            <FileImage className="w-8 h-8 mx-auto opacity-30 mb-2" />
            Aucun cliché d&apos;inspection disponible. Prenez une photo ci-dessus.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-44 bg-neutral-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={photo.dataUrl} 
                      alt={photo.id} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 left-2 bg-black/60 text-white font-mono px-2 py-0.5 rounded text-[9px] font-bold">
                      {photo.id}
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {photo.site}
                    </div>
                    <p className="font-semibold text-neutral-700 leading-normal bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                      {photo.notes}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[9px] text-neutral-400 font-semibold">{photo.timestamp}</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => downloadPhoto(photo)}
                      className="p-1.5 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-neutral-800 transition-colors border border-neutral-200"
                      title="Télécharger"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => deletePhoto(photo.id)}
                      className="p-1.5 bg-neutral-50 hover:bg-red-50 rounded-lg text-neutral-500 hover:text-red-600 transition-colors border border-neutral-200"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

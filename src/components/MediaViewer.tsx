import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Image as ImageIcon, MapPin, Compass, ExternalLink } from 'lucide-react';

export interface MediaViewerData {
  imageUrl: string;
  title: { es: string; fr: string };
  territory: { es: string; fr: string };
  caption: { es: string; fr: string };
  altitude?: string;
  videoUrl?: string;
  videoTitle?: { es: string; fr: string };
  destinationId?: string;
}

interface MediaViewerProps {
  data: MediaViewerData | null;
  onClose: () => void;
  currentLang: 'es' | 'fr';
  onPlanTrip?: (destinationId?: string) => void;
}

export const MediaViewer: React.FC<MediaViewerProps> = ({
  data,
  onClose,
  currentLang,
  onPlanTrip,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Guardar el elemento activo anterior para devolver el foco
  useEffect(() => {
    if (data) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setIsPlayingVideo(false);
      // Poner foco en el botón cerrar
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [data]);

  // Manejar tecla Escape y bloqueo de scroll
  useEffect(() => {
    if (!data) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [data, onClose]);

  // Si se cierra el modal o cambia el modo, pausar video
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlayingVideo(false);
    onClose();
  };

  if (!data) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col md:flex-row bg-[#111214] border border-white/15 rounded-lg overflow-hidden shadow-2xl"
      >
        {/* Botón Cerrar accesible */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          aria-label={currentLang === 'es' ? 'Cerrar visor' : 'Fermer le visualiseur'}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-[#BE5103] text-white border border-white/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Contenedor Visual (Fotografía o Video con playsinline) */}
        <div className="relative w-full md:w-3/5 bg-black flex items-center justify-center min-h-[260px] sm:min-h-[360px] md:min-h-[500px]">
          {isPlayingVideo && data.videoUrl ? (
            <div className="w-full h-full relative flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                src={data.videoUrl}
                controls
                playsInline
                autoPlay
                preload="none"
                className="w-full h-full max-h-[70vh] object-contain"
              />
              <button
                type="button"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.pause();
                  }
                  setIsPlayingVideo(false);
                }}
                className="absolute top-3 left-3 px-2.5 py-1 text-xs font-mono-meta rounded bg-black/70 hover:bg-black text-[#FFCE1B] border border-white/20 cursor-pointer flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{currentLang === 'es' ? 'Ver fotografía' : 'Voir la photo'}</span>
              </button>
            </div>
          ) : (
            <div className="w-full h-full relative flex items-center justify-center overflow-hidden group">
              <img
                src={data.imageUrl}
                alt={data.title[currentLang]}
                className="w-full h-full max-h-[70vh] object-cover md:object-contain select-none"
              />
              
              {/* Botón flotante para ver video si está disponible */}
              {data.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(true)}
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#BE5103] hover:bg-[#B7410E] text-white font-semibold text-sm tracking-wider uppercase shadow-xl border border-[#FFCE1B]/40 transform hover:scale-105 transition-all cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#FFCE1B] text-[#18181a] flex items-center justify-center">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <span>{currentLang === 'es' ? 'Ver video cinemático' : 'Voir la vidéo cinématique'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Panel Editorial de Información */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#0b0c0e] border-t md:border-t-0 md:border-l border-white/10">
          <div>
            {/* Ubicación y Territorio */}
            <div className="flex items-center gap-2 text-[#069494] font-mono-meta text-xs uppercase tracking-widest mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#FFCE1B]" />
              <span>{data.territory[currentLang]}</span>
            </div>

            {/* Título Editorial */}
            <h2
              id="viewer-title"
              className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-[#f6f4ef] leading-tight mb-4"
            >
              {isPlayingVideo && data.videoTitle ? data.videoTitle[currentLang] : data.title[currentLang]}
            </h2>

            {/* Ficha técnica o altitud */}
            {data.altitude && (
              <div className="inline-block px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono-meta text-[#FFCE1B] mb-4">
                {currentLang === 'es' ? `Altitud: ${data.altitude}` : `Altitude : ${data.altitude}`}
              </div>
            )}

            {/* Texto descriptivo */}
            <p className="text-sm sm:text-base text-[#a3a098] leading-relaxed mb-6 font-light">
              {data.caption[currentLang]}
            </p>

            {/* Detalles de la expedición técnica de Fersites */}
            <div className="p-4 rounded bg-[#18181a] border border-white/5 mb-6">
              <div className="text-[11px] uppercase tracking-wider font-mono-meta text-[#BE5103] mb-1 font-semibold">
                {currentLang === 'es' ? 'Protocolo de Viaje Fersites' : 'Protocole de Voyage Fersites'}
              </div>
              <p className="text-xs text-[#a3a098]">
                {currentLang === 'es'
                  ? 'Transporte 4x4 monitoreado con navegación satelital, guías bilingües acreditados y equipamiento de altura adaptado a la geografía boliviana.'
                  : 'Véhicules 4x4 avec suivi satellite, guides bilingues certifiés et équipement d’altitude adapté à la géographie bolivienne.'}
              </p>
            </div>
          </div>

          {/* Acciones del pie */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => {
                handleClose();
                if (onPlanTrip) {
                  onPlanTrip(data.destinationId);
                }
              }}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-gradient-to-r from-[#BE5103] to-[#B7410E] hover:from-[#c95a09] hover:to-[#c64913] text-white text-xs uppercase tracking-wider font-semibold border border-[#FFCE1B]/30 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#FFCE1B]" />
              <span>{currentLang === 'es' ? 'Incluir en mi itinerario' : 'Inclure dans mon itinéraire'}</span>
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded border border-white/20 hover:border-white/40 text-xs uppercase tracking-wider text-[#f6f4ef] font-mono-meta cursor-pointer"
            >
              {currentLang === 'es' ? 'Volver al recorrido' : 'Retourner au voyage'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

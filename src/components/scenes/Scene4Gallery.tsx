import React, { forwardRef, useState } from 'react';
import { Compass, Sparkles, Video, ArrowUpRight } from 'lucide-react';
import { AGENCY_CONFIG } from '../../config/agency';
import { MediaViewerData } from '../MediaViewer';

interface Scene4GalleryProps {
  currentLang: 'es' | 'fr';
  onOpenViewer: (data: MediaViewerData) => void;
  activePanelIndex: number;
  onSelectChapter?: (index: number) => void;
}

export const GALLERY_PANELS = [
  {
    index: 0,
    role: 'gallery-red-rocks',
    number: '01',
    title: {
      es: 'Cañones & Quebradas',
      fr: 'Canyons & Terres Rouges',
    },
    subtitle: {
      es: 'Geología y Altiplano de Potosí',
      fr: 'Géologie et Haut-Plateau de Potosí',
    },
    description: {
      es: 'Rutas técnicas 4x4 por formaciones rocosas esculpidas por milenios de viento y sal.',
      fr: 'Itinéraires 4x4 à travers des formations rocheuses taillées par les millénaires.',
    },
    videoId: 'v4',
    objectPositionDesktop: '34% 52%',
    objectPositionMobile: '32% 50%',
    destinationId: 'uyuni',
  },
  {
    index: 1,
    role: 'gallery-waterfall',
    number: '02',
    title: {
      es: 'Cascadas & Selva Nublada',
      fr: 'Cascades & Forêt de Brume',
    },
    subtitle: {
      es: 'Yungas y Senderos de Coroico',
      fr: 'Yungas et Sentiers de Coroico',
    },
    description: {
      es: 'Transición bioclimática desde cumbres andinas hacia torrentes subtropicales cristalinos.',
      fr: 'Transition bioclimatique des sommets andins vers les torrents subtropicaux.',
    },
    videoId: 'v3',
    objectPositionDesktop: '50% 48%',
    objectPositionMobile: '50% 48%',
    destinationId: 'yungas',
  },
  {
    index: 2,
    role: 'gallery-snow',
    number: '03',
    title: {
      es: 'Cumbres de la Cordillera',
      fr: 'Cimes de la Cordillère',
    },
    subtitle: {
      es: 'Illimani & Huayna Potosí',
      fr: 'Illimani & Huayna Potosí',
    },
    description: {
      es: 'Campamentos base y expediciones de altura sobre los glaciares eternos de los Andes.',
      fr: 'Camps de base et expéditions de haute altitude sur les glaciers andins.',
    },
    videoId: 'v6',
    objectPositionDesktop: '50% 44%',
    objectPositionMobile: '50% 44%',
    destinationId: 'tiwanaku',
  },
  {
    index: 3,
    role: 'gallery-market',
    number: '04',
    title: {
      es: 'Memoria & Tradición Viva',
      fr: 'Mémoire & Tradition Vivante',
    },
    subtitle: {
      es: 'Tiwanaku & Tejidos Andinos',
      fr: 'Tiwanaku & Tissages Vivants',
    },
    description: {
      es: 'Encuentro con las comunidades ancestrales, astronomía lítica y artesanía textil.',
      fr: 'Rencontre avec les communautés ancestrales, astronomie mégalithique et tissages.',
    },
    videoId: 'v9',
    objectPositionDesktop: '48% 38%',
    objectPositionMobile: '48% 36%',
    destinationId: 'tiwanaku',
  },
];

export const Scene4Gallery = forwardRef<HTMLDivElement, Scene4GalleryProps>(
  ({ currentLang, onOpenViewer, activePanelIndex, onSelectChapter }, ref) => {
    const activePanel = GALLERY_PANELS[activePanelIndex] || GALLERY_PANELS[0];

    const handlePanelClick = (panel: typeof GALLERY_PANELS[0]) => {
      const videoData = AGENCY_CONFIG.videos[panel.videoId];
      onOpenViewer({
        imageUrl: AGENCY_CONFIG.images[panel.role as keyof typeof AGENCY_CONFIG.images],
        title: panel.title,
        territory: panel.subtitle,
        caption: panel.description,
        videoUrl: videoData?.url,
        videoTitle: videoData?.title,
        destinationId: panel.destinationId,
      });
    };

    return (
      <section
        id="escena-4"
        ref={ref}
        className="relative w-full h-screen overflow-hidden bg-[#0b0c0e] select-none flex flex-col justify-between py-20 md:py-24"
      >
        {/* Cabecera Editorial de la Escena 4: Título "Cómo viajamos" + Indicador dinámico */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#BE5103]" />
              <span className="font-mono-meta text-[10px] uppercase tracking-[0.25em] text-[#FFCE1B]">
                {currentLang === 'es' ? 'Capítulos de Travesía' : 'Chapitres de Traversée'}
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#f6f4ef] leading-tight">
              {currentLang === 'es' ? 'Cómo viajamos con Fersites' : 'Comment nous voyageons avec Fersites'}
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono-meta text-xs">
            <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[#FFCE1B] flex items-center gap-2">
              <span className="text-[#069494] font-bold">
                {currentLang === 'es' ? `Panel 0${activePanelIndex + 1} de 04` : `Panneau 0${activePanelIndex + 1} sur 04`}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[#f6f4ef] truncate max-w-[180px]">
                {activePanel.title[currentLang]}
              </span>
            </div>
          </div>
        </div>

        {/* Cuatro Paneles Fotográficos Verticales (4 columnas escritorio, 2x2 en móvil) */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 my-auto h-[62vh] sm:h-[66vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 h-full">
            {GALLERY_PANELS.map((panel, idx) => {
              const isActive = idx === activePanelIndex;

              return (
                <div
                  key={panel.role}
                  id={`s4-panel-${idx}`}
                  onClick={() => handlePanelClick(panel)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePanelClick(panel);
                    }
                  }}
                  title={panel.title[currentLang]}
                  className={`group relative h-full rounded-sm overflow-hidden cursor-pointer border transition-all duration-500 will-change-transform ${
                    isActive
                      ? 'border-[#FFCE1B]/60 shadow-[0_20px_40px_rgba(190,81,3,0.35)]'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  style={{
                    transform: isActive ? 'scale(1.03)' : 'scale(0.92)',
                    opacity: isActive ? 1 : 0.46,
                  }}
                >
                  {/* Fotografía interna vertical con parallax continuo y encuadre específico */}
                  <div className="absolute inset-0 overflow-hidden bg-[#18181a]">
                    <img
                      id={`s4-panel-img-${idx}`}
                      src={AGENCY_CONFIG.images[panel.role as keyof typeof AGENCY_CONFIG.images]}
                      alt={panel.title[currentLang]}
                      className="w-full h-full object-cover will-change-transform transition-transform duration-700 group-hover:scale-105"
                      style={{
                        objectPosition: panel.objectPositionDesktop,
                      }}
                    />
                    {/* Velos de contraste editorial para texto superior e inferior */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />
                  </div>

                  {/* Número superior visible */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center justify-between w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)]">
                    <span className="font-mono-meta text-xs sm:text-sm font-bold text-[#FFCE1B] bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                      {panel.number}
                    </span>
                    <span className="p-1 rounded-full bg-black/40 text-white/80 group-hover:text-[#FFCE1B] group-hover:bg-[#BE5103] transition-colors border border-white/10">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Título inferior y breve texto legible siempre presentes */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10">
                    <div className="text-[10px] font-mono-meta uppercase tracking-wider text-[#069494] mb-1 truncate">
                      {panel.subtitle[currentLang]}
                    </div>
                    <h3 className="font-editorial text-base sm:text-xl lg:text-2xl font-normal text-white leading-tight mb-1.5 group-hover:text-[#FFCE1B] transition-colors">
                      {panel.title[currentLang]}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#a3a098] line-clamp-2 font-light leading-snug">
                      {panel.description[currentLang]}
                    </p>

                    {/* Badge de video si está disponible */}
                    <div className="mt-2 flex items-center gap-1.5 text-[9px] font-mono-meta text-[#FFCE1B]">
                      <Video className="w-3 h-3 text-[#BE5103]" />
                      <span>{currentLang === 'es' ? 'Video HD disponible' : 'Vidéo HD disponible'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicador inferior que permite abrir cada capítulo sin alterar el scroll */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 flex items-center justify-center gap-2 sm:gap-4">
          {GALLERY_PANELS.map((panel, idx) => (
            <button
              key={panel.number}
              type="button"
              onClick={() => handlePanelClick(panel)}
              className={`px-3 py-1.5 rounded font-mono-meta text-[10px] sm:text-xs uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                idx === activePanelIndex
                  ? 'bg-[#BE5103] text-white border-[#FFCE1B]/40 shadow-sm'
                  : 'bg-white/5 text-[#a3a098] border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <span>{panel.number}</span>
              <span className="hidden md:inline">{panel.title[currentLang]}</span>
            </button>
          ))}
        </div>
      </section>
    );
  }
);

Scene4Gallery.displayName = 'Scene4Gallery';

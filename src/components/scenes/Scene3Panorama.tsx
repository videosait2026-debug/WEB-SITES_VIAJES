import React, { forwardRef } from 'react';
import { Eye, MapPin } from 'lucide-react';
import { AGENCY_CONFIG } from '../../config/agency';
import { MediaViewerData } from '../MediaViewer';

interface Scene3PanoramaProps {
  currentLang: 'es' | 'fr';
  onOpenViewer: (data: MediaViewerData) => void;
}

export const Scene3Panorama = forwardRef<HTMLDivElement, Scene3PanoramaProps>(
  ({ currentLang, onOpenViewer }, ref) => {
    const handlePostcardClick = () => {
      onOpenViewer({
        imageUrl: AGENCY_CONFIG.images['postcard-coast'],
        title: {
          es: 'Isla del Sol • Cuna Sagrada del Titicaca',
          fr: 'Île du Soleil • Berceau Sacré du Titicaca',
        },
        territory: {
          es: 'Lago Titicaca • La Paz (3.812 m)',
          fr: 'Lac Titicaca • La Paz (3.812 m)',
        },
        caption: {
          es: 'Santuario insular donde según la cosmogonía andina nacieron Manco Cápac y Mama Ocllo. Senderos de piedra incaica que recorren la cresta entre terrazas milenarias.',
          fr: 'Sanctuaire insulaire où, selon la cosmogonie andine, naquirent Manco Cápac et Mama Ocllo. Sentiers de pierre inca reliant terrasses millénaires et horizons marins.',
        },
        altitude: '3.812 m s.n.m.',
        videoUrl: AGENCY_CONFIG.videos.v2.url,
        videoTitle: AGENCY_CONFIG.videos.v2.title,
        destinationId: 'copacabana',
      });
    };

    return (
      <section
        id="escena-3"
        ref={ref}
        className="relative w-full h-screen overflow-hidden bg-[#111214] select-none"
      >
        {/* Fondo panorámico a pantalla completa con escala y desplazamiento vertical */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            id="s3-bg-img"
            src={AGENCY_CONFIG.images['panorama-valley']}
            alt="Valle panorámico andino"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105 will-change-transform"
          />
          {/* Velos de contraste editorial para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 scene-vignette opacity-70 pointer-events-none" />
        </div>

        {/* Contenido Editorial Centrado: Titular serif blanco + Postal pequeña POR DEBAJO */}
        <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 flex flex-col items-center justify-center text-center pointer-events-none">
          
          {/* Titular Serif Blanco Centrado */}
          <div id="s3-title-wrap" className="max-w-3xl mb-8 will-change-transform">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#069494]" />
              <span className="font-mono-meta text-[10px] uppercase tracking-[0.25em] text-[#f6f4ef]">
                {currentLang === 'es' ? 'Panorama Abierto • Escena III' : 'Panorama Ouvert • Scène III'}
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.05] drop-shadow-lg">
              {currentLang === 'es' ? 'EL GRAN VALLE' : 'LA GRANDE VALLÉE'}
              <br />
              <span className="italic font-light text-[#FFCE1B]">
                {currentLang === 'es' ? 'Donde el Silencio Respira' : 'Où le Silence Respire'}
              </span>
            </h2>
            <p className="mt-3 font-mono-meta text-xs sm:text-sm text-[#f6f4ef]/80 tracking-widest uppercase drop-shadow">
              {currentLang === 'es'
                ? 'Horizonte de 360 grados sobre la geografía monumental de Bolivia'
                : 'Horizon à 360 degrés sur la géographie monumentale de la Bolivie'}
            </p>
          </div>

          {/* Postal pequeña postcard-coast POR DEBAJO del titular */}
          <div
            id="s3-postcard-wrap"
            className="pointer-events-auto will-change-transform mt-2"
          >
            <div
              onClick={handlePostcardClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePostcardClick();
                }
              }}
              title={currentLang === 'es' ? 'Explorar postal de la Isla del Sol' : 'Explorer carte de l’Île du Soleil'}
              className="group relative cursor-pointer paper-texture p-2.5 pb-6 sm:pb-7 rounded-sm postcard-shadow-lg transition-transform duration-300 hover:scale-105 border border-[#d3cbbe]"
              style={{
                width: 'clamp(180px, 22vw, 240px)',
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#18181a] rounded-[1px]">
                <img
                  src={AGENCY_CONFIG.images['postcard-coast']}
                  alt="Postal costa del Lago Titicaca"
                  className="w-full h-full object-cover object-[52%_48%] transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-sm bg-black/60 text-[#FFCE1B] text-[8px] font-mono-meta uppercase tracking-wider backdrop-blur-sm">
                  {currentLang === 'es' ? 'Isla del Sol' : 'Île du Soleil'}
                </div>
              </div>

              <div className="mt-2 px-1 flex items-center justify-between">
                <span className="font-editorial text-xs font-semibold text-[#18181a] leading-none">
                  Lago Titicaca
                </span>
                <span className="font-mono-meta text-[8px] text-[#6b6255] uppercase tracking-wider">
                  3.812m
                </span>
              </div>

              <div className="mt-1 px-1 flex items-center gap-1 text-[8px] text-[#069494] font-mono-meta">
                <Eye className="w-2.5 h-2.5" />
                <span>{currentLang === 'es' ? 'Click para ampliar & video' : 'Cliquer pour agrandir & vidéo'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cortina carbón al salir hacia la galería */}
        <div
          id="s3-curtain"
          className="absolute inset-0 bg-[#111214] opacity-0 pointer-events-none z-30 will-change-opacity"
        />
      </section>
    );
  }
);

Scene3Panorama.displayName = 'Scene3Panorama';

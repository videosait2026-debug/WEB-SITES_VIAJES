import React, { forwardRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { AGENCY_CONFIG } from '../../config/agency';
import { MediaViewerData } from '../MediaViewer';

interface Scene1HeroProps {
  currentLang: 'es' | 'fr';
  onOpenViewer: (data: MediaViewerData) => void;
}

export const Scene1Hero = forwardRef<HTMLDivElement, Scene1HeroProps>(
  ({ currentLang, onOpenViewer }, ref) => {
    const handlePostcardClick = () => {
      onOpenViewer({
        imageUrl: AGENCY_CONFIG.images['postcard-lake'],
        title: {
          es: 'Salar de Uyuni • El Infinito Blanco',
          fr: 'Salar d’Uyuni • L’Infini Blanc',
        },
        territory: {
          es: 'Potosí • Altiplano Boliviano (3.656 m)',
          fr: 'Potosí • Haut-Plateau Bolivien (3.656 m)',
        },
        caption: {
          es: 'El desierto de sal continuo más grande del mundo se convierte en época de lluvias en el espejo cósmico donde cielo y tierra se funden en una sola dimensión.',
          fr: 'Le plus grand désert de sel au monde se transforme en saison des pluies en un miroir cosmique où le ciel et la terre ne font plus qu’un.',
        },
        altitude: '3.656 m s.n.m.',
        videoUrl: AGENCY_CONFIG.videos.v1.url,
        videoTitle: AGENCY_CONFIG.videos.v1.title,
        destinationId: 'uyuni',
      });
    };

    return (
      <section
        id="escena-1"
        ref={ref}
        className="relative w-full h-screen overflow-hidden bg-[#111214] select-none"
      >
        {/* Fondo hero-traveler con encuadre a la izquierda para el viajero */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            id="s1-bg-img"
            src={AGENCY_CONFIG.images['hero-traveler']}
            alt="Viajero contemplando el horizonte de Bolivia"
            className="w-full h-full object-cover object-[18%_50%] md:object-[18%_50%] filter brightness-95 contrast-105 will-change-transform"
          />
          {/* Velos de contraste editorial para legibilidad de titulares */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-black/30 to-[#111214]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111214]/80 via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 scene-vignette pointer-events-none" />
        </div>

        {/* Contenido Editorial Principal: Ancho máximo 1440px */}
        <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between py-24 md:py-28 pointer-events-none">
          
          {/* Titular Pieza 1: Arriba a la izquierda */}
          <div id="s1-title-top" className="max-w-xl will-change-transform">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-[#BE5103]" />
              <span className="font-mono-meta text-[11px] uppercase tracking-[0.25em] text-[#FFCE1B]">
                {currentLang === 'es' ? 'Expedición Geográfica 2026' : 'Expédition Géographique 2026'}
              </span>
            </div>
            <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#f6f4ef] leading-[0.9]">
              {currentLang === 'es' ? 'TIERRAS DE' : 'TERRES D’'}
              <br />
              <span className="font-bold text-white tracking-wide">
                BOLIVIA
              </span>
            </h1>
          </div>

          {/* Postal física central: Centrada ENTRE ambas piezas del titular */}
          <div
            id="s1-postcard-wrap"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto will-change-transform z-20"
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
              title={currentLang === 'es' ? 'Abrir postal de Uyuni' : 'Ouvrir carte postale d’Uyuni'}
              className="group relative cursor-pointer paper-texture p-2.5 sm:p-3 pb-8 sm:pb-9 rounded-sm postcard-shadow-lg transition-transform duration-300 hover:scale-[1.02] border border-[#d3cbbe]/80"
              style={{
                width: 'clamp(210px, 32vw, 320px)',
              }}
            >
              {/* Fotografía interior 16:10 con desplazamiento propio sutil */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#18181a] rounded-[1px]">
                <img
                  id="s1-postcard-img"
                  src={AGENCY_CONFIG.images['postcard-lake']}
                  alt="Postal del Salar de Uyuni"
                  className="w-full h-full object-cover object-[50%_50%] filter contrast-105 transition-transform duration-500 group-hover:scale-105 will-change-transform"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-sm bg-black/60 text-[#FFCE1B] text-[9px] font-mono-meta uppercase tracking-wider backdrop-blur-sm">
                  {currentLang === 'es' ? 'Postal 01' : 'Carte 01'}
                </div>
              </div>

              {/* Banda de texto inferior de la postal de papel */}
              <div className="mt-2.5 px-1 flex items-baseline justify-between">
                <span className="font-editorial text-xs sm:text-sm font-semibold tracking-wide text-[#18181a]">
                  Salar de Uyuni
                </span>
                <span className="font-mono-meta text-[9px] text-[#6b6255] tracking-widest uppercase">
                  Potosí • 3.656m
                </span>
              </div>

              {/* Sello postal andino sutil */}
              <div className="absolute bottom-2 right-3 flex items-center gap-1 text-[8px] font-mono-meta text-[#BE5103] tracking-tighter opacity-80">
                <Sparkles className="w-2.5 h-2.5 text-[#BE5103]" />
                <span>FERSITES</span>
              </div>
            </div>
          </div>

          {/* Titular Pieza 2: Abajo a la derecha y en itálica */}
          <div id="s1-title-bottom" className="self-end text-right max-w-xl will-change-transform">
            <h2 className="font-editorial italic text-3xl sm:text-5xl lg:text-6xl font-light text-[#f6f4ef]/95 leading-tight">
              {currentLang === 'es' ? '“Donde el cielo descansa en la sal”' : '« Où le ciel repose sur le sel »'}
            </h2>
            <p className="font-mono-meta text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#069494] mt-2">
              {currentLang === 'es'
                ? 'Copacabana • Tiwanaku • Yungas • Isla del Sol'
                : 'Copacabana • Tiwanaku • Yungas • Île du Soleil'}
            </p>
          </div>

          {/* Franja Inferior con Metadatos y Pista de Scroll */}
          <div className="w-full pt-4 border-t border-white/10 flex items-center justify-between font-mono-meta text-[10px] sm:text-xs text-[#a3a098]">
            <div className="flex items-center gap-3">
              <span className="text-[#BE5103] font-semibold">BOL-EXP-26</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="hidden sm:inline">19° 48′ S, 67° 29′ O</span>
            </div>

            <div className="flex items-center gap-2 text-[#FFCE1B] animate-bounce">
              <span>{currentLang === 'es' ? 'Desplazar para explorar' : 'Faire défiler pour explorer'}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span>{AGENCY_CONFIG.phone}</span>
            </div>
          </div>
        </div>

        {/* Cortina carbón para enlazar con la escena 2 sin cortes */}
        <div
          id="s1-curtain"
          className="absolute inset-0 bg-[#111214] opacity-0 pointer-events-none z-30 will-change-opacity"
        />
      </section>
    );
  }
);

Scene1Hero.displayName = 'Scene1Hero';

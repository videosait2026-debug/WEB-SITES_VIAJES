import React, { forwardRef, useState } from 'react';
import { Compass, MapPin, Check, Phone, Mail, Globe, ArrowRight } from 'lucide-react';
import { AGENCY_CONFIG } from '../../config/agency';

interface Scene5FooterProps {
  currentLang: 'es' | 'fr';
  onOpenPlanner: (destinationId?: string) => void;
}

export const Scene5Footer = forwardRef<HTMLDivElement, Scene5FooterProps>(
  ({ currentLang, onOpenPlanner }, ref) => {
    const [selectedDestId, setSelectedDestId] = useState<string>('uyuni');

    const selectedDest =
      AGENCY_CONFIG.destinations.find((d) => d.id === selectedDestId) ||
      AGENCY_CONFIG.destinations[0];

    return (
      <section
        id="escena-5"
        ref={ref}
        className="relative w-full min-h-screen overflow-hidden bg-[#faf7f0] text-[#18181a] flex flex-col justify-between py-20 md:py-24"
      >
        {/* Fondo luminoso footer-mist con escala 1.14 -> 1 y desplazamiento vertical */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            id="s5-bg-img"
            src={AGENCY_CONFIG.images['footer-mist']}
            alt="Niebla luminosa andina"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-95 will-change-transform"
          />
          {/* Velo cálido de papel para armonizar con el papel crema */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f0]/80 via-[#faf7f0]/40 to-[#f2ede2]/90 pointer-events-none" />
        </div>

        {/* Contenido Editorial Centrado: Ancho máximo ~512px para la tarjeta */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col items-center justify-center my-auto">
          
          {/* Titular Oscuro Centrado */}
          <div id="s5-title-wrap" className="text-center max-w-xl mb-8 will-change-transform">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181a]/5 border border-[#18181a]/10 mb-3 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#BE5103]" />
              <span className="font-mono-meta text-[10px] uppercase tracking-[0.25em] text-[#6b6255]">
                {currentLang === 'es' ? 'Epílogo & Partida' : 'Épilogue & Départ'}
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#18181a] leading-tight">
              {currentLang === 'es' ? 'Comienza tu viaje por' : 'Commencez votre voyage en'}
              <br />
              <span className="italic font-bold text-[#BE5103]">
                Bolivia
              </span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-mono-meta text-[#6b6255] uppercase tracking-wider">
              {currentLang === 'es'
                ? 'Elige un territorio y diseñemos tu cuaderno de ruta personalizado'
                : 'Choisissez un territoire pour concevoir votre carnet de route'}
            </p>
          </div>

          {/* Tarjeta de Papel Crema con Chincheta Roja Centrada */}
          <div
            id="s5-card-wrap"
            className="relative w-full max-w-[512px] paper-texture rounded-sm p-6 sm:p-8 pt-8 postcard-shadow-lg border border-[#d3cbbe] will-change-transform"
            style={{
              transform: 'rotate(-0.6deg)',
            }}
          >
            {/* Chincheta roja centrada en el borde superior de la tarjeta (SVG propio con gradiente) */}
            <div
              id="s5-pushpin"
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)] cursor-pointer select-none will-change-transform"
              title="Chincheta de expedición"
            >
              <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="pin-head" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e53935" />
                    <stop offset="50%" stopColor="#c83228" />
                    <stop offset="100%" stopColor="#8e1b14" />
                  </linearGradient>
                  <linearGradient id="pin-needle" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b0bec5" />
                    <stop offset="50%" stopColor="#eceff1" />
                    <stop offset="100%" stopColor="#78909c" />
                  </linearGradient>
                </defs>
                {/* Cabeza de la chincheta */}
                <ellipse cx="14" cy="11" rx="10" ry="7" fill="url(#pin-head)" stroke="#7f1d1d" strokeWidth="0.8" />
                <ellipse cx="14" cy="9" rx="6" ry="3.5" fill="#f87171" opacity="0.6" />
                <circle cx="12" cy="8" r="1.5" fill="#ffffff" opacity="0.8" />
                {/* Vástago de sujeción */}
                <path d="M11 15 L14 26 L17 15 Z" fill="url(#pin-head)" stroke="#7f1d1d" strokeWidth="0.5" />
                {/* Punta metálica */}
                <path d="M13.5 25 L14 31 L14.5 25 Z" fill="url(#pin-needle)" />
              </svg>
            </div>

            {/* Sello de agua sutil en la tarjeta */}
            <div className="flex items-center justify-between pb-3 border-b border-[#d3cbbe] text-[10px] font-mono-meta text-[#6b6255] uppercase tracking-wider">
              <span>{AGENCY_CONFIG.shortName}</span>
              <span className="text-[#BE5103] font-semibold">{AGENCY_CONFIG.licenseNumber}</span>
            </div>

            {/* Cuatro Destinos Seleccionables */}
            <div className="mt-4 mb-5">
              <label className="block text-xs font-mono-meta uppercase tracking-wider text-[#6b6255] mb-2 font-semibold">
                {currentLang === 'es' ? 'Territorio de destino:' : 'Territoire de destination :'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AGENCY_CONFIG.destinations.map((dest) => {
                  const isSelected = dest.id === selectedDestId;
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => setSelectedDestId(dest.id)}
                      className={`p-2.5 rounded text-left border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#18181a] text-[#faf7f0] border-[#18181a] shadow-sm'
                          : 'bg-white/80 hover:bg-white text-[#18181a] border-[#d3cbbe] hover:border-[#BE5103]'
                      }`}
                    >
                      <div>
                        <div className="font-editorial text-sm font-semibold leading-tight">
                          {dest.name[currentLang]}
                        </div>
                        <div className={`text-[9px] font-mono-meta mt-0.5 ${isSelected ? 'text-[#069494]' : 'text-[#6b6255]'}`}>
                          {dest.territory[currentLang]}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#FFCE1B] text-[#18181a] flex items-center justify-center flex-shrink-0 ml-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resumen del destino seleccionado */}
            <div className="p-3.5 rounded bg-[#f2ede2] border border-[#d3cbbe]/80 mb-5 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="font-editorial text-base font-bold text-[#18181a]">
                  {selectedDest.name[currentLang]}
                </span>
                <span className="font-mono-meta text-[10px] text-[#BE5103] font-semibold">
                  {selectedDest.recommendedDuration[currentLang]}
                </span>
              </div>
              <p className="text-xs text-[#6b6255] leading-relaxed mb-2 font-light">
                {selectedDest.description[currentLang]}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedDest.highlights[currentLang].map((hl, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-0.5 rounded bg-white text-[9px] font-mono-meta text-[#18181a] border border-[#d3cbbe]"
                  >
                    • {hl}
                  </span>
                ))}
              </div>
            </div>

            {/* Botón de Planificación */}
            <button
              type="button"
              onClick={() => onOpenPlanner(selectedDestId)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-gradient-to-r from-[#BE5103] via-[#B7410E] to-[#BE5103] hover:from-[#c95a09] hover:to-[#c64913] text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-[#BE5103]/30 border border-[#FFCE1B]/40 transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#FFCE1B]" />
              <span>{currentLang === 'es' ? 'Planificar viaje con este destino' : 'Planifier avec cette destination'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* Contacto rápido WhatsApp & Teléfono */}
            <div className="mt-4 pt-3 border-t border-[#d3cbbe] flex items-center justify-between text-[11px] font-mono-meta text-[#6b6255]">
              <a
                href={`https://wa.me/${AGENCY_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#BE5103] flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#069494]" />
                <span>WhatsApp: {AGENCY_CONFIG.phone}</span>
              </a>
              <span className="text-[#BE5103] font-semibold">Bolivia</span>
            </div>
          </div>
        </div>

        {/* Pie Editorial Discreto */}
        <footer className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 mt-12 pt-6 border-t border-[#18181a]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-meta text-[#6b6255]">
          <div className="text-center sm:text-left">
            <span className="font-editorial text-sm font-bold text-[#18181a] block sm:inline mr-2">
              {AGENCY_CONFIG.fullName[currentLang]}
            </span>
            <span>© 2026. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>{AGENCY_CONFIG.cities.join(' • ')}</span>
            <span className="text-black/20">•</span>
            <a
              href={`mailto:${AGENCY_CONFIG.email}`}
              className="hover:text-[#BE5103] transition-colors"
            >
              {AGENCY_CONFIG.email}
            </a>
          </div>
        </footer>
      </section>
    );
  }
);

Scene5Footer.displayName = 'Scene5Footer';

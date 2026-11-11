import React, { useState } from 'react';
import { Compass, Menu, X, Globe, Phone } from 'lucide-react';
import { AGENCY_CONFIG } from '../config/agency';

interface HeaderProps {
  currentLang: 'es' | 'fr';
  onToggleLang: () => void;
  onOpenPlanner: (destinationId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  onOpenPlanner,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: '#escena-1',
      label: currentLang === 'es' ? 'Portada' : 'Accueil',
    },
    {
      href: '#escena-2',
      label: currentLang === 'es' ? 'Territorios' : 'Territoires',
    },
    {
      href: '#escena-3',
      label: currentLang === 'es' ? 'Panorama' : 'Panorama',
    },
    {
      href: '#escena-4',
      label: currentLang === 'es' ? 'Travesías' : 'Traversées',
    },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#111214]/85 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zona Izquierda: Marca Textual */}
        <a
          href="#escena-1"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#escena-1');
          }}
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCE1B]"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#BE5103] via-[#B7410E] to-[#069494] flex items-center justify-center p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-[#111214] flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
              <Compass className="w-5 h-5 text-[#FFCE1B]" />
            </div>
          </div>
          <div>
            <div className="font-editorial text-xl sm:text-2xl font-bold tracking-wider text-[#f6f4ef] group-hover:text-[#FFCE1B] transition-colors leading-none">
              {AGENCY_CONFIG.shortName}
            </div>
            <div className="font-mono-meta text-[9px] uppercase tracking-widest text-[#a3a098] mt-0.5">
              {currentLang === 'es' ? 'Viajes Tecnológicos • Bolivia' : 'Voyages Technologiques • Bolivie'}
            </div>
          </div>
        </a>

        {/* Zona Central: Cuatro Enlaces de Navegación Editorial (Escritorio) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-xs uppercase tracking-[0.2em] font-medium text-[#f6f4ef]/80 hover:text-[#FFCE1B] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFCE1B] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zona Derecha: Idioma + Acción Principal "Planificar viaje" */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Selector de Idioma ES / FR */}
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono-meta uppercase tracking-wider text-[#f6f4ef] transition-colors cursor-pointer"
            title={currentLang === 'es' ? 'Changer en Français' : 'Cambiar a Español'}
            aria-label={currentLang === 'es' ? 'Cambiar idioma a francés' : 'Changer la langue en espagnol'}
          >
            <Globe className="w-3.5 h-3.5 text-[#069494]" />
            <span className={currentLang === 'es' ? 'text-[#FFCE1B] font-bold' : 'text-[#a3a098]'}>ES</span>
            <span className="text-white/30">/</span>
            <span className={currentLang === 'fr' ? 'text-[#FFCE1B] font-bold' : 'text-[#a3a098]'}>FR</span>
          </button>

          {/* Botón Acción Principal */}
          <button
            type="button"
            onClick={() => onOpenPlanner()}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#BE5103] to-[#B7410E] hover:from-[#c95a09] hover:to-[#c64913] border border-[#FFCE1B]/30 shadow-lg shadow-[#BE5103]/25 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#FFCE1B]" />
            <span>{currentLang === 'es' ? 'Planificar viaje' : 'Planifier voyage'}</span>
          </button>

          {/* Menú Hamburguesa Móvil */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded text-[#f6f4ef] hover:text-[#FFCE1B] border border-white/10 hover:border-white/20 cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b0c0e] border-b border-white/15 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm uppercase tracking-wider font-medium text-[#f6f4ef]/90 hover:text-[#FFCE1B] py-1 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanner();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#BE5103] to-[#B7410E] border border-[#FFCE1B]/30"
            >
              <Compass className="w-4 h-4 text-[#FFCE1B]" />
              <span>{currentLang === 'es' ? 'Planificar viaje' : 'Planifier voyage'}</span>
            </button>

            <a
              href={`https://wa.me/${AGENCY_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded text-xs tracking-wider text-[#a3a098] bg-white/5 border border-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-[#069494]" />
              <span>{AGENCY_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

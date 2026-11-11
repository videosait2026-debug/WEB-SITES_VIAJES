import React, { forwardRef } from 'react';
import { AGENCY_CONFIG } from '../../config/agency';
import { MediaViewerData } from '../MediaViewer';

interface Scene2PostcardsProps {
  currentLang: 'es' | 'fr';
  onOpenViewer: (data: MediaViewerData) => void;
}

export interface PostcardDef {
  id: number;
  imageKey: keyof typeof AGENCY_CONFIG.images;
  title: { es: string; fr: string };
  territory: { es: string; fr: string };
  caption: { es: string; fr: string };
  aspect: string; // e.g. 'aspect-[4/5]', 'aspect-[16/11]', 'aspect-square'
  desktop: { top: string; left: string; width: number; rotate: number };
  mobile: { top: string; left: string; width: number };
  objectPosition: string;
  innerScale: number;
  entryVector: { x: number; y: number; r: number };
  driftVector: { x: number; y: number; r: number };
  hiddenOnMobile: boolean;
  videoId?: string;
  destinationId?: string;
}

export const POSTCARDS_CONFIG: PostcardDef[] = [
  {
    id: 1,
    imageKey: 'postcard-lake',
    title: { es: 'Lago Titicaca • Aguas Sagradas', fr: 'Lac Titicaca • Eaux Sacrées' },
    territory: { es: 'La Paz • Copacabana (3.812 m)', fr: 'La Paz • Copacabana (3.812 m)' },
    caption: {
      es: 'El lago navegable más alto del mundo, cuna de leyendas andinas y reflejos zafiro de altura.',
      fr: 'Le plus haut lac navigable au monde, berceau des légendes andines et miroirs saphir d’altitude.',
    },
    aspect: 'aspect-[4/5]',
    desktop: { top: '7%', left: '6%', width: 225, rotate: -7.5 },
    mobile: { top: '6%', left: '-4%', width: 148 },
    objectPosition: '58% 62%',
    innerScale: 1,
    entryVector: { x: -240, y: -180, r: -22 },
    driftVector: { x: 35, y: -95, r: -3 },
    hiddenOnMobile: false,
    videoId: 'v2',
    destinationId: 'copacabana',
  },
  {
    id: 2,
    imageKey: 'postcard-desert',
    title: { es: 'Desierto de Siloli & Árbol de Piedra', fr: 'Désert de Siloli & Arbre de Pierre' },
    territory: { es: 'Potosí • Reserva Eduardo Avaroa', fr: 'Potosí • Réserve Eduardo Avaroa' },
    caption: {
      es: 'Tierras áridas de dunas volcánicas esculpidas por vientos altiplánicos implacables.',
      fr: 'Terres arides de dunes volcaniques façonnées par les vents impitoyables de l’Altiplano.',
    },
    aspect: 'aspect-[4/5]',
    desktop: { top: '8%', left: '76%', width: 235, rotate: 6.5 },
    mobile: { top: '8%', left: '58%', width: 152 },
    objectPosition: '55% 58%',
    innerScale: 1,
    entryVector: { x: 260, y: -190, r: 21 },
    driftVector: { x: -45, y: -110, r: 11 },
    hiddenOnMobile: false,
    videoId: 'v1',
    destinationId: 'uyuni',
  },
  {
    id: 3,
    imageKey: 'postcard-coast',
    title: { es: 'Isla del Sol & Bahía Mítica', fr: 'Île du Soleil & Baie Mythique' },
    territory: { es: 'Lago Titicaca • Santuario Solar', fr: 'Lac Titicaca • Sanctuaire Solaire' },
    caption: {
      es: 'Terrazas preincaicas que descienden hacia aguas azul profundo bajo el cielo impoluto.',
      fr: 'Terrasses pré-incas descendant vers des eaux bleu profond sous un ciel sans nuage.',
    },
    aspect: 'aspect-[4/5]',
    desktop: { top: '56%', left: '4%', width: 240, rotate: 5.2 },
    mobile: { top: '62%', left: '-3%', width: 150 },
    objectPosition: '52% 48%',
    innerScale: 1,
    entryVector: { x: -280, y: 220, r: 18 },
    driftVector: { x: 48, y: -130, r: -4 },
    hiddenOnMobile: false,
    videoId: 'v2',
    destinationId: 'copacabana',
  },
  {
    id: 4,
    imageKey: 'postcard-village',
    title: { es: 'Pueblos de Adobe & Silencio Andino', fr: 'Villages d’Adobe & Silence Andin' },
    territory: { es: 'Altiplano Central • Arquitectura Viva', fr: 'Haut-Plateau Central • Architecture Vivante' },
    caption: {
      es: 'Comunidades que preservan técnicas milenarias de construcción con tierra y paja brava.',
      fr: 'Communautés perpétuant des techniques ancestrales de construction en terre et paille des hauts sommets.',
    },
    aspect: 'aspect-[4/5]',
    desktop: { top: '54%', left: '78%', width: 230, rotate: -6.8 },
    mobile: { top: '60%', left: '56%', width: 150 },
    objectPosition: '50% 50%',
    innerScale: 1,
    entryVector: { x: 270, y: 240, r: -19 },
    driftVector: { x: -40, y: -145, r: -2 },
    hiddenOnMobile: false,
    videoId: 'v9',
    destinationId: 'tiwanaku',
  },
  {
    id: 5,
    imageKey: 'postcard-forest',
    title: { es: 'Ceja de Montaña & Yungas', fr: 'Forêt de Nuages & Yungas' },
    territory: { es: 'La Paz • Coroico Tropical (1.750 m)', fr: 'La Paz • Coroico Tropical (1.750 m)' },
    caption: {
      es: 'El bosque nublado boliviano, hogar de orquídeas endémicas y aroma de café orgánico.',
      fr: 'La forêt de brume bolivienne, berceau d’orchidées endémiques et de parfums de café bio.',
    },
    aspect: 'aspect-[4/5]',
    desktop: { top: '63%', left: '39%', width: 215, rotate: 3.4 },
    mobile: { top: '72%', left: '26%', width: 144 },
    objectPosition: '50% 56%',
    innerScale: 1,
    entryVector: { x: 20, y: 320, r: 14 },
    driftVector: { x: -15, y: -165, r: -3.5 },
    hiddenOnMobile: false,
    videoId: 'v3',
    destinationId: 'yungas',
  },
  {
    id: 6,
    imageKey: 'gallery-red-rocks',
    title: { es: 'Cañones Rojos & Quebradas', fr: 'Canyons Rouges & Terres d’Ocre' },
    territory: { es: 'Potosí • Valle de las Ánimas', fr: 'Potosí • Vallée des Âmes' },
    caption: {
      es: 'Murallas de arcilla y arenisca talladas por milenios de aguas de deshielo.',
      fr: 'Falaises d’argile et de grès sculptées par les millénaires d’eaux de dégel.',
    },
    aspect: 'aspect-[16/11]',
    desktop: { top: '4%', left: '41%', width: 250, rotate: -3.8 },
    mobile: { top: '2%', left: '24%', width: 158 },
    objectPosition: '36% 46%',
    innerScale: 1.15,
    entryVector: { x: -40, y: -270, r: -15 },
    driftVector: { x: 25, y: -85, r: 2.5 },
    hiddenOnMobile: false,
    videoId: 'v4',
    destinationId: 'uyuni',
  },
  {
    id: 7,
    imageKey: 'gallery-waterfall',
    title: { es: 'Cascada San Félix • Yungas', fr: 'Cascade San Félix • Yungas' },
    territory: { es: 'Coroico • Torrentes Subtropicales', fr: 'Coroico • Torrents Subtropicaux' },
    caption: {
      es: 'Caídas de agua pura que irrigan los valles cafetaleros y las huertas de cítricos.',
      fr: 'Chutes d’eau pure irriguant les vallées caféières et les vergers d’agrumes.',
    },
    aspect: 'aspect-square',
    desktop: { top: '29%', left: '-3%', width: 210, rotate: 9.5 },
    mobile: { top: '0', left: '0', width: 0 },
    objectPosition: '50% 42%',
    innerScale: 1.18,
    entryVector: { x: -310, y: 40, r: 26 },
    driftVector: { x: 65, y: -90, r: 4 },
    hiddenOnMobile: true,
    videoId: 'v3',
    destinationId: 'yungas',
  },
  {
    id: 8,
    imageKey: 'gallery-snow',
    title: { es: 'Glaciares de la Cordillera Real', fr: 'Glaciers de la Cordillère Royale' },
    territory: { es: 'Illimani & Huayna Potosí (6.088 m)', fr: 'Illimani & Huayna Potosí (6.088 m)' },
    caption: {
      es: 'Los guardianes blancos del altiplano, cumbres sagradas veneradas desde la antigüedad.',
      fr: 'Les gardiens blancs de l’Altiplano, sommets sacrés vénérés depuis des millénaires.',
    },
    aspect: 'aspect-[16/11]',
    desktop: { top: '28%', left: '85%', width: 235, rotate: -8.5 },
    mobile: { top: '0', left: '0', width: 0 },
    objectPosition: '50% 34%',
    innerScale: 1.12,
    entryVector: { x: 320, y: -30, r: -24 },
    driftVector: { x: -70, y: -105, r: -4 },
    hiddenOnMobile: true,
    videoId: 'v6',
    destinationId: 'tiwanaku',
  },
  {
    id: 9,
    imageKey: 'gallery-market',
    title: { es: 'Mercado Andino & Tejidos Tradicionales', fr: 'Marché Andin & Tissages Vivants' },
    territory: { es: 'Tiwanaku • Cultura Viva', fr: 'Tiwanaku • Culture Vivante' },
    caption: {
      es: 'Lana de alpaca teñida con tintes naturales de cochinilla y hierbas de la puna.',
      fr: 'Laine d’alpaga teinte aux pigments naturels de cochenille et plantes de la puna.',
    },
    aspect: 'aspect-square',
    desktop: { top: '15%', left: '23%', width: 195, rotate: 4.6 },
    mobile: { top: '0', left: '0', width: 0 },
    objectPosition: '48% 36%',
    innerScale: 1.14,
    entryVector: { x: -190, y: -220, r: 17 },
    driftVector: { x: -20, y: -125, r: -2 },
    hiddenOnMobile: true,
    videoId: 'v9',
    destinationId: 'tiwanaku',
  },
  {
    id: 10,
    imageKey: 'postcard-lake',
    title: { es: 'Detalle: Salar de Cristal', fr: 'Détail : Miroir de Sel' },
    territory: { es: 'Uyuni • Hexágonos de Sal', fr: 'Uyuni • Polygones de Sel' },
    caption: {
      es: 'Estructuras hexagonales de sal pura formadas por la evaporación solar del agua de lluvia.',
      fr: 'Structures polygonales formées par l’évaporation solaire des eaux de pluie.',
    },
    aspect: 'aspect-[16/11]',
    desktop: { top: '72%', left: '19%', width: 220, rotate: -4.8 },
    mobile: { top: '0', left: '0', width: 0 },
    objectPosition: '40% 18%',
    innerScale: 1.32,
    entryVector: { x: -160, y: 290, r: -16 },
    driftVector: { x: 30, y: -150, r: 3 },
    hiddenOnMobile: true,
    videoId: 'v1',
    destinationId: 'uyuni',
  },
  {
    id: 11,
    imageKey: 'postcard-desert',
    title: { es: 'Detalle: Rocas del Altiplano', fr: 'Détail : Roches de l’Altiplano' },
    territory: { es: 'Potosí • Siloli Mineral', fr: 'Potosí • Siloli Minéral' },
    caption: {
      es: 'Minerales volcánicos de azufre, cobre y hierro que tiñen la roca de ocres y esmeraldas.',
      fr: 'Minéraux volcaniques de soufre, cuivre et fer teintant les roches d’ocres et d’émeraudes.',
    },
    aspect: 'aspect-square',
    desktop: { top: '68%', left: '61%', width: 200, rotate: 7.2 },
    mobile: { top: '0', left: '0', width: 0 },
    objectPosition: '62% 74%',
    innerScale: 1.28,
    entryVector: { x: 180, y: 280, r: 22 },
    driftVector: { x: -35, y: -155, r: 2 },
    hiddenOnMobile: true,
    videoId: 'v4',
    destinationId: 'uyuni',
  },
];

export const Scene2Postcards = forwardRef<HTMLDivElement, Scene2PostcardsProps>(
  ({ currentLang, onOpenViewer }, ref) => {
    return (
      <section
        id="escena-2"
        ref={ref}
        className="relative w-full h-screen overflow-hidden bg-[#111214] select-none"
      >
        {/* Fondo carbón con viñeta radial muy tenue */}
        <div className="absolute inset-0 z-0 bg-[#111214]">
          <div className="absolute inset-0 scene-vignette opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1c1e22]/40 via-transparent to-[#0b0c0e]" />
        </div>

        {/* Puente visual panorama-valley al final de la escena 2 que precede a la escena 3 */}
        <div
          id="s2-bridge-valley"
          className="absolute inset-0 z-10 opacity-0 pointer-events-none will-change-opacity overflow-hidden"
        >
          <img
            src={AGENCY_CONFIG.images['panorama-valley']}
            alt="Valle panorámico puente"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-black/30" />
        </div>

        {/* Titular Central Legible: La zona central se mantiene despejada de postales */}
        <div
          id="s2-center-title"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center max-w-2xl px-6 pointer-events-none will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#BE5103]" />
            <span className="font-mono-meta text-[10px] uppercase tracking-[0.25em] text-[#FFCE1B]">
              {currentLang === 'es' ? 'Colección de Territorios' : 'Collection de Territoires'}
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-[#f6f4ef] leading-tight">
            {currentLang === 'es' ? 'TERRITORIOS' : 'TERRITOIRES'}
            <br />
            <span className="italic font-light text-[#FFCE1B]">
              {currentLang === 'es' ? 'Suspendidos en el Tiempo' : 'Suspendus dans le Temps'}
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-mono-meta text-[#a3a098] tracking-widest uppercase max-w-md mx-auto">
            {currentLang === 'es'
              ? 'Once memorias impresas sobre la roca, la sal y el agua sagrada'
              : 'Onze mémoires gravées sur la roche, le sel et l’eau sacrée'}
          </p>
        </div>

        {/* Contenedor de las 11 Postales Físicas */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {POSTCARDS_CONFIG.map((card, idx) => {
            const videoData = card.videoId ? AGENCY_CONFIG.videos[card.videoId] : undefined;

            return (
              <div
                key={card.id}
                id={`s2-postcard-${idx}`}
                className={`absolute pointer-events-auto will-change-transform ${
                  card.hiddenOnMobile ? 'hidden md:block' : 'block'
                }`}
                style={{
                  top: card.desktop.top,
                  left: card.desktop.left,
                  width: `${card.desktop.width}px`,
                  transform: `rotate(${card.desktop.rotate}deg)`,
                }}
              >
                <div
                  onClick={() => {
                    onOpenViewer({
                      imageUrl: AGENCY_CONFIG.images[card.imageKey],
                      title: card.title,
                      territory: card.territory,
                      caption: card.caption,
                      videoUrl: videoData?.url,
                      videoTitle: videoData?.title,
                      destinationId: card.destinationId,
                    });
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenViewer({
                        imageUrl: AGENCY_CONFIG.images[card.imageKey],
                        title: card.title,
                        territory: card.territory,
                        caption: card.caption,
                        videoUrl: videoData?.url,
                        videoTitle: videoData?.title,
                        destinationId: card.destinationId,
                      });
                    }
                  }}
                  title={card.title[currentLang]}
                  className="group relative cursor-pointer paper-texture p-2 pb-5 sm:pb-6 rounded-[2px] postcard-shadow transition-transform duration-300 hover:scale-105 hover:z-30 border border-[#d3cbbe]/80"
                >
                  {/* Foto interior con proporción y recorte exactos de la tabla */}
                  <div className={`relative ${card.aspect} overflow-hidden bg-[#18181a] rounded-[1px]`}>
                    <img
                      src={AGENCY_CONFIG.images[card.imageKey]}
                      alt={card.title[currentLang]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{
                        objectPosition: card.objectPosition,
                        transform: `scale(${card.innerScale})`,
                      }}
                    />
                    <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-sm bg-black/60 text-[#FFCE1B] text-[8px] font-mono-meta uppercase">
                      {String(card.id).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Pequeña banda inferior de texto con tipografía legible */}
                  <div className="mt-1.5 px-0.5 flex flex-col">
                    <span className="font-editorial text-[11px] sm:text-xs font-semibold text-[#18181a] truncate leading-tight">
                      {card.title[currentLang]}
                    </span>
                    <span className="font-mono-meta text-[8px] text-[#6b6255] uppercase tracking-wider truncate">
                      {card.territory[currentLang]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
);

Scene2Postcards.displayName = 'Scene2Postcards';

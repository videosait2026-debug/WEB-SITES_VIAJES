/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Header } from './components/Header';
import { Mochila } from './components/Mochila';
import { MediaViewer, MediaViewerData } from './components/MediaViewer';
import { PlannerModal } from './components/PlannerModal';

import { Scene1Hero } from './components/scenes/Scene1Hero';
import { Scene2Postcards, POSTCARDS_CONFIG } from './components/scenes/Scene2Postcards';
import { Scene3Panorama } from './components/scenes/Scene3Panorama';
import { Scene4Gallery, GALLERY_PANELS } from './components/scenes/Scene4Gallery';
import { Scene5Footer } from './components/scenes/Scene5Footer';

gsap.registerPlugin(ScrollTrigger);

// Estructura de un punto de control para la mochila
interface MochilaWaypoint {
  scroll: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<'es' | 'fr'>('es');
  const [viewerData, setViewerData] = useState<MediaViewerData | null>(null);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerInitialDest, setPlannerInitialDest] = useState<string | undefined>(undefined);
  const [activeGalleryPanel, setActiveGalleryPanel] = useState(0);

  // Estado de transformación de la Mochila
  const [mochilaState, setMochilaState] = useState({
    x: 0.5,
    y: 0.81,
    scale: 0.95,
    rotation: -3.5,
    visible: true,
  });

  // Referencias a los elementos de escena
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === 'es' ? 'fr' : 'es'));
  };

  const handleOpenPlanner = (destinationId?: string) => {
    setPlannerInitialDest(destinationId);
    setPlannerOpen(true);
  };

  useLayoutEffect(() => {
    // Si el usuario prefiere movimiento reducido, fijar mochila de forma estática
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setMochilaState({
        x: 0.85,
        y: 0.85,
        scale: 0.9,
        rotation: 0,
        visible: true,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // ==========================================
      // ESCENA 1: PORTADA
      // ==========================================
      const s1Tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene1Ref.current,
          start: 'top top',
          end: '+=135%',
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          id: 's1',
        },
      });

      // Fondo hero-traveler: escala 1 -> 1.16; Y 0 -> -6%
      s1Tl.to('#s1-bg-img', {
        scale: 1.16,
        yPercent: -6,
        ease: 'none',
      }, 0);

      // Primer titular: X 0 -> -24% desktop / -12% móvil; Y 0 -> -42%; opacidad 1 -> 0.08
      s1Tl.to('#s1-title-top', {
        xPercent: isMobile ? -12 : -24,
        yPercent: -42,
        opacity: 0.08,
        ease: 'power1.inOut',
      }, 0);

      // Segundo titular: X 0 -> +24% desktop / +12% móvil; Y 0 -> +45%; opacidad 1 -> 0.08
      s1Tl.to('#s1-title-bottom', {
        xPercent: isMobile ? 12 : 24,
        yPercent: 45,
        opacity: 0.08,
        ease: 'power1.inOut',
      }, 0);

      // Postal: Y 0 -> -18%, escala 1 -> 1.38 escritorio / 1.22 móvil, rotación -3.5° -> +2.5°
      s1Tl.to('#s1-postcard-wrap', {
        yPercent: -18,
        scale: isMobile ? 1.22 : 1.38,
        rotation: 2.5,
        ease: 'power1.inOut',
      }, 0);

      // Foto DENTRO de la postal: escala 1.12 -> 1; Y -4% -> +6%
      s1Tl.fromTo('#s1-postcard-img',
        { scale: 1.12, yPercent: -4 },
        { scale: 1, yPercent: 6, ease: 'none' },
        0
      );

      // Desvanecimiento de la postal y cortina carbón hacia la escena 2
      s1Tl.to('#s1-postcard-wrap', {
        opacity: 0,
        ease: 'power1.in',
      }, 0.65);

      s1Tl.to('#s1-curtain', {
        opacity: 1,
        ease: 'power1.in',
      }, 0.75);

      // ==========================================
      // ESCENA 2: POSTALES
      // ==========================================
      const s2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: 'top top',
          end: isMobile ? '+=185%' : '+=230%',
          pin: true,
          scrub: 0.75,
          id: 's2',
        },
      });

      // Titular: entrada desde escala 0.92, opacidad 0, Y +28px; llegada a escala 1, opacidad 1, Y 0
      s2Tl.fromTo('#s2-center-title',
        { scale: 0.92, opacity: 0, y: 28 },
        { scale: 1, opacity: 1, y: 0, ease: 'power2.out', duration: 0.3 },
        0
      );

      // Cada postal: entrada desde vector propio con escala 0.82 y opacidad 0; después deriva a velocidad diferente; finalmente se separa
      POSTCARDS_CONFIG.forEach((card, idx) => {
        const elSelector = `#s2-postcard-${idx}`;
        const staggerDelay = (idx % 5) * 0.045 + Math.floor(idx / 5) * 0.03;
        const mobileFactor = isMobile ? 0.55 : 1;

        const entryX = card.entryVector.x * mobileFactor;
        const entryY = card.entryVector.y * mobileFactor;
        const entryR = card.entryVector.r;

        const driftX = card.driftVector.x * mobileFactor;
        const driftY = card.driftVector.y * mobileFactor;
        const driftR = card.driftVector.r;

        // Fase 1: Entrada escalonada
        s2Tl.fromTo(elSelector,
          {
            x: entryX,
            y: entryY,
            rotation: card.desktop.rotate + entryR,
            scale: 0.82,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotation: card.desktop.rotate,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.35,
          },
          staggerDelay
        );

        // Fase 2: Deriva a velocidad propia
        s2Tl.to(elSelector, {
          x: driftX,
          y: driftY,
          rotation: card.desktop.rotate + driftR,
          ease: 'none',
          duration: 0.45,
        }, staggerDelay + 0.35);

        // Fase 3: Separación hacia afuera
        s2Tl.to(elSelector, {
          x: driftX * 1.6,
          y: driftY * 1.6,
          opacity: 0,
          scale: 0.9,
          ease: 'power1.in',
          duration: 0.2,
        }, 0.8);
      });

      // Retiro del titular central cerca de la salida
      s2Tl.to('#s2-center-title', {
        opacity: 0,
        y: -30,
        scale: 0.95,
        ease: 'power1.in',
        duration: 0.2,
      }, 0.75);

      // Puente visual panorama-valley al final de la escena 2
      s2Tl.to('#s2-bridge-valley', {
        opacity: 1,
        ease: 'power1.inOut',
        duration: 0.25,
      }, 0.75);

      // ==========================================
      // ESCENA 3: PANORAMA
      // ==========================================
      const s3Tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene3Ref.current,
          start: 'top top',
          end: '+=155%',
          pin: true,
          scrub: 0.65,
          id: 's3',
        },
      });

      // Fondo: escala 1.14 -> 1; Y -4% -> +4%
      s3Tl.fromTo('#s3-bg-img',
        { scale: 1.14, yPercent: -4 },
        { scale: 1, yPercent: 4, ease: 'none' },
        0
      );

      // Titular: Y +36px -> 0, opacidad 0 -> 1, escala 0.96 -> 1; luego asciende levemente y baja opacidad al salir
      s3Tl.fromTo('#s3-title-wrap',
        { y: 36, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 0.35 },
        0
      );
      s3Tl.to('#s3-title-wrap', {
        y: -24,
        opacity: 0.1,
        ease: 'power1.in',
        duration: 0.3,
      }, 0.7);

      // Postal: entra desde Y +80px, escala 0.9 -> 1, rotación -7.5° -> -2.5°; deriva luego alrededor de 18px con rotación sutil
      s3Tl.fromTo('#s3-postcard-wrap',
        { y: 80, scale: 0.9, rotation: -7.5, opacity: 0 },
        { y: 0, scale: 1, rotation: -2.5, opacity: 1, ease: 'power2.out', duration: 0.4 },
        0.1
      );
      s3Tl.to('#s3-postcard-wrap', {
        y: -18,
        rotation: -1,
        opacity: 0,
        ease: 'power1.in',
        duration: 0.3,
      }, 0.7);

      // Cortina carbón al salir hacia la galería
      s3Tl.to('#s3-curtain', {
        opacity: 1,
        ease: 'power1.in',
        duration: 0.25,
      }, 0.75);

      // ==========================================
      // ESCENA 4: GALERÍA DE CUATRO PANELES
      // ==========================================
      const s4Tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene4Ref.current,
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: 0.65,
          id: 's4',
          onUpdate: (self) => {
            const progress = self.progress;
            // Transiciones de protagonismo: 1->2 cerca de 0.08, 2->3 cerca de 0.38, 3->4 cerca de 0.68
            if (progress < 0.23) {
              setActiveGalleryPanel(0);
            } else if (progress < 0.53) {
              setActiveGalleryPanel(1);
            } else if (progress < 0.83) {
              setActiveGalleryPanel(2);
            } else {
              setActiveGalleryPanel(3);
            }
          },
        },
      });

      // Parallax continuo en imágenes internas: escala 1.22 -> 1.06; X alterna -6% -> +6% / +6% -> -6%; Y -5% -> +5%
      [0, 1, 2, 3].forEach((idx) => {
        const imgSelector = `#s4-panel-img-${idx}`;
        const xDirection = idx % 2 === 0 ? [-6, 6] : [6, -6];
        s4Tl.fromTo(imgSelector,
          { scale: 1.22, xPercent: xDirection[0], yPercent: -5 },
          { scale: 1.06, xPercent: xDirection[1], yPercent: 5, ease: 'none' },
          0
        );
      });

      // ==========================================
      // ESCENA 5: CIERRE LUMINOSO
      // ==========================================
      const s5Tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene5Ref.current,
          start: 'top 85%',
          end: 'bottom bottom',
          scrub: 0.6,
          id: 's5',
        },
      });

      // Fondo footer-mist: escala 1.14 -> 1; Y -6% -> 0
      s5Tl.fromTo('#s5-bg-img',
        { scale: 1.14, yPercent: -6 },
        { scale: 1, yPercent: 0, ease: 'none' },
        0
      );

      // Titular: Y +32px -> 0, opacidad 0 -> 1
      s5Tl.fromTo('#s5-title-wrap',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out', duration: 0.4 },
        0
      );

      // Tarjeta de papel: Y +56px -> 0, escala 0.95 -> 1, rotación -2.2° -> -0.6°
      s5Tl.fromTo('#s5-card-wrap',
        { y: 56, scale: 0.95, rotation: -2.2 },
        { y: 0, scale: 1, rotation: -0.6, ease: 'power2.out', duration: 0.4 },
        0.1
      );

      // Chincheta: cae suavemente desde Y -18px, escala 1.4 -> 1
      s5Tl.fromTo('#s5-pushpin',
        { y: -18, scale: 1.4, opacity: 0.5 },
        { y: 0, scale: 1, opacity: 1, ease: 'bounce.out', duration: 0.45 },
        0.25
      );

      // ==========================================
      // FASE 3: COREOGRAFÍA DE LA MOCHILA PERSISTENTE
      // ==========================================
      // Calcular los 14 puntos de control una vez que ScrollTrigger ha medido s1..s5
      const updateMochilaTrajectory = () => {
        const s1 = ScrollTrigger.getById('s1');
        const s2 = ScrollTrigger.getById('s2');
        const s3 = ScrollTrigger.getById('s3');
        const s4 = ScrollTrigger.getById('s4');
        const s5 = ScrollTrigger.getById('s5');

        if (!s1 || !s2 || !s3 || !s4 || !s5) return;

        const maxScroll = ScrollTrigger.maxScroll(window);
        const vw = window.innerWidth;
        const mobile = vw < 768;

        // Construcción de la tabla exacta de 14 puntos de control de la Sección F y Fase 3
        const waypoints: MochilaWaypoint[] = [
          // 0. Inicio escena 1
          {
            scroll: s1.start,
            x: 0.5,
            y: mobile ? 0.79 : 0.81,
            scale: 0.95,
            rotation: -3.5,
          },
          // 1. Medio de escena 1
          {
            scroll: s1.start + 0.58 * (s1.end - s1.start),
            x: mobile ? 0.33 : 0.36,
            y: 0.74,
            scale: 1.02,
            rotation: 4.5,
          },
          // 2. Paso hacia postales
          {
            scroll: s1.end + 0.5 * (s2.start - s1.end),
            x: mobile ? 0.24 : 0.27,
            y: 0.5,
            scale: 0.92,
            rotation: 6.5,
          },
          // 3. Entrada de postales
          {
            scroll: s2.start + 0.16 * (s2.end - s2.start),
            x: mobile ? 0.25 : 0.29,
            y: mobile ? 0.27 : 0.29,
            scale: 0.88,
            rotation: -5,
          },
          // 4. Medio de postales
          {
            scroll: s2.start + 0.54 * (s2.end - s2.start),
            x: mobile ? 0.72 : 0.68,
            y: mobile ? 0.26 : 0.25,
            scale: 0.94,
            rotation: -6.5,
          },
          // 5. Salida de postales
          {
            scroll: s2.end,
            x: mobile ? 0.74 : 0.71,
            y: mobile ? 0.66 : 0.68,
            scale: 1.02,
            rotation: 5,
          },
          // 6. Entrada de panorama
          {
            scroll: s3.start + 0.15 * (s3.end - s3.start),
            x: mobile ? 0.74 : 0.72,
            y: mobile ? 0.8 : 0.79,
            scale: 1.06,
            rotation: 3.5,
          },
          // 7. Medio del panorama
          {
            scroll: s3.start + 0.56 * (s3.end - s3.start),
            x: 0.46,
            y: mobile ? 0.85 : 0.86,
            scale: 1.1,
            rotation: -3,
          },
          // 8. Salida de panorama
          {
            scroll: s3.end,
            x: 0.22,
            y: 0.76,
            scale: 1.02,
            rotation: -5.5,
          },
          // 9. Panel 1
          {
            scroll: s4.start + 0.08 * (s4.end - s4.start),
            x: mobile ? 0.27 : 0.18,
            y: mobile ? 0.36 : 0.63,
            scale: 0.92,
            rotation: 3.5,
          },
          // 10. Panel 2
          {
            scroll: s4.start + 0.38 * (s4.end - s4.start),
            x: mobile ? 0.73 : 0.39,
            y: mobile ? 0.36 : 0.6,
            scale: 0.96,
            rotation: -4,
          },
          // 11. Panel 3
          {
            scroll: s4.start + 0.68 * (s4.end - s4.start),
            x: mobile ? 0.27 : 0.61,
            y: mobile ? 0.66 : 0.62,
            scale: 0.94,
            rotation: 3.5,
          },
          // 12. Panel 4
          {
            scroll: s4.end,
            x: mobile ? 0.73 : 0.82,
            y: mobile ? 0.66 : 0.64,
            scale: 0.97,
            rotation: -4.5,
          },
          // 13. Reposo final: X = min(ancho-68px, centro+308px) / .84 móvil; Y=.72 escritorio/.23 móvil
          {
            scroll: maxScroll > 0 ? maxScroll : s5.end,
            x: mobile
              ? 0.84
              : Math.min((vw - 68) / vw, (vw / 2 + 308) / vw),
            y: mobile ? 0.23 : 0.72,
            scale: mobile ? 0.95 : 1.04,
            rotation: -3,
          },
        ];

        // Función de interpolación suave entre los waypoints según el scroll actual
        const currentScroll = window.scrollY || window.pageYOffset;

        // Encontrar segmento actual
        let p0 = waypoints[0];
        let p1 = waypoints[waypoints.length - 1];

        if (currentScroll <= waypoints[0].scroll) {
          setMochilaState({
            x: waypoints[0].x,
            y: waypoints[0].y,
            scale: waypoints[0].scale,
            rotation: waypoints[0].rotation,
            visible: true,
          });
          return;
        }

        if (currentScroll >= waypoints[waypoints.length - 1].scroll) {
          const last = waypoints[waypoints.length - 1];
          setMochilaState({
            x: last.x,
            y: last.y,
            scale: last.scale,
            rotation: last.rotation,
            visible: true,
          });
          return;
        }

        for (let i = 0; i < waypoints.length - 1; i++) {
          if (currentScroll >= waypoints[i].scroll && currentScroll <= waypoints[i + 1].scroll) {
            p0 = waypoints[i];
            p1 = waypoints[i + 1];
            break;
          }
        }

        const range = p1.scroll - p0.scroll;
        const t = range > 0 ? Math.max(0, Math.min(1, (currentScroll - p0.scroll) / range)) : 0;
        // Curva suave de aceleración/desaceleración para la transición de la mochila
        const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const currentX = p0.x + (p1.x - p0.x) * easeT;
        const currentY = p0.y + (p1.y - p0.y) * easeT;
        const currentScale = p0.scale + (p1.scale - p0.scale) * easeT;
        const currentRot = p0.rotation + (p1.rotation - p0.rotation) * easeT;

        setMochilaState({
          x: currentX,
          y: currentY,
          scale: currentScale,
          rotation: currentRot,
          visible: true,
        });
      };

      // Escuchar el evento de scroll y los updates de ScrollTrigger
      ScrollTrigger.addEventListener('refresh', updateMochilaTrajectory);
      window.addEventListener('scroll', updateMochilaTrajectory, { passive: true });
      window.addEventListener('resize', updateMochilaTrajectory);

      // Refrescar ScrollTrigger para asegurar sincronización de los pines
      ScrollTrigger.refresh();
      updateMochilaTrajectory();

      return () => {
        ScrollTrigger.removeEventListener('refresh', updateMochilaTrajectory);
        window.removeEventListener('scroll', updateMochilaTrajectory);
        window.removeEventListener('resize', updateMochilaTrajectory);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#111214] text-[#f6f4ef] font-sans antialiased">
      {/* Cabecera Fija de Tres Zonas */}
      <Header
        currentLang={currentLang}
        onToggleLang={toggleLanguage}
        onOpenPlanner={() => handleOpenPlanner()}
      />

      {/* Mochila Persistente Ilustrada en SVG (Z-Index 40, Fuera de los Pins) */}
      <Mochila
        x={mochilaState.x}
        y={mochilaState.y}
        scale={mochilaState.scale}
        rotation={mochilaState.rotation}
        visible={mochilaState.visible}
      />

      {/* Flujo Editorial de las Cinco Escenas Semánticas */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* Escena 1: Portada Inmersiva con Viajero, Titular Dividido y Postal Flotante */}
        <Scene1Hero
          ref={scene1Ref}
          currentLang={currentLang}
          onOpenViewer={(data) => setViewerData(data)}
        />

        {/* Escena 2: Collage Oscuro de 11 Postales Físicas con Tabla y Vectores */}
        <Scene2Postcards
          ref={scene2Ref}
          currentLang={currentLang}
          onOpenViewer={(data) => setViewerData(data)}
        />

        {/* Escena 3: Paisaje Panorámico con Titular Blanco y Postal Pequeña por Debajo */}
        <Scene3Panorama
          ref={scene3Ref}
          currentLang={currentLang}
          onOpenViewer={(data) => setViewerData(data)}
        />

        {/* Escena 4: Galería de Cuatro Paneles Fotográficos Verticales con Parallax */}
        <Scene4Gallery
          ref={scene4Ref}
          currentLang={currentLang}
          onOpenViewer={(data) => setViewerData(data)}
          activePanelIndex={activeGalleryPanel}
        />

        {/* Escena 5: Cierre Luminoso con Tarjeta de Papel Crema, Chincheta y Destinos */}
        <Scene5Footer
          ref={scene5Ref}
          currentLang={currentLang}
          onOpenPlanner={(destId) => handleOpenPlanner(destId)}
        />
      </main>

      {/* Visor de Medios Lightbox Accesible */}
      <MediaViewer
        data={viewerData}
        onClose={() => setViewerData(null)}
        currentLang={currentLang}
        onPlanTrip={(destId) => handleOpenPlanner(destId)}
      />

      {/* Modal de Planificación de Viaje con WhatsApp / Email Reales */}
      <PlannerModal
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        initialDestinationId={plannerInitialDest}
        currentLang={currentLang}
      />
    </div>
  );
}

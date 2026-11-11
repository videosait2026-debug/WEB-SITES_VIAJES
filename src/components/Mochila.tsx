import React from 'react';

interface MochilaProps {
  x: number; // viewport percentage 0..1
  y: number; // viewport percentage 0..1
  scale: number;
  rotation: number; // in degrees
  visible?: boolean;
}

/**
 * Mochila de campo persistente (Persistent Field Backpack).
 * Ilustración SVG vectorial original: Lona verde oliva encerada, solapa superior,
 * bolsillo frontal y laterales, correas de cuero marrón, hebillas de latón envejecido
 * y rollo de manta en la parte superior con gradientes locales y sombra de contacto suave.
 */
export const Mochila: React.FC<MochilaProps> = ({
  x,
  y,
  scale,
  rotation,
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <div
      id="persistent-mochila"
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: `${x * 100}vw`,
        top: `${y * 100}vh`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        zIndex: 40,
        pointerEvents: 'none',
        transition: 'transform 0.08s ease-out',
        willChange: 'transform, left, top',
      }}
      className="w-[52px] h-[60px] md:w-[74px] md:h-[86px] select-none filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.65)]"
    >
      <svg
        viewBox="0 0 100 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Sombra de contacto */}
          <radialGradient id="backpack-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Lona verde oliva encerada */}
          <linearGradient id="canvas-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#546246" />
            <stop offset="45%" stopColor="#435037" />
            <stop offset="100%" stopColor="#313b28" />
          </linearGradient>

          {/* Solapa superior */}
          <linearGradient id="canvas-flap" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#5c6b4d" />
            <stop offset="100%" stopColor="#3a452f" />
          </linearGradient>

          {/* Manta enrollada superior */}
          <linearGradient id="blanket-roll" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#877561" />
            <stop offset="25%" stopColor="#a3917a" />
            <stop offset="50%" stopColor="#7a6854" />
            <stop offset="75%" stopColor="#9e8d77" />
            <stop offset="100%" stopColor="#695947" />
          </linearGradient>

          {/* Cuero marrón rico */}
          <linearGradient id="leather-strap" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a4b27" />
            <stop offset="50%" stopColor="#673418" />
            <stop offset="100%" stopColor="#4d240e" />
          </linearGradient>

          {/* Latón envejecido */}
          <linearGradient id="brass-buckle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ebd485" />
            <stop offset="50%" stopColor="#c59f42" />
            <stop offset="100%" stopColor="#826624" />
          </linearGradient>

          {/* Bolsillos laterales */}
          <linearGradient id="pocket-side" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d4731" />
            <stop offset="100%" stopColor="#4a563d" />
          </linearGradient>
        </defs>

        {/* Sombra de apoyo elíptica suave */}
        <ellipse cx="50" cy="112" rx="42" ry="7" fill="url(#backpack-shadow)" />

        {/* Rollo de manta superior fijada con correas */}
        <rect x="22" y="6" width="56" height="15" rx="7.5" fill="url(#blanket-roll)" stroke="#4a3e31" strokeWidth="1" />
        {/* Patrón sutil de la manta andina */}
        <line x1="32" y1="6" x2="32" y2="21" stroke="#BE5103" strokeWidth="2" strokeOpacity="0.8" />
        <line x1="36" y1="6" x2="36" y2="21" stroke="#FFCE1B" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="64" y1="6" x2="64" y2="21" stroke="#069494" strokeWidth="2" strokeOpacity="0.8" />
        <line x1="68" y1="6" x2="68" y2="21" stroke="#B7410E" strokeWidth="1.5" strokeOpacity="0.8" />

        {/* Asa superior de cuero */}
        <path d="M42 9 C42 4, 58 4, 58 9" stroke="#5a2e15" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Correas de sujeción de la manta */}
        <rect x="33" y="5" width="4.5" height="17" rx="1" fill="url(#leather-strap)" />
        <rect x="62.5" y="5" width="4.5" height="17" rx="1" fill="url(#leather-strap)" />
        <rect x="32.5" y="11" width="5.5" height="4" rx="0.5" fill="url(#brass-buckle)" />
        <rect x="62" y="11" width="5.5" height="4" rx="0.5" fill="url(#brass-buckle)" />

        {/* Bolsillos laterales de fuelle */}
        <rect x="10" y="44" width="12" height="38" rx="4" fill="url(#pocket-side)" stroke="#2b3323" strokeWidth="1" />
        <path d="M10 44 L22 44 L20 52 L12 52 Z" fill="#353e2a" />
        <rect x="15" y="48" width="2" height="26" rx="0.5" fill="url(#leather-strap)" />
        <rect x="14.5" y="58" width="3" height="3" rx="0.5" fill="url(#brass-buckle)" />

        <rect x="78" y="44" width="12" height="38" rx="4" fill="url(#pocket-side)" stroke="#2b3323" strokeWidth="1" />
        <path d="M78 44 L90 44 L88 52 L80 52 Z" fill="#353e2a" />
        <rect x="83" y="48" width="2" height="26" rx="0.5" fill="url(#leather-strap)" />
        <rect x="82.5" y="58" width="3" height="3" rx="0.5" fill="url(#brass-buckle)" />

        {/* Cuerpo principal de la mochila */}
        <path
          d="M20 28 C20 22 26 19 34 19 L66 19 C74 19 80 22 80 28 L78 98 C78 104 72 107 64 107 L36 107 C28 107 22 104 22 98 Z"
          fill="url(#canvas-body)"
          stroke="#272e1f"
          strokeWidth="1.2"
        />

        {/* Base reforzada de cuero inferior */}
        <path
          d="M22 93 C22 93 30 96 50 96 C70 96 78 93 78 93 L77 99 C77 104 71 107 63 107 L37 107 C29 107 23 104 23 99 Z"
          fill="#44210d"
        />

        {/* Bolsillo frontal abullonado */}
        <rect x="30" y="58" width="40" height="36" rx="5" fill="#3a452f" stroke="#252d1d" strokeWidth="1" />
        <path d="M29 58 L71 58 L68 67 L32 67 Z" fill="#4d5c3f" stroke="#252d1d" strokeWidth="0.8" />
        <rect x="48.5" y="58" width="3" height="34" rx="1" fill="url(#leather-strap)" />
        <rect x="47.5" y="70" width="5" height="5" rx="0.8" fill="url(#brass-buckle)" />

        {/* Solapa superior curva envolvente */}
        <path
          d="M24 20 L76 20 C76 20 78 48 68 53 C58 57 42 57 32 53 C22 48 24 20 24 20 Z"
          fill="url(#canvas-flap)"
          stroke="#262e1f"
          strokeWidth="1.2"
        />
        {/* Ribete de lona y cuero de la solapa */}
        <path
          d="M25 24 C25 24 27 46 34 50 C43 54 57 54 66 50 C73 46 75 24 75 24"
          stroke="#232a1b"
          strokeWidth="0.75"
          strokeDasharray="2 1.5"
          fill="none"
        />

        {/* Parche de expedición de cuero en el centro de la solapa */}
        <rect x="44" y="27" width="12" height="12" rx="2" fill="#693517" stroke="#3d1d0a" strokeWidth="0.8" />
        <circle cx="50" cy="33" r="3.2" fill="#be5103" />
        <circle cx="50" cy="33" r="1.2" fill="#ffce1b" />

        {/* Correas frontales verticales gemelas */}
        <rect x="34" y="19" width="4.5" height="42" rx="1" fill="url(#leather-strap)" />
        <rect x="61.5" y="19" width="4.5" height="42" rx="1" fill="url(#leather-strap)" />

        {/* Costuras detalladas de cuero */}
        <line x1="36.2" y1="21" x2="36.2" y2="59" stroke="#9e5932" strokeWidth="0.7" strokeDasharray="1.5 1.5" />
        <line x1="63.7" y1="21" x2="63.7" y2="59" stroke="#9e5932" strokeWidth="0.7" strokeDasharray="1.5 1.5" />

        {/* Hebillas de latón principales con lengüeta */}
        <rect x="33" y="47" width="6.5" height="6.5" rx="1" fill="url(#brass-buckle)" stroke="#594413" strokeWidth="0.75" />
        <rect x="35" y="49" width="2.5" height="2.5" fill="#3a1b0b" />
        <line x1="36.2" y1="46" x2="36.2" y2="54" stroke="#e0c26c" strokeWidth="1" />

        <rect x="60.5" y="47" width="6.5" height="6.5" rx="1" fill="url(#brass-buckle)" stroke="#594413" strokeWidth="0.75" />
        <rect x="62.5" y="49" width="2.5" height="2.5" fill="#3a1b0b" />
        <line x1="63.7" y1="46" x2="63.7" y2="54" stroke="#e0c26c" strokeWidth="1" />

        {/* Remaches de latón pequeños */}
        <circle cx="36.25" cy="22" r="1" fill="#f0db93" />
        <circle cx="63.75" cy="22" r="1" fill="#f0db93" />
        <circle cx="36.25" cy="60" r="1" fill="#f0db93" />
        <circle cx="63.75" cy="60" r="1" fill="#f0db93" />
      </svg>
    </div>
  );
};

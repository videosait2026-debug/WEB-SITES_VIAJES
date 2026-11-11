/**
 * Configuración centralizada de Fersites Agencia de Viajes Tecnológicas de Bolivia
 * Cumple con el requerimiento de separar datos de negocio del diseño.
 */

export interface AgencyConfig {
  shortName: string;
  fullName: {
    es: string;
    fr: string;
  };
  country: string;
  cities: string[];
  phone: string;
  whatsappNumber: string; // formato internacional sin signos para wa.me
  email: string;
  licenseNumber: string;
  primaryPalette: {
    amber: string;
    solarGold: string;
    deepTurquoise: string;
    rustSienna: string;
  };
  destinations: Array<{
    id: string;
    name: { es: string; fr: string };
    territory: { es: string; fr: string };
    description: { es: string; fr: string };
    altitude?: string;
    recommendedDuration: { es: string; fr: string };
    highlights: { es: string[]; fr: string[] };
    mediaRole: string;
    videoId?: string;
  }>;
  images: {
    'hero-traveler': string;
    'panorama-valley': string;
    'footer-mist': string;
    'gallery-red-rocks': string;
    'gallery-waterfall': string;
    'gallery-snow': string;
    'gallery-market': string;
    'postcard-lake': string;
    'postcard-coast': string;
    'postcard-desert': string;
    'postcard-village': string;
    'postcard-forest': string;
  };
  videos: Record<string, {
    url: string;
    title: { es: string; fr: string };
    caption: { es: string; fr: string };
  }>;
}

export const AGENCY_CONFIG: AgencyConfig = {
  shortName: 'FERSITES BOLIVIA',
  fullName: {
    es: 'Fersites Agencia de Viajes Tecnológicas de Bolivia',
    fr: 'Fersites Agence de Voyages Technologiques de Bolivie',
  },
  country: 'Bolivia',
  cities: ['La Paz', 'Potosí', 'Uyuni', 'Copacabana', 'Coroico'],
  phone: '+591 69964875',
  whatsappNumber: '59169964875',
  email: 'contacto@fersitesbolivia.com',
  licenseNumber: 'RNT-BOL-2026-TECNOLOGICA',
  
  // Paleta "Retro sunset" extraída de la referencia: #BE5103, #FFCE1B, #069494, #B7410E
  primaryPalette: {
    amber: '#BE5103',
    solarGold: '#FFCE1B',
    deepTurquoise: '#069494',
    rustSienna: '#B7410E',
  },

  // Cuatro destinos emblemáticos requeridos para la tarjeta final y selector
  destinations: [
    {
      id: 'uyuni',
      name: {
        es: 'Salar de Uyuni & Joyas de Potosí',
        fr: 'Salar d’Uyuni & Joyaux de Potosí',
      },
      territory: {
        es: 'Potosí • Altiplano Sur',
        fr: 'Potosí • Haut-Plateau Sud',
      },
      description: {
        es: 'El desierto de sal continuo más grande del planeta. Reflejo cósmico entre islas de cactus milenarios, géiseres del Sol de Mañana y lagunas policromáticas.',
        fr: 'Le plus grand désert de sel au monde. Reflet cosmique entre îles de cactus millénaires, geysers et lagunes polychromes de l’Altiplano.',
      },
      altitude: '3.656 m s.n.m.',
      recommendedDuration: { es: '3 a 4 días', fr: '3 à 4 jours' },
      highlights: {
        es: ['Amanecer en el Salar', 'Isla Incahuasi', 'Laguna Colorada', 'Potosí Colonial'],
        fr: ['Lever de soleil sur le sel', 'Île Incahuasi', 'Lagune Colorée', 'Potosí Colonial'],
      },
      mediaRole: 'postcard-lake',
      videoId: 'v1',
    },
    {
      id: 'copacabana',
      name: {
        es: 'Copacabana, Isla del Sol & Lago Sagrado',
        fr: 'Copacabana, Île du Soleil & Lac Sacré',
      },
      territory: {
        es: 'La Paz • Lago Titicaca',
        fr: 'La Paz • Lac Titicaca',
      },
      description: {
        es: 'Cuna mítica de los Hijos del Sol en las aguas navegables más altas del mundo. Senderos precolombinos, terrazas agrícolas incas y santuarios de piedra.',
        fr: 'Berceau mythique des Fils du Soleil sur le plus haut lac navigable du globe. Sentiers précolombiens, terrasses incas et sanctuaires insulaires.',
      },
      altitude: '3.812 m s.n.m.',
      recommendedDuration: { es: '2 a 3 días', fr: '2 à 3 jours' },
      highlights: {
        es: ['Isla del Sol', 'Escalinata del Inca', 'Templo de Pilkokaina', 'Bahía de Copacabana'],
        fr: ['Île du Soleil', 'Escalier de l’Inca', 'Temple Pilkokaina', 'Baie de Copacabana'],
      },
      mediaRole: 'postcard-coast',
      videoId: 'v2',
    },
    {
      id: 'tiwanaku',
      name: {
        es: 'Tiwanaku & Pirámides Ancestrales',
        fr: 'Tiwanaku & Pyramides Ancestrales',
      },
      territory: {
        es: 'Valle de Tiwanaku • Civilización Primigenia',
        fr: 'Vallée de Tiwanaku • Civilisation Mère',
      },
      description: {
        es: 'El epicentro ceremonial andino milenario. La Puerta del Sol, la Pirámide de Akapana y el Templete Semisubterráneo labrados con precisión astronómica.',
        fr: 'L’épicentre cérémoniel andin millénaire. La Porte du Soleil, la pyramide d’Akapana et le temple semi-souterrain taillés selon les astres.',
      },
      altitude: '3.885 m s.n.m.',
      recommendedDuration: { es: '1 a 2 días', fr: '1 à 2 jours' },
      highlights: {
        es: ['Puerta del Sol', 'Pirámide de Akapana', 'Monolito Bennett', 'Kalasasaya'],
        fr: ['Porte du Soleil', 'Pyramide d’Akapana', 'Monolithe Bennett', 'Kalasasaya'],
      },
      mediaRole: 'gallery-market',
      videoId: 'v9',
    },
    {
      id: 'yungas',
      name: {
        es: 'Los Yungas, Coroico & Ruta de la Niebla',
        fr: 'Les Yungas, Coroico & Route de la Brume',
      },
      territory: {
        es: 'Cordillera Oriental • Ceja de Selva',
        fr: 'Cordillère Orientale • Forêt de Nuages',
      },
      description: {
        es: 'El vertiginoso descenso desde las cumbres andinas de 4.700 m hacia valles subtropicales de cafetales, cascadas cristalinas y exuberante biodiversidad.',
        fr: 'La descente vertigineuse des sommets andins vers les vallées subtropicales de plantations de café, cascades pures et forêts de brume.',
      },
      altitude: '1.750 m s.n.m.',
      recommendedDuration: { es: '2 a 3 días', fr: '2 à 3 jours' },
      highlights: {
        es: ['Cascada San Félix', 'Plantaciones de Café y Cacao', 'Coroico Colonial', 'Avistamiento de aves'],
        fr: ['Cascade San Félix', 'Plantations de café bio', 'Coroico Colonial', 'Forêt tropicale'],
      },
      mediaRole: 'gallery-waterfall',
      videoId: 'v3',
    },
  ],

  // 12 recursos fotográficos principales declarados con URLs exactas de Cloudinary
  images: {
    'hero-traveler': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349315/hero-traveler_fgshd7.png',
    'panorama-valley': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349317/panorama-valley_pmyavv.png',
    'footer-mist': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349307/footer-mist_njdfpy.png',
    'gallery-red-rocks': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349310/gallery-red-rocks_hsts4y.png',
    'gallery-waterfall': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349313/gallery-waterfall_k3soyk.png',
    'gallery-snow': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349311/gallery-snow_c4fr12.png',
    'gallery-market': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349309/gallery-market_qqxuwn.png',
    'postcard-lake': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349323/postcard-lake_nisg1g.png',
    'postcard-coast': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349318/postcard-coast_zbygln.png',
    'postcard-desert': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349320/postcard-desert_p63plq.png',
    'postcard-village': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349325/postcard-village_dc1my3.png',
    'postcard-forest': 'https://res.cloudinary.com/irccnrjr/image/upload/v1794349322/postcard-forest_nkhsk9.png',
  },

  // 6 videos opcionales activados y enlazados a destinos y postales
  videos: {
    v1: {
      url: 'https://res.cloudinary.com/irccnrjr/video/upload/v1794320964/video1_o5h87l.mp4',
      title: {
        es: 'Salar de Uyuni • Travesía al Espejo del Cielo',
        fr: 'Salar d’Uyuni • Traversée au Miroir Céleste',
      },
      caption: {
        es: 'Horizonte blanco infinito y expedición 4x4 por el altiplano de Potosí.',
        fr: 'Horizon blanc infini et expédition 4x4 à travers le haut-plateau de Potosí.',
      },
    },
    v2: {
      url: 'https://res.cloudinary.com/irccnrjr/video/upload/v1794320970/video2_hqzbzj.mp4',
      title: {
        es: 'Copacabana & Lago Titicaca • Aguas de Altura',
        fr: 'Copacabana & Lac Titicaca • Eaux Sacrées',
      },
      caption: {
        es: 'Navegación tradicional hacia la Isla del Sol y santuarios precolombinos.',
        fr: 'Navigation traditionnelle vers l’Île du Soleil et ses sanctuaires précolombiens.',
      },
    },
    v3: {
      url: 'https://res.cloudinary.com/irccnrjr/video/upload/v1794320984/video3_fcduyo.mp4',
      title: {
        es: 'Yungas de Coroico • Cascadas y Ceja de Selva',
        fr: 'Yungas de Coroico • Cascades et Brumes Tropicales',
      },
      caption: {
        es: 'El descenso exuberante donde la cordillera andina besa la Amazonía boliviana.',
        fr: 'La descente luxuriante où la cordillère des Andes rencontre l’Amazonie bolivienne.',
      },
    },
    v4: {
      url: 'https://res.cloudinary.com/irccnrjr/video/upload/v1794320992/video4_yruoen.mp4',
      title: {
        es: 'Cañones Rojos & Quebradas de Potosí',
        fr: 'Canyons Rouges & Terres d’Ocre',
      },
      caption: {
        es: 'Erosión geológica milenaria en las fallas andinas del sur boliviano.',
        fr: 'Érosion géologique millénaire dans les failles andines du sud bolivien.',
      },
    },
    v6: {
      url: 'https://res.cloudinary.com/irccnrjr/video/upload/v1794321004/video6_ucg8ev.mp4',
      title: {
        es: 'Cordillera Real • Cumbres Nevadas de Bolivia',
        fr: 'Cordillère Royale • Sommets Enneigés de Bolivie',
      },
      caption: {
        es: 'Glaciares de alta montaña, picos sagrados del Illimani y Huayna Potosí.',
        fr: 'Glaciers de haute montagne, pics sacrés de l’Illimani et Huayna Potosí.',
      },
    },
    v9: {
      url: 'https://res.cloudinary.com/irccnrjr/video/upload/v1794321025/video9_a0vmc3.mp4',
      title: {
        es: 'Tiwanaku & Raíces Ancestrales de Bolivia',
        fr: 'Tiwanaku & Mémoire Ancestrale de Bolivie',
      },
      caption: {
        es: 'Monumentalidad megalítica y sabiduría astronómica de la civilización tiwanakota.',
        fr: 'Monumentalité mégalithique et sagesse astronomique de la civilisation tiwanaku.',
      },
    },
  },
};

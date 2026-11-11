import React, { useState, useEffect } from 'react';
import { X, Send, Compass, Phone, Mail, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { AGENCY_CONFIG } from '../config/agency';

interface PlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestinationId?: string;
  currentLang: 'es' | 'fr';
}

export const PlannerModal: React.FC<PlannerModalProps> = ({
  isOpen,
  onClose,
  initialDestinationId,
  currentLang,
}) => {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [travelerName, setTravelerName] = useState('');
  const [travelerContact, setTravelerContact] = useState('');
  const [duration, setDuration] = useState('3-5');
  const [travelersCount, setTravelersCount] = useState('2');
  const [season, setSeason] = useState('abril-octubre');
  const [notes, setNotes] = useState('');

  // Sincronizar destino inicial
  useEffect(() => {
    if (initialDestinationId) {
      setSelectedDestinations([initialDestinationId]);
    } else if (selectedDestinations.length === 0) {
      setSelectedDestinations(['uyuni']);
    }
  }, [initialDestinationId, isOpen]);

  // Manejar tecla escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleDestination = (id: string) => {
    if (selectedDestinations.includes(id)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter((d) => d !== id));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, id]);
    }
  };

  const selectedDestNames = selectedDestinations
    .map((id) => AGENCY_CONFIG.destinations.find((d) => d.id === id)?.name[currentLang])
    .filter(Boolean)
    .join(', ');

  // Crear mensaje de WhatsApp
  const generateWhatsAppUrl = () => {
    const greeting = currentLang === 'es' ? 'Hola Fersites Bolivia,' : 'Bonjour Fersites Bolivie,';
    const textEs = `${greeting} Me gustaría planificar un viaje personalizado por Bolivia.
• Destino(s): ${selectedDestNames}
• Duración estimada: ${duration} días
• Pasajeros: ${travelersCount} persona(s)
• Época / Fechas: ${season}
• Nombre de contacto: ${travelerName || 'Viajero'}
${notes ? `• Notas adicionales: ${notes}` : ''}
Solicito asesoría técnica de itinerario. Gracias.`;

    const textFr = `${greeting} Je souhaite planifier un voyage sur mesure en Bolivie.
• Destination(s): ${selectedDestNames}
• Durée estimée: ${duration} jours
• Voyageurs: ${travelersCount} personne(s)
• Saison / Dates: ${season}
• Nom: ${travelerName || 'Voyageur'}
${notes ? `• Notes additionnelles: ${notes}` : ''}
Je souhaite recevoir une proposition d’itinéraire technique. Merci.`;

    const message = currentLang === 'es' ? textEs : textFr;
    return `https://wa.me/${AGENCY_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // Crear enlace mailto
  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(
      currentLang === 'es'
        ? `Solicitud de Itinerario - Fersites Bolivia [${selectedDestNames}]`
        : `Demande d’Itinéraire - Fersites Bolivie [${selectedDestNames}]`
    );
    const body = encodeURIComponent(
      `${currentLang === 'es' ? 'Nombre' : 'Nom'}: ${travelerName}\n` +
      `${currentLang === 'es' ? 'Destinos' : 'Destinations'}: ${selectedDestNames}\n` +
      `${currentLang === 'es' ? 'Duración' : 'Durée'}: ${duration} días\n` +
      `${currentLang === 'es' ? 'Viajeros' : 'Voyageurs'}: ${travelersCount}\n` +
      `${currentLang === 'es' ? 'Temporada' : 'Saison'}: ${season}\n` +
      `${currentLang === 'es' ? 'Notas' : 'Notes'}: ${notes}\n`
    );
    return `mailto:${AGENCY_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#faf7f0] text-[#18181a] rounded-lg shadow-2xl border border-[#d3cbbe] overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Cabecera con cinta y chincheta decorativa */}
        <div className="relative bg-[#f2ede2] border-b border-[#d3cbbe] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#BE5103] text-white flex items-center justify-center shadow">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-editorial text-2xl font-bold tracking-tight text-[#18181a] leading-none">
                {currentLang === 'es' ? 'Planificador de Expedición' : 'Planificateur d’Expédition'}
              </h2>
              <p className="text-[11px] font-mono-meta text-[#6b6255] uppercase tracking-wider mt-1">
                {AGENCY_CONFIG.fullName[currentLang]}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="p-1.5 rounded-full hover:bg-black/10 text-[#18181a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario con campos editoriales */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Destinos seleccionables */}
          <div>
            <label className="block text-xs font-mono-meta uppercase tracking-wider text-[#6b6255] mb-2 font-semibold">
              {currentLang === 'es' ? '1. Selecciona los territorios a explorar:' : '1. Sélectionnez vos territoires :'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AGENCY_CONFIG.destinations.map((dest) => {
                const isSelected = selectedDestinations.includes(dest.id);
                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => toggleDestination(dest.id)}
                    className={`p-3 rounded text-left border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-[#18181a] text-[#faf7f0] border-[#18181a] shadow-sm'
                        : 'bg-white text-[#18181a] border-[#d3cbbe] hover:border-[#BE5103]'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        isSelected ? 'text-[#FFCE1B]' : 'text-[#a3a098]'
                      }`}
                    />
                    <div>
                      <div className="font-editorial text-base font-semibold leading-tight">
                        {dest.name[currentLang]}
                      </div>
                      <div className={`text-[10px] font-mono-meta mt-0.5 ${isSelected ? 'text-[#069494]' : 'text-[#6b6255]'}`}>
                        {dest.territory[currentLang]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duración y Viajeros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-meta uppercase tracking-wider text-[#6b6255] mb-1.5 font-semibold">
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#BE5103]" />
                {currentLang === 'es' ? 'Duración aproximada:' : 'Durée estimée :'}
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d3cbbe] rounded text-sm text-[#18181a] focus:outline-none focus:ring-1 focus:ring-[#BE5103]"
              >
                <option value="2-3">{currentLang === 'es' ? '2 a 3 días (Escapada breve)' : '2 à 3 jours (Courte escapade)'}</option>
                <option value="4-6">{currentLang === 'es' ? '4 a 6 días (Ruta clásica)' : '4 à 6 jours (Route classique)'}</option>
                <option value="7-10">{currentLang === 'es' ? '7 a 10 días (Gran travesía)' : '7 à 10 jours (Grande traversée)'}</option>
                <option value="12+">{currentLang === 'es' ? '12+ días (Bolivia integral)' : '12+ jours (Bolivie intégrale)'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono-meta uppercase tracking-wider text-[#6b6255] mb-1.5 font-semibold">
                <Users className="w-3.5 h-3.5 inline mr-1 text-[#069494]" />
                {currentLang === 'es' ? 'Número de viajeros:' : 'Nombre de voyageurs :'}
              </label>
              <select
                value={travelersCount}
                onChange={(e) => setTravelersCount(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d3cbbe] rounded text-sm text-[#18181a] focus:outline-none focus:ring-1 focus:ring-[#BE5103]"
              >
                <option value="1">{currentLang === 'es' ? '1 persona (Solo traveler)' : '1 personne (Voyageur solo)'}</option>
                <option value="2">{currentLang === 'es' ? '2 personas (Pareja / Amigos)' : '2 personnes (Couple / Amis)'}</option>
                <option value="3-5">{currentLang === 'es' ? '3 a 5 personas (Familia o grupo pequeño)' : '3 à 5 personnes (Famille / Petit groupe)'}</option>
                <option value="6+">{currentLang === 'es' ? '6+ personas (Grupo privado)' : '6+ personnes (Groupe privé)'}</option>
              </select>
            </div>
          </div>

          {/* Nombre y Contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-meta uppercase tracking-wider text-[#6b6255] mb-1.5 font-semibold">
                {currentLang === 'es' ? 'Tu nombre:' : 'Votre nom :'}
              </label>
              <input
                type="text"
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                placeholder={currentLang === 'es' ? 'Ej. Mateo Silva' : 'Ex. Jean Dupont'}
                className="w-full px-3 py-2 bg-white border border-[#d3cbbe] rounded text-sm text-[#18181a] focus:outline-none focus:ring-1 focus:ring-[#BE5103]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-meta uppercase tracking-wider text-[#6b6255] mb-1.5 font-semibold">
                {currentLang === 'es' ? 'WhatsApp o Teléfono:' : 'WhatsApp ou Téléphone :'}
              </label>
              <input
                type="tel"
                value={travelerContact}
                onChange={(e) => setTravelerContact(e.target.value)}
                placeholder="+591 ..."
                className="w-full px-3 py-2 bg-white border border-[#d3cbbe] rounded text-sm text-[#18181a] focus:outline-none focus:ring-1 focus:ring-[#BE5103]"
              />
            </div>
          </div>

          {/* Notas y preferencias */}
          <div>
            <label className="block text-xs font-mono-meta uppercase tracking-wider text-[#6b6255] mb-1.5 font-semibold">
              {currentLang === 'es' ? 'Requerimientos especiales o intereses:' : 'Besoins particuliers ou centres d’intérêt :'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                currentLang === 'es'
                  ? 'Fotografía nocturna en Uyuni, caminatas arqueológicas, aclimatación en La Paz...'
                  : 'Photographie de nuit à Uyuni, randonnées archéologiques, acclimatation...'
              }
              className="w-full px-3 py-2 bg-white border border-[#d3cbbe] rounded text-sm text-[#18181a] focus:outline-none focus:ring-1 focus:ring-[#BE5103]"
            />
          </div>

          <div className="bg-[#f2ede2] p-3 rounded border border-[#d3cbbe]/70 text-xs text-[#6b6255]">
            <p className="font-mono-meta text-[11px] text-[#BE5103] font-semibold mb-0.5">
              {currentLang === 'es' ? '★ Asesoría Directa Oficial:' : '★ Conseil Direct Officiel :'}
            </p>
            <p>
              {currentLang === 'es'
                ? `Al hacer clic abajo se abrirá el borrador con tus preferencias en WhatsApp directo a la agencia (${AGENCY_CONFIG.phone}) o en tu cliente de correo.`
                : `En cliquant ci-dessous, un projet de message WhatsApp sera préparé pour notre agence (${AGENCY_CONFIG.phone}) ou dans votre messagerie.`}
            </p>
          </div>
        </div>

        {/* Acciones de envío */}
        <div className="p-4 sm:p-6 bg-[#f2ede2] border-t border-[#d3cbbe] flex flex-col sm:flex-row gap-3">
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded bg-gradient-to-r from-[#BE5103] to-[#B7410E] hover:from-[#c95a09] hover:to-[#c64913] text-white font-semibold text-xs uppercase tracking-wider shadow cursor-pointer text-center"
          >
            <Send className="w-4 h-4 text-[#FFCE1B]" />
            <span>{currentLang === 'es' ? 'Enviar borrador por WhatsApp' : 'Ouvrir brouillon sur WhatsApp'}</span>
          </a>

          <a
            href={generateMailtoUrl()}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded bg-white hover:bg-[#faf7f0] border border-[#d3cbbe] text-[#18181a] font-mono-meta text-xs uppercase tracking-wider cursor-pointer text-center"
          >
            <Mail className="w-4 h-4 text-[#069494]" />
            <span>{currentLang === 'es' ? 'Enviar por Correo' : 'Envoyer par E-mail'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

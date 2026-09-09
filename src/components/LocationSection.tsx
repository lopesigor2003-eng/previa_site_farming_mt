import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/drones';
import { MapPin, Navigation, Phone, Clock, ExternalLink, Copy, Check, ShieldCheck, Compass } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Google Maps embed URL using coordinates and query
  const embedMapUrl = `https://www.google.com/maps?q=${COMPANY_INFO.coordinates.lat},${COMPANY_INFO.coordinates.lng}&hl=pt-BR&z=15&output=embed`;

  return (
    <section id="location-section" className="py-20 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              <MapPin className="w-4 h-4" />
              Sede Operacional em Mato Grosso
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Visite Nossa Loja e Oficina em Sorriso
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Localizada estrategicamente no polo do agronegócio nacional na Rodovia BR-163 / Av. Idemar Riedi, com showroom climatizado de drones, simulador de voo e oficina de assistência técnica.
            </p>
          </div>

          <a
            id="open-google-maps-btn"
            href={COMPANY_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95 self-start md:self-auto"
          >
            <Navigation className="w-4 h-4 text-neutral-950" />
            <span>Abrir no Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-950" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Google Map Embed Container */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl relative min-h-[380px] sm:min-h-[440px] flex flex-col">
            <iframe
              title="Farming Solutions Mato Grosso - Google Maps"
              src={embedMapUrl}
              className="w-full h-full min-h-[380px] border-0 flex-1 filter invert-[0.88] hue-rotate-[180deg] contrast-[1.1] grayscale-[0.3]"
              loading="lazy"
              allowFullScreen
            />

            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 z-10 bg-neutral-950/90 backdrop-blur-md border border-neutral-800 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div>
                <div className="text-xs font-bold text-white leading-none">Farming Solutions MT</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Av. Idemar Riedi, 9422 • Sorriso - MT</div>
              </div>
            </div>

            {/* Directions link button pinned at bottom right */}
            <div className="absolute bottom-4 right-4 z-10">
              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Traçar Rota GPS</span>
              </a>
            </div>
          </div>

          {/* Details & Visiting Information Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-neutral-900/60 border border-neutral-800/80 p-6 sm:p-8 rounded-3xl backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                Ponto de Apoio Oficial
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Farming Solutions Mato Grosso
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Venha tomar um café conosco, conhecer de perto o DJI Agras T50 e testar o simulador de controle remoto oficial com nossa equipe de agrônomos e pilotos credenciados.
              </p>

              {/* Address Card */}
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 mb-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-neutral-400 uppercase">Endereço Completo:</div>
                      <div className="text-sm font-bold text-white mt-0.5 leading-snug">
                        {COMPANY_INFO.address}
                      </div>
                      <div className="text-xs text-emerald-400 mt-1">
                        Setor Industrial / Leste • Sorriso - MT
                      </div>
                    </div>
                  </div>

                  <button
                    id="copy-address-btn"
                    onClick={handleCopyAddress}
                    className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer shrink-0"
                    title="Copiar endereço"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Contact & Hours Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase mb-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    Telefone / Whats
                  </div>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <div className="text-[11px] text-emerald-400 mt-0.5">Atendimento Direto</div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Horário
                  </div>
                  <div className="text-xs font-bold text-white">Segunda a Sexta</div>
                  <div className="text-[11px] text-neutral-400">{COMPANY_INFO.hours.weekdays}</div>
                  <div className="text-[10px] text-amber-300 mt-1">Sáb: {COMPANY_INFO.hours.saturday}</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-3">
              <a
                id="location-whatsapp-btn"
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold transition-all text-center"
              >
                Falar pelo WhatsApp
              </a>

              <a
                id="location-maps-direct-btn"
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <span>Ver no Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

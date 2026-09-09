import React from 'react';
import { COMPANY_INFO } from '../data/drones';
import { Plane, MapPin, Phone, MessageSquare, ExternalLink, ShieldCheck, Compass, ArrowUp } from 'lucide-react';

interface FooterProps {
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs">
      {/* Top Pre-Footer Call to Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-neutral-900">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-neutral-950 border border-emerald-500/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-bold">
              Pronto Para Elevar o Rendimento da Sua Safra?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Fale com Nossos Especialistas de Sorriso-MT
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm mt-2">
              Condições exclusivas de safra, pronta entrega de drones DJI Agras T50 e suporte técnico presente na sua lavoura.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              id="footer-whatsapp-cta"
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-neutral-950" />
              <span>Chamar no WhatsApp</span>
            </a>

            <button
              onClick={onRequestQuote}
              className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs border border-neutral-700 transition-all cursor-pointer"
            >
              Solicitar Orçamento Formal
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Branding & Location */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-neutral-950 font-black shadow-lg">
                <Plane className="w-5 h-5 text-neutral-950" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white">
                  FARMING SOLUTIONS
                </span>
                <span className="ml-1.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                  MATO GROSSO
                </span>
                <p className="text-[11px] text-neutral-400">
                  Drones Agrícolas, Peças e Assistência Técnica
                </p>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Concessionária e centro técnico de drones para o agronegócio de Mato Grosso. Venda de aeronaves, peças de reposição a pronta entrega, pulverização e capacitação de pilotos.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-neutral-300">{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={COMPANY_INFO.whatsappUrl} className="text-neutral-300 hover:text-emerald-400 transition-colors">
                  {COMPANY_INFO.phone} (Comercial / WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Ver ficha oficial no Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Modelos & Equipamentos */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Modelos de Drones
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#drone-catalog" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  DJI Agras T50 (40L/50Kg)
                </a>
              </li>
              <li>
                <a href="#drone-catalog" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  DJI Agras T25 (20L/25Kg)
                </a>
              </li>
              <li>
                <a href="#drone-catalog" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  DJI Matrice 350 RTK
                </a>
              </li>
              <li>
                <a href="#drone-catalog" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  DJI Mavic 3 Multispectral
                </a>
              </li>
              <li>
                <a href="#drone-catalog" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Gerador e Baterias Ultrarrápidas
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Serviços & Oficina */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Estrutura em Sorriso
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#services-section" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Oficina Autorizada DJI
                </a>
              </li>
              <li>
                <a href="#services-section" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Peças Originais em Estoque
                </a>
              </li>
              <li>
                <a href="#services-section" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Curso de Piloto CAAR (MAPA)
                </a>
              </li>
              <li>
                <a href="#services-section" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Financiamento e Plano Safra
                </a>
              </li>
              <li>
                <a href="#services-section" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Seguro Agrícola RETA
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Horários & Certificações */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Atendimento Sorriso-MT
            </h4>
            <div className="space-y-2 text-neutral-400">
              <p className="text-neutral-300 font-medium">Segunda a Sexta:</p>
              <p>{COMPANY_INFO.hours.weekdays}</p>
              <p className="text-neutral-300 font-medium mt-2">Sábado:</p>
              <p>{COMPANY_INFO.hours.saturday}</p>
              <div className="mt-4 p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-amber-300">
                🌱 {COMPANY_INFO.hours.harvestSupport}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="text-neutral-500">
            © {new Date().getFullYear()} Farming Solutions Mato Grosso. Todos os direitos reservados. Sorriso - MT.
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Homologação ANAC / MAPA / DECEA
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

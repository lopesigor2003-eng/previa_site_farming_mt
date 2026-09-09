import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO, DRONE_CATALOG } from '../data/drones';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, MapPin, Building, Phone, User } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDrone?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultDrone,
}) => {
  const [name, setName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [city, setCity] = useState('Sorriso - MT');
  const [phone, setPhone] = useState('');
  const [droneInterest, setDroneInterest] = useState(defaultDrone || 'DJI Agras T50');
  const [hectares, setHectares] = useState('1500');
  const [interestType, setInterestType] = useState<'compra' | 'servico' | 'pecas'>('compra');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#ffffff']
      });
    } catch {
      // ignore
    }
  };

  const getWhatsAppProposalUrl = () => {
    const text = `Olá Farming Solutions MT! Gostaria de uma cotação oficial:\n- Nome: ${name}\n- Propriedade: ${farmName}\n- Cidade/Região: ${city}\n- Interesse: ${interestType === 'compra' ? 'Aquisição de Drone' : interestType === 'servico' ? 'Serviço de Pulverização' : 'Peças e Assistência'}\n- Modelo: ${droneInterest}\n- Área: ${hectares} hectares\n- Contato: ${phone}`;
    return `https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          id="close-quote-modal"
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              Proposta Comercial Exclusiva
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Solicitar Cotação para Safra
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 mb-6">
              Farming Solutions Sorriso-MT • Condições com Plano Safra, CPR ou pronta entrega.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type of interest */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Finalidade da Solicitação:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setInterestType('compra')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      interestType === 'compra'
                        ? 'bg-emerald-500 text-neutral-950 font-bold'
                        : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    Comprar Drone
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterestType('servico')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      interestType === 'servico'
                        ? 'bg-emerald-500 text-neutral-950 font-bold'
                        : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    Contratar Serviço
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterestType('pecas')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      interestType === 'pecas'
                        ? 'bg-emerald-500 text-neutral-950 font-bold'
                        : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    Peças / Revisão
                  </button>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Seu Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      placeholder="Ex: João da Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    WhatsApp com DDD *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="tel"
                      placeholder="(66) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Farm Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Fazenda / Grupo Agro
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ex: Fazenda Santa Maria"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Município / Região em MT
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ex: Sorriso, Lucas, Sinop, Mutum"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Model and Hectares */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Modelo de Drone
                  </label>
                  <select
                    value={droneInterest}
                    onChange={(e) => setDroneInterest(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    {DRONE_CATALOG.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.category === 'pulverizacao' ? 'Pulverizador' : 'Mapeamento'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Área Total da Lavoura (Hectares)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 1200"
                    value={hectares}
                    onChange={(e) => setHectares(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  >
                  </input>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-neutral-950" />
                  <span>Gerar Proposta e Encaminhar no WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Atendimento oficial Farming Solutions Sorriso-MT • Resposta em até 15 min</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Solicitação Recebida com Sucesso!
            </h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6">
              Obrigado, <strong>{name}</strong>! Preparamos os dados da sua cotação para o <strong>{droneInterest}</strong> para sua área em <strong>{city}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-left max-w-md mx-auto text-xs space-y-1.5 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-400">Cliente:</span>
                <span className="text-white font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Propriedade:</span>
                <span className="text-white font-medium">{farmName || 'Não especificada'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Modelo Selecionado:</span>
                <span className="text-emerald-400 font-bold">{droneInterest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Área Informada:</span>
                <span className="text-white font-medium">{hectares} ha</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                id="modal-send-whatsapp"
                href={getWhatsAppProposalUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4 text-neutral-950" />
                <span>Abrir Conversa no WhatsApp Agora</span>
              </a>

              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-all cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

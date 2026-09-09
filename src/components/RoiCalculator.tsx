import React, { useState, useMemo } from 'react';
import { COMPANY_INFO } from '../data/drones';
import { Calculator, TrendingUp, Droplets, Fuel, Sparkles, Send, Check } from 'lucide-react';

interface RoiCalculatorProps {
  onRequestQuote: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onRequestQuote }) => {
  const [hectares, setHectares] = useState<number>(1200);
  const [crop, setCrop] = useState<'soja' | 'milho' | 'algodao' | 'pastagem'>('soja');
  const [applications, setApplications] = useState<number>(6);
  const [tractorCostPerHa, setTractorCostPerHa] = useState<number>(45); // R$ por hectare em operação convencional

  // Agronomic calculations based on Mato Grosso field research
  const results = useMemo(() => {
    // 1. Redução de amassamento da lavoura (Tratores autopropelidos esmagam de 3% a 5% da safra)
    // Rendimento médio Soja em MT: ~65 sacas/ha. Valor saca: ~R$ 130
    // Rendimento médio Milho em MT: ~120 sacas/ha. Valor saca: ~R$ 55
    // Algodão: ~300 arrobas/ha
    let sacaValue = 130;
    let yieldPerHa = 65;
    if (crop === 'milho') {
      sacaValue = 55;
      yieldPerHa = 120;
    } else if (crop === 'algodao') {
      sacaValue = 160;
      yieldPerHa = 80;
    } else if (crop === 'pastagem') {
      sacaValue = 40;
      yieldPerHa = 30;
    }

    const crushRate = 0.035; // 3.5% de perda média por amassamento de pneus
    const crushedHectaresAvoided = hectares * crushRate;
    const crushSavingsReais = crushedHectaresAvoided * yieldPerHa * sacaValue;

    // 2. Economia em Defensivos e Químicos (Redução média de 18% por bicos centrífugos e precisão localizada)
    const chemicalCostPerHa = 320; // R$ médio em químicos por aplicação por hectare
    const chemicalSavingsReais = hectares * applications * (chemicalCostPerHa * 0.18);

    // 3. Economia de Água (Volume de calda trator: ~120 L/ha vs Drone: ~12 L/ha -> economia de 108 L/ha por passada)
    const waterSavedLiters = hectares * applications * 108;

    // 4. Economia de Combustível Diesel (Trator consome ~1.8L diesel/ha vs Drone elétrico gerador ~0.35L/ha)
    const dieselPrice = 6.20;
    const dieselLitersSaved = hectares * applications * 1.45;
    const fuelSavedReais = dieselLitersSaved * dieselPrice;

    // Total Anual
    const totalAnnualSavingsReais = crushSavingsReais + chemicalSavingsReais + fuelSavedReais;

    // Estimativa de Payback para um kit completo DJI Agras T50 (~R$ 240.000)
    const droneKitInvestment = 240000;
    const paybackMonths = Math.max(1.8, Number(((droneKitInvestment / totalAnnualSavingsReais) * 12).toFixed(1)));

    return {
      crushedHectaresAvoided: Math.round(crushedHectaresAvoided),
      crushSavingsReais: Math.round(crushSavingsReais),
      chemicalSavingsReais: Math.round(chemicalSavingsReais),
      waterSavedLiters: Math.round(waterSavedLiters),
      fuelSavedReais: Math.round(fuelSavedReais),
      totalAnnualSavingsReais: Math.round(totalAnnualSavingsReais),
      paybackMonths,
    };
  }, [hectares, crop, applications, tractorCostPerHa]);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const getWhatsAppMessage = () => {
    const text = `Olá Farming Solutions MT! Fiz a simulação de ROI para minha propriedade em MT:\n- Área: ${hectares} ha (${crop})\n- Aplicações: ${applications}/ano\n- Economia calculada: ${formatBRL(results.totalAnnualSavingsReais)}/ano\n- Amassamento evitado: ${results.crushedHectaresAvoided} ha\nGostaria de uma proposta para aquisição de drone agrícola!`;
    return `https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="roi-calculator" className="py-20 bg-neutral-900/60 border-t border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            <Calculator className="w-4 h-4" />
            Simulador de Viabilidade Econômica
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Quanto Você Economiza Voando com a Farming Solutions?
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            O fim do amassamento da lavoura, menor consumo de água e defensivos aplicados exatamente onde a planta precisa. Simule os números da sua fazenda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-neutral-800 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Parâmetros da Sua Propriedade
            </h3>

            {/* Hectares Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="roi-hectares-range" className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Área Plantada Total:
                </label>
                <span className="text-lg font-extrabold text-emerald-400 font-mono">
                  {hectares.toLocaleString('pt-BR')} ha
                </span>
              </div>
              <input
                id="roi-hectares-range"
                type="range"
                min="100"
                max="10000"
                step="50"
                value={hectares}
                onChange={(e) => setHectares(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1 font-mono">
                <span>100 ha</span>
                <span>5.000 ha</span>
                <span>10.000 ha</span>
              </div>
            </div>

            {/* Crop Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Cultura Principal:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['soja', 'milho', 'algodao', 'pastagem'] as const).map((c) => (
                  <button
                    key={c}
                    id={`crop-select-${c}`}
                    type="button"
                    onClick={() => setCrop(c)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                      crop === c
                        ? 'bg-emerald-500 text-neutral-950 shadow-md font-bold'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Applications per Season Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="roi-applications-range" className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Aplicações por Safra:
                </label>
                <span className="text-base font-extrabold text-amber-400 font-mono">
                  {applications} passadas/ano
                </span>
              </div>
              <input
                id="roi-applications-range"
                type="range"
                min="1"
                max="14"
                step="1"
                value={applications}
                onChange={(e) => setApplications(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Context note */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Amassamento:</strong> Tratores terrestres destroem em média 3,5% da sua área útil ao longo das pulverizações. Com o drone DJI Agras, essa área volta a render 100% de grãos.
              </span>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Big Total Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/90 via-neutral-900 to-neutral-950 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Economia Anual Estimada
              </div>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {formatBRL(results.totalAnnualSavingsReais)}
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Estimativa conservadora para safra em Mato Grosso
              </div>

              {/* Payback Metric */}
              <div className="mt-6 pt-6 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-400">Tempo de Retorno (Payback)</div>
                  <div className="text-xl font-bold text-amber-300">
                    Apenas {results.paybackMonths} meses
                  </div>
                </div>

                <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30">
                  Alta Rentabilidade
                </span>
              </div>
            </div>

            {/* Detailed Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Sem Amassamento
                </div>
                <div className="text-lg font-bold text-white">
                  +{results.crushedHectaresAvoided} ha
                </div>
                <div className="text-[11px] text-emerald-400">
                  {formatBRL(results.crushSavingsReais)} colhidos a mais
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  Água Economizada
                </div>
                <div className="text-lg font-bold text-white">
                  {(results.waterSavedLiters / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} mil L
                </div>
                <div className="text-[11px] text-cyan-300">
                  90% menos caminhões pipa
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                  <Fuel className="w-3.5 h-3.5 text-amber-400" />
                  Diesel Poupado
                </div>
                <div className="text-lg font-bold text-white">
                  {formatBRL(results.fuelSavedReais)}
                </div>
                <div className="text-[11px] text-amber-400">
                  Em abastecimento
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <a
                id="export-calc-whatsapp"
                href={getWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[240px] px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <Send className="w-4 h-4 text-neutral-950" />
                <span>Enviar Simulação no WhatsApp</span>
              </a>

              <button
                id="quote-from-calc-btn"
                onClick={onRequestQuote}
                className="px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-semibold text-sm transition-all cursor-pointer"
              >
                Solicitar Estudo Agronômico
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

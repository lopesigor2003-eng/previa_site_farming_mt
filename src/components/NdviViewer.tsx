import React, { useState } from 'react';
import { Layers, Eye, Activity, AlertTriangle, CheckCircle, Info, Sparkles } from 'lucide-react';

export const NdviViewer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'ndvi' | 'rgb' | 'prescription'>('ndvi');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [selectedInspectionPoint, setSelectedInspectionPoint] = useState<number | null>(0);

  const inspectionPoints = [
    {
      id: 0,
      x: 35,
      y: 42,
      label: 'Zona A - Reboleira de Nematoides',
      ndviScore: '0.31 (Alerta Vermelho)',
      status: 'critical',
      recommendation: 'Aplicação localizada de nematicida biológico com taxa variável de 3.5 L/ha pelo DJI Agras.',
      impact: 'Economia de 82% em defensivo ao tratar apenas a mancha em vez do talhão inteiro.'
    },
    {
      id: 1,
      x: 72,
      y: 30,
      label: 'Zona B - Vigor Máximo (NDVI Ótimo)',
      ndviScore: '0.89 (Excelente)',
      status: 'optimal',
      recommendation: 'Dossel completamente fechado, sem estresse hídrico. Manter adubação padrão.',
      impact: 'Produtividade estimada acima de 72 sc/ha.'
    },
    {
      id: 2,
      x: 58,
      y: 68,
      label: 'Zona C - Deficiência Foliar (Boro/Zinco)',
      ndviScore: '0.58 (Moderado)',
      status: 'warning',
      recommendation: 'Pulverização foliar de micronutrientes com gotas de 150 micrômetros para rápida absorção.',
      impact: 'Recuperação estimada em 5 a 7 dias após voo.'
    }
  ];

  return (
    <section id="ndvi-section" className="py-20 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              <Layers className="w-4 h-4" />
              Agronomia de Precisão & Sensoriamento Remoto
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Mapeamento Multiespectral em Sorriso-MT
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Com o drone multiespectral (Mavic 3M), a Farming Solutions identifica problemas na lavoura até 14 dias antes de surgirem a olho nu, gerando mapas de prescrição que alimentam diretamente o DJI Agras T50.
            </p>
          </div>

          {/* Layer Selector */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900 border border-neutral-800 rounded-2xl self-start lg:self-auto">
            <button
              id="layer-ndvi-btn"
              onClick={() => setActiveLayer('ndvi')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeLayer === 'ndvi'
                  ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Mapa NDVI (Vigor)
            </button>
            <button
              id="layer-rgb-btn"
              onClick={() => setActiveLayer('rgb')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeLayer === 'rgb'
                  ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Foto Real (RGB)
            </button>
            <button
              id="layer-prescription-btn"
              onClick={() => setActiveLayer('prescription')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeLayer === 'prescription'
                  ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Taxa Variável (Prescrição)
            </button>
          </div>
        </div>

        {/* Interactive Viewer Canvas Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visualizer */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 relative shadow-2xl group select-none min-h-[420px] sm:min-h-[500px]">
            {/* Simulated Satellite / Drone Sensor Imagery */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 bg-cover bg-center ${
                activeLayer === 'rgb' ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(34, 197, 94, 0.1) 0%, rgba(10, 20, 15, 0.9) 100%), linear-gradient(135deg, #1e3a1e 0%, #152718 100%)`,
              }}
            >
              {/* Field rows simulation */}
              <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            {/* NDVI False Color Layer */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                activeLayer === 'ndvi' ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background: 'linear-gradient(135deg, #052e16 0%, #14532d 40%, #854d0e 70%, #7f1d1d 100%)',
              }}
            >
              {/* Thermal / spectral stress textures */}
              <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-red-600/70 blur-2xl animate-pulse" />
              <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-emerald-500/80 blur-3xl" />
              <div className="absolute bottom-1/4 left-1/2 w-48 h-48 rounded-full bg-amber-500/70 blur-2xl" />
            </div>

            {/* Prescription Variable Rate Layer */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                activeLayer === 'prescription' ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #0c4a6e 100%)',
              }}
            >
              {/* Prescription grid zones */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-30 border border-cyan-500/40 divide-x divide-y divide-cyan-500/30 font-mono text-[10px] text-cyan-300 p-2">
                <div>Z1: 15L/ha</div>
                <div>Z1: 15L/ha</div>
                <div className="bg-amber-500/40 text-amber-200 font-bold">Z2: 24L/ha</div>
                <div className="bg-red-500/50 text-red-100 font-bold">Z3: 35L/ha</div>
                <div>Z1: 15L/ha</div>
                <div>Z1: 15L/ha</div>
              </div>
            </div>

            {/* Drone Flight Path & Guidance Vectors */}
            <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-300 bg-neutral-950/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-neutral-800 w-fit">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Activity className="w-3.5 h-3.5" />
                  Talhão 04 - Fazenda Modelo (Sorriso - MT)
                </span>
                <span className="mx-2 text-neutral-600">|</span>
                <span>Área: 450 ha</span>
                <span className="mx-2 text-neutral-600">|</span>
                <span>Altitude Voo: 80m</span>
              </div>

              {/* NDVI Color Scale Legend */}
              <div className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800 p-3 rounded-2xl max-w-sm self-start">
                <div className="text-[10px] font-bold text-neutral-300 uppercase mb-1.5 flex justify-between">
                  <span>Índice NDVI (Saúde Vegetal)</span>
                  <span className="text-emerald-400">0.0 a 1.0</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500" />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>Solo / Doente (&lt;0.3)</span>
                  <span>Estresse (0.5)</span>
                  <span>Vigor Alto (&gt;0.8)</span>
                </div>
              </div>
            </div>

            {/* Interactive Inspection Marker Hotspots */}
            {inspectionPoints.map((point) => {
              const isSelected = selectedInspectionPoint === point.id;
              return (
                <button
                  key={point.id}
                  id={`ndvi-point-${point.id}`}
                  onClick={() => setSelectedInspectionPoint(point.id)}
                  style={{ top: `${point.y}%`, left: `${point.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-transform hover:scale-125 z-20 ${
                    isSelected ? 'scale-125 ring-4 ring-white/60' : ''
                  } ${
                    point.status === 'critical'
                      ? 'bg-red-500 text-white'
                      : point.status === 'warning'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-emerald-500 text-neutral-950'
                  }`}
                  title={point.label}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Inspection Point Telemetry & Agronomic Diagnosis */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                Diagnóstico de Campo em Tempo Real
              </div>

              {selectedInspectionPoint !== null && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {inspectionPoints[selectedInspectionPoint].label}
                    </h4>
                    <div className="text-xs font-mono font-bold mt-1 text-emerald-300">
                      Índice Espectral: {inspectionPoints[selectedInspectionPoint].ndviScore}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 text-xs">
                    <div className="font-semibold text-neutral-200 mb-1">Prescrição Agronômica:</div>
                    <p className="text-neutral-300 leading-relaxed">
                      {inspectionPoints[selectedInspectionPoint].recommendation}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-xs">
                    <div className="font-semibold text-emerald-300 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      Impacto Econômico no MT:
                    </div>
                    <p className="text-emerald-200 leading-relaxed">
                      {inspectionPoints[selectedInspectionPoint].impact}
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Select Buttons */}
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <div className="text-[11px] text-neutral-400 uppercase font-semibold mb-2">
                  Zonas Selecionáveis do Talhão:
                </div>
                <div className="flex flex-col gap-2">
                  {inspectionPoints.map((pt) => (
                    <button
                      key={pt.id}
                      onClick={() => setSelectedInspectionPoint(pt.id)}
                      className={`text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedInspectionPoint === pt.id
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                          : 'bg-neutral-950/60 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                      }`}
                    >
                      <span>{pt.label}</span>
                      <span className="text-[10px] font-mono text-neutral-400">Ver ponto</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { DRONE_CATALOG } from '../data/drones';
import { DroneModel } from '../types';
import { Sparkles, Shield, Cpu, Gauge, Droplet, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface DroneCatalogProps {
  onSelectDroneFor3D?: (droneId: string) => void;
  onRequestQuoteWithDrone?: (droneName: string) => void;
}

export const DroneCatalog: React.FC<DroneCatalogProps> = ({
  onSelectDroneFor3D,
  onRequestQuoteWithDrone,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pulverizacao' | 'mapeamento'>('all');
  const [selectedDrone, setSelectedDrone] = useState<DroneModel>(DRONE_CATALOG[0]);

  const filteredDrones = DRONE_CATALOG.filter((drone) => {
    if (activeCategory === 'all') return true;
    return drone.category === activeCategory;
  });

  return (
    <section id="drone-catalog" className="py-20 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              <Cpu className="w-3.5 h-3.5" />
              Linha Oficial DJI Agras & Enterprise
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Frota Líder na Lavouras de Mato Grosso
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Equipamentos homologados com garantia oficial, peças originais a pronta entrega na loja de Sorriso e suporte técnico durante toda a safra.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900 border border-neutral-800 rounded-2xl self-start md:self-auto">
            <button
              id="filter-all-drones"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Todos os Modelos
            </button>
            <button
              id="filter-spray-drones"
              onClick={() => setActiveCategory('pulverizacao')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'pulverizacao'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Pulverização & Dispersão
            </button>
            <button
              id="filter-map-drones"
              onClick={() => setActiveCategory('mapeamento')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'mapeamento'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Mapeamento & NDVI
            </button>
          </div>
        </div>

        {/* Drones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDrones.map((drone) => {
            const isHighlight = drone.id === 'agras-t50';
            return (
              <div
                key={drone.id}
                className={`relative rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  isHighlight
                    ? 'bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border-emerald-500/50 shadow-2xl shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                    : 'bg-neutral-900/70 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                {/* Badge */}
                {isHighlight && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-emerald-500 text-neutral-950 font-extrabold text-[11px] rounded-full uppercase tracking-wider shadow-md">
                    Mais Utilizado no Cerrado
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                    <Droplet className="w-3.5 h-3.5" />
                    {drone.category === 'pulverizacao' ? 'Pulverizador & Sólidos' : 'Agrimensura & Saúde Vegetal'}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{drone.name}</h3>
                  <p className="text-sm font-medium text-emerald-300 mb-4">{drone.tagline}</p>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {drone.description}
                  </p>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 mb-6">
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase font-mono">Carga / Capacidade</div>
                      <div className="text-sm font-bold text-white mt-0.5">{drone.payloadCapacity}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase font-mono">Rendimento</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5">{drone.coverageRate}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase font-mono">Recarga Ultrarrápida</div>
                      <div className="text-sm font-bold text-amber-400 mt-0.5">{drone.batteryChargeTime.split(' ')[0]} {drone.batteryChargeTime.split(' ')[1]}</div>
                    </div>
                  </div>

                  {/* Key Tech Specs Chips */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Destaques de Aplicação:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {drone.popularFor.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-neutral-800/80 text-neutral-200 border border-neutral-700/60"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 sm:p-8 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800/50 mt-auto">
                  <button
                    id={`view-3d-${drone.id}`}
                    onClick={() => {
                      const heroElem = document.getElementById('hero-3d-section');
                      if (heroElem) heroElem.scrollIntoView({ behavior: 'smooth' });
                      if (onSelectDroneFor3D) onSelectDroneFor3D(drone.id);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-emerald-400 transition-colors py-2 cursor-pointer"
                  >
                    <span>Ver no Simulador 3D</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    id={`quote-drone-${drone.id}`}
                    onClick={() => {
                      if (onRequestQuoteWithDrone) onRequestQuoteWithDrone(drone.name);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
                  >
                    Cotar {drone.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

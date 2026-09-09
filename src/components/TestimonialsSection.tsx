import React from 'react';
import { Star, Quote, CheckCircle, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Carlos Eduardo Meneghetti',
      role: 'Produtor Rural e Gestor Agrícola',
      location: 'Sorriso - MT (Fazenda Três Barras)',
      area: '3.800 ha Soja/Milho',
      text: 'Migramos 60% das aplicações de dessecação e fungicida para dois DJI Agras T50 adquiridos na Farming Solutions. O fim do amassamento de trator nos rendeu mais de 1.400 sacas colhidas no final da safra. O pós-venda em Sorriso é exemplar.',
      rating: 5,
      drone: '2x DJI Agras T50'
    },
    {
      name: 'Dr. Rafael B. Siqueira',
      role: 'Engenheiro Agrônomo e Consultor',
      location: 'Lucas do Rio Verde - MT',
      area: 'Consultoria para 12.000 ha',
      text: 'O mapeamento multiespectral com o Mavic 3M e a precisão do T50 transformaram o controle de lagartas e reboleiras de nematoides na região. A assistência técnica da Farming Solutions nos atendeu num sábado à noite durante o pico da safra.',
      rating: 5,
      drone: 'DJI Mavic 3M + Agras T25'
    },
    {
      name: 'Marcos Vinícius Zanatta',
      role: 'Diretor de Operações Agrícolas',
      location: 'Nova Mutum / Sinop - MT',
      area: '5.200 ha Algodão e Soja',
      text: 'Excelente estrutura de oficina na Av. Idemar Riedi. Peças de reposição que você não encontra em lugar nenhum no estado eles têm na prateleira. Os treinamentos dos nossos operadores foram fundamentais para evitar erros de pilotagem.',
      rating: 5,
      drone: 'Frota de 3x DJI Agras T50'
    }
  ];

  return (
    <section className="py-20 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            Quem Voa com a Gente no Mato Grosso
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Resultados Comprovados no Campo
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Mais de 350.000 hectares já sobrevoados por clientes e parceiros da Farming Solutions em todo o Médio-Norte e Vale do Teles Pires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col justify-between backdrop-blur-sm relative group hover:border-emerald-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                    {rev.drone}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <div className="font-bold text-white text-sm">{rev.name}</div>
                <div className="text-xs text-emerald-400">{rev.role}</div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1">
                  <MapPin className="w-3 h-3 text-neutral-500" />
                  <span>{rev.location}</span>
                  <span className="mx-1">•</span>
                  <span>{rev.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

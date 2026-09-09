import React from 'react';
import { Wrench, ShieldCheck, GraduationCap, Coins, PlaneTakeoff, HeartHandshake, CheckCircle } from 'lucide-react';

interface ServicesSectionProps {
  onRequestQuote: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onRequestQuote }) => {
  const services = [
    {
      icon: Wrench,
      title: 'Oficina & Assistência Técnica em Sorriso',
      badge: 'Plantão Safra 24h',
      description: 'Oficina especializada em Sorriso-MT com bancada de testes eletrônicos, calibragem de radares e técnicos certificados pela DJI para revisões preventivas e reparos expressos.',
      highlights: [
        'Socorro técnico em campo na fazenda',
        'Drone reserva disponível em caso de reparo crítico',
        'Diagnóstico por telemetria e firmware oficial'
      ]
    },
    {
      icon: ShieldCheck,
      title: 'Peças de Reposição Originais em Estoque',
      badge: 'Pronta Entrega em MT',
      description: 'Maior estoque de peças DJI Agras do Norte do MT: hélices de fibra de carbono, motores brushless, bombas centrífugas, radares esféricos e carregadores ultrarrápidos.',
      highlights: [
        'Sem espera por importação na hora da safra',
        'Garantia oficial e procedência homologada',
        'Envio imediato para todo o estado de MT'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Treinamento & Certificação de Pilotos',
      badge: 'Homologado ANAC & MAPA',
      description: 'Curso completo teórico e prático em Sorriso para capacitar operadores da sua fazenda. Do planejamento de rotas RTK à manutenção básica e boas práticas agronômicas.',
      highlights: [
        'Certificação de Aplicador Aeroagrícola Remoto (CAAR)',
        'Instrução de voo com simulador e em lavoura real',
        'Procedimentos de segurança e regulamentação DECEA'
      ]
    },
    {
      icon: Coins,
      title: 'Financiamento Agrícola & Linhas de Crédito',
      badge: 'Plano Safra & CPR',
      description: 'Facilidade total na aquisição: aceitamos Plano Safra (Pronaf, Pronamp, Moderfrota), CPR Financeira, Barter em grãos e parcelamento customizado para produtores rurais.',
      highlights: [
        'Aprovação rápida com bancos parceiros do agro',
        'Opções de consórcio contemplado para drones',
        'Isenção tributária conforme convênios do agronegócio'
      ]
    },
    {
      icon: PlaneTakeoff,
      title: 'Serviço Terceirizado de Pulverização e Mapeamento',
      badge: 'Operação Completa',
      description: 'Não quer comprar o drone agora? Nossa equipe de pilotos experientes vai até a sua propriedade com caminhonete equipada, gerador e piloto habilitado para realizar o serviço.',
      highlights: [
        'Cobrança por hectare pulverizado',
        'Relatório digital de cobertura e laudo pós-aplicação',
        'Economia imediata sem imobilização de capital'
      ]
    },
    {
      icon: HeartHandshake,
      title: 'Seguro Agrícola & Pós-Venda Dedicado',
      badge: 'Tranquilidade Total',
      description: 'Proteja seu investimento contra quedas acidentais, danos elétricos e intempéries climáticas com apólices sob medida para drones de grande porte.',
      highlights: [
        'Cobertura total de casco e responsabilidade civil (RETA)',
        'Consultoria agronômica contínua durante todo o ciclo',
        'Suporte via grupo exclusivo de WhatsApp'
      ]
    }
  ];

  return (
    <section id="services-section" className="py-20 bg-neutral-900/40 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            <Wrench className="w-4 h-4" />
            Estrutura Completa em Sorriso - MT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tudo o Que Seu Drone Precisa Para Não Parar na Safra
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Na época do plantio ou da dessecação, um dia parado custa caro. A Farming Solutions garante atendimento imediato no coração do Mato Grosso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-neutral-950/80 border border-neutral-800/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-emerald-950/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-emerald-300">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-neutral-900">
                    {srv.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4">
                  <button
                    onClick={onRequestQuote}
                    className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-emerald-500 hover:text-neutral-950 text-neutral-300 text-xs font-semibold transition-all border border-neutral-800 cursor-pointer"
                  >
                    Consultar Disponibilidade
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

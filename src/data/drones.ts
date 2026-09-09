import { DroneModel, DroneHotspot } from '../types';

export const DRONE_CATALOG: DroneModel[] = [
  {
    id: 'agras-t50',
    name: 'DJI Agras T50',
    category: 'pulverizacao',
    tagline: 'A máxima potência em pulverização e dispersão para o cerrado',
    description: 'Equipado com sistema de rotor duplo coaxial, o T50 carrega até 40kg para pulverização e 50kg para dispersão de sólidos, cobrindo até 21 hectares por hora com bicos atomizadores duplos centrífugos.',
    imageFallback: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
    payloadCapacity: '40 L líquido / 50 kg sólidos',
    coverageRate: 'Até 21 ha/hora',
    sprayWidth: 'Até 11 metros',
    batteryChargeTime: '9 a 11 min (Carregador D12000iE)',
    radarType: 'Radar de matriz em fase ativa frontal e traseira 360°',
    transmissionRange: 'Até 2 km com sistema O3 Agras',
    popularFor: ['Grandes lavouras de Soja e Milho', 'Dispersão de adubo e sementes', 'Topografia plana e ondulada de MT'],
    keySpecs: [
      { label: 'Capacidade Líquida', value: '40', unit: 'Litros' },
      { label: 'Capacidade de Sólidos', value: '50', unit: 'Kg' },
      { label: 'Vazão de Pulverização', value: '16', unit: 'L/min (bico duplo)' },
      { label: 'Eficiência Operacional', value: '21', unit: 'ha/h' },
      { label: 'Velocidade Máxima', value: '10', unit: 'm/s operacional' },
      { label: 'Radar de Obstáculos', value: '360°', unit: 'Ativo' },
    ]
  },
  {
    id: 'agras-t25',
    name: 'DJI Agras T25',
    category: 'pulverizacao',
    tagline: 'Ágil, compacto e operável por uma única pessoa',
    description: 'Perfeito para operações flexíveis, áreas menores, dessecação precisa e áreas com relevo ou árvores. Tanque de 20L líquidos ou 25kg de sólidos com facilidade total de transporte em picape comum.',
    imageFallback: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
    payloadCapacity: '20 L líquido / 25 kg sólidos',
    coverageRate: 'Até 12 ha/hora',
    sprayWidth: '7 a 8 metros',
    batteryChargeTime: '9 a 10 min (Carregador C8000)',
    radarType: 'Radar de matriz em fase ativa frontal e traseira',
    transmissionRange: 'Até 2 km O3',
    popularFor: ['Médias e pequenas propriedades', 'Aplicações localizadas e manchas', 'Pomares e hortifrúti'],
    keySpecs: [
      { label: 'Capacidade Líquida', value: '20', unit: 'Litros' },
      { label: 'Capacidade de Sólidos', value: '25', unit: 'Kg' },
      { label: 'Vazão de Pulverização', value: '16', unit: 'L/min' },
      { label: 'Eficiência Operacional', value: '12', unit: 'ha/h' },
      { label: 'Peso sem Bateria', value: '25.4', unit: 'Kg' },
      { label: 'Design Dobrável', value: '100%', unit: 'Portátil' },
    ]
  },
  {
    id: 'matrice-350-rtk',
    name: 'DJI Matrice 350 RTK',
    category: 'mapeamento',
    tagline: 'Plataforma industrial para mapeamento topográfico e fiscalização',
    description: 'Autonomia de voo de até 55 minutos, classificação IP55 resistente a poeira e tempestades do Centro-Oeste, compatível com câmeras LiDAR, multiespectrais e zoom ótico de longo alcance.',
    imageFallback: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1000&q=80',
    payloadCapacity: '2.7 kg de sensores simultâneos',
    coverageRate: 'Até 200 ha/voo de mapeamento',
    sprayWidth: 'Não aplicável (Mapeamento)',
    batteryChargeTime: '30 min (Estação de baterias BS65)',
    radarType: 'Sensores de visão binocular de 6 direções + ToF',
    transmissionRange: 'Até 20 km (DJI O3 Enterprise)',
    popularFor: ['Levantamento altimétrico', 'Linhas de plantio e curvas de nível', 'Inspeção de pivôs centrais e cercas'],
    keySpecs: [
      { label: 'Tempo de Voo', value: '55', unit: 'Minutos' },
      { label: 'Grau de Proteção', value: 'IP55', unit: 'Chuva e Poeira' },
      { label: 'Alcance de Transmissão', value: '20', unit: 'km' },
      { label: 'Câmera FPV Noturna', value: 'Full HD', unit: 'Visão Noturna' },
      { label: 'Ciclos de Bateria', value: '400', unit: 'Ciclos TB65' },
      { label: 'Precisão RTK', value: 'Centimétrica', unit: '1cm + 1ppm' },
    ]
  },
  {
    id: 'mavic-3-multispectral',
    name: 'DJI Mavic 3 Enterprise Multispectral',
    category: 'mapeamento',
    tagline: 'A ferramenta essencial para laudos de NDVI e sanidade foliar',
    description: 'Combina sensor RGB de 20MP com 4 sensores multiespectrais de 5MP (Verde, Vermelho, Red Edge e Infravermelho Próximo). Detecção prematura de nematoides, pragas e falhas de adubação antes de serem visíveis a olho nu.',
    imageFallback: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=1000&q=80',
    payloadCapacity: 'Sensor integrado multiespectral 4 bandas',
    coverageRate: 'Até 200 ha em um único voo de 43 minutos',
    sprayWidth: 'Mapeamento espectral',
    batteryChargeTime: '45 min por bateria',
    radarType: 'Detecção de obstáculos omnidirecional',
    transmissionRange: 'Até 15 km O3 Enterprise',
    popularFor: ['Geração de mapas NDVI / NDRE', 'Prescrição de adubação em taxa variável', 'Contagem de estande de soja/milho'],
    keySpecs: [
      { label: 'Tempo Máximo de Voo', value: '43', unit: 'Minutos' },
      { label: 'Sensores Espectrais', value: '4 Bandas', unit: 'G/R/RE/NIR' },
      { label: 'Câmera RGB', value: '20', unit: 'Megapixels 4/3 CMOS' },
      { label: 'Módulo RTK', value: 'Integrado', unit: 'Centimétrico' },
      { label: 'Sensor de Luz Solar', value: 'Sim', unit: 'Calibração real' },
      { label: 'Peso de Decolagem', value: '951', unit: 'g' },
    ]
  }
];

export const DRONE_HOTSPOTS: DroneHotspot[] = [
  {
    id: 'tank',
    title: 'Tanque de Carga Químico/Sólido',
    subtitle: 'Capacidade de até 40 Litros / 50 Kg',
    description: 'Sistema de liberação rápida com sensor de pesagem em tempo real que monitora com precisão o volume residual de calda, evitando sobrevoos desnecessários e garantindo vazão constante.',
    position: [0, 0.4, 0],
    cameraPos: [0, 1.2, 2.2],
    lookAt: [0, 0.3, 0],
    techSpecs: [
      { label: 'Volume Útil', value: '40 L (Líquidos) / 50 Kg (Sólidos)' },
      { label: 'Boca de Abastecimento', value: 'Diâmetro alargado com filtro anti-respingo' },
      { label: 'Sensor de Carga', value: 'Célula de carga de pesagem contínua' }
    ]
  },
  {
    id: 'rotors',
    title: 'Rotores Duplos Coaxiais & Braços em Fibra de Carbono',
    subtitle: 'Downwash aerodinâmico que penetra o dossel da soja',
    description: 'Hélices de alta resistência em fibra de carbono dobráveis. O vórtice de ar gerado (downwash) abre a folhagem da cultura, depositando o defensivo até nas folhas do baixeiro onde os tratores tradicionais não atingem.',
    position: [1.3, 0.6, 0.8],
    cameraPos: [2.2, 1.4, 1.8],
    lookAt: [1.1, 0.4, 0.6],
    techSpecs: [
      { label: 'Material', value: 'Compósito de Fibra de Carbono 100%' },
      { label: 'Potência por Motor', value: 'Até 4000W cada motor sem escovas' },
      { label: 'Penetração de Dossel', value: 'Aumento de 35% na cobertura foliar' }
    ]
  },
  {
    id: 'nozzles',
    title: 'Bicos Atomizadores Centrífugos Duplos',
    subtitle: 'Tamanho de gota ajustável de 50 a 500 micrômetros',
    description: 'Bicos com discos rotativos de alta rotação que geram gotas uniformes sem entupimentos causados por produtos espessos ou pós molháveis. Vazão massiva de até 16 L/min.',
    position: [1.1, -0.3, 0.8],
    cameraPos: [1.8, -0.2, 1.6],
    lookAt: [1.1, -0.3, 0.8],
    techSpecs: [
      { label: 'Tamanho de Gota', value: '50 a 500 μm regulável via controle' },
      { label: 'Vazão Máxima', value: 'Até 16 L/minuto (com 2 bicos adicionais 24 L/min)' },
      { label: 'Sistema Anti-Gotejo', value: 'Válvula solenoide magnética instantânea' }
    ]
  },
  {
    id: 'radar',
    title: 'Radar de Matriz em Fase Ativa 360° & Visão Binocular',
    subtitle: 'Segurança absoluta contra fios, pivôs centrais e relevos',
    description: 'Dois conjuntos de radares de matriz em fase ativa com visão binocular inteligente que detectam obstáculos finos como cabos elétricos de alta tensão, mourões e árvores, adaptando o voo em terrenos inclinados de MT.',
    position: [0, 0.1, 1.1],
    cameraPos: [0, 0.6, 2.4],
    lookAt: [0, 0.1, 0.9],
    techSpecs: [
      { label: 'Alcance de Detecção', value: 'Até 50 metros em 360°' },
      { label: 'Acompanhamento de Terreno', value: 'Voo rente à cultura de 1.5m a 10m' },
      { label: 'Visão Noturna FPV', value: 'Holofotes frontais para operação noturna' }
    ]
  },
  {
    id: 'rtk',
    title: 'Antenas Duplas RTK Centimétricas',
    subtitle: 'Navegação milimétrica sem desvios entre linhas',
    description: 'Garante posicionamento com precisão de 1 centímetro mesmo em áreas remotas do Mato Grosso, eliminando sobreposições ou falhas de aplicação entre passadas.',
    position: [0, 0.75, -0.4],
    cameraPos: [0, 1.5, -1.5],
    lookAt: [0, 0.6, -0.3],
    techSpecs: [
      { label: 'Precisão Horizontal', value: '1 cm + 1 ppm' },
      { label: 'Sinais Suportados', value: 'GPS, GLONASS, BeiDou, Galileo' },
      { label: 'Resistência a Interferências', value: 'Imune a poeira metálica e linhas de transmissão' }
    ]
  }
];

export const COMPANY_INFO = {
  name: 'Farming Solutions Mato Grosso',
  slogan: 'Tecnologia Aérea e Inovação para o Agronegócio',
  address: 'Av. Idemar Riedi, 9422 - Setor Industrial / Leste, Sorriso - MT, 78890-000',
  city: 'Sorriso',
  state: 'MT',
  region: 'Coração do Agronegócio Brasileiro',
  phone: '(62) 9962-1054',
  phoneRaw: '556299621054',
  whatsappUrl: 'https://wa.me/556299621054?text=Ol%C3%A1%2C%20vi%20o%20site%20da%20Farming%20Solutions%20MT%20e%20gostaria%20de%20um%20or%C3%A7amento%20de%20drones%20agr%C3%ADcolas!',
  googleMapsUrl: 'https://maps.app.goo.gl/KWPEHphvNY3qWfPo9',
  coordinates: {
    lat: -12.5631904,
    lng: -55.7205468
  },
  hours: {
    weekdays: '07:30 - 11:30 | 13:30 - 18:00',
    saturday: '07:30 - 12:00',
    harvestSupport: 'Plantão Safra 24h para clientes cadastrados'
  }
};

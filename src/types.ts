export interface DroneModel {
  id: string;
  name: string;
  category: 'pulverizacao' | 'mapeamento' | 'multiuso';
  tagline: string;
  description: string;
  imageFallback: string;
  payloadCapacity: string; // e.g. "40 kg líquidos / 50 kg sólidos"
  coverageRate: string;    // e.g. "21 hectares / hora"
  sprayWidth: string;      // e.g. "11 metros"
  batteryChargeTime: string;// e.g. "9 a 11 minutos (Ultra Rápida)"
  radarType: string;       // e.g. "Radar de matriz em fase ativa frontal e traseiro 360°"
  transmissionRange: string; // e.g. "2 km O3 Agras"
  priceEstimate?: string;
  popularFor: string[];
  keySpecs: {
    label: string;
    value: string;
    unit?: string;
  }[];
}

export interface DroneHotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  cameraPos: [number, number, number];
  lookAt: [number, number, number];
  techSpecs: { label: string; value: string }[];
}

export interface RoiInput {
  hectares: number;
  crop: 'soja' | 'milho' | 'algodao' | 'pastagem' | 'outros';
  applicationsPerSeason: number;
  currentMethod: 'trator' | 'aviao' | 'misto';
}

export interface RoiResult {
  crushSavingsReais: number; // Redução de amassamento
  chemicalSavingsReais: number; // Economia em defensivos
  waterSavedLiters: number;
  fuelSavedReais: number;
  totalAnnualSavingsReais: number;
  paybackMonths: number;
  hectaresPerHour: number;
}

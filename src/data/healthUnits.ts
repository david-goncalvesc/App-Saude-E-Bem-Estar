export interface HealthUnit {
  id: number;
  name: string;
  type: 'Hospital' | 'Clínica' | 'UPA';
  description: string;
  distance: string;
  phone: string;
  address: string;
  hours: string;
  specialties: string[];
}

export const healthUnits: HealthUnit[] = [
  {
    id: 1,
    name: "Hospital São Lucas",
    type: "Hospital",
    description: "Hospital geral com pronto socorro 24h",
    distance: "1.2 km",
    phone: "(11) 3333-1111",
    address: "Rua das Flores, 123 - Centro",
    hours: "24 horas",
    specialties: ["Cardiologia", "Neurologia", "Pediatria"]
  },
  {
    id: 2,
    name: "Clínica Vida Saudável",
    type: "Clínica",
    description: "Atendimento especializado em medicina preventiva",
    distance: "0.8 km",
    phone: "(11) 3333-2222",
    address: "Av. Saúde, 456 - Jardins",
    hours: "Segunda a Sexta: 7h às 19h",
    specialties: ["Clínica Geral", "Nutrição", "Fisioterapia"]
  },
  {
    id: 3,
    name: "UPA Central",
    type: "UPA",
    description: "Unidade de Pronto Atendimento 24h",
    distance: "2.5 km",
    phone: "(11) 3333-3333",
    address: "Rua do Socorro, 789 - Centro",
    hours: "24 horas",
    specialties: ["Emergências", "Pequenas Cirurgias"]
  },
  {
    id: 4,
    name: "Hospital Santa Maria",
    type: "Hospital",
    description: "Centro de excelência em tratamentos especializados",
    distance: "3.1 km",
    phone: "(11) 3333-4444",
    address: "Av. Principal, 1000 - Santa Maria",
    hours: "24 horas",
    specialties: ["Oncologia", "Ortopedia", "Cardiologia"]
  },
  {
    id: 5,
    name: "Clínica Bem Estar",
    type: "Clínica",
    description: "Especializada em medicina integrativa",
    distance: "1.7 km",
    phone: "(11) 3333-5555",
    address: "Rua Harmonia, 234 - Jardim Europa",
    hours: "Segunda a Sábado: 8h às 20h",
    specialties: ["Acupuntura", "Homeopatia", "Psicologia"]
  },
  {
    id: 6,
    name: "UPA Zona Sul",
    type: "UPA",
    description: "Atendimento de urgência e emergência",
    distance: "4.2 km",
    phone: "(11) 3333-6666",
    address: "Av. Sul, 567 - Zona Sul",
    hours: "24 horas",
    specialties: ["Emergências", "Observação"]
  },
  {
    id: 7,
    name: "Hospital das Clínicas",
    type: "Hospital",
    description: "Hospital universitário de referência",
    distance: "5.0 km",
    phone: "(11) 3333-7777",
    address: "Av. Doutor Arnaldo, 890 - Cerqueira César",
    hours: "24 horas",
    specialties: ["Todas as Especialidades"]
  },
  {
    id: 8,
    name: "Clínica da Família",
    type: "Clínica",
    description: "Atendimento familiar integrado",
    distance: "2.3 km",
    phone: "(11) 3333-8888",
    address: "Rua da Família, 345 - Vila Nova",
    hours: "Segunda a Sexta: 7h às 18h",
    specialties: ["Pediatria", "Ginecologia", "Geriatria"]
  }
];
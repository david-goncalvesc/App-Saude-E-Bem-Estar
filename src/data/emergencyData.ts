export interface NearestHospital {
  name: string;
  address: string;
  phone: string;
  distance: string;
  estimatedTime: string;
  emergencyServices: string[];
}

export const nearestHospital: NearestHospital = {
  name: "Hospital Municipal Central",
  address: "Av. Brasil, 456 - Centro",
  phone: "(11) 2222-0000",
  distance: "850m",
  estimatedTime: "3 min",
  emergencyServices: ["Pronto Socorro", "UTI", "Ambulância"]
};

export const emergencyResponses = [
  "Por favor, mantenha a calma. Como posso ajudar?",
  "Entendi sua situação. Estamos acionando uma ambulância.",
  "A ambulância está a caminho. Tempo estimado de chegada: 8 minutos.",
  "Por favor, mantenha-se no local e aguarde a equipe médica.",
  "Há algo mais que precise nos informar sobre a situação?"
];
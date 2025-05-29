export interface MedicalInfo {
  allergies: string;
  medications: string;
  conditions: string;
}

export interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
  relationship: string;
}

export interface Profile {
  medicalInfo: MedicalInfo;
  emergencyContacts: EmergencyContact[];
}

export const defaultProfile: Profile = {
  medicalInfo: {
    allergies: "Nenhuma conhecida",
    medications: "Nenhuma",
    conditions: "Nenhuma"
  },
  emergencyContacts: [
    {
      id: 1,
      name: "Maria Silva",
      phone: "(11) 99999-1111",
      relationship: "Cônjuge"
    }
  ]
};
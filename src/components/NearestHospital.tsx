import React from 'react';
import { X, Phone, Navigation } from 'lucide-react';
import type { NearestHospital as NearestHospitalType } from '../data/emergencyData';

interface NearestHospitalProps {
  hospital: NearestHospitalType;
  onClose: () => void;
}

const NearestHospital: React.FC<NearestHospitalProps> = ({ hospital, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Hospital Mais Próximo</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fechar informações do hospital"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{hospital.name}</h3>
            <p className="text-gray-600">{hospital.address}</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Navigation className="w-4 h-4 text-blue-500" />
              <span>{hospital.distance}</span>
            </div>
            <div className="text-gray-600">
              Tempo estimado: {hospital.estimatedTime}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Serviços de Emergência:</h4>
            <div className="flex flex-wrap gap-2">
              {hospital.emergencyServices.map((service, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => window.open(`tel:${hospital.phone}`)}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            aria-label={`Ligar para ${hospital.name}`}
          >
            <Phone className="w-5 h-5" />
            <span>Ligar {hospital.phone}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearestHospital;
import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Building2, AlertTriangle } from 'lucide-react';
import Modal from 'react-modal';
import EmergencyChat from './EmergencyChat';
import NearestHospital from './NearestHospital';
import { nearestHospital, emergencyResponses } from '../data/emergencyData';

Modal.setAppElement('#root');

const EmergencyScreen: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showHospital, setShowHospital] = useState(false);

  const handleSAMUCall = () => {
    if (window.confirm('Você será redirecionado para ligar para o SAMU (192). Deseja continuar?')) {
      window.open('tel:192');
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  };

  const handleFindHospital = () => {
    setIsLocating(true);
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    
    setTimeout(() => {
      setIsLocating(false);
      setShowHospital(true);
    }, 2000);
  };

  useEffect(() => {
    const handleShake = (event: DeviceMotionEvent) => {
      if (!event.acceleration) return;
      
      const acceleration = event.acceleration;
      const threshold = 15;

      if (
        Math.abs(acceleration.x || 0) > threshold ||
        Math.abs(acceleration.y || 0) > threshold ||
        Math.abs(acceleration.z || 0) > threshold
      ) {
        handleSAMUCall();
      }
    };

    window.addEventListener('devicemotion', handleShake);
    return () => window.removeEventListener('devicemotion', handleShake);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8" />
            <h1 className="text-2xl font-bold">🚨 Emergência</h1>
          </div>
          <p className="mt-2 opacity-90">Acesso rápido aos serviços de urgência</p>
        </div>
      </header>

      {/* Emergency Buttons */}
      <div className="container mx-auto p-6 space-y-4">
        <button
          onClick={handleSAMUCall}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-center gap-3 transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
          aria-label="Ligar para SAMU (192)"
        >
          <Phone className="w-6 h-6" />
          <span className="text-xl font-semibold">📞 Ligar para SAMU (192)</span>
        </button>

        <button
          onClick={() => setIsChatOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-center gap-3 transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
          aria-label="Abrir chat de emergência"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-xl font-semibold">💬 Chat de Emergência</span>
        </button>

        <button
          onClick={handleFindHospital}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-center gap-3 transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
          aria-label="Localizar hospital mais próximo"
        >
          <Building2 className="w-6 h-6" />
          <span className="text-xl font-semibold">🏥 Hospital Mais Próximo</span>
        </button>
      </div>

      {/* Loading State */}
      {isLocating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-center">Localizando hospital mais próximo...</p>
          </div>
        </div>
      )}

      {/* Nearest Hospital */}
      {showHospital && <NearestHospital hospital={nearestHospital} onClose={() => setShowHospital(false)} />}

      {/* Emergency Chat Modal */}
      <Modal
        isOpen={isChatOpen}
        onRequestClose={() => setIsChatOpen(false)}
        className="fixed inset-0 bg-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <EmergencyChat onClose={() => setIsChatOpen(false)} responses={emergencyResponses} />
      </Modal>
    </div>
  );
};

export default EmergencyScreen;
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Phone, Edit, Trash2, Plus, X } from 'lucide-react';
import type { Profile, EmergencyContact, MedicalInfo } from '../types/profile';
import { defaultProfile } from '../types/profile';

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isEditMedicalOpen, setIsEditMedicalOpen] = useState(false);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [editingMedicalInfo, setEditingMedicalInfo] = useState<MedicalInfo>(defaultProfile.medicalInfo);

  // Mock user data (would come from auth context in real app)
  const user = {
    name: "João Silva",
    email: "joao.silva@email.com",
    birthDate: "1990-05-15",
    cpf: "123.456.789-00",
    bloodType: "O+",
    gender: "Masculino"
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const saveProfile = (newProfile: Profile) => {
    setProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSaveMedicalInfo = () => {
    saveProfile({
      ...profile,
      medicalInfo: editingMedicalInfo
    });
    setIsEditMedicalOpen(false);
  };

  const handleAddContact = (contact: Omit<EmergencyContact, 'id'>) => {
    if (profile.emergencyContacts.length >= 5) {
      alert('Máximo de 5 contatos atingido');
      return;
    }

    const newContact = {
      ...contact,
      id: Date.now()
    };

    saveProfile({
      ...profile,
      emergencyContacts: [...profile.emergencyContacts, newContact]
    });
    setIsAddContactOpen(false);
  };

  const handleDeleteContact = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
      saveProfile({
        ...profile,
        emergencyContacts: profile.emergencyContacts.filter(c => c.id !== id)
      });
    }
  };

  const formatCPF = (cpf: string) => {
    const lastTwo = cpf.slice(-2);
    return `***.***.***.${lastTwo}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mr-4">
          {getInitials(user.name)}
        </div>
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Data de Nascimento</p>
            <p className="font-medium">{new Date(user.birthDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">CPF</p>
            <p className="font-medium">{formatCPF(user.cpf)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tipo Sanguíneo</p>
            <p className="font-medium">{user.bloodType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Gênero</p>
            <p className="font-medium">{user.gender}</p>
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Informações Médicas</h2>
          <button
            onClick={() => {
              setEditingMedicalInfo(profile.medicalInfo);
              setIsEditMedicalOpen(true);
            }}
            className="text-blue-500 hover:text-blue-600"
          >
            <Edit size={20} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Alergias</p>
            <p className="font-medium">{profile.medicalInfo.allergies}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Medicações</p>
            <p className="font-medium">{profile.medicalInfo.medications}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Condições Médicas</p>
            <p className="font-medium">{profile.medicalInfo.conditions}</p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Contatos de Emergência</h2>
          <button
            onClick={() => setIsAddContactOpen(true)}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            disabled={profile.emergencyContacts.length >= 5}
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-3">
          {profile.emergencyContacts.map(contact => (
            <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.phone}</p>
                <p className="text-xs text-gray-500">{contact.relationship}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open(`tel:${contact.phone}`)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                >
                  <Phone size={20} />
                </button>
                <button
                  onClick={() => {
                    setEditingContact(contact);
                    setIsAddContactOpen(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Info Modal */}
      <Modal
        isOpen={isEditMedicalOpen}
        onRequestClose={() => setIsEditMedicalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Editar Informações Médicas</h2>
          <button onClick={() => setIsEditMedicalOpen(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alergias</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={editingMedicalInfo.allergies}
              onChange={e => setEditingMedicalInfo({ ...editingMedicalInfo, allergies: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medicações</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={editingMedicalInfo.medications}
              onChange={e => setEditingMedicalInfo({ ...editingMedicalInfo, medications: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condições Médicas</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={editingMedicalInfo.conditions}
              onChange={e => setEditingMedicalInfo({ ...editingMedicalInfo, conditions: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditMedicalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveMedicalInfo}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>

      {/* Add/Edit Contact Modal */}
      <Modal
        isOpen={isAddContactOpen}
        onRequestClose={() => {
          setIsAddContactOpen(false);
          setEditingContact(null);
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editingContact ? 'Editar Contato' : 'Adicionar Contato'}
          </h2>
          <button
            onClick={() => {
              setIsAddContactOpen(false);
              setEditingContact(null);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const contact = {
              name: formData.get('name') as string,
              phone: formData.get('phone') as string,
              relationship: formData.get('relationship') as string,
            };

            if (editingContact) {
              saveProfile({
                ...profile,
                emergencyContacts: profile.emergencyContacts.map(c =>
                  c.id === editingContact.id ? { ...contact, id: c.id } : c
                )
              });
              setEditingContact(null);
            } else {
              handleAddContact(contact);
            }
            setIsAddContactOpen(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={editingContact?.name}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              name="phone"
              required
              pattern="\(\d{2}\) \d{4,5}-\d{4}"
              placeholder="(11) 99999-9999"
              defaultValue={editingContact?.phone}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relacionamento</label>
            <select
              name="relationship"
              required
              defaultValue={editingContact?.relationship}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Selecione...</option>
              <option value="Cônjuge">Cônjuge</option>
              <option value="Pai/Mãe">Pai/Mãe</option>
              <option value="Filho(a)">Filho(a)</option>
              <option value="Irmão/Irmã">Irmão/Irmã</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsAddContactOpen(false);
                setEditingContact(null);
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editingContact ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileScreen;
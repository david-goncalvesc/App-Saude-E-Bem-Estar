import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogIn } from 'lucide-react';
import bcrypt from 'bcryptjs';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Recupera os dados do usuário registrado
      const registeredUserData = localStorage.getItem('registeredUser');
      
      if (!registeredUserData) {
        setError('Usuário não encontrado');
        return;
      }

      const registeredUser = JSON.parse(registeredUserData);

      // Verifica se o email corresponde
      if (email !== registeredUser.email) {
        setError('Email ou senha incorretos');
        return;
      }

      // Compara a senha usando bcrypt
      const passwordMatch = await bcrypt.compare(password, registeredUser.password);

      if (!passwordMatch) {
        setError('Email ou senha incorretos');
        return;
      }

      // Login bem-sucedido
      login({
        id: registeredUser.id || '1',
        name: registeredUser.username,
        email: registeredUser.email,
      });

      navigate('/');
    } catch (err) {
      console.error('Erro durante o login:', err);
      setError('Ocorreu um erro durante o login. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            BemEstarApp
          </h1>
          <p className="text-gray-600 mt-2">Faça login para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-200"
          >
            <LogIn size={20} />
            <span>Entrar</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <a href="/register" className="text-purple-600 hover:text-purple-700">
              Registre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
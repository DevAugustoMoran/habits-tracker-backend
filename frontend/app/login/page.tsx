'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://habits-tracker-backend-7c6u-8cip73658-devaugustomorans-projects.vercel.app/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        setError(data.error || 'Credenciales inválidas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Iniciar Sesión</h1>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input 
              type="text" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input 
              type="password" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition-colors">
            Entrar
          </button>
        </form>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          ¿No tienes cuenta? <Link href="/register" className="text-blue-500 hover:underline">Regístrate</Link>
        </p>
      </div>
    </main>
  );
}
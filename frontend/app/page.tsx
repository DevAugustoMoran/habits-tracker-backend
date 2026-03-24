'use client';
import { AppDispatch } from '../store/store';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchHabitsAsync, completeHabitAsync, addHabitAsync } from '../store/slices/habitSlice';

interface HabitType {
  _id: string;
  name: string;
  completedDays: number;
}

interface RootState {
  habits: {
    habits: HabitType[];
  };
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>(); 
  const { habits } = useSelector((state: RootState) => state.habits);
  const router = useRouter();
  
  const [newHabitName, setNewHabitName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      dispatch(fetchHabitsAsync());
    }
  }, [dispatch, router]);

  const handleComplete = (id: string) => {
    dispatch(completeHabitAsync(id));
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim() === '') return;
    
    dispatch(addHabitAsync(newHabitName));
    setNewHabitName('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const getProgressBarColor = (days: number) => {
    if (days < 22) return 'bg-red-500';
    if (days < 44) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const safeHabits = Array.isArray(habits) ? habits : [];

  return (
    <main className="p-8 font-sans bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Mis Hábitos Atómicos</h1>
          <button 
            onClick={handleLogout}
            className="text-sm bg-red-100 text-red-600 font-semibold py-2 px-4 rounded hover:bg-red-200 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        {}
        <form onSubmit={handleAddHabit} className="mb-8 flex gap-4">
          <input 
            type="text" 
            placeholder="Ej. Leer 10 páginas, Tomar agua..." 
            className="flex-1 border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Agregar Hábito
          </button>
        </form>
        
        <div className="bg-white shadow-md rounded-lg p-6 text-black">
          {safeHabits.length === 0 ? (
            <p className="text-gray-500">No hay hábitos registrados aún. ¡Crea el primero arriba!</p>
          ) : (
            <ul className="space-y-6">
              {safeHabits.map((habit: HabitType) => {
                const progressPercentage = Math.min((habit.completedDays / 66) * 100, 100);
                
                return (
                <li key={habit._id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-semibold text-xl text-gray-800">{habit.name}</p>
                      <p className="text-sm text-gray-500 font-medium mt-1">
                        Días completados: {habit.completedDays} / 66
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleComplete(habit._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow transition-colors active:scale-95"
                      type="button"
                    >
                      Done
                    </button>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-1 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(habit.completedDays)}`} 
                      style={{ width: `${progressPercentage}%` }} 
                    ></div>
                  </div>
                  <p className="text-xs text-right text-gray-400 mt-1">La meta son 66 días</p>
                </li>
              )})}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
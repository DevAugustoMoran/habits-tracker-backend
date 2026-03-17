'use client'; 

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHabits } from '../store/slices/habitSlice';

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
  const dispatch = useDispatch();
  const { habits } = useSelector((state: RootState) => state.habits);

  const fetchHabits = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/habits'); 
      const data = await response.json();
      dispatch(setHabits(data));
    } catch (error) {
      console.error("Error al obtener los hábitos:", error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [dispatch]);

  const handleComplete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/habits/${id}/complete`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        fetchHabits();
      }
    } catch (error) {
      console.error("Error al completar el hábito:", error);
    }
  };

  const getProgressBarColor = (days: number) => {
    if (days < 22) return 'bg-red-500';      
    if (days < 44) return 'bg-yellow-400';   
    return 'bg-green-500';                
  };

  return (
    <main className="p-8 font-sans bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Mis Hábitos Atómicos</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 text-black">
          {habits.length === 0 ? (
            <p className="text-gray-500">No hay hábitos registrados aún.</p>
          ) : (
            <ul className="space-y-6">
              {habits.map((habit: HabitType) => {
                
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
                    
                    {}
                    <button 
                      onClick={() => handleComplete(habit._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow transition-colors active:scale-95"
                      type="button"
                    >
                      Done
                    </button>
                  </div>
                  
                  {}
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
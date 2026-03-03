'use client'; 

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHabits } from '../store/slices/habitSlice';

// 1. Le explicamos a TypeScript cómo luce un Hábito
interface HabitType {
  _id: string;
  name: string;
  completedDays: number;
}

// 2. Le explicamos cómo luce el Estado Global de Redux
interface RootState {
  habits: {
    habits: HabitType[];
  };
}

export default function Home() {
  const dispatch = useDispatch();
  
  // 3. Cambiamos 'any' por 'RootState'
  const { habits } = useSelector((state: RootState) => state.habits);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/habits'); 
        const data = await response.json();
        
        dispatch(setHabits(data));
      } catch (error) {
        console.error("Error al obtener los hábitos:", error);
      }
    };

    fetchHabits();
  }, [dispatch]);

  return (
    <main className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Mis Hábitos Atómicos</h1>
      
      <div className="bg-white shadow rounded-lg p-6 text-black">
        {habits.length === 0 ? (
          <p>No hay hábitos registrados aún. ¡Comienza agregando uno desde Postman o tu BD!</p>
        ) : (
          <ul className="space-y-4">
            {/* 4. Cambiamos 'any' por 'HabitType' */}
            {habits.map((habit: HabitType) => (
              <li key={habit._id} className="border-b pb-2">
                <p className="font-semibold text-lg">{habit.name}</p>
                <p className="text-sm text-gray-600">Días completados: {habit.completedDays} / 66</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
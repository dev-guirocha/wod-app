import { Workout } from '@/types/workout';

export const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Fran',
    type: 'For Time',
    description: 'Clássico do CrossFit - Thrusters e Pull-ups',
    description_scaled: 'Use bandas de assistência ou thrusters mais leves',
    estimatedDuration: 8,
    movements: [
      { id: '1', name: 'Thruster', reps: '21-15-9', videoUrl: 'https://youtube.com/thruster' },
      { id: '2', name: 'Pull-up', reps: '21-15-9', videoUrl: 'https://youtube.com/pullup' }
    ],
    equipment: ['barbell', 'pull-up bar']
  },
  // ... outros workouts
];

// Gera um WOD diferente baseado no dia da semana
export const generateDailyWod = (): Workout => {
  const dayOfWeek = new Date().getDay();
  const dailyWods = [
    mockWorkouts[0], // Domingo
    mockWorkouts[1], // Segunda
    // ... etc
  ];
  
  return dailyWods[dayOfWeek] || mockWorkouts[0];
};
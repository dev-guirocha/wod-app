// wod/types/workout.ts
export type Equipment = 'Nenhum' | 'Barra' | 'Anilhas' | 'Kettlebell' | 'Corda' | 'Caixa' | 'Argolas';

export type Workout = {
  id: string;
  name: string;
  type: 'AMRAP' | 'For Time' | 'EMOM' | 'Tabata';
  duration_category: '1-10 min' | '10-20 min' | '20+ min';
  equipment: Equipment[];
  movements: string[];
  description: string;
  description_scaled: string; // Adaptação para iniciantes
};

export interface WorkoutResult {
  workoutId: string;
  date: Date;
  result: string; // Ex: "15:30" ou "10 rounds + 5 reps"
}

export interface PersonalRecord {
  movement: string;
  value: string; // Ex: "100kg" ou "10 reps"
  date: Date;
}
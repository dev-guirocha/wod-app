import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockWorkouts, generateDailyWod } from "@/data/workouts";
import type { Workout, WorkoutResult, PersonalRecord } from "@/types/workout";

interface WorkoutState {
  workouts: Workout[];
  workoutHistory: WorkoutResult[];
  personalRecords: PersonalRecord[];
  todayWod: Workout | null;
  lastWorkout: WorkoutResult | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  getWorkoutById: (id: string) => Workout | undefined;
  addWorkoutResult: (result: Omit<WorkoutResult, 'id' | 'completedAt'>) => Promise<WorkoutResult>;
  addPersonalRecord: (pr: Omit<PersonalRecord, 'id' | 'date'>) => Promise<PersonalRecord>;
  deletePersonalRecord: (id: string) => Promise<void>;
  clearWorkoutHistory: () => Promise<void>;
  clearAllData: () => Promise<void>;
  loadWorkoutData: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      workouts: mockWorkouts,
      workoutHistory: [],
      personalRecords: [],
      todayWod: null,
      lastWorkout: null,
      isLoading: false,
      error: null,

      initialize: async () => {
        try {
          set({ isLoading: true });
          
          // Gera WOD do dia baseado na data
          const today = new Date().toDateString();
          const todayWod = generateDailyWod();
          
          set({ 
            todayWod,
            isLoading: false,
            error: null 
          });
        } catch (error) {
          console.error('Failed to initialize workout store:', error);
          set({ 
            isLoading: false, 
            error: 'Falha ao carregar dados de treino' 
          });
        }
      },

      loadWorkoutData: async () => {
        // Pode ser usado para recarregar dados da API
        await get().initialize();
      },

      getWorkoutById: (id: string) => {
        return get().workouts.find(workout => workout.id === id);
      },

      addWorkoutResult: async (resultData) => {
        set({ isLoading: true });
        
        try {
          const result: WorkoutResult = {
            ...resultData,
            id: Date.now().toString(),
            completedAt: new Date().toISOString(),
          };

          const updatedHistory = [result, ...get().workoutHistory];
          
          set({ 
            workoutHistory: updatedHistory,
            lastWorkout: result,
            isLoading: false,
            error: null
          });

          return result;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: 'Falha ao salvar resultado' 
          });
          throw error;
        }
      },

      addPersonalRecord: async (prData) => {
        set({ isLoading: true });
        
        try {
          const pr: PersonalRecord = {
            ...prData,
            id: Date.now().toString(),
            date: new Date().toISOString(),
          };

          const updatedPRs = [pr, ...get().personalRecords];
          
          set({ 
            personalRecords: updatedPRs,
            isLoading: false,
            error: null
          });

          return pr;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: 'Falha ao salvar recorde' 
          });
          throw error;
        }
      },

      deletePersonalRecord: async (id: string) => {
        set({ isLoading: true });
        
        try {
          const updatedPRs = get().personalRecords.filter(pr => pr.id !== id);
          
          set({ 
            personalRecords: updatedPRs,
            isLoading: false
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: 'Falha ao deletar recorde' 
          });
          throw error;
        }
      },

      clearWorkoutHistory: async () => {
        set({ 
          workoutHistory: [],
          lastWorkout: null,
          isLoading: false
        });
      },

      clearAllData: async () => {
        set({
          workoutHistory: [],
          personalRecords: [],
          lastWorkout: null,
          isLoading: false
        });
      },
    }),
    {
      name: 'workout-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        workoutHistory: state.workoutHistory,
        personalRecords: state.personalRecords,
        lastWorkout: state.lastWorkout,
        // Não persiste isLoading, error
      }),
    }
  )
);

// Inicializa a store
useWorkoutStore.getState().initialize();

// ===== UTILITÁRIOS ADICIONAIS =====

// Hook para estatísticas do usuário
export const useWorkoutStats = () => {
  const { workoutHistory, personalRecords } = useWorkoutStore();
  
  const totalWorkouts = workoutHistory.length;
  const totalPRs = personalRecords.length;
  
  const recentWorkouts = workoutHistory.slice(0, 7);
  const workoutDays = new Set(workoutHistory.map(w => 
    new Date(w.completedAt).toDateString()
  )).size;

  const favoriteWorkoutType = workoutHistory.reduce((acc, workout) => {
    const workoutObj = useWorkoutStore.getState().getWorkoutById(workout.workoutId);
    if (workoutObj) {
      acc[workoutObj.type] = (acc[workoutObj.type] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const mostFrequentType = Object.entries(favoriteWorkoutType)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Nenhum';

  return {
    totalWorkouts,
    totalPRs,
    workoutDays,
    recentWorkouts,
    mostFrequentType,
    workoutHistory,
    personalRecords
  };
};
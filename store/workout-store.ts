import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockWorkouts } from "@/data/workouts";
import type { Workout, WorkoutResult, PersonalRecord } from "@/types/workout";

interface WorkoutState {
  workouts: Workout[];
  workoutHistory: WorkoutResult[];
  personalRecords: PersonalRecord[];
  todayWod?: Workout;
  lastWorkout?: WorkoutResult;
  getWorkoutById: (id: string) => Workout | undefined;
  addWorkoutResult: (result: WorkoutResult) => Promise<void>;
  addPersonalRecord: (pr: PersonalRecord) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  workouts: mockWorkouts,
  workoutHistory: [],
  personalRecords: [],
  todayWod: mockWorkouts[0],
  lastWorkout: undefined,
  getWorkoutById: (id: string) => {
    return get().workouts.find((workout) => workout.id === id);
  },
  addWorkoutResult: async (result) => {
    const updatedHistory = [result, ...get().workoutHistory];
    set({ workoutHistory: updatedHistory, lastWorkout: result });
    await AsyncStorage.setItem("workoutHistory", JSON.stringify(updatedHistory));
  },
  addPersonalRecord: async (pr) => {
    const updatedPRs = [pr, ...get().personalRecords];
    set({ personalRecords: updatedPRs });
    await AsyncStorage.setItem("personalRecords", JSON.stringify(updatedPRs));
  },
  initialize: async () => {
    try {
      const historyData = await AsyncStorage.getItem("workoutHistory");
      const prData = await AsyncStorage.getItem("personalRecords");
      if (historyData) {
        const history = JSON.parse(historyData);
        set({ workoutHistory: history, lastWorkout: history[0] });
      }
      if (prData) {
        set({ personalRecords: JSON.parse(prData) });
      }
    } catch (e) {
      console.error("Failed to load workout data.", e);
    }
  },
}));

// Inicializa o estado
useWorkoutStore.getState().initialize();
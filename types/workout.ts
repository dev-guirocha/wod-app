// wod/types/workout.ts

// ===== TIPOS BASE =====
export type Equipment = 
  | 'barbell' 
  | 'dumbbell' 
  | 'kettlebell' 
  | 'pull-up bar' 
  | 'rope' 
  | 'box' 
  | 'rings'
  | 'wall-ball'
  | 'jump-rope'
  | 'medicine-ball'
  | 'assault-bike'
  | 'rower'
  | 'ski-erg'
  | 'sandbag'
  | 'none';

export type WorkoutType = 
  | 'AMRAP' 
  | 'For Time' 
  | 'EMOM' 
  | 'Tabata' 
  | 'RFT' 
  | 'Chipper'
  | 'Strength'
  | 'Endurance'
  | 'Skill';

export type DurationCategory = 
  | 'short'    // 1-10 min
  | 'medium'   // 10-20 min  
  | 'long';    // 20+ min

export type UnitSystem = 'metric' | 'imperial';

// ===== MOVIMENTOS E EXERCÍCIOS =====
export interface Movement {
  id: string;
  name: string;
  reps: string;        // Ex: "21-15-9", "10", "5 rounds"
  description?: string;
  videoUrl?: string;   // URL para vídeo de demonstração
  category: 'weightlifting' | 'gymnastics' | 'cardio' | 'skill';
  primaryMuscles: string[];
  equipment: Equipment[];
}

// ===== WORKOUT =====
export interface Workout {
  id: string;
  name: string;
  type: WorkoutType;
  description: string;
  description_scaled?: string;  // Adaptação para iniciantes
  estimatedDuration: number;    // Duração em minutos
  duration_category: DurationCategory;
  movements: Movement[];
  equipment: Equipment[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  benchmark?: boolean;          // Se é um benchmark workout
  favorite?: boolean;           // Se o usuário favoritou
}

// ===== RESULTADOS DE WORKOUT =====
export interface WorkoutResult {
  id: string;
  workoutId: string;
  workoutName: string;
  result: string;               // Ex: "15:30", "10 rounds + 5 reps", "185lb"
  duration: number;             // Duração em segundos
  completedAt: string;          // ISO string
  rx: boolean;                  // Se foi feito como prescrito
  notes?: string;               // Notas do usuário
  personalRecords?: PersonalRecord[]; // PRs atingidos neste workout
  score?: number;               // Pontuação para ranking
  conditions?: {                // Condições do treino
    temperature?: number;
    humidity?: number;
    feeling?: 'great' | 'good' | 'average' | 'poor';
  };
}

// ===== RECORDES PESSOAIS (PRs) =====
export interface PersonalRecord {
  id: string;
  exercise: string;
  weight?: string;              // Ex: "100kg", "225lb"
  reps?: number;                // Para PRs de repetições
  time?: string;                // Para PRs de tempo Ex: "5:30"
  other?: string;               // Outros tipos de PR
  date: string;                 // ISO string
  workoutId?: string;           // ID do workout onde o PR foi atingido
  workoutName?: string;         // Nome do workout
  notes?: string;
  verified?: boolean;           // Se foi verificado (por coach)
}

// ===== ESTATÍSTICAS E PROGRESSO =====
export interface UserStats {
  totalWorkouts: number;
  totalWorkoutTime: number;     // Em minutos
  personalRecords: number;
  favoriteWorkoutType: WorkoutType;
  recentWorkouts: WorkoutResult[];
  weeklyFrequency: number;      // Workouts por semana
  consistencyStreak: number;    // Dias consecutivos treinando
  maxWeightLifted: { [exercise: string]: string };
  bestTimes: { [workout: string]: string };
}

// ===== PROGRAMAÇÃO DE TREINOS =====
export interface WorkoutSchedule {
  id: string;
  workoutId: string;
  scheduledDate: string;        // ISO string
  completed: boolean;
  notes?: string;
  reminder?: boolean;
}

// ===== FAVORITOS E PREFERÊNCIAS =====
export interface UserPreferences {
  units: UnitSystem;
  notifications: {
    workoutReminders: boolean;
    prAchievements: boolean;
    weeklyProgress: boolean;
  };
  privacy: {
    showProfile: boolean;
    showProgress: boolean;
    showPRs: boolean;
  };
  theme: 'dark' | 'light' | 'auto';
}

// ===== TIPOS PARA FILTROS E BUSCA =====
export interface WorkoutFilters {
  type?: WorkoutType[];
  duration?: DurationCategory[];
  equipment?: Equipment[];
  difficulty?: ('beginner' | 'intermediate' | 'advanced' | 'elite')[];
  hasVideo?: boolean;
  benchmarkOnly?: boolean;
  favoritesOnly?: boolean;
}

export interface WorkoutSearchParams {
  query?: string;
  filters?: WorkoutFilters;
  sortBy?: 'name' | 'duration' | 'difficulty' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

// ===== TIPOS PARA API =====
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ===== UTILITÁRIOS =====
export type WithId<T> = T & { id: string };

// Funções utilitárias (type guards)
export const isWorkoutType = (value: string): value is WorkoutType => {
  return ['AMRAP', 'For Time', 'EMOM', 'Tabata', 'RFT', 'Chipper', 'Strength', 'Endurance', 'Skill'].includes(value);
};

export const isEquipment = (value: string): value is Equipment => {
  return ['barbell', 'dumbbell', 'kettlebell', 'pull-up bar', 'rope', 'box', 'rings', 'wall-ball', 'jump-rope', 'medicine-ball', 'assault-bike', 'rower', 'ski-erg', 'sandbag', 'none'].includes(value);
};

export const isDurationCategory = (value: string): value is DurationCategory => {
  return ['short', 'medium', 'long'].includes(value);
};

// Helper types para forms
export type WorkoutFormData = Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>;
export type WorkoutResultFormData = Omit<WorkoutResult, 'id' | 'completedAt'>;
export type PersonalRecordFormData = Omit<PersonalRecord, 'id' | 'date'>;

// ===== EXPORT DEFAULT PARA COMPATIBILIDADE =====
export default {
  Equipment,
  WorkoutType,
  DurationCategory,
  Movement,
  Workout,
  WorkoutResult,
  PersonalRecord,
  UserStats,
  WorkoutSchedule,
  UserPreferences,
  WorkoutFilters,
  WorkoutSearchParams,
};
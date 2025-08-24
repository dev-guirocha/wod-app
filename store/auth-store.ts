import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialized: false,
  initialize: async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        set({ user: JSON.parse(userData) });
      }
    } catch (e) {
      console.error("Failed to load user.", e);
    } finally {
      set({ initialized: true });
    }
  },
  login: async (email, password) => {
    // Simulação de login
    const mockUser: User = { id: "1", name: email.split("@")[0], email };
    await AsyncStorage.setItem("user", JSON.stringify(mockUser));
    set({ user: mockUser });
    router.replace("/(tabs)");
  },
  register: async (name, email, password) => {
    // Simulação de registro
    const mockUser: User = { id: Date.now().toString(), name, email };
    await AsyncStorage.setItem("user", JSON.stringify(mockUser));
    set({ user: mockUser });
    router.replace("/(tabs)"); // Direciona para o app principal
  },
  logout: async () => {
    await AsyncStorage.removeItem("user");
    set({ user: null });
    router.replace("/(auth)");
  },
}));

// Inicializa o estado assim que o app carrega
useAuthStore.getState().initialize();
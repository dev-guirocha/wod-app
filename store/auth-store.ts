import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
  logout: () => void;
  _setInitialized: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  // O middleware `persist` salva automaticamente o estado no AsyncStorage
  persist(
    (set) => ({
      user: null,
      initialized: false, // Começa como falso até carregarmos os dados

      _setInitialized: (status: boolean) => set({ initialized: status }),

      login: async (email, password) => {
        // Lógica de login (atualmente simulada)
        const mockUser: User = { id: "1", name: email.split("@")[0] || "Atleta", email };
        set({ user: mockUser });
        router.replace("/(tabs)");
      },

      register: async (name, email, password) => {
        // Lógica de registro (atualmente simulada)
        const mockUser: User = { id: Date.now().toString(), name, email };
        set({ user: mockUser });
        router.replace("/(tabs)");
      },

      logout: () => {
        // Limpa o usuário do estado e redireciona
        set({ user: null });
        router.replace("/(auth)/login");
      },
    }),
    {
      name: 'auth-storage', // Nome da chave no AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
      // Assim que os dados são carregados do storage, marcamos como inicializado
      onRehydrate: () => {
        useAuthStore.getState()._setInitialized(true);
      },
    }
  )
);

// Se não houver dados no storage, precisamos inicializar manualmente
const unsub = useAuthStore.subscribe((state, prevState) => {
    if (!prevState.initialized && !state.user) {
        useAuthStore.getState()._setInitialized(true);
        unsub(); // Cancela a inscrição após a primeira execução
    }
});

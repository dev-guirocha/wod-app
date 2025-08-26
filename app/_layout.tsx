import { Stack, router, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "@/constants/colors";

// Impede que a tela de splash desapareça antes de estarmos prontos
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { initialized, user } = useAuthStore();
  const segments = useSegments();

  useEffect(() => {
    if (initialized) {
      // Esconde a tela de splash assim que o estado for carregado
      SplashScreen.hideAsync();

      const inAuthGroup = segments[0] === '(auth)';
      const inTabsGroup = segments[0] === '(tabs)';

      // Lógica de redirecionamento
      if (user && !inTabsGroup) {
        // Se o usuário está logado e não está na área principal, redireciona para lá
        router.replace('/(tabs)');
      } else if (!user && !inAuthGroup) {
        // Se o usuário não está logado e não está na área de autenticação, redireciona para o login
        router.replace('/(auth)/login');
      }
    }
  }, [initialized, user, segments]);

  // Mostra um indicador de carregamento enquanto o estado de autenticação é verificado
  if (!initialized) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
            <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
    );
  }

  return (
    // Navegador principal que define as rotas de topo
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="workout/[id]" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <RootLayoutNav />
    </GestureHandlerRootView>
  );
}
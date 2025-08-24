import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

// Impede que a tela de splash desapareça automaticamente
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { initialized, user } = useAuthStore();

  useEffect(() => {
    // Se o estado de autenticação foi inicializado, esconda a splash screen
    if (initialized) {
      SplashScreen.hideAsync();
    }
  }, [initialized]);
  
  useEffect(() => {
    if (initialized) {
        // Se o usuário estiver logado, vá para as abas. Se não, para a tela de login.
        if (user) {
            router.replace('/(tabs)');
        } else {
            router.replace('/(auth)');
        }
    }
  }, [initialized, user]);


  // Não renderiza nada até que o estado de autenticação seja verificado
  if (!initialized) {
    return null;
  }

  return (
    // O Stack principal define as rotas de nível superior.
    // Os providers (Auth, Workout) não são mais necessários aqui,
    // pois o Zustand gerencia o estado globalmente.
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
```typescript
// Substitua o conteúdo do arquivo: wod/app/+not-found.tsx

import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/constants/colors";
import PrimaryButton from "@/components/PrimaryButton";
import { AlertTriangle } from "lucide-react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <AlertTriangle color={COLORS.accent} size={64} />
        <Text style={styles.title}>Página Não Encontrada</Text>
        <Text style={styles.subtitle}>
          A tela que você está tentando acessar não existe.
        </Text>
        <Link href="/(tabs)" asChild>
          <PrimaryButton title="Voltar para o Início" />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grayLight,
    textAlign: 'center',
    marginBottom: 20,
  },
});
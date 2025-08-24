import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "@/store/auth-store";

export default function AuthLayout() {
  const { user } = useAuthStore();

  // Se o usuário já estiver logado, redireciona para a tela principal (abas)
  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  // Se não houver usuário, mostra as telas de autenticação
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
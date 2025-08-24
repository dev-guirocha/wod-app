import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { COLORS } from "@/constants/colors";
import PrimaryButton from "@/components/PrimaryButton";
import { AlertTriangle } from "lucide-react-native";

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Configura o título da página na barra de navegação (se visível) */}
      <Stack.Screen options={{ title: "Oops!", headerStyle: { backgroundColor: COLORS.primary } }} />
      
      <View style={styles.content}>
        <AlertTriangle color={COLORS.accent} size={64} />
        <Text style={styles.title}>Página Não Encontrada</Text>
        <Text style={styles.subtitle}>
          A tela que você está tentando acessar não existe ou foi movida.
        </Text>
        <Link href="/(tabs)" asChild>
          <PrimaryButton title="Voltar para o Início" />
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
    marginBottom: 30,
    maxWidth: '80%',
  },
});
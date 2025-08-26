import { Link, Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/colors";
import PrimaryButton from "@/components/PrimaryButton";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Página Não Encontrada",
          headerStyle: { 
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft color={COLORS.white} size={24} />
            </TouchableOpacity>
          )
        }} 
      />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <AlertTriangle color={COLORS.accent} size={64} />
          <View style={styles.iconBadge}>
            <Text style={styles.iconBadgeText}>404</Text>
          </View>
        </View>
        
        <Text style={styles.title}>Página Não Encontrada</Text>
        
        <Text style={styles.subtitle}>
          A tela que você está tentando acessar não existe ou foi movida.
        </Text>

        <View style={styles.errorDetails}>
          <Text style={styles.errorDetailText}>
            • Verifique se o URL está correto{'\n'}
            • A página pode ter sido removida{'\n'}
            • Tente voltar e navegar novamente
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <Link href="/(tabs)" asChild>
            <PrimaryButton 
              title="Voltar para o Início"
              icon={Home}
              style={styles.primaryButton}
            />
          </Link>
          
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.helpText}>
          Precisa de ajuda?{'\n'}
          <Text style={styles.contactText}>contato@wodapp.com</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  backButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  iconBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.error,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  iconBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grayLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    maxWidth: '90%',
  },
  errorDetails: {
    backgroundColor: COLORS.grayDark + '80',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  errorDetailText: {
    color: COLORS.grayLight,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonGroup: {
    gap: 16,
    width: '100%',
    maxWidth: 300,
    marginBottom: 32,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  secondaryButtonText: {
    color: COLORS.grayLight,
    fontSize: 16,
    fontWeight: '600',
  },
  helpText: {
    color: COLORS.grayLight,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  contactText: {
    color: COLORS.accent,
    fontWeight: '600',
  },
});
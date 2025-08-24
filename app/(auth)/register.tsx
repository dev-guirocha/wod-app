import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth-store";
import { COLORS } from "@/constants/colors";
import PrimaryButton from "@/components/PrimaryButton";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuthStore();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Campos incompletos", "Por favor, preencha todos os campos.");
      return;
    }
    
    setIsLoading(true);
    try {
      await register(name, email, password);
      // A navegação é tratada dentro da função `register` do store
    } catch (error) {
      Alert.alert("Erro no Cadastro", "Não foi possível criar a conta. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Crie sua Conta</Text>
          <Text style={styles.subtitle}>Comece sua jornada de treinos hoje mesmo.</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor={COLORS.grayMedium}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.grayMedium}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={COLORS.grayMedium}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <PrimaryButton 
            title={isLoading ? "Criando conta..." : "Criar Conta"} 
            onPress={handleRegister}
            disabled={isLoading}
          />
          {isLoading && <ActivityIndicator size="small" color={COLORS.white} style={{ marginTop: 10 }} />}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.footerText}>
              Já tem uma conta? <Text style={styles.link}>Faça Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grayLight,
    textAlign: "center",
  },
  form: {
    marginBottom: 32,
  },
  input: {
    backgroundColor: COLORS.grayMedium,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 16,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: COLORS.grayLight,
    fontSize: 14,
  },
  link: {
    color: COLORS.accent,
    fontWeight: "600",
  },
});

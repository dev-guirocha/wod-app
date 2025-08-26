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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth-store";
import { COLORS } from "@/constants/colors";
import PrimaryButton from "@/components/PrimaryButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos incompletos", "Por favor, preencha o email e a senha.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Email inválido", "Por favor, insira um email válido.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert("Erro no Login", "Não foi possível entrar. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.title}>Bem-vindo de Volta</Text>
                  <Text style={styles.subtitle}>Faça login para continuar seu progresso.</Text>
                </View>

                <View style={styles.form}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={COLORS.grayLight}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  
                  <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={COLORS.grayLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />

                  <PrimaryButton 
                    title={isLoading ? "" : "Entrar"} 
                    onPress={handleLogin}
                    disabled={isLoading}
                    loading={isLoading}
                  />
                </View>

                <View style={styles.footer}>
                  <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                    <Text style={styles.footerText}>
                      Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flexGrow: 1,
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

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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuthStore();

  const handleRegister = async () => {
    // Validação melhorada
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Campos incompletos", "Por favor, preencha todos os campos.");
      return;
    }

    // Validação de nome
    if (name.trim().length < 2) {
      Alert.alert("Nome inválido", "Por favor, insira seu nome completo.");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Email inválido", "Por favor, insira um email válido.");
      return;
    }

    // Validação de senha
    if (password.length < 6) {
      Alert.alert("Senha fraca", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      // A navegação é tratada dentro da função `register` do store
    } catch (error: any) {
      Alert.alert(
        "Erro no Cadastro", 
        error.message || "Não foi possível criar a conta. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    router.push("/(auth)/login");
  };

  const handleSubmitEditing = () => {
    if (name && email && password) {
      handleRegister();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={styles.content}>
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
                returnKeyType="next"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.grayMedium}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Senha (mín. 6 caracteres)"
                placeholderTextColor={COLORS.grayMedium}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="go"
                onSubmitEditing={handleSubmitEditing}
              />

              <PrimaryButton 
                title={isLoading ? "Criando conta..." : "Criar Conta"} 
                onPress={handleRegister}
                disabled={isLoading}
              />
              
              {isLoading && (
                <ActivityIndicator 
                  size="small" 
                  color={COLORS.white} 
                  style={{ marginTop: 10 }} 
                />
              )}
            </View>

            <View style={styles.footer}>
              <TouchableOpacity onPress={goToLogin} disabled={isLoading}>
                <Text style={styles.footerText}>
                  Já tem uma conta? <Text style={styles.link}>Faça Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
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
    lineHeight: 22,
  },
  form: {
    marginBottom: 32,
  },
  input: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
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
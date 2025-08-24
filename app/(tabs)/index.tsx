import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth-store";
import { useWorkoutStore } from "@/store/workout-store";
import { COLORS } from "@/constants/colors";
import { Award } from "lucide-react-native";
import PrimaryButton from "@/components/PrimaryButton";

export default function TodayScreen() {
  const { user } = useAuthStore();
  const { todayWod, lastWorkout } = useWorkoutStore();

  const handleStartWorkout = () => {
    if (todayWod) {
      router.push(`/workout/${todayWod.id}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, {user?.name || 'Atleta'}!</Text>
        </View>

        {/* --- Card Principal: WOD do Dia --- */}
        <View style={styles.wodCard}>
          <Text style={styles.wodSubtitle}>WOD DO DIA</Text>
          {todayWod ? (
            <>
              <Text style={styles.wodName}>{todayWod.name}</Text>
              <View style={styles.wodMeta}>
                <Text style={styles.wodType}>{todayWod.type}</Text>
                <Text style={styles.wodDuration}>{todayWod.estimatedDuration} min</Text>
              </View>
              <Text style={styles.wodDescription} numberOfLines={3}>{todayWod.description}</Text>
              <PrimaryButton title="Iniciar Treino" onPress={handleStartWorkout} />
            </>
          ) : (
            <Text style={styles.wodDescription}>Nenhum WOD para hoje.</Text>
          )}
        </View>

        {/* --- Card Secundário: Último Treino --- */}
        {lastWorkout && (
          <View style={styles.secondaryCard}>
            <Text style={styles.secondaryTitle}>Seu Último Treino</Text>
            <View style={styles.lastWorkoutContent}>
              <Text style={styles.secondaryText}>{lastWorkout.workoutName}</Text>
              <Text style={styles.lastWorkoutResult}>{lastWorkout.result}</Text>
            </View>
          </View>
        )}

        {/* --- Card Secundário: Recordes Pessoais --- */}
        <TouchableOpacity style={styles.secondaryCard} onPress={() => router.push("/(tabs)/progress")}>
          <View style={styles.lastWorkoutContent}>
              <Text style={styles.secondaryTitle}>Recordes Pessoais (PRs)</Text>
              <Award color={COLORS.accent} size={24} />
          </View>
          <Text style={styles.linkText}>Ver e adicionar recordes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
  },
  wodCard: {
    backgroundColor: COLORS.grayMedium,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  wodSubtitle: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: "uppercase",
  },
  wodName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 12,
  },
  wodMeta: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 16,
  },
  wodType: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: "600",
  },
  wodDuration: {
    fontSize: 14,
    color: COLORS.grayLight,
  },
  wodDescription: {
    fontSize: 14,
    color: COLORS.grayLight,
    lineHeight: 20,
    marginBottom: 20,
  },
  secondaryCard: {
    backgroundColor: COLORS.grayMedium,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 8,
  },
  secondaryText: {
    color: COLORS.grayLight,
    fontSize: 16,
  },
  lastWorkoutContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastWorkoutResult: {
    fontSize: 16,
    color: COLORS.success,
    fontWeight: "600",
  },
  linkText: {
      color: COLORS.accent,
      fontSize: 14,
      fontWeight: '600',
      marginTop: 4,
  }
});

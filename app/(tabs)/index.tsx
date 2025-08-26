import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth-store";
import { useWorkoutStore } from "@/store/workout-store";
import { COLORS } from "@/constants/colors";
import { Award, Clock, Calendar } from "lucide-react-native";
import PrimaryButton from "@/components/PrimaryButton";

export default function TodayScreen() {
  const { user } = useAuthStore();
  const { todayWod, lastWorkout, refreshWorkouts } = useWorkoutStore();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshWorkouts(); // Você precisaria implementar esta função no store
    setRefreshing(false);
  }, []);

  const handleStartWorkout = () => {
    if (todayWod) {
      router.push(`/workout/${todayWod.id}`);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.accent}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}, {user?.name || 'Atleta'}!</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </Text>
        </View>

        {/* --- Card Principal: WOD do Dia --- */}
        <View style={styles.wodCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.wodSubtitle}>WOD DO DIA</Text>
            <Clock color={COLORS.accent} size={16} />
          </View>
          
          {todayWod ? (
            <>
              <Text style={styles.wodName}>{todayWod.name}</Text>
              
              <View style={styles.wodMeta}>
                <View style={styles.metaBadge}>
                  <Text style={styles.metaText}>{todayWod.type}</Text>
                </View>
                <View style={styles.metaBadge}>
                  <Text style={styles.metaText}>{todayWod.estimatedDuration} min</Text>
                </View>
              </View>

              <Text style={styles.wodDescription} numberOfLines={3}>
                {todayWod.description}
              </Text>

              <View style={styles.movementsPreview}>
                {todayWod.movements.slice(0, 3).map((movement, index) => (
                  <Text key={index} style={styles.movementTag}>
                    {movement.name}
                  </Text>
                ))}
                {todayWod.movements.length > 3 && (
                  <Text style={styles.moreMovements}>
                    +{todayWod.movements.length - 3} mais
                  </Text>
                )}
              </View>

              <PrimaryButton 
                title="Iniciar Treino" 
                onPress={handleStartWorkout}
                icon="play" // Adicione suporte a ícones no seu PrimaryButton
              />
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nenhum WOD para hoje</Text>
              <Text style={styles.emptySubtext}>Volte amanhã para novos desafios!</Text>
            </View>
          )}
        </View>

        {/* --- Card Secundário: Último Treino --- */}
        {lastWorkout && (
          <TouchableOpacity 
            style={styles.secondaryCard}
            onPress={() => router.push("/(tabs)/progress")}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.secondaryTitle}>Último Treino</Text>
              <Calendar color={COLORS.accent} size={16} />
            </View>
            
            <View style={styles.lastWorkoutContent}>
              <Text style={styles.secondaryText}>{lastWorkout.workoutName}</Text>
              <Text style={styles.lastWorkoutResult}>{lastWorkout.result}</Text>
            </View>
            
            <Text style={styles.seeMore}>Ver histórico completo →</Text>
          </TouchableOpacity>
        )}

        {/* --- Card Secundário: Recordes Pessoais --- */}
        <TouchableOpacity 
          style={styles.secondaryCard} 
          onPress={() => router.push("/(tabs)/progress")}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.secondaryTitle}>Recordes Pessoais</Text>
            <Award color={COLORS.accent} size={20} />
          </View>
          
          <Text style={styles.prCount}>
            {lastWorkout?.personalRecords?.length || 0} recordes conquistados
          </Text>
          
          <Text style={styles.linkText}>Gerenciar seus recordes →</Text>
        </TouchableOpacity>

        {/* --- Dica do Dia --- */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Dica do Dia</Text>
          <Text style={styles.tipText}>
            Mantenha-se hidratado durante os treinos e não se esqueça do aquecimento!
          </Text>
        </View>
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
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: COLORS.grayLight,
  },
  wodCard: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  wodSubtitle: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '700',
    textTransform: "uppercase",
  },
  wodName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 16,
  },
  wodMeta: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  metaBadge: {
    backgroundColor: COLORS.accent + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: "600",
  },
  wodDescription: {
    fontSize: 14,
    color: COLORS.grayLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  movementsPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  movementTag: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  moreMovements: {
    color: COLORS.grayLight,
    fontSize: 12,
    alignSelf: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: COLORS.grayLight,
    fontSize: 14,
    textAlign: 'center',
  },
  secondaryCard: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.grayLight,
    fontSize: 16,
    marginBottom: 8,
  },
  lastWorkoutContent: {
    marginBottom: 12,
  },
  lastWorkoutResult: {
    fontSize: 18,
    color: COLORS.success,
    fontWeight: "600",
  },
  prCount: {
    color: COLORS.grayLight,
    fontSize: 14,
    marginBottom: 8,
  },
  linkText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  seeMore: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  tipCard: {
    backgroundColor: COLORS.accent + '15',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  tipTitle: {
    color: COLORS.accent,
    fontWeight: '700',
    marginBottom: 8,
  },
  tipText: {
    color: COLORS.grayLight,
    fontSize: 14,
    lineHeight: 20,
  },
});
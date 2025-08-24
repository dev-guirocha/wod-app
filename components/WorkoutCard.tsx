import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import type { Workout } from '@/types/workout';
import { COLORS } from '@/constants/colors';
import { Clock, Dumbbell } from 'lucide-react-native';

interface Props {
  workout: Workout;
}

const WorkoutCard = ({ workout }: Props) => {
  // Garante que o equipamento seja sempre uma lista para evitar erros
  const equipmentList = Array.isArray(workout.equipment) ? workout.equipment : [];

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => router.push(`/workout/${workout.id}`)}
    >
      {/* Cabeçalho do Card com Nome e Duração */}
      <View style={styles.cardHeader}>
        <Text style={styles.workoutName}>{workout.name}</Text>
        <View style={styles.metaInfo}>
          <Clock color={COLORS.grayLight} size={14} />
          <Text style={styles.metaText}>{workout.estimatedDuration} min</Text>
        </View>
      </View>

      {/* Tipo do Treino (AMRAP, For Time, etc.) */}
      <Text style={styles.workoutType}>{workout.type}</Text>

      {/* Descrição curta do treino */}
      <Text style={styles.workoutDescription} numberOfLines={2}>
        {workout.description}
      </Text>

      {/* Lista de Equipamentos (só aparece se houver equipamento e não for "none") */}
      {equipmentList.length > 0 && equipmentList[0] !== 'none' && (
        <View style={styles.equipmentContainer}>
          <Dumbbell color={COLORS.accent} size={14} />
          <Text style={styles.equipmentText}>{equipmentList.join(", ")}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.grayMedium,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    flex: 1, // Garante que o texto quebre se for muito longo
    marginRight: 8,
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.grayLight,
  },
  workoutType: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  workoutDescription: {
    fontSize: 14,
    color: COLORS.grayLight,
    lineHeight: 20,
  },
  equipmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.primary,
    paddingTop: 8,
  },
  equipmentText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: "600",
    textTransform: 'capitalize',
  },
});

export default WorkoutCard;

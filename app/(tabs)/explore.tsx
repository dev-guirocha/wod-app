import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { useWorkoutStore } from "@/store/workout-store";
import { COLORS } from "@/constants/colors";
import { Search } from "lucide-react-native";
import WorkoutCard from "@/components/WorkoutCard";

const DURATION_FILTERS = [
  { label: "1-10min", value: "short" },
  { label: "10-20min", value: "medium" },
  { label: "20+min", value: "long" },
];

const TYPE_FILTERS = ["AMRAP", "For Time", "EMOM", "Tabata"];
const EQUIPMENT_FILTERS = ["barbell", "dumbbell", "kettlebell", "pull-up bar", "rope", "none"];

export default function ExploreScreen() {
  const { workouts } = useWorkoutStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      // Garante que o equipamento seja uma lista para evitar erros
      const equipment = Array.isArray(workout.equipment) ? workout.equipment : [];

      // Lógica de busca
      const matchesSearch =
        !searchQuery ||
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.movements.some((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Lógica de filtro por duração
      const matchesDuration =
        !selectedDuration ||
        (selectedDuration === "short" && workout.estimatedDuration <= 10) ||
        (selectedDuration === "medium" && workout.estimatedDuration > 10 && workout.estimatedDuration <= 20) ||
        (selectedDuration === "long" && workout.estimatedDuration > 20);

      // Lógica de filtro por tipo
      const matchesType = !selectedType || workout.type === selectedType;
      
      // Lógica de filtro por equipamento
      const matchesEquipment = !selectedEquipment || equipment.includes(selectedEquipment);

      return matchesSearch && matchesDuration && matchesType && matchesEquipment;
    });
  }, [workouts, searchQuery, selectedDuration, selectedType, selectedEquipment]);

  // Componente reutilizável para renderizar os botões de filtro
  const renderFilterButtons = (
    filters: any[],
    selectedValue: string,
    onSelect: (value: string) => void,
    isObject = false
  ) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
      {filters.map((filter) => {
        const label = isObject ? filter.label : filter;
        const value = isObject ? filter.value : filter;
        const isActive = selectedValue === value;
        return (
          <TouchableOpacity
            key={value}
            style={[styles.filterButton, isActive && styles.filterButtonActive]}
            onPress={() => onSelect(isActive ? "" : value)}
          >
            <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explorar</Text>
        <View style={styles.searchContainer}>
          <Search color={COLORS.grayLight} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome ou exercício..."
            placeholderTextColor={COLORS.grayLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        {renderFilterButtons(DURATION_FILTERS, selectedDuration, setSelectedDuration, true)}
        {renderFilterButtons(TYPE_FILTERS, selectedType, setSelectedType)}
        {renderFilterButtons(EQUIPMENT_FILTERS, selectedEquipment, setSelectedEquipment)}
      </View>

      <FlatList
        data={filteredWorkouts}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.workoutsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum treino encontrado.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.grayMedium,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.white,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  filterRow: {
    flexDirection: "row",
  },
  filterButton: {
    backgroundColor: COLORS.grayMedium,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: COLORS.accent,
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.grayLight,
    fontWeight: "600",
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  workoutsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyText: {
    color: COLORS.grayLight,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
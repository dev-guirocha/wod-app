import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useWorkoutStore } from "@/store/workout-store";
import { COLORS } from "@/constants/colors";
import { Search, X, Filter } from "lucide-react-native";
import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";

const DURATION_FILTERS = [
  { label: "Curto (1-10min)", value: "short" },
  { label: "Médio (10-20min)", value: "medium" },
  { label: "Longo (20+min)", value: "long" },
];

const TYPE_FILTERS = ["AMRAP", "For Time", "EMOM", "Tabata", "RFT"];
const EQUIPMENT_FILTERS = ["barbell", "dumbbell", "kettlebell", "pull-up bar", "rope", "none"];

export default function ExploreScreen() {
  const { workouts, isLoading } = useWorkoutStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredWorkouts = useMemo(() => {
    if (!workouts) return [];
    
    return workouts.filter((workout: Workout) => {
      const equipment = Array.isArray(workout.equipment) ? workout.equipment : [];
      const movements = Array.isArray(workout.movements) ? workout.movements : [];

      const matchesSearch = !searchQuery ||
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movements.some((m: any) => 
          m.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesDuration = !selectedDuration ||
        (selectedDuration === "short" && workout.estimatedDuration <= 10) ||
        (selectedDuration === "medium" && workout.estimatedDuration > 10 && workout.estimatedDuration <= 20) ||
        (selectedDuration === "long" && workout.estimatedDuration > 20);

      const matchesType = !selectedType || workout.type === selectedType;
      const matchesEquipment = !selectedEquipment || equipment.includes(selectedEquipment);

      return matchesSearch && matchesDuration && matchesType && matchesEquipment;
    });
  }, [workouts, searchQuery, selectedDuration, selectedType, selectedEquipment]);

  const clearFilters = useCallback(() => {
    setSelectedDuration("");
    setSelectedType("");
    setSelectedEquipment("");
    setSearchQuery("");
    Keyboard.dismiss();
  }, []);

  const hasActiveFilters = selectedDuration || selectedType || selectedEquipment || searchQuery;

  const renderFilterButtons = (
    filters: any[],
    selectedValue: string,
    onSelect: (value: string) => void,
    isObject = false
  ) => (
    <FlatList
      horizontal
      data={filters}
      renderItem={({ item }) => {
        const label = isObject ? item.label : item;
        const value = isObject ? item.value : item;
        const isActive = selectedValue === value;
        
        return (
          <TouchableOpacity
            style={[styles.filterButton, isActive && styles.filterButtonActive]}
            onPress={() => onSelect(isActive ? "" : value)}
          >
            <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterRow}
    />
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.accent} />
          <Text style={styles.loadingText}>Carregando treinos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explorar</Text>
        
        <View style={styles.searchContainer}>
          <Search color={COLORS.grayLight} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar WODs ou exercícios..."
            placeholderTextColor={COLORS.grayLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <X color={COLORS.grayLight} size={20} />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.filterToggle, hasActiveFilters && styles.filterToggleActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter color={hasActiveFilters ? COLORS.accent : COLORS.grayLight} size={20} />
          <Text style={[
            styles.filterToggleText,
            hasActiveFilters && styles.filterToggleTextActive
          ]}>
            Filtros {hasActiveFilters ? `(${[selectedDuration, selectedType, selectedEquipment].filter(Boolean).length})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Duração</Text>
            {renderFilterButtons(DURATION_FILTERS, selectedDuration, setSelectedDuration, true)}
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Tipo de WOD</Text>
            {renderFilterButtons(TYPE_FILTERS, selectedType, setSelectedType)}
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Equipamento</Text>
            {renderFilterButtons(EQUIPMENT_FILTERS, selectedEquipment, setSelectedEquipment)}
          </View>

          {hasActiveFilters && (
            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Limpar Filtros</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={filteredWorkouts}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.workoutsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {hasActiveFilters ? "Nenhum treino encontrado com os filtros atuais." : "Nenhum treino disponível."}
            </Text>
            {hasActiveFilters && (
              <TouchableOpacity onPress={clearFilters}>
                <Text style={styles.emptyActionText}>Limpar filtros</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        ListHeaderComponent={
          filteredWorkouts.length > 0 ? (
            <Text style={styles.resultsCount}>
              {filteredWorkouts.length} treino{filteredWorkouts.length !== 1 ? 's' : ''} encontrado{filteredWorkouts.length !== 1 ? 's' : ''}
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: COLORS.grayLight,
    fontSize: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.grayDark,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.white,
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grayDark,
    padding: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  filterToggleActive: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent + '20',
  },
  filterToggleText: {
    color: COLORS.grayLight,
    fontWeight: '600',
  },
  filterToggleTextActive: {
    color: COLORS.accent,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayMedium,
  },
  filterSection: {
    gap: 12,
  },
  filterSectionTitle: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  filterRow: {
    gap: 8,
  },
  filterButton: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  filterButtonActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.grayLight,
    fontWeight: "600",
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  clearFiltersButton: {
    backgroundColor: COLORS.accent + '20',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  clearFiltersText: {
    color: COLORS.accent,
    fontWeight: '600',
  },
  workoutsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 16,
  },
  resultsCount: {
    color: COLORS.grayLight,
    fontSize: 14,
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  emptyText: {
    color: COLORS.grayLight,
    textAlign: 'center',
    fontSize: 16,
  },
  emptyActionText: {
    color: COLORS.accent,
    fontWeight: '600',
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { useWorkoutStore } from "@/store/workout-store";
import { COLORS } from "@/constants/colors";
import { Plus, X, Trophy, Calendar, TrendingUp } from "lucide-react-native";
import type { WorkoutResult, PersonalRecord } from "@/types/workout";

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ProgressScreen() {
  const { workoutHistory, personalRecords, addPersonalRecord, deletePersonalRecord } = useWorkoutStore();
  const [activeTab, setActiveTab] = useState<"history" | "prs">("history");
  const [showPRModal, setShowPRModal] = useState(false);
  const [newPR, setNewPR] = useState({ exercise: "", weight: "" });

  const handleAddPR = () => {
    if (!newPR.exercise.trim() || !newPR.weight.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha o exercício e a carga.");
      return;
    }

    const pr: PersonalRecord = {
      id: Date.now().toString(),
      exercise: newPR.exercise.trim(),
      weight: newPR.weight.trim(),
      date: new Date().toISOString(),
    };

    addPersonalRecord(pr);
    setNewPR({ exercise: "", weight: "" });
    setShowPRModal(false);
    Alert.alert("Sucesso", "Recorde pessoal adicionado!");
  };

  const handleDeletePR = (pr: PersonalRecord) => {
    Alert.alert(
      "Excluir Recorde",
      `Tem certeza que deseja excluir o recorde de ${pr.exercise}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deletePersonalRecord(pr.id),
        },
      ]
    );
  };

  const renderHistoryItem = ({ item }: { item: WorkoutResult }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.workoutName}</Text>
        <Text style={styles.cardDate}>{formatDateTime(item.completedAt)}</Text>
      </View>
      <Text style={styles.cardResult}>Resultado: {item.result}</Text>
      {item.personalRecords && item.personalRecords.length > 0 && (
        <View style={styles.prBadge}>
          <Trophy size={12} color={COLORS.accent} />
          <Text style={styles.prBadgeText}>
            {item.personalRecords.length} PR{item.personalRecords.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
    </View>
  );

  const renderPRItem = ({ item }: { item: PersonalRecord }) => (
    <TouchableOpacity 
      style={styles.card}
      onLongPress={() => handleDeletePR(item)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.exercise}</Text>
        <Trophy color={COLORS.accent} size={16} />
      </View>
      <Text style={styles.cardWeight}>{item.weight}</Text>
      <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
    </TouchableOpacity>
  );

  const stats = {
    totalWorkouts: workoutHistory.length,
    totalPRs: personalRecords.length,
    recentWorkouts: workoutHistory.slice(0, 7).length,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seu Progresso</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{stats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Treinos</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{stats.totalPRs}</Text>
            <Text style={styles.statLabel}>PRs</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{stats.recentWorkouts}</Text>
            <Text style={styles.statLabel}>7 dias</Text>
          </View>
        </View>
      </View>

      {/* Navegação por Abas */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "history" && styles.activeTab]}
          onPress={() => setActiveTab("history")}
        >
          <Calendar size={16} color={activeTab === "history" ? COLORS.white : COLORS.grayLight} />
          <Text style={[styles.tabText, activeTab === "history" && styles.activeTabText]}>
            Histórico
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "prs" && styles.activeTab]}
          onPress={() => setActiveTab("prs")}
        >
          <Trophy size={16} color={activeTab === "prs" ? COLORS.white : COLORS.grayLight} />
          <Text style={[styles.tabText, activeTab === "prs" && styles.activeTabText]}>
            Recordes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo da Aba Selecionada */}
      {activeTab === "history" ? (
        <FlatList
          data={workoutHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <TrendingUp size={48} color={COLORS.grayLight} />
              <Text style={styles.emptyText}>Nenhum treino concluído ainda.</Text>
              <Text style={styles.emptySubtext}>Complete seu primeiro WOD para ver seu progresso aqui!</Text>
            </View>
          }
        />
      ) : (
        <>
          <FlatList
            data={personalRecords}
            renderItem={renderPRItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Trophy size={48} color={COLORS.grayLight} />
                <Text style={styles.emptyText}>Nenhum recorde pessoal.</Text>
                <Text style={styles.emptySubtext}>Adicione seu primeiro recorde!</Text>
              </View>
            }
          />
          <TouchableOpacity style={styles.fab} onPress={() => setShowPRModal(true)}>
            <Plus color={COLORS.white} size={24} />
          </TouchableOpacity>
        </>
      )}

      {/* Modal para Adicionar PR */}
      <Modal
        visible={showPRModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPRModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Recorde Pessoal</Text>
              <TouchableOpacity onPress={() => setShowPRModal(false)}>
                <X color={COLORS.grayLight} size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.inputLabel}>Exercício</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Deadlift, Back Squat, Pull-up"
                placeholderTextColor={COLORS.grayLight}
                value={newPR.exercise}
                onChangeText={(text) => setNewPR({ ...newPR, exercise: text })}
              />

              <Text style={styles.inputLabel}>Carga/Resultado</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 150kg, 25 reps, 5:30 min"
                placeholderTextColor={COLORS.grayLight}
                value={newPR.weight}
                onChangeText={(text) => setNewPR({ ...newPR, weight: text })}
              />

              <Text style={styles.helpText}>
                💡 Dica: Inclua unidades (kg, reps, min) para referência futura
              </Text>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowPRModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.saveButton, (!newPR.exercise || !newPR.weight) && styles.saveButtonDisabled]}
                onPress={handleAddPR}
                disabled={!newPR.exercise || !newPR.weight}
              >
                <Text style={styles.saveButtonText}>Salvar Recorde</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayMedium,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.grayLight,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: COLORS.grayDark,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: COLORS.accent,
  },
  tabText: {
    color: COLORS.grayLight,
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: COLORS.white,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  cardDate: {
    color: COLORS.grayLight,
    fontSize: 12,
  },
  cardResult: {
    color: COLORS.success,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  cardWeight: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 4,
  },
  prBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 4,
  },
  prBadgeText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  emptyText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubtext: {
    color: COLORS.grayLight,
    fontSize: 14,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: COLORS.accent,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 20,
    width: '100%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayMedium,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    marginBottom: 16,
  },
  helpText: {
    color: COLORS.grayLight,
    fontSize: 14,
    fontStyle: 'italic',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayMedium,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.grayMedium,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.grayMedium,
    opacity: 0.5,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { useWorkoutStore } from "@/store/workout-store";
import { COLORS } from "@/constants/colors";
import { Plus } from "lucide-react-native";
import type { WorkoutResult, PersonalRecord } from "@/types/workout";

// Função para formatar a data de uma forma mais amigável
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function ProgressScreen() {
  const { workoutHistory, personalRecords, addPersonalRecord } = useWorkoutStore();
  const [activeTab, setActiveTab] = useState<"history" | "prs">("history");

  // Função para adicionar um novo Recorde Pessoal
  const handleAddPR = () => {
    Alert.prompt(
      "Novo Recorde Pessoal",
      "Digite o exercício e a carga (ex: Deadlift, 150kg)",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salvar",
          onPress: (text) => {
            if (text) {
              const [exercise, weight] = text.split(",").map(s => s.trim());
              if (exercise && weight) {
                const newPR: PersonalRecord = {
                  id: Date.now().toString(),
                  exercise,
                  weight,
                  date: new Date().toISOString(),
                };
                addPersonalRecord(newPR);
              } else {
                Alert.alert("Formato Inválido", "Por favor, use o formato: Exercício, Peso");
              }
            }
          },
        },
      ],
      "plain-text"
    );
  };

  // Componente para renderizar cada item do histórico
  const renderHistoryItem = ({ item }: { item: WorkoutResult }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.workoutName}</Text>
      <Text style={styles.cardSubtitle}>Resultado: {item.result}</Text>
      <Text style={styles.cardDate}>{formatDate(item.completedAt)}</Text>
    </View>
  );

  // Componente para renderizar cada item de PR
  const renderPRItem = ({ item }: { item: PersonalRecord }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.exercise}</Text>
      <Text style={styles.cardSubtitle}>Carga: {item.weight}</Text>
      <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seu Progresso</Text>
      </View>

      {/* Navegação por Abas */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "history" && styles.activeTab]}
          onPress={() => setActiveTab("history")}
        >
          <Text style={[styles.tabText, activeTab === "history" && styles.activeTabText]}>
            Histórico
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "prs" && styles.activeTab]}
          onPress={() => setActiveTab("prs")}
        >
          <Text style={[styles.tabText, activeTab === "prs" && styles.activeTabText]}>
            Recordes (PRs)
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
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum treino concluído ainda.</Text>}
        />
      ) : (
        <>
          <FlatList
            data={personalRecords}
            renderItem={renderPRItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum recorde pessoal registrado.</Text>}
          />
          <TouchableOpacity style={styles.fab} onPress={handleAddPR}>
            <Plus color={COLORS.white} size={24} />
          </TouchableOpacity>
        </>
      )}
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
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.white,
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: COLORS.grayMedium,
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: COLORS.accent,
    },
    tabText: {
        color: COLORS.grayLight,
        textAlign: 'center',
        fontWeight: '600',
    },
    activeTabText: {
        color: COLORS.white,
    },
    list: {
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: COLORS.grayMedium,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    cardTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '600',
    },
    cardSubtitle: {
        color: COLORS.success,
        fontSize: 16,
        marginVertical: 4,
    },
    cardDate: {
        color: COLORS.grayLight,
        fontSize: 12,
        marginTop: 8,
    },
    emptyText: {
        color: COLORS.grayLight,
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
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
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useWorkoutStore } from "@/store/workout-store";
import { COLORS } from "@/constants/colors";
import { ArrowLeft, Play, Pause, Square, CheckCircle, Info } from "lucide-react-native";
import type { WorkoutResult, Movement } from "@/types/workout";
import { WebView } from 'react-native-webview';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getWorkoutById, addWorkoutResult } = useWorkoutStore();
  const workout = getWorkoutById(id || "");

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [resultInput, setResultInput] = useState<string>("");
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleFinish = () => {
    setIsRunning(false);
    setShowResultModal(true);
  };

  const handleSaveResult = () => {
    if (resultInput.trim() && workout) {
      const workoutResult: WorkoutResult = {
        id: Date.now().toString(),
        workoutId: workout.id,
        workoutName: workout.name,
        result: resultInput.trim(),
        duration: time,
        completedAt: new Date().toISOString(),
      };
      addWorkoutResult(workoutResult);
      setShowResultModal(false);
      setResultInput("");
      Alert.alert(
        "Parabéns!",
        "Treino concluído e resultado salvo!",
        [{ text: "OK", onPress: () => router.back() }]
      );
    }
  };

  const handleMovementPress = (movement: Movement) => {
    if (movement.videoUrl) {
      setSelectedMovement(movement);
      setShowVideoModal(true);
    } else {
      Alert.alert("Sem vídeo", "Não há vídeo de demonstração para este movimento.");
    }
  };

  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: COLORS.white }}>Treino não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.workoutName}>{workout.name}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(time)}</Text>
        </View>

        <View style={styles.timerControls}>
            <PrimaryButton title={isRunning ? "Pausar" : "Iniciar"} onPress={() => setIsRunning(!isRunning)} style={{flex: 1}} />
            <PrimaryButton title="Resetar" onPress={() => setTime(0)} style={{flex: 1, backgroundColor: COLORS.grayMedium}} />
        </View>

        <View style={styles.workoutDetails}>
          <Text style={styles.workoutDescription}>{workout.description}</Text>
          
          {workout.description_scaled && (
            <View style={styles.scaledContainer}>
              <Info color={COLORS.accent} size={16} />
              <Text style={styles.scaledText}>{workout.description_scaled}</Text>
            </View>
          )}

          <Text style={styles.movementsTitle}>Movimentos</Text>
          {workout.movements.map((movement, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.movementItem}
              onPress={() => handleMovementPress(movement)}
            >
              <Text style={styles.movementName}>{movement.name}</Text>
              <Text style={styles.movementReps}>{movement.reps}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
          <PrimaryButton title="Finalizar e Salvar" onPress={handleFinish} style={{backgroundColor: COLORS.success}} />
      </View>

      {/* Modal para Salvar Resultado */}
      <Modal visible={showResultModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Salvar Resultado</Text>
                <TextInput
                    style={styles.resultInput}
                    value={resultInput}
                    onChangeText={setResultInput}
                    placeholder="Seu resultado (ex: 12:45, 15 rounds...)"
                    placeholderTextColor={COLORS.grayLight}
                    autoFocus
                />
                <View style={{flexDirection: 'row', gap: 10}}>
                    <PrimaryButton title="Cancelar" onPress={() => setShowResultModal(false)} style={{flex: 1, backgroundColor: COLORS.grayMedium}} />
                    <PrimaryButton title="Salvar" onPress={handleSaveResult} style={{flex: 1}} />
                </View>
            </View>
        </View>
      </Modal>

      {/* Modal para Vídeo */}
      <Modal visible={showVideoModal} transparent animationType="slide">
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.videoModalContainer}>
            <Text style={styles.modalTitle}>{selectedMovement?.name}</Text>
            <WebView
              style={styles.webview}
              source={{ uri: selectedMovement?.videoUrl || '' }}
            />
            <PrimaryButton title="Fechar" onPress={() => setShowVideoModal(false)} />
          </View>
        </SafeAreaView>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    workoutName: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    timerContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    timer: {
        fontSize: 72,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    timerControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
        gap: 10,
    },
    workoutDetails: {
        backgroundColor: COLORS.grayMedium,
        borderRadius: 16,
        padding: 20,
    },
    workoutDescription: {
        color: COLORS.white,
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    scaledContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.accent + '20',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        gap: 8,
    },
    scaledText: {
        color: COLORS.grayLight,
        fontSize: 14,
        lineHeight: 20,
        flex: 1,
    },
    movementsTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    movementItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
    },
    movementName: {
        color: COLORS.grayLight,
        fontSize: 16,
    },
    movementReps: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.grayMedium,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: COLORS.grayMedium,
        borderRadius: 16,
        padding: 20,
        width: '100%',
    },
    modalTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    resultInput: {
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        marginBottom: 20,
    },
    videoModalContainer: {
        backgroundColor: COLORS.grayMedium,
        borderRadius: 16,
        padding: 16,
        width: '100%',
        height: '50%',
    },
    webview: {
        flex: 1,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        marginBottom: 16,
    },
});

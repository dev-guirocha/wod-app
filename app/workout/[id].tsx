import React, { useState, useEffect, useRef } from "react";
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
  Animated,
  Easing,
  Vibration,
  Platform,
  StatusBar,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useWorkoutStore } from "@/store/workout-store";
import { COLORS } from "@/constants/colors";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Square, 
  CheckCircle, 
  Info, 
  X,
  Trophy,
  Clock,
  AlertCircle
} from "lucide-react-native";
import type { WorkoutResult, Movement, PersonalRecord } from "@/types/workout";
import { WebView } from 'react-native-webview';
import PrimaryButton from "@/components/PrimaryButton";

// Componente para o botão de controle do timer
const TimerButton = ({ 
  icon: Icon, 
  onPress, 
  color = COLORS.white,
  size = 24 
}: { 
  icon: React.ComponentType<any>;
  onPress: () => void;
  color?: string;
  size?: number;
}) => (
  <TouchableOpacity 
    style={styles.timerButton} 
    onPress={onPress}
    hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
  >
    <Icon color={color} size={size} />
  </TouchableOpacity>
);

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getWorkoutById, addWorkoutResult, addPersonalRecord } = useWorkoutStore();
  const workout = getWorkoutById(id || "");

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [resultInput, setResultInput] = useState<string>("");
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
  const [showPRModal, setShowPRModal] = useState<boolean>(false);
  const [currentPR, setCurrentPR] = useState<{ exercise: string; weight: string }>({ 
    exercise: "", 
    weight: "" 
  });
  const [completedMovements, setCompletedMovements] = useState<Set<string>>(new Set());
  const [showTips, setShowTips] = useState<boolean>(true);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animação de pulso para o timer quando está rodando
  useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRunning, pulseAnim]);

  // Animação de fade-in para a tela
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Vibrar em intervalos específicos (ex: a cada minuto)
  useEffect(() => {
    if (isRunning && time > 0 && time % 60 === 0) {
      Vibration.vibrate(500);
    }
  }, [time, isRunning]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggleMovement = (movementId: string) => {
    const newCompleted = new Set(completedMovements);
    if (newCompleted.has(movementId)) {
      newCompleted.delete(movementId);
    } else {
      newCompleted.add(movementId);
      Vibration.vibrate(100); // Feedback tátil
    }
    setCompletedMovements(newCompleted);
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
        personalRecords: Array.from(completedMovements).map(id => {
          const movement = workout.movements.find(m => m.id === id);
          return movement ? { exercise: movement.name, weight: "PR", date: new Date().toISOString() } : null;
        }).filter(Boolean) as PersonalRecord[],
      };
      
      addWorkoutResult(workoutResult);
      
      // Adicionar PRs marcados
      completedMovements.forEach(movementId => {
        const movement = workout.movements.find(m => m.id === movementId);
        if (movement) {
          addPersonalRecord({
            id: Date.now().toString() + movementId,
            exercise: movement.name,
            weight: "PR",
            date: new Date().toISOString(),
          });
        }
      });
      
      setShowResultModal(false);
      setResultInput("");
      Alert.alert(
        "🏆 Parabéns!",
        "Treino concluído com sucesso!",
        [{ 
          text: "Ver Resultados", 
          onPress: () => router.push("/(tabs)/progress") 
        }]
      );
    }
  };

  const handleMovementPress = (movement: Movement) => {
    if (movement.videoUrl) {
      setSelectedMovement(movement);
      setShowVideoModal(true);
    } else {
      Alert.alert(
        "Sem vídeo", 
        "Não há vídeo de demonstração para este movimento.",
        [{ text: "OK" }]
      );
    }
  };

  const handleAddPR = (movement: Movement) => {
    setCurrentPR({ exercise: movement.name, weight: "" });
    setShowPRModal(true);
  };

  const savePR = () => {
    if (currentPR.exercise && currentPR.weight) {
      addPersonalRecord({
        id: Date.now().toString(),
        exercise: currentPR.exercise,
        weight: currentPR.weight,
        date: new Date().toISOString(),
      });
      setShowPRModal(false);
      setCurrentPR({ exercise: "", weight: "" });
      Alert.alert("✅", "Recorde pessoal salvo!");
    }
  };

  const getWorkoutIntensity = () => {
    if (!workout) return "";
    const duration = workout.estimatedDuration;
    if (duration <= 10) return "Alta Intensidade";
    if (duration <= 20) return "Intensidade Moderada";
    return "Baixa Intensidade (Endurance)";
  };

  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color={COLORS.error} />
          <Text style={styles.errorText}>Treino não encontrado</Text>
          <PrimaryButton 
            title="Voltar" 
            onPress={() => router.back()} 
            style={{ marginTop: 20 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const allMovementsCompleted = completedMovements.size === workout.movements.length;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
        >
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.workoutName} numberOfLines={1}>
            {workout.name}
          </Text>
          <Text style={styles.workoutType}>{workout.type}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => setShowTips(!showTips)}
          style={styles.infoButton}
        >
          <Info color={COLORS.grayLight} size={20} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Timer Section */}
        <Animated.View 
          style={[
            styles.timerContainer, 
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <Text style={styles.timer}>{formatTime(time)}</Text>
          <Text style={styles.intensityText}>{getWorkoutIntensity()}</Text>
        </Animated.View>

        {/* Timer Controls */}
        <View style={styles.timerControls}>
          <TimerButton 
            icon={isRunning ? Pause : Play} 
            onPress={() => setIsRunning(!isRunning)}
            color={isRunning ? COLORS.accent : COLORS.success}
            size={28}
          />
          
          <TimerButton 
            icon={Square} 
            onPress={() => {
              setIsRunning(false);
              setTime(0);
              setCompletedMovements(new Set());
            }}
            color={COLORS.error}
          />
          
          <TimerButton 
            icon={CheckCircle} 
            onPress={handleFinish}
            color={allMovementsCompleted ? COLORS.success : COLORS.grayLight}
            size={28}
          />
        </View>

        {/* Dicas Rápidas */}
        {showTips && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Dicas para este WOD</Text>
            <Text style={styles.tipsText}>
              • Mantenha o ritmo constante{'\n'}
              • Foque na técnica{'\n'}
              • Hidrate-se durante o treino{'\n'}
              • Marque os PRs conquistados
            </Text>
            <TouchableOpacity 
              onPress={() => setShowTips(false)}
              style={styles.closeTipsButton}
            >
              <X size={16} color={COLORS.grayLight} />
            </TouchableOpacity>
          </View>
        )}

        {/* Workout Details */}
        <View style={styles.workoutDetails}>
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Clock size={16} color={COLORS.accent} />
              <Text style={styles.metaText}>{workout.estimatedDuration} min</Text>
            </View>
            <View style={styles.metaItem}>
              <Trophy size={16} color={COLORS.accent} />
              <Text style={styles.metaText}>
                {workout.movements.length} movimento{workout.movements.length !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          <Text style={styles.workoutDescription}>{workout.description}</Text>
          
          {workout.description_scaled && (
            <View style={styles.scaledContainer}>
              <Info color={COLORS.accent} size={16} />
              <Text style={styles.scaledText}>{workout.description_scaled}</Text>
            </View>
          )}

          {/* Movements List */}
          <Text style={styles.sectionTitle}>Movimentos</Text>
          {workout.movements.map((movement, index) => {
            const isCompleted = completedMovements.has(movement.id);
            return (
              <View key={movement.id || index} style={styles.movementCard}>
                <TouchableOpacity 
                  style={[
                    styles.movementHeader,
                    isCompleted && styles.movementCompleted
                  ]}
                  onPress={() => handleToggleMovement(movement.id)}
                >
                  <View style={styles.movementInfo}>
                    <Text style={[
                      styles.movementName,
                      isCompleted && styles.movementNameCompleted
                    ]}>
                      {movement.name}
                    </Text>
                    <Text style={styles.movementReps}>{movement.reps}</Text>
                  </View>
                  
                  <View style={styles.movementActions}>
                    {movement.videoUrl && (
                      <TouchableOpacity 
                        onPress={() => handleMovementPress(movement)}
                        style={styles.actionButton}
                      >
                        <Info size={18} color={COLORS.grayLight} />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                      onPress={() => handleAddPR(movement)}
                      style={styles.actionButton}
                    >
                      <Trophy size={18} color={COLORS.accent} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                
                {movement.description && (
                  <Text style={styles.movementDescription}>
                    {movement.description}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <PrimaryButton 
          title={`Finalizar - ${formatTime(time)}`}
          onPress={handleFinish}
          icon={CheckCircle}
          style={{
            backgroundColor: allMovementsCompleted ? COLORS.success : COLORS.accent
          }}
        />
      </View>

      {/* Modal para Salvar Resultado */}
      <Modal visible={showResultModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>🎯 Salvar Resultado</Text>
            <Text style={styles.modalSubtitle}>
              Tempo: {formatTime(time)}
            </Text>
            
            <TextInput
              style={styles.resultInput}
              value={resultInput}
              onChangeText={setResultInput}
              placeholder="Ex: 12:45, 15 rounds + 3 reps, 185lb"
              placeholderTextColor={COLORS.grayLight}
              autoFocus
              multiline
              numberOfLines={2}
            />
            
            <View style={styles.modalButtons}>
              <PrimaryButton 
                title="Cancelar" 
                onPress={() => setShowResultModal(false)}
                style={styles.cancelButton}
                textStyle={styles.cancelButtonText}
              />
              <PrimaryButton 
                title="Salvar Resultado" 
                onPress={handleSaveResult}
                disabled={!resultInput.trim()}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Vídeo */}
      <Modal visible={showVideoModal} transparent animationType="slide">
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.videoModalContainer}>
            <View style={styles.videoHeader}>
              <Text style={styles.videoTitle}>{selectedMovement?.name}</Text>
              <TouchableOpacity 
                onPress={() => setShowVideoModal(false)}
                style={styles.closeButton}
              >
                <X size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            
            <WebView
              style={styles.webview}
              source={{ uri: selectedMovement?.videoUrl || '' }}
              allowsFullscreenVideo
              javaScriptEnabled
              domStorageEnabled
            />
            
            {selectedMovement?.description && (
              <Text style={styles.videoDescription}>
                {selectedMovement.description}
              </Text>
            )}
          </View>
        </SafeAreaView>
      </Modal>

      {/* Modal para Adicionar PR */}
      <Modal visible={showPRModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>🏆 Novo Recorde Pessoal</Text>
            <Text style={styles.prExercise}>{currentPR.exercise}</Text>
            
            <TextInput
              style={styles.resultInput}
              value={currentPR.weight}
              onChangeText={(text) => setCurrentPR({ ...currentPR, weight: text })}
              placeholder="Ex: 150kg, 25 reps, 5:30 min"
              placeholderTextColor={COLORS.grayLight}
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <PrimaryButton 
                title="Cancelar" 
                onPress={() => setShowPRModal(false)}
                style={styles.cancelButton}
                textStyle={styles.cancelButtonText}
              />
              <PrimaryButton 
                title="Salvar PR" 
                onPress={savePR}
                disabled={!currentPR.weight.trim()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: COLORS.white,
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayMedium,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.grayDark,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  workoutName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  workoutType: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  infoButton: {
    padding: 8,
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: COLORS.white,
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  intensityText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 30,
  },
  timerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.grayDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.grayMedium,
  },
  tipsContainer: {
    backgroundColor: COLORS.accent + '20',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  tipsTitle: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipsText: {
    color: COLORS.grayLight,
    fontSize: 14,
    lineHeight: 20,
  },
  closeTipsButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  workoutDetails: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  workoutDescription: {
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  scaledContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.accent + '15',
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
  sectionTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  movementCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  movementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  movementCompleted: {
    backgroundColor: COLORS.success + '20',
  },
  movementInfo: {
    flex: 1,
  },
  movementName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  movementNameCompleted: {
    color: COLORS.success,
    textDecorationLine: 'line-through',
  },
  movementReps: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '500',
  },
  movementActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.grayDark,
  },
  movementDescription: {
    color: COLORS.grayLight,
    fontSize: 14,
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayMedium,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayMedium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalSubtitle: {
    color: COLORS.grayLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  prExercise: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: '600',
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
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.grayMedium,
  },
  cancelButtonText: {
    color: COLORS.white,
  },
  videoModalContainer: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 20,
    width: '100%',
    height: '80%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayMedium,
  },
  videoTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    padding: 4,
  },
  webview: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  videoDescription: {
    color: COLORS.grayLight,
    fontSize: 14,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayMedium,
  },
});
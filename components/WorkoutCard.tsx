import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated,
  Platform 
} from 'react-native';
import { router } from 'expo-router';
import type { Workout } from '@/types/workout';
import { COLORS } from '@/constants/colors';
import { 
  Clock, 
  Dumbbell, 
  TrendingUp, 
  User,
  ArrowRight 
} from 'lucide-react-native';

interface Props {
  workout: Workout;
  showType?: boolean;
  showEquipment?: boolean;
  showDuration?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

const WorkoutCard = ({ 
  workout, 
  showType = true,
  showEquipment = true,
  showDuration = true,
  variant = 'default'
}: Props) => {
  const scaleValue = new Animated.Value(1);
  
  // Garante que o equipamento seja sempre uma lista para evitar erros
  const equipmentList = Array.isArray(workout.equipment) ? workout.equipment : [];
  const hasEquipment = equipmentList.length > 0 && equipmentList[0] !== 'none';
  const movementCount = workout.movements?.length || 0;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePress = () => {
    router.push(`/workout/${workout.id}`);
  };

  const getIntensityColor = (duration: number) => {
    if (duration <= 10) return COLORS.success; // Baixa
    if (duration <= 20) return COLORS.warning; // Média
    return COLORS.error; // Alta
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return styles.compactContainer;
      case 'featured':
        return styles.featuredContainer;
      default:
        return styles.defaultContainer;
    }
  };

  const renderDefaultCard = () => (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[styles.cardContainer, getVariantStyles()]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {/* Header com nome e metadados */}
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.workoutName} numberOfLines={2}>
              {workout.name}
            </Text>
            {showType && (
              <Text style={styles.workoutType}>{workout.type}</Text>
            )}
          </View>
          
          {showDuration && (
            <View style={styles.durationBadge}>
              <Clock 
                color={getIntensityColor(workout.estimatedDuration)} 
                size={12} 
              />
              <Text style={[
                styles.durationText,
                { color: getIntensityColor(workout.estimatedDuration) }
              ]}>
                {workout.estimatedDuration}m
              </Text>
            </View>
          )}
        </View>

        {/* Descrição */}
        <Text style={styles.workoutDescription} numberOfLines={variant === 'compact' ? 1 : 2}>
          {workout.description}
        </Text>

        {/* Metadados footer */}
        <View style={styles.cardFooter}>
          <View style={styles.metadata}>
            {movementCount > 0 && (
              <View style={styles.metaItem}>
                <TrendingUp size={12} color={COLORS.grayLight} />
                <Text style={styles.metaText}>{movementCount} movimentos</Text>
              </View>
            )}
            
            {hasEquipment && showEquipment && (
              <View style={styles.metaItem}>
                <Dumbbell size={12} color={COLORS.accent} />
                <Text style={styles.equipmentText}>
                  {equipmentList.slice(0, 2).join(", ")}
                  {equipmentList.length > 2 && "..."}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.arrowContainer}>
            <ArrowRight size={16} color={COLORS.accent} />
          </View>
        </View>

        {/* Badge de featured */}
        {variant === 'featured' && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>⭐ DESTAQUE</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  const renderCompactCard = () => (
    <TouchableOpacity
      style={[styles.cardContainer, styles.compactContainer]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.compactContent}>
        <View style={styles.compactText}>
          <Text style={styles.compactName} numberOfLines={1}>
            {workout.name}
          </Text>
          <Text style={styles.compactType}>{workout.type}</Text>
        </View>
        <View style={styles.compactMeta}>
          <Clock size={12} color={COLORS.grayLight} />
          <Text style={styles.compactDuration}>{workout.estimatedDuration}m</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return variant === 'compact' ? renderCompactCard() : renderDefaultCard();
};

const styles = StyleSheet.create({
  // Container base
  cardContainer: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  defaultContainer: {
    minHeight: 140,
  },
  featuredContainer: {
    backgroundColor: COLORS.accent + '10',
    borderColor: COLORS.accent + '30',
    minHeight: 160,
  },
  compactContainer: {
    padding: 12,
    minHeight: 60,
  },
  // Header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
    lineHeight: 22,
  },
  workoutType: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Descrição
  workoutDescription: {
    fontSize: 14,
    color: COLORS.grayLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  // Footer
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metadata: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.grayLight,
  },
  equipmentText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  arrowContainer: {
    padding: 4,
  },
  // Featured badge
  featuredBadge: {
    position: 'absolute',
    top: -6,
    right: 16,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  // Compact variant
  compactContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactText: {
    flex: 1,
    marginRight: 12,
  },
  compactName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 2,
  },
  compactType: {
    fontSize: 11,
    color: COLORS.accent,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  compactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactDuration: {
    fontSize: 12,
    color: COLORS.grayLight,
    fontWeight: '500',
  },
});

export default WorkoutCard;
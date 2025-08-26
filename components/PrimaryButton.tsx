import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  View,
  GestureResponderEvent 
} from 'react-native';
import { COLORS } from '@/constants/colors';
import type { LucideIcon } from 'lucide-react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  style?: object;
  textStyle?: object;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary' | 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  icon: Icon,
  style,
  textStyle,
  iconPosition = 'left',
  variant = 'primary',
  size = 'medium',
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.buttonSecondary;
      case 'success':
        return styles.buttonSuccess;
      case 'error':
        return styles.buttonError;
      default:
        return styles.buttonPrimary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.buttonSmall;
      case 'large':
        return styles.buttonLarge;
      default:
        return styles.buttonMedium;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.textSmall;
      case 'large':
        return styles.textLarge;
      default:
        return styles.textMedium;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
    >
      {loading ? (
        <ActivityIndicator 
          color={COLORS.white} 
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <View style={styles.buttonContent}>
          {Icon && iconPosition === 'left' && (
            <Icon 
              size={size === 'small' ? 16 : 20} 
              color={COLORS.white} 
              style={styles.iconLeft}
            />
          )}
          
          <Text style={[
            styles.text,
            getTextSizeStyle(),
            disabled && styles.textDisabled,
            textStyle,
          ]}>
            {title}
          </Text>

          {Icon && iconPosition === 'right' && (
            <Icon 
              size={size === 'small' ? 16 : 20} 
              color={COLORS.white} 
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 100,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: COLORS.accent,
  },
  buttonSecondary: {
    backgroundColor: COLORS.grayMedium,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  buttonSuccess: {
    backgroundColor: COLORS.success,
  },
  buttonError: {
    backgroundColor: COLORS.error,
  },
  buttonDisabled: {
    backgroundColor: COLORS.grayMedium,
    opacity: 0.6,
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  buttonMedium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  textDisabled: {
    color: COLORS.grayLight,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default PrimaryButton;
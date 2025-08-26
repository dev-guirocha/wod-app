// Paleta de cores completa para o aplicativo WOD (Workout Of the Day)
// Design system inspirado em CrossFit - Energético, Motivacional e Funcional

export const COLORS = {
  // ===== CORES PRIMÁRIAS =====
  primary: '#0F0F0F',           // Preto profundo (Fundo principal)
  primaryDark: '#050505',       // Preto mais escuro (Headers, elementos destacados)
  primaryLight: '#1A1A1A',      // Preto claro (Cards, containers)
  
  // ===== CORES DE ENERGIA (ACCENT) =====
  accent: '#FF6B00',            // Laranja vibrante (Principal - Botões, ações primárias)
  accentDark: '#E55D00',        // Laranja escuro (Hover, pressed states)
  accentLight: '#FF8C42',       // Laranja claro (Secondary actions)
  accentMuted: '#FFA366',       // Laranja suave (Backgrounds, highlights)
  
  // ===== CORES DE PERFORMANCE =====
  performance: {
    high: '#FF4757',           // Vermelho - Alta intensidade
    medium: '#FFA502',         // Âmbar - Média intensidade  
    low: '#2ED573',            // Verde - Baixa intensidade
    endurance: '#3742FA',      // Azul - Treinos de endurance
    strength: '#FF6348',       // Coral - Treinos de força
  },
  
  // ===== CORES DE STATUS =====
  success: '#14B8A6',          // Verde turquesa (Sucesso, conclusão)
  successDark: '#0D9488',      // Verde turquesa escuro
  successLight: '#2DD4BF',     // Verde turquesa claro
  
  warning: '#F59E0B',          // Âmbar (Avisos, atenção)
  warningDark: '#D97706',      // Âmbar escuro
  warningLight: '#FBBF24',     // Âmbar claro
  
  error: '#EF4444',            // Vermelho (Erros, perigo)
  errorDark: '#DC2626',        // Vermelho escuro
  errorLight: '#F87171',       // Vermelho claro
  
  info: '#3B82F6',             // Azul (Informações)
  infoDark: '#2563EB',         // Azul escuro
  infoLight: '#60A5FA',        // Azul claro
  
  // ===== ESCALA DE CINZAS =====
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',             // Quase branco (Backgrounds muito claros)
    100: '#F4F4F5',            // Cinza muito claro
    200: '#E4E4E7',            // Cinza claro (Bordas, dividers)
    300: '#D4D4D8',            // Cinza médio-claro
    400: '#A1A1AA',            // Cinza médio (Texto secundário)
    500: '#71717A',            // Cinza médio-escuro
    600: '#52525B',            // Cinza escuro (Texto primário em fundo claro)
    700: '#3F3F46',            // Cinza muito escuro
    800: '#27272A',            // Cinza quase preto
    900: '#18181B',            // Cinza preto
  },
  
  // ===== CORES DE ELEVATION/SHADOWS =====
  elevation: {
    1: 'rgba(0, 0, 0, 0.05)',
    2: 'rgba(0, 0, 0, 0.1)',
    3: 'rgba(0, 0, 0, 0.15)',
    4: 'rgba(0, 0, 0, 0.2)',
    5: 'rgba(0, 0, 0, 0.3)',
  },
  
  // ===== CORES ESPECÍFICAS PARA WORKOUTS =====
  workout: {
    amrap: '#FF6B00',          // AMRAP - Laranja energético
    forTime: '#EF4444',        // For Time - Vermelho intenso
    emom: '#3B82F6',           // EMOM - Azul focado
    tabata: '#8B5CF6',         // Tabata - Roxo dinâmico
    strength: '#F59E0B',       // Strength - Âmbar forte
    endurance: '#14B8A6',      // Endurance - Verde resistência
  },
  
  // ===== CORES DE EQUIPAMENTOS =====
  equipment: {
    barbell: '#FF6B00',        // Barbell - Laranja
    dumbbell: '#3B82F6',       // Dumbbell - Azul
    kettlebell: '#EF4444',     // Kettlebell - Vermelho
    pullUpBar: '#14B8A6',      // Pull-up Bar - Verde
    rope: '#8B5CF6',           // Rope - Roxo
    box: '#F59E0B',            // Box - Âmbar
    none: '#A1A1AA',           // Sem equipamento - Cinza
  },
  
  // ===== GRADIENTES =====
  gradients: {
    primary: ['#FF6B00', '#FF8C42'],           // Laranja
    success: ['#14B8A6', '#2DD4BF'],           // Verde
    energy: ['#FF4757', '#FF6B00'],            // Vermelho → Laranja
    coolDown: ['#3B82F6', '#8B5CF6'],          // Azul → Roxo
    warmUp: ['#FFA502', '#FF6B00'],            // Âmbar → Laranja
  },
  
  // ===== CORES DE TEXTO =====
  text: {
    primary: '#FFFFFF',        // Texto primário (em fundos escuros)
    secondary: '#A1A1AA',      // Texto secundário
    accent: '#FF6B00',         // Texto de destaque
    inverted: '#0F0F0F',       // Texto em fundos claros
    disabled: '#71717A',       // Texto desabilitado
  },
  
  // ===== CORES DE BACKGROUND =====
  background: {
    primary: '#0F0F0F',        // Fundo principal
    secondary: '#1A1A1A',      // Fundo secundário (cards)
    tertiary: '#27272A',       // Fundo terciário (inputs)
    overlay: 'rgba(0, 0, 0, 0.8)', // Overlay para modals
  },
  
  // ===== CORES DE BORDAS =====
  border: {
    light: '#333333',          // Borda clara
    medium: '#404040',         // Borda média
    dark: '#555555',           // Borda escura
    accent: '#FF6B00',         // Borda de destaque
  },
  
  // ===== CORES DE FEEDBACK =====
  feedback: {
    positive: 'rgba(20, 184, 166, 0.1)',      // Fundo sucesso
    negative: 'rgba(239, 68, 68, 0.1)',       // Fundo erro
    warning: 'rgba(245, 158, 11, 0.1)',       // Fundo aviso
    info: 'rgba(59, 130, 246, 0.1)',          // Fundo informação
  }
} as const;

// ===== UTILITÁRIOS =====
export type ColorPalette = typeof COLORS;
export type ColorToken = keyof ColorPalette;

// Função utilitária para opacidade
export const withOpacity = (color: string, opacity: number): string => {
  // Converte hex para rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Função para escurecer/clarear cores (útil para hover states)
export const adjustColor = (color: string, amount: number): string => {
  // Implementação simplificada - em produção use uma lib como polished
  return color; // Placeholder - implementar se necessário
};

// Mapa de cores para tipos de workout
export const WORKOUT_TYPE_COLORS = {
  AMRAP: COLORS.workout.amrap,
  'For Time': COLORS.workout.forTime,
  EMOM: COLORS.workout.emom,
  Tabata: COLORS.workout.tabata,
  Strength: COLORS.workout.strength,
  Endurance: COLORS.workout.endurance,
  default: COLORS.accent,
} as const;

// Mapa de cores para equipamentos
export const EQUIPMENT_COLORS = {
  barbell: COLORS.equipment.barbell,
  dumbbell: COLORS.equipment.dumbbell,
  kettlebell: COLORS.equipment.kettlebell,
  'pull-up bar': COLORS.equipment.pullUpBar,
  rope: COLORS.equipment.rope,
  box: COLORS.equipment.box,
  none: COLORS.equipment.none,
  default: COLORS.gray[400],
} as const;

// ===== TEMAS ESPECÍFICOS =====
export const LIGHT_THEME = {
  // Implementação básica para futuro suporte a light theme
  primary: '#FFFFFF',
  text: {
    primary: '#0F0F0F',
    secondary: '#71717A',
  },
  background: {
    primary: '#FAFAFA',
    secondary: '#FFFFFF',
  }
} as const;

// Export padrão mantido para compatibilidade
export default COLORS;
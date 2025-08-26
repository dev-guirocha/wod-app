import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useAuthStore } from "@/store/auth-store";
import { useWorkoutStore } from "@/store/workout-store";
import { COLORS } from "@/constants/colors";
import { 
  User, Edit, Crown, Settings, HelpCircle, LogOut, 
  Award, Calendar, Activity 
} from "lucide-react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { workoutHistory, personalRecords } = useWorkoutStore();

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", 
          onPress: logout 
        },
      ]
    );
  };

  const stats = [
    {
      icon: Activity,
      label: "Treinos Concluídos",
      value: workoutHistory.length,
      color: COLORS.success,
    },
    {
      icon: Award,
      label: "Recordes Pessoais",
      value: personalRecords.length,
      color: COLORS.accent,
    },
    {
      icon: Calendar,
      label: "Dias Ativo",
      value: new Set(workoutHistory.map(w => w.completedAt.split('T')[0])).size,
      color: COLORS.info,
    },
  ];

  const menuItems = [
    {
      icon: Edit,
      title: "Editar Perfil",
      onPress: () => Alert.alert("Em breve", "Funcionalidade em desenvolvimento"),
    },
    {
      icon: Crown,
      title: "Seja Premium",
      onPress: () => Alert.alert("Em breve", "Funcionalidade em desenvolvimento"),
      premium: true,
    },
    {
      icon: Settings,
      title: "Configurações",
      onPress: () => Alert.alert("Em breve", "Funcionalidade em desenvolvimento"),
    },
    {
      icon: HelpCircle,
      title: "Ajuda & Suporte",
      onPress: () => Alert.alert("Em breve", "Funcionalidade em desenvolvimento"),
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header com Informações do Usuário */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name ? getInitials(user.name) : 'A'}
              </Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Edit color={COLORS.white} size={16} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user?.name || 'Atleta'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          
          {/* Estatísticas */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <stat.icon color={stat.color} size={20} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu de Opções */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Conta</Text>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem} 
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <item.icon 
                  color={item.premium ? COLORS.accent : COLORS.grayLight} 
                  size={22} 
                />
                <Text style={[
                  styles.menuItemTitle,
                  item.premium && styles.premiumText
                ]}>
                  {item.title}
                </Text>
              </View>
              {item.premium && (
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumBadgeText}>PRO</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          {/* Logout */}
          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <LogOut color={COLORS.error} size={22} />
            <Text style={[styles.menuItemTitle, styles.logoutText]}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Informações do App */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>WOD App v1.0.0</Text>
          <Text style={styles.footerText}>Desenvolvido para atletas de CrossFit</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayMedium,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.grayDark,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.grayLight,
    marginBottom: 24,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.grayLight,
    textAlign: 'center',
  },
  menuContainer: {
    padding: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 16,
  },
  menuItem: {
    backgroundColor: COLORS.grayDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
  premiumText: {
    color: COLORS.accent,
  },
  premiumBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  premiumBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: COLORS.error + '20',
  },
  logoutText: {
    color: COLORS.error,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    color: COLORS.grayLight,
    fontSize: 12,
    textAlign: 'center',
  },
});
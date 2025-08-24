import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useAuthStore } from "@/store/auth-store";
import { COLORS } from "@/constants/colors";
import { User, Edit, Crown, Settings, HelpCircle, LogOut } from "lucide-react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: logout },
      ]
    );
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <User color={COLORS.white} size={40} />
          </View>
          <Text style={styles.userName}>{user?.name || 'Atleta'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <item.icon color={COLORS.grayLight} size={20} />
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
            <LogOut color={COLORS.accent} size={20} />
            <Text style={[styles.menuItemTitle, styles.logoutText]}>Sair</Text>
          </TouchableOpacity>
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.grayMedium,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.grayLight,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    backgroundColor: COLORS.grayMedium,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: COLORS.accent + '20', // Fundo levemente alaranjado
  },
  logoutText: {
    color: COLORS.accent,
  },
});

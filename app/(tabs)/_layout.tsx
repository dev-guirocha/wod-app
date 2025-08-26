import React from "react";
import { Tabs } from "expo-router";
import { Home, Search, TrendingUp, User } from "lucide-react-native";
import { COLORS } from "@/constants/colors";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.grayLight,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopColor: COLORS.grayMedium,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: Platform.OS === 'ios' ? 0 : 5,
        },
        // Adiciona safe area para dispositivos com notch
        tabBarSafeAreaInsets: {
          bottom: Platform.OS === 'ios' ? 0 : 10,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hoje",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          // Adiciona acessibilidade
          tabBarAccessibilityLabel: "Tela inicial com WOD do dia"
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
          tabBarAccessibilityLabel: "Explorar treinos e exercícios"
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progresso",
          tabBarIcon: ({ color, size }) => <TrendingUp color={color} size={size} />,
          tabBarAccessibilityLabel: "Seu progresso e recordes"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          tabBarAccessibilityLabel: "Seu perfil e configurações"
        }}
      />
    </Tabs>
  );
}
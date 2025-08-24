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
        tabBarInactiveTintColor: COLORS.grayLight, // Cor ajustada para melhor visibilidade
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopColor: COLORS.grayMedium,
          height: Platform.OS === 'ios' ? 90 : 70, // Altura ajustada para cada plataforma
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hoje",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progresso",
          tabBarIcon: ({ color, size }) => <TrendingUp color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

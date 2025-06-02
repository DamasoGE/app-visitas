import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import PickerProperty from "../../components/PickerProperty";
import { useSeller } from "../../hooks/useSeller";
import { primaryColor, stylesTheme } from "../../styles/theme";
import { useAuth } from "../../hooks/useAuth";

export default function TabLayout() {
  const { fetchProfile, loading, seller } = useSeller();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchprofileUser = async () => {
      await fetchProfile();
    };
    fetchprofileUser();
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfile();
    setRefreshing(false);
  };

  if (loading || !seller) {
    return (
      <View style={stylesTheme.centeredContainer}>
        <ActivityIndicator size="large" color="#FF6300" />
      </View>
    );
  }

  return (
    <View style={stylesTheme.flex1Container}>
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#FF6300"]}
            />
          }
          keyboardShouldPersistTaps="handled"
        >
          <HeaderComponent />
          <PickerProperty />
        </ScrollView>
      </View>

      <View style={stylesTheme.flex1Container}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: primaryColor,
            tabBarStyle: {
              backgroundColor: "#fff",
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Semanal",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "today" : "today-outline"}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="visit"
            options={{
              title: "Agenda",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="ads"
            options={{
              title: "Anuncios",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "chatbox" : "chatbox-outline"}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="documents"
            options={{
              title: "Documentos",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "document" : "document-outline"}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

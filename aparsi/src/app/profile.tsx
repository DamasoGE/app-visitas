import React, { useState } from "react";
import { Switch, ScrollView, Platform, Alert, Modal, Image, View, Text, TouchableOpacity, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSeller } from "../hooks/useSeller";
import { useAuth } from "../hooks/useAuth";
import HeaderComponent from "../components/HeaderComponent";
import { stylesProfile } from "../styles/profile";
import { stylesTheme } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { seller, setSeller, toggleRequireAsesor, changePassword } =
    useSeller();
  const { logout } = useAuth();
  const [loadingChange, setLoadingChange] = useState(false);
  const [requireAsesor, setRequireAsesor] = useState<boolean>(
    !!seller?.requireAsesor
  );
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Evitar ejecutar si seller no existe
  const handleToggleSwitch = async () => {
    if (!seller?._id) {
      setError("Usuario no válido.");
      return;
    }
    try {
      setRequireAsesor(!requireAsesor);
      await toggleRequireAsesor(seller._id);
    } catch {
      setError("No se pudo actualizar el estado de asesor.");
    }
  };

  const handlePasswordChange = async () => {
    if (!seller?._id) {
      setError("Usuario no válido.");
      return;
    }
    if (!password || !confirmPassword || !currentPassword) {
      return setError("Todos los campos son obligatorios.");
    }

    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden.");
    }

    setLoadingChange(true);
    try {
      const changePasswordSuccess = await changePassword(
        seller._id,
        currentPassword,
        password
      );
      if (changePasswordSuccess) {
        setError("");
        setPassword("");
        setConfirmPassword("");
        setCurrentPassword("");
        setShowChangePassword(false);
      } else {
        setError("Error al cambiar la contraseña.");
      }
    } catch {
      setError("Error al cambiar la contraseña.");
    } finally {
      setLoadingChange(false);
    }
  };

  const confirmLogout = async () => {
    const success = await logout();
    if (success) {
      setSeller(null);
      router.replace("/login");
    } else {
      Alert.alert("Error", "No se pudo cerrar sesión. Intenta de nuevo.");
    }
  };

  const handleLogout = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "¿Estás seguro de que quieres cerrar sesión?"
      );
      if (confirmed) confirmLogout();
    } else {
      Alert.alert(
        "Cerrar sesión",
        "¿Estás seguro de que quieres cerrar sesión?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Cerrar sesión",
            style: "destructive",
            onPress: confirmLogout,
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <>
      <HeaderComponent />

      <ScrollView contentContainerStyle={{ margin: 10 }}>
        <Image
          style={stylesProfile.logo}
          source={require("../assets/img/logo-login.png")}
          resizeMode="contain"
        />

        <View style={stylesTheme.section}>
          <View style={stylesProfile.switchRow}>
            <Text style={stylesTheme.sectionTitle}>¿Necesitas ayuda?</Text>
            <Switch value={requireAsesor} onValueChange={handleToggleSwitch} />
          </View>

          {requireAsesor && <Text style={stylesProfile.message}>En breve contactaremos contigo</Text>}

          <View style={stylesProfile.switchRow}>
            <Text style={stylesTheme.sectionTitle}>Cambiar contraseña</Text>
            <Switch
              value={showChangePassword}
              onValueChange={setShowChangePassword}
            />
          </View>

          <Modal visible={showChangePassword} transparent animationType="fade">
            <View style={stylesTheme.modalOverlay}>
              <View style={stylesTheme.modalBox}>
                <Text style={stylesTheme.sectionTitle}>Cambiar contraseña</Text>

                <TextInput style={stylesTheme.styledInput}
                  placeholder="Contraseña actual"
                  secureTextEntry
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                <TextInput style={stylesTheme.styledInput}
                  placeholder="Nueva contraseña"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TextInput style={stylesTheme.styledInput}
                  placeholder="Confirmar contraseña"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />

                {error ? (
                  <Text style={stylesProfile.errorText}>{error}</Text>
                ) : null}

                <Pressable style={stylesTheme.styledButton}
                  onPress={handlePasswordChange}
                  disabled={loadingChange}
                >
                  <Text style={stylesTheme.buttonText}>
                    <Ionicons name="key" size={18} />
                    {loadingChange ? "Cambiando..." : "  Cambiar contraseña"}
                  </Text>
                </Pressable>

                <Pressable style={stylesTheme.styledButton} onPress={() => setShowChangePassword(false)}>
                  <Text style={stylesTheme.buttonText}>
                    <Ionicons name="arrow-undo" size={18} />
                    {" Cancelar"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Pressable style={stylesTheme.styledButton} onPress={() => router.back()}>
             <Text style={stylesTheme.buttonText}>
              <Ionicons name="arrow-undo" size={18} />
              {"  Volver"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <TouchableOpacity
       style={stylesProfile.logoutButton} onPress={handleLogout}>
        <Text style={stylesProfile.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </>
  );
};

export default Profile;

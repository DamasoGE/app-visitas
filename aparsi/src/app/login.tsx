import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { API_URL } from 'react-native-dotenv';
import { stylesLogin } from '../styles/login';
import { stylesTheme } from '../styles/theme';
import { Image, Pressable, Text, TextInput, View } from 'react-native';



const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    console.log(API_URL);
    const loginsuccess = await login(username, password);
    if (loginsuccess) {
      router.replace('/home');
    } else {
      setInfo('Credenciales incorrectas o error de conexión');
    }
  };

  return (
    <View style={stylesTheme.centeredContainer}>
      <Text style={stylesLogin.title}>APARSI</Text>
      <Image  style={stylesLogin.logoLogin} source={require('../assets/img/logo-login.png')} resizeMode="contain" />
      <Text style={stylesTheme.sectionTitle}>Iniciar Sesión</Text>

      {info ? <Text style={stylesLogin.infoText}>{info}</Text> : null}

      <TextInput style={stylesTheme.styledInput}
        placeholder="Nombre de Usuario"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput style={stylesTheme.styledInput}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={stylesTheme.styledButton} onPress={handleLogin}>
        <Text style={stylesTheme.buttonText}>Entrar</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { useSeller } from '../hooks/useSeller';
import { stylesHeader } from '../styles/header';

const HeaderComponent = () => {
  const { logout } = useAuth();
  const { seller, setSeller } = useSeller();
  const router = useRouter();
  const pathname = usePathname();

  const handleProfile = () => {
    if (pathname !== '/profile') {
      router.push('/profile');
    }
  };

  return (
    <View style={stylesHeader.container}>
      <View>
        <TouchableOpacity style={stylesHeader.profileContainer} onPress={handleProfile}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
          <Text style={stylesHeader.username}>
            {seller ? `${seller.username.charAt(0).toUpperCase() + seller.username.slice(1)}` : 'Cargando...'}
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={stylesHeader.aparsiText}>APARSI</Text>
      </View>
    </View>
  );
};

export default HeaderComponent;

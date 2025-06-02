import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import useUser from '../hooks/useUser';

export default function Index() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }, 0);
  }, [user, loading]);

  if(loading){
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{loading ? 'Cargando...' : 'Redirigiendo...'}</Text>
    </View>
  );
  }


}

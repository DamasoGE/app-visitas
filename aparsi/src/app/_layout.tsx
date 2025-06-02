import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot, useRouter } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { SellerProvider } from '../context/SellerContext';

export default function Layout() {

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SellerProvider>
            <Slot />
        </SellerProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
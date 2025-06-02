import React, { createContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Seller {
  _id?: string;
  username: string;
  requireAsesor: boolean;
  properties?: Property[];
}

export interface Property {
  _id: string;
  address: string;
  timesOffered: number;
  timesListed: number;
  timesInterested: number;
  timesVisited: number;
  timesDetailView: number;
  seller: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  visits: Visit[];
  ads: string[];
}

export interface Visit {
  _id: string;
  appointment: Date;
  status: string;
  comment: string;
}

export interface SellerContextType {
  seller: Seller | null;
  setSeller: (seller: Seller | null) => void;
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>; // Cambiado a función
  changePassword: (sellerId: string, currentPassword: string, newPassword: string) => Promise<boolean>;
  toggleRequireAsesor: (sellerId: string) => Promise<void>;
}

export const SellerContext = createContext<SellerContextType | undefined>(undefined);

interface SellerProviderProps {
  children: ReactNode;
}

export const SellerProvider: React.FC<SellerProviderProps> = ({ children }) => {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
  setLoading(true);
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${API_URL}/seller/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('No autorizado');
    }

    const data = await res.json();
    setSeller(data);
    setSelectedProperty(null);
  } catch (err) {
    console.log(err);
    setError('No se pudo obtener los datos del vendedor');
  } finally {
    setLoading(false);
  }
};

  const changePassword = async (sellerId: string, currentPassword: string, newPassword: string) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_URL}/seller/changepassword`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sellerId, currentPassword, newPassword }),
      });

      if (!res.ok) {
        throw new Error('No se pudo cambiar la contraseña');
      }

      Alert.alert('Contraseña cambiada correctamente');
      return true;
    } catch (err) {
      setError('No se pudo cambiar la contraseña');
      return false;
    } finally {
      setLoading(false);
    }
  };


  const toggleRequireAsesor = async (sellerId: string) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_URL}/seller/requireasesor`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sellerId }),
      });

      if (!res.ok) {
        throw new Error('Error actualizando el estado');
      }

      const updatedSeller = await res.json();
      setSeller((prevSeller) =>
        prevSeller ? { ...prevSeller, requireAsesor: updatedSeller.requireAsesor } : null
      );
    } catch (err) {
      setError('No se pudo actualizar el estado de asesor');
      alert('Error al actualizar el estado de asesor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SellerContext.Provider
      value={{
        seller,
        setSeller,
        selectedProperty,
        setSelectedProperty,
        loading,
        error,
        fetchProfile,
        changePassword,
        toggleRequireAsesor,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

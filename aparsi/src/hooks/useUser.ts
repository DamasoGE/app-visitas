import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from 'react-native-dotenv';

export interface Seller {
  _id?: string;
  username: string;
  requireAsesor: boolean;
  password?: string;
  properties?: Property[];
}

export interface Property {
  _id: string;
  address: string;
  timesOffered: number;
  timesListed: number;
  seller: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  visits: Visit[];
  ads: string[];
}

export interface Visit {
  _id: string;
  date: Date;
  comment: string;
}

const useUser = () => {
  const [user, setUser] = useState<Seller | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setUser(null);
        setLoading(false); // Importante, termina loading
        return;
      }

      const res = await fetch(`${API_URL}/seller/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        setUser(null);
        setLoading(false); // Importante
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log('Error en fetchProfile:', err);
      setUser(null);
    } finally {
      setLoading(false); // Siempre termina loading
    }
  };

  fetchProfile();
}, []);


  return {
    user,
    loading,
    error,
  };
};

export default useUser;

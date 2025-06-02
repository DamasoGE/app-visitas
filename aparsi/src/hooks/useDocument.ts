import axios from "axios";
import { useState } from "react";
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from 'react-native-dotenv';

export interface DocumentFile {
  _id: string;
  file: File;
  name: string;
  uploadedBy: string;
  propertyId: string;
  createdAt: Date;
}

export interface Document {
  _id: string;
  name: string;
  uploadedBy: string;
  propertyId: string;
  createdAt: Date;
  filePath: string;
}

export const useDocument = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDocuments = async (propertyId: string) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');

      const response = await fetch(`${API_URL}/documents/seller/${propertyId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("No se pudieron obtener los documentos");
      }

      const data = await response.json();
      const parsedDocuments = data.map((doc: any) => ({
        ...doc,
        createdAt: new Date(doc.createdAt),
      }));

      return parsedDocuments;

    } catch (error) {
      console.error("Error fetching documents:", error);
      throw new Error("Error fetching documents: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (
    file: DocumentPicker.DocumentPickerAsset,
    name: string,
    propertyId: string
  ) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');

      const uriParts = file.name.split('.');
      const fileExtension = uriParts.pop();
      const sanitizedFileName = name
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '')
        .toLowerCase();
      const newFileName = `${sanitizedFileName}.${fileExtension}`;

      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: newFileName,
        type: file.mimeType || 'application/octet-stream',
      } as any);

      formData.append('name', name);
      formData.append('uploadedBy', 'seller');
      formData.append('propertyId', propertyId);

      const response = await axios.post(
        `${API_URL}/documents/upload/seller`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error uploading document:', error);
      throw new Error('Error uploading document: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId: string) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');

      const response = await fetch(`${API_URL}/documents/${documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el documento");
      }

      setDocuments(prev => prev.filter(doc => doc._id !== documentId));
    } catch (error) {
      console.error("Error deleting document:", error);
      throw new Error("Error deleting document: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { documents, setDocuments, loading, uploadDocument, fetchDocuments, deleteDocument };
};

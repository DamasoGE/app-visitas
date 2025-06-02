import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useSeller } from '../../hooks/useSeller';
import { useDocument, Document } from '../../hooks/useDocument';

import { URL_STORAGE } from 'react-native-dotenv';
import * as IntentLauncher from 'expo-intent-launcher';
import { stylesTheme } from '../../styles/theme';
import { gridDocNumCol, stylesDocs } from '../../styles/documents';
import { formatDocDate } from '../../helpers/utilsDate';
import { Ionicons } from '@expo/vector-icons';

const DocumentScreen = () => {
  const { selectedProperty } = useSeller();
  const { fetchDocuments, uploadDocument, loading } = useDocument();

  const [advisorDocs, setAdvisorDocs] = useState<Document[]>([]);
  const [sellerDocs, setSellerDocs] = useState<Document[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [documentName, setDocumentName] = useState('');

  useEffect(() => {
    const loadDocuments = async () => {
      if (!selectedProperty?._id) return;
      try {
        const data = await fetchDocuments(selectedProperty._id);
        setAdvisorDocs(data.filter((doc: Document) => doc.uploadedBy === 'asesor'));
        setSellerDocs(data.filter((doc: Document) => doc.uploadedBy === 'seller'));
      } catch {
        Alert.alert('Error', 'No se pudieron cargar los documentos.');
      }
    };
    loadDocuments();
  }, [selectedProperty]);

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (result.canceled) return;
    setSelectedFile(result.assets[0]);
    setModalVisible(true);
  };

  const confirmUpload = async () => {
    if (!documentName.trim()) {
      Alert.alert('Nombre requerido', 'Debes ingresar un nombre para el documento.');
      return;
    }
    if (!selectedFile || !selectedProperty?._id) return;

    try {
      await uploadDocument(selectedFile, documentName, selectedProperty._id);
      Alert.alert('Éxito', 'Documento subido correctamente');
      setModalVisible(false);
      setDocumentName('');
      setSelectedFile(null);
      const data = await fetchDocuments(selectedProperty._id);
      setAdvisorDocs(data.filter((doc: Document) => doc.uploadedBy === 'asesor'));
      setSellerDocs(data.filter((doc: Document) => doc.uploadedBy === 'seller'));
    } catch {
      Alert.alert('Error', 'No se pudo subir el documento.');
    }
  };

const handleOpenDoc = async (url: string) => {
  try {
    await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
      data: url,
      flags: 1,
      type: 'application/pdf',
    });
  } catch (error) {
    console.error('Error abriendo documento:', error);
    Alert.alert('Error', 'No se pudo abrir el documento.');
  }
};


const renderGridItem = ({ item }: { item: Document }) => {
  if (!item.name) return null;

  return (
      <TouchableOpacity style={stylesDocs.gridItem}  onPress={() => handleOpenDoc(`${URL_STORAGE}/${item.filePath}`)}>
        <Text style={stylesDocs.gridItemIcon}>📄</Text>
        <Text style={stylesDocs.gridItemName} numberOfLines={1}>{item.name}</Text>
        <Text style={stylesDocs.gridItemDate}>{formatDocDate(item.createdAt)}</Text>
      </TouchableOpacity>
  );
};

  const renderSection = (docs: Document[], title: string) => (
    <View style={stylesTheme.section}>
      <Text style={stylesTheme.sectionTitle}>{title}</Text>
      {docs.length === 0 ? (
        <Text style={stylesTheme.tabInfoText}>No hay documentos aún.</Text>
      ) : (
        <FlatList
          data={docs}
          renderItem={renderGridItem}
          keyExtractor={(item) => item._id}
          numColumns={gridDocNumCol}
          scrollEnabled={false}
        />
      )}
    </View>
  );

  if (!selectedProperty) {
    return (
      <View style={stylesTheme.centeredContainer}>
        <Text style={stylesTheme.tabInfoText}>Selecciona una propiedad para ver sus documentos.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={stylesTheme.centeredContainer}>
        <ActivityIndicator size="large" color="#FF6300" />
        <Text style={stylesTheme.tabInfoText}>Cargando documentos...</Text>
      </View>
    );
  }

  return (
    <View style={stylesTheme.viewContainer}>
      <Text style={stylesTheme.sectionTitle}>Documentos</Text>
      <ScrollView>
        <View style={stylesTheme.section}>
          <Text style={stylesTheme.sectionTitle}>Subir Documento</Text>
          <TouchableOpacity style={stylesTheme.styledButton} onPress={handleUpload}>
            <Text style={stylesTheme.buttonText}><Ionicons name='file-tray-full' size={20}/>{'  Seleccionar archivo'}</Text>
          </TouchableOpacity>
        </View>

        {renderSection(advisorDocs, 'Documentos del Asesor')}
        {renderSection(sellerDocs, 'Documentos del Vendedor')}

      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable style={stylesTheme.modalOverlay}>
          <View style={stylesTheme.modalBox}>
            <Text style={stylesTheme.modalTitle}>Nombre del documento</Text>
            <TextInput
              style={ stylesTheme.styledInput}
              placeholder="Ej. Nota simple, contrato..."
              value={documentName}
              onChangeText={setDocumentName}
            />

            <Pressable style={stylesTheme.styledButton} onPress={confirmUpload}>
              <Text style={stylesTheme.buttonText}><Ionicons name='cloud-upload' size={18}/>{'  Subir'}</Text>
            </Pressable>
            <Pressable style={stylesTheme.styledButton} onPress={() => setModalVisible(false)}>
              <Text style={stylesTheme.buttonText}><Ionicons name='arrow-undo' size={18}/>{'  Cancelar'}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DocumentScreen;
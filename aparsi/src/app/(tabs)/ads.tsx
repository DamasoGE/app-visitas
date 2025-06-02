import React from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSeller } from '../../hooks/useSeller';
import { stylesTheme } from '../../styles/theme';
import { stylesAds } from '../../styles/ads';

const AdsScreen = () => {
  const { selectedProperty } = useSeller();

  const adImages: Record<string, any> = {
    idealista: require('../../assets/img/ads/idealista.png'),
    tecnocasa: require('../../assets/img/ads/tecnocasa.png'),
    fotocasa: require('../../assets/img/ads/tecnocasa.png'),
  };

  if (!selectedProperty) {
    return (
      <View style={stylesTheme.centeredContainer}>
        <Text style={stylesTheme.tabInfoText}>Selecciona una propiedad para ver sus anuncios.</Text>
      </View>
    );
  }

  const ads = selectedProperty.ads;

  if (!ads || ads.length === 0) {
    return (
      <View style={stylesTheme.centeredContainer}>
        <Text style={stylesTheme.tabInfoText}>No hay anuncios para esta propiedad.</Text>
      </View>
    );
  }

  const extractDomainName = (url: string): string => {
    try {
      const hostname = new URL(url).hostname.replace('www.', '');
      return hostname.split('.')[0];
    } catch {
      return 'invalido';
    }
  };

  const openURL = (url: string) => {
    Linking.openURL(url).catch(() =>
      alert('No se pudo abrir el enlace')
    );
  };

  return (
    <View style={stylesTheme.viewContainer}>
      <Text style={stylesTheme.sectionTitle}>Anuncios</Text>
      <ScrollView>
        {ads.map((url) => {
          const domainName = extractDomainName(url);
          return (
            <TouchableOpacity style={stylesAds.adCard} key={url} onPress={() => openURL(url)}>
              <Image
                style={stylesAds.adLogo}
                source={adImages[domainName] || require('../../assets/img/default.png')}
                resizeMode="contain"
              />
              <Text style={stylesAds.adDomainName}>{domainName}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AdsScreen;
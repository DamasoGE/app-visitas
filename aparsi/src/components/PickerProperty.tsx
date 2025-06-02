import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useSeller } from '../hooks/useSeller';
import { stylesPicker } from '../styles/picker';
import { primaryColor } from '../styles/theme';
import { View } from 'react-native';

const PickerProperty = () => {
  const { seller, selectedProperty, setSelectedProperty } = useSeller();

  useEffect(() => {
    if (seller?.properties?.length && !selectedProperty) {
      const lastProperty = seller.properties[seller.properties.length - 1];
      setSelectedProperty(lastProperty);
    }
  }, [seller, selectedProperty]);

  const handlePropertyChange = (propertyId: string) => {
    const selected = seller?.properties?.find(property => property._id === propertyId);
    setSelectedProperty(selected || null);
  };

  const hasProperties = Array.isArray(seller?.properties) && seller.properties.length > 0;
  const properties = seller?.properties ?? [];

  return (
    <View style={stylesPicker.section}>
      <View style={stylesPicker.input}>
        <View style={stylesPicker.icon}>
          <Ionicons name="home-outline" size={24} color={`${primaryColor}`} />
        </View>
        <Picker
          style={stylesPicker.picker}
          selectedValue={selectedProperty?._id || 'none'}
          onValueChange={(itemValue, itemIndex) => {
            if (typeof itemValue === 'string' && itemValue !== 'none') {
              handlePropertyChange(itemValue);
            }
          }}
          enabled={hasProperties}
        >
          {hasProperties ? (
            properties.map((property) => (
              <Picker.Item
                key={property._id}
                label={property.address.toUpperCase()}
                value={property._id}
              />
            ))
          ) : (
            <Picker.Item label="No hay propiedades" value="none" enabled={false} />
          )}
        </Picker>
      </View>
    </View>
  );
};

export default PickerProperty;

import { StyleSheet } from 'react-native';
import { primaryColor } from './theme';

export const stylesLogin = StyleSheet.create({
  title: {
    fontSize: 28,
    color: primaryColor,
    fontWeight: 'bold',
  },
  logoLogin: {
    width: 120,
    height: 120,
    margin: 10,
  },
  infoText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});
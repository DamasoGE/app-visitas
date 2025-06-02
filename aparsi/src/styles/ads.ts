import { StyleSheet } from 'react-native';
import { primaryColor } from './theme';

export const stylesAds = StyleSheet.create({
  adCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 4,
  },
  adLogo: {
    width: 120,
    height: 60,
    marginBottom: 12,
  },
  adDomainName: {
    fontSize: 20,
    fontWeight: '600',
    color: primaryColor,
    textTransform: 'capitalize',
  },
});
import { StyleSheet } from 'react-native';
import { primaryColor } from './theme';

export const stylesProfile = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 80,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    margin: 20,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    color: primaryColor,
    marginLeft: 10,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    fontStyle: 'italic',
  },
  buttonDisabled: {
    backgroundColor: '#b0c4de',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: primaryColor,
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    bottom: 20,
    marginLeft: 120,
    marginRight: 120,
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#888',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
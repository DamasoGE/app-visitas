import { StyleSheet } from 'react-native';
import { primaryColor } from './theme';

export const stylesHeader = StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  aparsiText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});
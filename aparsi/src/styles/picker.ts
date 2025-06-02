import { StyleSheet } from 'react-native';
import { colorBackgroundInputs, primaryColor } from './theme';

export const stylesPicker = StyleSheet.create({
  section: {
    backgroundColor: primaryColor,
    paddingBottom: 10,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colorBackgroundInputs,
    width: '90%',
    alignSelf: 'center',
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 60,
    color: primaryColor,
  },
});
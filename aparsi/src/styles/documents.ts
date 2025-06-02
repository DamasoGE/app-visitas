import { StyleSheet, Dimensions } from 'react-native';

export const gridDocNumCol = 2;
const screenWidth = Dimensions.get('window').width;
const containerPaddingHorizontal = 20 * 2;
const itemMarginHorizontal = 8 * 2;
const itemWidth = (screenWidth - containerPaddingHorizontal - gridDocNumCol * itemMarginHorizontal) / gridDocNumCol;

export const stylesDocs = StyleSheet.create({
  gridItem: {
    width: itemWidth,
    backgroundColor: '#fff',
    padding: 5,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  gridItemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  gridItemDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: 'center',
  },
});
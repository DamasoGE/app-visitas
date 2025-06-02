import { StyleSheet } from 'react-native';
import { primaryColor } from './theme';

export const stylesHome = StyleSheet.create({
  statsScroll: {
    paddingBottom: 20,
  },
  statCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 16,
    marginRight: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: primaryColor,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  daySection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  visitsScroll: {
    paddingBottom: 5,
  },
});
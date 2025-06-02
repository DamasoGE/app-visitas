import { StyleSheet } from 'react-native';

export const primaryColor = '#708090';

export const colorBackground = '#ECECEC';
export const colorBackgroundInputs = 'white';
export const colorButtonPrimary = primaryColor;

export const stylesTheme = StyleSheet.create({
  // BASE
  styledInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: colorBackgroundInputs,
    borderRadius: 8,
    marginBottom: 10,
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  viewContainer: {
    backgroundColor: colorBackground,
    flex: 1,
    padding: 10,
  },
  flex1Container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colorBackground,
  },
  styledButton: {
    backgroundColor: colorButtonPrimary,
    padding: 12,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    gap: 5
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: primaryColor,
  },

  // MODALS
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
  },
  modalStatusText : {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalCloseButton: {
    marginTop: 16,
    backgroundColor: primaryColor,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  tabInfoText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  visitCard: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 12,
    elevation: 3,
    justifyContent: 'space-between',
  },
  visitCardTime: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  visitCardStatusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  visitCardStatusBadgeText: {
    fontSize: 12,
    width: 80,
    fontWeight: '600',
    color: 'white',
  },
  visitCardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  visitCardWrapper: {
    width: '50%',
  },

  // OTROS
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
    gap: 5,
  },
});
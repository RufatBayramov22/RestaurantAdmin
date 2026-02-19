import { StyleSheet } from 'react-native';

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingTop: 60,
    justifyContent: 'flex-end',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 30,
    marginTop: 20,
  },

  headerDetails: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },

  headerLogin: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
  },

  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    gap: 15,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
  },

  stepIcon: {
    fontSize: 26,
    marginBottom: 6,
  },

  stepIconInactive: {
    fontSize: 26,
    marginBottom: 6,
    opacity: 0.5,
  },

  stepActiveBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    padding: 7,
    borderRadius: 48,
    backgroundColor: '#2176FF',
  },

  stepInactiveBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    padding: 7,
    borderRadius: 48,
    backgroundColor: '#2A2A2A',
  },

  stepTextActive: {
    color: '#B3B3B3',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },

  stepTextInactive: {
    color: '#B3B3B3',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },

  dash: {
    width: 48,
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#6E6E6E',
  },

  form: {
    flex: 1,
  },

  submitForm:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  sumbitText:{
    color:'#ededed',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
  },
  sumbitSubText:{
    color:'#b3b3b3',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },

  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 20,
  },

  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 20,
    gap: 10,
  },
  selectPhoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 20,
    gap: 10,
  },

  placeholderText: {
    color: '#B3B3B3',
    fontSize: 15,
  },

  phonePlaceholderText: {
    color: '#1E6BE8',
    fontSize: 15,
  },
  mapIcon: {
    color: '#FF3B30',
    fontSize: 18,
    marginRight: 6,
  },

  bottomContainer: {
    width: '100%',
    paddingBottom: 40,
  },

  button: {
    backgroundColor: '#2176FF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    width: '100%',
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  docInfo: {
    fontSize: 12,
    color: '#B3B3B3',
    fontWeight: '400',
    lineHeight: 16,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#6E6E6E',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 14,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#1E1E1E',
    gap: 16,
  },
  uploadIcon: {
    width: 30,
    height: 30,
    tintColor: '#7A7A7A',
    marginBottom: 10,
  },
  browseButton: {
    backgroundColor: '#2E2E2E',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  browseText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedFileBox: {
    marginTop: 10,
    alignItems: 'center',
  },
  selectedFileName: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 4,
  },
});

export default _styles;

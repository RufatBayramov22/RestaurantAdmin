import { StyleSheet } from 'react-native';

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  centerBox: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 120,
  },

  lockIcon: {
    tintColor: '#2176FF',
    marginBottom: 16,
  },

  messageText: {
    color: '#EDEDED',
    fontSize: 14,
    fontWeight:400,
    letterSpacing:-0.28,
    lineHeight: 20,
    textAlign: 'center',
  },

  button: {
    position: 'absolute',
    bottom: 40,
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
});

export default _styles;

import { StyleSheet } from "react-native";

export const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingTop: 60,
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },

  headerSignUp: {
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#2176FF',
    borderRadius: 3,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxChecked: {
    backgroundColor: '#2176FF',
  },

  checkmark: {
    color: '#fff',
    fontSize: 12,
  },

  rememberMeText: {
    color: '#fff',
    fontSize: 13,
  },

  forgotPasswordText: {
    color: '#A0A0A0',
    fontSize: 13,
    fontWeight: '500',
  },

  loginInfo: {
    flex: 1,
    marginTop: 30,
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

  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    lineHeight: 18,
    marginTop: -8,
    marginBottom: 12,
  },

  buttonDisabled: {
    opacity: 0.7,
  },
});

export default _styles;

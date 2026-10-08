import { StyleSheet } from 'react-native';

export const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0D',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 18,
    paddingBottom: 36,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 24,
  },
  section: {
    backgroundColor: '#13151A',
    borderRadius: 14,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor:'#1E1E1E',
    borderTopEndRadius:8,
    borderTopStartRadius:8,
    borderTopRightRadius:8,
    borderTopLeftRadius:8,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#121212',
  },
  rowLabel: {
    color: '#EDEDED',
    fontSize: 14,
    fontWeight: '500',
  },
    rowIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  chevron: {
    color: '#636363',
    fontSize: 22,
    lineHeight: 24,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
  },
  logoutIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  // legacy
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default _styles;

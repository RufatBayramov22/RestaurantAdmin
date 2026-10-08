import { StyleSheet } from 'react-native';

export const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    marginBottom: 14,
  },

  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18191D',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 56,
    gap: 10,
  },

  searchIcon: {
    width: 24,
    height: 24,
    tintColor: '#8A8A8A',
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
  },

  filterButton: {
    width: 56,
    height: 56,
    backgroundColor: '#18191D',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterIcon: {
    width: 24,
    height: 24,
    tintColor: '#6DAAFF',
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 90,
    gap: 12,
  },

  card: {
    backgroundColor: '#16171B',
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  guestName: {
    color: '#F1F1F1',
    fontSize: 16,
    fontWeight: '500',
  },

  requestTime: {
    color: '#B6B7BC',
    fontSize: 12,
    fontWeight: '400',
  },

  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  metaIcon: {
    width: 20,
    height: 20,
    tintColor: '#A8A9AE',
  },

  metaText: {
    color: '#EDEDED',
    fontSize: 14,
    fontWeight: '400',
  },

  statusPill: {
    minWidth: 94,
    borderWidth: 2,
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '400',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },

  actionButton: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },

  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },

  callButtonDisabled: {
    backgroundColor: '#1B5E1A',
  },

  callTextDisabled: {
    color: '#6D836C',
  },

  cancelButtonDisabled: {
    backgroundColor: '#222326',
  },

  cancelTextDisabled: {
    color: '#6E7074',
  },
});

export default _styles;

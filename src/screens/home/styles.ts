import {StyleSheet} from 'react-native';

export const _styles = StyleSheet.create({
  home: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#000',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 14,
  },

  restaurantName: {
    color: '#E6E6E6',
    fontSize: 24,
    fontWeight: '600',
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerIcon: {
    width: 28,
    height: 28,
    tintColor: '#EAEAEA',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    width: 20,
    height: 20,
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
    padding:10,
    alignItems: 'center',
  },

  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  modalCard: {
    width: '100%',
    backgroundColor: '#16171B',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },

  modalIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#FF2B2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },

  modalIconText: {
    color: '#FF2B2B',
    fontSize: 34,
    lineHeight: 36,
    fontWeight: '300',
  },

  modalTitle: {
    color: '#F1F1F1',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },

  modalDescription: {
    color: '#A8A9AE',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },

  modalButton: {
    backgroundColor: '#2E78F2',
    borderRadius: 14,
    minWidth: 98,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  detailsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },

  detailsContainer: {
    width: '100%',
    backgroundColor: '#090A0D',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 20,
    maxHeight: '88%',
  },

  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    minHeight: 44,
  },

  detailsTitle: {
    color: '#E6E6E6',
    fontSize: 20,
    fontWeight: '700',
  },

  detailsCloseButton: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailsClose: {
    color: '#9EA0A6',
    fontSize: 26,
    fontWeight: '400',
  },

  detailsCard: {
    backgroundColor: '#16171B',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  detailsLabel: {
    color: '#E2E3E6',
    fontSize: 14,
    fontWeight: '400',
  },

  detailsValue: {
    color: '#D5D6DA',
    fontSize: 14,
    fontWeight: '400',
  },

  detailsSectionTitle: {
    color: '#F1F1F1',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },

  detailsRequestText: {
    color: '#A8A9AE',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
  },

  detailsStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  detailsStatusPill: {
    borderWidth: 2,
    borderColor: '#F4C400',
    borderRadius: 20,
    minWidth: 112,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  detailsStatusText: {
    color: '#F4C400',
    fontSize: 13,
    fontWeight: '500',
  },

});
export default _styles;

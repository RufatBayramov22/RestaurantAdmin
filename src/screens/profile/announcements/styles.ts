import { StyleSheet } from 'react-native';


export const _styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#090A0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 14,
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#E8E8E8',
  },
  headerTitle: {
    color: '#EDEDED',
    fontSize: 20,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 34,
  },

  segmentedWrapper: {
    marginHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: '#1C1E23',
    borderRadius: 14,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  segmentItemActive: {
    backgroundColor: '#2E78F2',
  },
  segmentText: {
    color: '#CFCFCF',
    fontSize: 18 / 1.2,
    fontWeight: '500',
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  listContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 120,
    gap: 16,
  },
  listContentEmpty: {
    justifyContent: 'center',
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  stateText: {
    color: '#A9B0BD',
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 14,
    backgroundColor: '#2E78F2',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1A1C20',
    borderRadius: 16,
    padding: 12,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 14,
  },
  cardTitle: {
    color: '#F3F3F3',
    fontSize: 18 / 1.2,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    color: '#A9A9A9',
    fontSize: 16 / 1.2,
    lineHeight: 24,
    marginBottom: 14,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    marginBottom: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaIcon: {
    color: '#A6ABB4',
    fontSize: 20,
    lineHeight: 22,
  },
  metaText: {
    color: '#DFDFDF',
    fontSize: 17 / 1.2,
    fontWeight: '500',
  },
  timeIcon: {
    width: 20,
    height: 20,
    tintColor: '#A6ABB4',
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationBadge: {
    minHeight: 46,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#2A2D33',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notificationBadgeActive: {
    backgroundColor: 'rgba(46,120,242,0.12)',
  },
  notificationIcon: {
    width: 22,
    height: 22,
    tintColor: '#2E78F2',
  },
  notificationText: {
    color: '#A9B0BD',
    fontSize: 16 / 1.2,
    fontWeight: '500',
  },
  notificationTextActive: {
    color: '#2E78F2',
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    color: '#C4C4C4',
    fontSize: 27,
    lineHeight: 28,
  },
  deleteIcon: {
    color: '#FF3232',
    fontSize: 22,
    lineHeight: 24,
  },

  bottomActionWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  addButton: {
    borderRadius: 999,
    backgroundColor: '#2E78F2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 22 / 1.2,
    fontWeight: '700',
  },
});

export default _styles;
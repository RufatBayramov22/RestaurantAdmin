import { StyleSheet } from 'react-native';

export const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0D',
    paddingHorizontal: 16,
  },

  title: {
    color: '#ECECEC',
    fontSize: 42 / 2,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 22,
  },

  searchWrap: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#18191D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 10,
  },

  searchIcon: {
    width: 24,
    height: 24,
    tintColor: '#8E8E8E',
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
  },

  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 6,
  },

  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 108,
  },

  unreadDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2E78F2',
    marginRight: 10,
  },

  unreadDotPlaceholder: {
    width: 14,
    height: 14,
    marginRight: 10,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2B2B2B',
  },

  centerWrap: {
    flex: 1,
    paddingRight: 12,
  },

  nameText: {
    color: '#EDEDED',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 4,
  },

  messageText: {
    color: '#B3B3B3',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },

  timeText: {
    color: '#A9ABB1',
    fontSize: 12,
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginTop: 2,
    lineHeight:16,
  },

  separator: {
    height: 1,
    backgroundColor: '#1E2026',
  },

  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default _styles;

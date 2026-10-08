import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  label: {
    color: '#F0F0F0',
    fontSize: 18 / 1.2,
    fontWeight: '500',
    marginBottom: 12,
  },
  addMediaButton: {
    height: 60,
    borderRadius: 14,
    backgroundColor: '#2A2C31',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addMediaPlus: {
    color: '#2F78F2',
    fontSize: 34,
    lineHeight: 34,
    marginTop: -3,
  },
  addMediaText: {
    color: '#E9EAEC',
    fontSize: 20 / 1.2,
    fontWeight: '600',
  },
  countText: {
    color: '#A8ABB1',
    fontSize: 16 / 1.2,
    marginTop: 14,
    marginBottom: 12,
  },

  mediaGridContent: {
    paddingBottom: 26,
    gap: 10,
  },
  mediaGridRow: {
    justifyContent: 'space-between',
    gap: 10,
  },
  mediaCard: {
    flex: 1,
    aspectRatio: 0.78,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#21242A',
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(45,48,54,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#D7D9DE',
    fontSize: 20,
    lineHeight: 22,
  },
});

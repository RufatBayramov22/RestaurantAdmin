import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0D',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backBtn: {
    padding: 4,
  },
  backArrow: {
    color: '#ECECEC',
    fontSize: 34,
    lineHeight: 36,
    fontWeight: '300',
  },
  headerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2B2B2B',
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 6,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34C759',
  },
  onlineText: {
    color: '#ABABAB',
    fontSize: 13,
  },
  callBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1A2A50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callBtnIcon: {
    fontSize: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#1C1E24',
    marginHorizontal: 0,
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },

  // Date label
  dateLabelWrap: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateLabel: {
    color: '#6B6B6B',
    fontSize: 13,
  },

  // Text message
  msgRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  msgRowMe: {
    justifyContent: 'flex-end',
  },
  msgAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    backgroundColor: '#2B2B2B',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleThem: {
    backgroundColor: '#1E1F26',
    borderBottomLeftRadius: 4,
  },
  bubbleMe: {
    backgroundColor: '#1E2A45',
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    color: '#ECECEC',
    fontSize: 15,
    lineHeight: 22,
  },
  bubbleFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 6,
    gap: 2,
    minHeight: 16,
  },
  bubbleTime: {
    color: '#7A7A7A',
    fontSize: 12,
  },
  readIcon: {
    width: 16,
    height: 16,
    marginLeft: 6,
    tintColor: '#2E78F2',
    opacity: 1,
  },

  // Voice message
  voiceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 220,
    gap: 10,
  },
  voicePlayButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1F4FA0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voicePlayIcon: {
    color: '#9FC6FF',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 1,
  },
  voiceWaveformWrap: {
    flex: 1,
  },
  voiceBarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    minHeight: 24,
  },
  voiceBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: '#748091',
  },
  voiceBarActive: {
    backgroundColor: '#8DB8FF',
  },
  voiceProgressLine: {
    marginTop: 8,
    height: 2,
    backgroundColor: '#2A3342',
    borderRadius: 1,
  },
  voiceDurationText: {
    color: '#AAB2BF',
    fontSize: 12,
    minWidth: 34,
    textAlign: 'right',
  },

  // Call bubble
  callRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  callRowMe: {
    justifyContent: 'flex-end',
  },
  callBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1F26',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 12,
    maxWidth: '65%',
  },
  callBubbleMe: {
    backgroundColor: '#1E2A45',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
  },
  callIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callIconText: {
    fontSize: 20,
  },
  callInfo: {
    flex: 1,
  },
  callTitle: {
    color: '#ECECEC',
    fontSize: 15,
    fontWeight: '500',
  },
  callMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 2,
  },
  callDuration: {
    color: '#7A7A7A',
    fontSize: 12,
  },
  callTime: {
    color: '#7A7A7A',
    fontSize: 12,
  },

  // Input
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
    backgroundColor: '#13151A',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 100,
    paddingTop: 4,
    paddingBottom: 4,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    color: '#090A0D',
    fontSize: 16,
    marginLeft: 2,
  },
  micRecordingBtn: {
    backgroundColor: '#4B1A1A',
  },
  micRecordingIcon: {
    color: '#FF6B6B',
  },
  recordingText: {
    flex: 1,
    color: '#FF8A8A',
    fontSize: 15,
    fontWeight: '600',
  },
});

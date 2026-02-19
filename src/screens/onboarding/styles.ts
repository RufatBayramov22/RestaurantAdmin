import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  step1: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap:24,
    marginBottom:100,

  },
  step1Component: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  step1Title: {
    color: '#EDEDED',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  step1Subtitle: {
    color: '#B3B3B3',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    width: 280,
    lineHeight: 20,
    letterSpacing: -0.28,
    marginTop: 10,
  },
  dotsContainer: {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#2176FF',
    width: 16,
    height: 6,
    borderRadius: 20,
  },
  inactiveDot: {
    backgroundColor: '#6AA3FF',
  },
  step1Button:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2176FF',
    width:343,
    height:48,
    borderRadius:48,
  },
    step1ButtonText:{
    color:'#EDEDED',
    fontSize:16,
    fontWeight:'600',
    lineHeight:24,
  }
});

export default styles;

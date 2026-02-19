import {StyleSheet} from 'react-native';

export const _styles = StyleSheet.create({
  home: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: '#000',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 70,
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#070707',
    lineHeight: 20,
  },
  lang: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:8,
  },
  searchInp: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#F4F4FB',
    borderRadius: 8,
    height: 48,
    padding:12,
    gap: 8,
    width:310,
  },
  searchIcon: {
    width: 16,
    height: 16,
  },
  filter:{
    width: 48,
    height: 48,
    backgroundColor: '#F4F4FB',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,

  },
  categories:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categorie:{
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal:8,
    paddingVertical: 6,
    borderWidth:0.4,
    borderColor:'#ADB5BD',
    borderRadius: 8,
    marginRight: 8,
  },
  restaurants:{
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  restaurantItem:{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  restaurantTitle:{
    fontSize:14,
    fontWeight:'700',
    color:'#070707',
    lineHeight: 20,
  },
restaurantCard: {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  backgroundColor: 'white',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 4,
  width:253,
},
restaurantInfo:{
  display: 'flex',
  flexDirection:'column',
  paddingHorizontal:4,
  paddingVertical: 6,
  gap:6,
},
restaurantName:{
  fontSize:14,
  fontWeight:'600',
  color:'#070707',
  lineHeight: 20,
},
restType:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
},
restTypeText:{
  fontSize:12,
  fontWeight:'400',
  color:"#9CA3AA",
  lineHeight: 16,
},
  scrollContainer: {
    paddingBottom: 24, 
    gap: 16,
  },
  


});
export default _styles;

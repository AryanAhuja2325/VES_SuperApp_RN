import { StyleSheet, Dimensions } from 'react-native';
import { white, shadowcolor, titletext, desctext, black } from '../../utils/color';

const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  clickable: {
    width: windowWidth / 2 - 20,
    height: '20%',
    backgroundColor: white,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: shadowcolor,
    elevation: 10,
    flex: 1,
    padding: 20
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: titletext
  },
  cardText: {
    fontSize: 16,
    color: desctext,
  },
})
export default styles;
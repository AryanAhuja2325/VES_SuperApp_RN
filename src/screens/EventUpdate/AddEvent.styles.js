import {StyleSheet} from 'react-native';
import {shadowcolor, white, titletext, black, maroon} from '../../utils/color';
import {elevationsize} from '../../utils/constant';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: responsiveHeight(10), 
  },
  row: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    width: responsiveWidth(90),
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    fontSize: 16,
  },  
  textInputContainer: {
    width: responsiveWidth(90),
    position: 'relative',
    marginBottom: 20,
  },
  textAreaInput: {
    borderWidth: 1,
    borderRadius: 10,
    width: responsiveWidth(90),
    marginTop: 10,
    height: 150, // Adjust the height as needed
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: black,
    backgroundColor: '#FFF',
  },
  wordCountContainer: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  wordCountText: {
    fontSize: 12,
   fontWeight: 'bold',
    color: black,
  },
  button: {
    width: '50%',
    backgroundColor: maroon,
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    width: responsiveWidth(90),
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  selectedDateText: {
    marginBottom: 0,
  },
  calendarIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -15}],
  },
});

export default Style;

import {StyleSheet} from 'react-native';
import * as COLORS from '../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    margin: 20,
  },
  label: {
    fontSize: 20,
    color: COLORS.black,
    marginTop: 10,
  },
  input: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  dropdownContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  picker: {
    width: '10',
  },
  buttonG: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  scrollContainer: {
    // flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingBottom: 2, 
  },
});

export default styles;

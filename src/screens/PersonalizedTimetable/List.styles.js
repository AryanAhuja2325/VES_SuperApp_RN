import {black, blue,  maroon,red,yellow} from '../../utils/color';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'column', 
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
  },
  dueDateText: {
    marginTop: 8, // Add margin to separate from task text
  },
  removeButton: {
    color: 'maroon',
  },
  addtask: {
    color: 'maroon',
  },
});

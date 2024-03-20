import { StyleSheet } from "react-native";
import { black, maroon, white } from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: white,
  },
  content: {
    borderWidth: 1,
    borderColor: black,
    padding: 10,
    marginVertical: 5,
    color: black,
    borderRadius: 10,
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 16,
    marginVertical: 5,
    color: black,
    borderWidth: 1, // Add border
    borderRadius: 10, // Add border radius
  },
  heading: {
    fontSize: 16,
    color: black,
    marginRight: 10,
    marginVertical: 10,
    marginLeft: 5
  },
  arrowIcon: {
    fontSize: 14,
    position: 'absolute',
    right: 10,
  },
  queryTypeContainer: {
    fontSize: 16,
    marginVertical: 5,
    color: black,
    borderWidth: 1, // Add border
    borderRadius: 10, // Add border radius
    padding: 8, // Add padding to make the text more visible within the border
  },
  queryType: {
    fontSize: 16,
    marginVertical: 5,
    color: black,
  },
  input: {
    borderWidth: 1,
    borderColor: black,
    padding: 10,
    marginVertical: 5,
    height: 120,
    color: black,
    borderRadius: 10,
  },
  button: {
    backgroundColor: maroon,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: maroon,
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedQueryTypeText: {
    fontSize: 16,
    marginVertical: 5,
    color: black,
  },
  QueryTypeinput: {
    borderWidth: 1,
    borderColor: black,
    padding: 10,
    marginVertical: 5,
    height: 50,
    color: black,
    borderRadius: 10,
  },
  queryItem: {
    backgroundColor: maroon,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  queryText: {
    color: white,
    fontSize: 16,
    marginBottom: 5,
  },
  button1: {
    backgroundColor: white,
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default styles;
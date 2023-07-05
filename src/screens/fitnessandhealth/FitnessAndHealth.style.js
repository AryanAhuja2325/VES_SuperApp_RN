import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 16,
  },
  sectionHeader: {
    backgroundColor: 'maroon',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  arrowIcon: {
    fontSize: 18,
    color: 'white',
  },
  sectionContent: {},
  text: {
    marginBottom: 8,
    color: 'black', // Update the text color here
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
});

export default styles;

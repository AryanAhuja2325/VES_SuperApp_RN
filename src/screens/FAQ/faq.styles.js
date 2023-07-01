import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1
    },
    faqContainer: {
     marginVertical: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#B02A30',
    },
    headerText: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 20,
      color: '#E7B909'
    },
    icon: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    content: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    answerText: {
      fontSize: 14,
      color: 'black',
      marginVertical: 5,
    },
    questionText: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
    }
  
  });

  export default styles;
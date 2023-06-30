import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
  
      backgroundColor: '#912929',
     
    },
    content: {
      paddingTop: 20,
      paddingBottom: 40,
    },
    image: {
      width: 450,
      height: 450,
      marginBottom: 20,
      alignSelf: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
      color:'#700000',
      paddingHorizontal: 20,
      paddingBottom: 20,
      
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'justify',
      color: '#000000',
      paddingHorizontal: 20,
      paddingBottom: 20,
      
    },
    programsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      paddingHorizontal: 20,
      paddingBottom: 20,
      
    },
    programName: {
      flex: 1,
      fontSize: 18,
      marginRight: 10,
      textAlign: 'justify',
      color:'#000000',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    programIntake: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#000000',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    remarks: {
      fontSize: 17,
      fontStyle: 'italic',
      marginBottom: 10,
      textAlign: 'justify',
      color:'#d303fc',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    link: {
      fontSize: 16,
      color: 'blue',
      marginBottom: 5,
    },
    heading1: {
      flexDirection:'row',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      color:'#700000',
    },
      heading2: {
        flexDirection:'row',
        textDecorationLine: 'underline',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 5,
        color:'#700000',
      },
      
      coloredSection: {
        flex: 1,
        backgroundColor: '#FFFFCC', 
      },
      coloredSection1: {
        flex: 1,
        backgroundColor: '#faeb16', 
      },
        
    });
    export default styles;
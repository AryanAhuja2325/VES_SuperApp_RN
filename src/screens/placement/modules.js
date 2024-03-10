import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SectionList } from 'react-native';
import styles from './Placement.style';


const Card = ({ title }) => {
  return (
    <View style={styles.outercard} >
      <View style={styles.card1}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const Card1 = ({ title }) => {
  return (
    <View style={styles.outercard} >
      <View style={styles.card}>
        <Text style={styles.title1}>{title}</Text>
      </View>
    </View>
  );
};

const Modules = ({ navigation }) => {

  return (
    <ScrollView>    
        <View style={styles.view}>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("resume");
        }
        }>
          <Card1 title={"normal Dashboard"}/>
        </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("resume");
        }
        }>
        <Card title={"Resume Generator"} />
      </TouchableOpacity >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("notice");
        }
        }>
        <Card title={"Notice/Notifications"} />
      </TouchableOpacity >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("application");
        }
        }>
        <Card title={"Job/Internship application"} />
      </TouchableOpacity >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("schedule");
        }
        }>
        <Card title={"schedule tracker"} />
      </TouchableOpacity >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("tests");
        }
        }>
        <Card title={"Practice tests"} />
      </TouchableOpacity >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("preparation");
        }
        }>
        <Card title={"preparation and upskilling"} />
      </TouchableOpacity >
      
    <SectionList
        sections={data}
        renderItem={renderCard}
        keyExtractor={(item, index) => item + index}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
    </ScrollView>

  );
};

export default Modules;
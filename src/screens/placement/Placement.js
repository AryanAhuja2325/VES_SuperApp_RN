import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Placement.style';

const Placement = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.clickable}
        onPress={() => navigation.navigate('Resume Generator')}>
        <Text style={styles.cardTitle}>Quick Resume</Text>
        <Text style={styles.cardText}>Easily craft your professional resume.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.clickable}
        onPress={() => navigation.navigate('Job Linker')}>
        <Text style={styles.cardTitle}>Job Linker</Text>
        <Text style={styles.cardText}>Pairing your strengths with perfect career matches.</Text>
      </TouchableOpacity>
    </View>
  )
}
export default Placement;
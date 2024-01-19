import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState('');

  async function getData() {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await axios.post('http://localhost:5001/userdata', {
        token: token,
      });
      console.log(response.data);
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME TO HOME </Text>
      <Text style={styles.text}>{userData && userData.nama}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow', // Add background color here
  },
  title: {
    fontSize: 24,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

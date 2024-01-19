  // EditProfileScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [npm, setNPM] = useState('');

  async function editUserData() {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/userdata', {
        token: token,
      })

      const userData = response.data.data;
      setNama(userData.nama);
      setEmail(userData.email);
      setNPM(userData.npm);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    editUserData();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const updatedUserData = {
        token: token,
        nama: nama,
        email: email,
        npm: npm,
      };

      const response = await axios.post(
        'http://localhost:5001/updateprofile',
        updatedUserData
      );

      if (response.data.status === 'ok') {
        Alert.alert('Profil berhasil diperbarui', response.data.data);
        console.log('Profil berhasil diperbarui', response.data.data);
        AsyncStorage.setItem('token', response.data.data.token); // Perbarui token
        navigation.navigate('Profile');
      } else {
        console.error('Error updating profile:', response.data.data);
        Alert.alert('Update Gagal');
      }
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  
  };

  handleBack = () => {
    console.log("tes")
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama"
        value={nama}
        onChangeText={(text) => setNama(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="NPM"
        value={npm}
        onChangeText={(text) => setNPM(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
    width: '100%',
  },
});

export default EditProfileScreen;
  
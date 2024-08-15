
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Send login request with email and password
      const response = await axios.post('http://localhost:3000/login', { email, password });
      
      // Store JWT token in AsyncStorage
      await AsyncStorage.setItem('userToken', response.data.token);
      
      // Navigate to Home screen
      navigation.navigate('Home');
    } catch (error) {
      // Display error message if login fails
      Alert.alert('Login Failed', 'Invalid email or password');
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 20, borderBottomWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={{ marginBottom: 20, borderBottomWidth: 1, padding: 10 }}
      />

      <Button title="Login" onPress={handleLogin} />
      <Button title="Back to Register" onPress={() => navigation.navigate('Register')} />

    </View>
  );
};

export default LoginScreen;

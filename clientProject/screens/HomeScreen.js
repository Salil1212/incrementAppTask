import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get('http://localhost:3000/value', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setValue(response.data.value);
      } catch (error) {
        console.error('Error fetching value:', error);
      }
    };

    fetchValue();
  }, []);

  const handleIncrement = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const newValue = value + 1;
      setValue(newValue);

      await axios.post('http://localhost:3000/update-value', { value: newValue }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error updating value:', error);
    }
  };

  const handleDecrement = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const newValue = value - 1;
      setValue(newValue);

      await axios.post('http://localhost:3000/update-value', { value: newValue }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error updating value:', error);
    }
  };

  const handleReset = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const newValue = 0;
      setValue(newValue);

      await axios.post('http://localhost:3000/update-value', { value: newValue }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error resetting value:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>Value: {value}</Text>
      <Pressable style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>Increment</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleDecrement}>
        <Text style={styles.buttonText}>Decrement</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Set to Zero</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  valueText: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default HomeScreen;

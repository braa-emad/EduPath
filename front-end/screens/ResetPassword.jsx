import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Text, ActivityIndicator} from 'react-native';
import FormHeader from '../components/FormHeader';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fadeAnim = new Animated.Value(0);
  const translateYAnim = new Animated.Value(-100); 
  const translateXFormInputs = new Animated.Value(-30); 
  const buttonAnim = new Animated.Value(200);

  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: 1, 
      friction: 6,  
      tension: 100,
      useNativeDriver: true,
    }).start();
  
    Animated.spring(translateYAnim, {
      toValue: 0,
      friction: 6,
      tension: 100, 
      useNativeDriver: true,
    }).start();
  
    Animated.spring(translateXFormInputs, {
      toValue: 0,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();
  
    Animated.spring(buttonAnim, {
      toValue: 0,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const handleResetPassword = async () => {
    setLoading(true);
    setMessage('');

    const token = await AsyncStorage.getItem('TEMPJWT');
    const apiUrl = 'http://10.0.2.2:4000/api/users/forgotpassword';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword, token}),
      });
      
      const responseData = await response.json();

      setTimeout(async () => {
        if (responseData.status == 'success') {
          setLoading(false);
          navigation.navigate('Login');
        } 
        else {
          setLoading(false);
          setMessage(responseData.data);
        }
      }, 2000);
    }
    catch (error) {
      setTimeout(() => {
        setLoading(false);
        setMessage('An error occurred');
      }, 2000);
    }
  };


  return (
    <View style={styles.containerPage}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <Animated.View style={[styles.FormHeader, {
        opacity: fadeAnim,
        transform: [{ translateY: translateYAnim }]
      }]}>
      <FormHeader title="Forgot password" subtitle="kindiy fill in the correct details" />
      </Animated.View>
      <Animated.View style={[styles.FormInputs, {
        opacity: fadeAnim,
        transform: [{ translateX: translateXFormInputs}],
      }]}>
        <FormInput label="New Password" value={password} onChangeText={text => setPassword(text)} placeholder="Enter your new password" type="password" />
        <FormInput label="Confirm New Password" value={confirmPassword} onChangeText={text => setConfirmPassword(text)}  placeholder="Confirm Password" type="password" />
      </Animated.View>

      <Animated.View style={[styles.button, {
        opacity: fadeAnim,
        transform: [{ translateX: buttonAnim }]
      }]}>
        <Button title='Reset Password' height={60} onPress={handleResetPassword} disabled={!password || !confirmPassword} />

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  message: {
    color: '#FF0000',
    marginTop: 10,
  },
});

export default ResetPassword;
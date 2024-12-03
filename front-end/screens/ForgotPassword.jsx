import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator} from 'react-native';
import FormHeader from '../components/FormHeader';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fadeAnim = new Animated.Value(0);
  const translateYAnim = new Animated.Value(-100); 
  const buttonAnim = new Animated.Value(-30);
  const translateXFormInputs = new Animated.Value(-30); 

  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: 1, 
      duration: 800,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();

    Animated.spring(buttonAnim, {
      toValue: 1, 
      duration: 800,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateYAnim, {
      toValue: 0,
      duration: 800,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateXFormInputs, {
      toValue: 0,
      duration: 800,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, []);
  

  const handleContinue = async () => {
    setLoading(true);
    setMessage('');
    const apiUrl = 'http://10.0.2.2:4000/api/users/otp';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const responseData = await response.json();
      setTimeout(async () => {
          setLoading(false);
          if (responseData.status == 'success') {
            const TEMPJWT = responseData.temptoken;
            await AsyncStorage.setItem('TEMPJWT', TEMPJWT);
            console.log(responseData);
            navigation.navigate('ForgotPasswordOtp');
          } 
          else {
            setLoading(false);
            setMessage(responseData.data);
          }
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setMessage('An error occurred. Please try again.');
      }, 1000);
    }
  };

  return (
    <View style={styles.containerPage}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <Animated.View style={[styles.formHeader, {
        opacity: fadeAnim,
        transform: [{ translateY: translateYAnim }],
      }]}>
        <FormHeader title="Sign in to your account" 
        subtitle="Enter your email and password to log in" />
      </Animated.View>

      <Animated.View style={[styles.FormInputs, {
        opacity: fadeAnim,
        transform: [{ translateX: translateXFormInputs}],
      }]}>
      <FormInput label="Email" value={email} placeholder="Enter Your Email" type="text"
      onChangeText={text => setEmail(text)} />
      </Animated.View>

      <Animated.View style={[styles.buttonCon, {
        transform: [{translateX: buttonAnim}]
      }]}>
        <Button title='Continue' height={60} onPress={handleContinue} disabled={!email} />
      </Animated.View>
      {message ? <Text style={styles.apiMessage}>{message}</Text> : null}
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
  forgotPassword: {
    color: '#628EFF',
    fontWeight: '500',
    textDecorationLine: 'underline',
    position: 'relative',
    left: '65%',
    marginBottom: 20,
  },
});

export default ForgotPassword;
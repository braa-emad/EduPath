import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import FormHeader from '../components/FormHeader';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

const Login = ({ navigation }) => {
  // Inputs management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Animations
  const fadeAnim = new Animated.Value(0);
  const translateYAnim = new Animated.Value(-100); 
  const translateXFormInputs = new Animated.Value(-100); 
  const buttonAnim = new Animated.Value(100); 
  const translateYFooter = new Animated.Value(100); 


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

    Animated.spring(translateYFooter, {
      toValue: 0,
      duration: 800,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    const apiUrl = 'http://10.0.2.2:4000/api/users/login';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      setTimeout(async () => {
        if (responseData.status == 'success') {
          const JWT = responseData.token;
          await AsyncStorage.setItem('JWT', JWT);
            setLoading(false);
            navigation.navigate('Home');
          } 
          else {
            setLoading(false);
            setMessage(responseData.data);
          }
      }, 1000);
    } 
    catch (error) {
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
      <Animated.View style={[styles.FormHeader, { 
        opacity: fadeAnim, 
        transform: [{ translateY: translateYAnim }]}]}>
        <FormHeader title="Sign in to your account" subtitle="Enter your email and password to log in" />
      </Animated.View>

      <Animated.View style={[styles.FormInputs, { 
        transform: [{ translateX: translateXFormInputs }]}]}>
        <FormInput label="Email" placeholder="Enter Your Email" keyboardType='email-address' type="text" value={email} onChangeText={text => setEmail(text)} />
        <FormInput label="Password" placeholder="Enter Your Password" type="password" value={password} onChangeText={text => setPassword(text)} />
      </Animated.View>

      <Text style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>

      <Animated.View style={[styles.buttonCon, {
        transform: [{translateX: buttonAnim}]
      }]}>
        <Button title='Log in' height={60} onPress={handleLogin} disabled={!email || !password} />
      </Animated.View>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Animated.View style={[styles.formFooter, { 
        transform: [{ translateY: translateYFooter }]}]}>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/images/Icons/google.png')} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/images/Icons/facebook.png')} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue With Facebook</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
          </Text>
        </View>
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
  forgotPassword: {
    color: '#628EFF',
    fontWeight: '500',
    textDecorationLine: 'underline',
    position: 'relative',
    left: '65%',
    marginBottom: 20,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#1822351A',
    marginHorizontal: 10,
  },
  orText: {
    color: '#18223599',
    fontSize: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1822351A', 
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'center',
    paddingHorizontal: 77,
    paddingVertical: 17,
  },
  socialIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  socialButtonText: {
    fontWeight: '500',
    color: '#182235',
    fontSize: 16,
  },
  signupText: {
    marginTop: 50,
    color: '#000000',
    fontWeight: '400',
    fontSize: 18,
    alignItems: 'center',
    margin: 'auto',
  },
  signupButton: {
    color: '#628EFF',
    fontWeight: '500',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});

export default Login;

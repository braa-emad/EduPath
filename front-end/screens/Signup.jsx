import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import FormHeader from '../components/FormHeader';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
  // Inputs management
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(false);
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

  const handleSignup = async () => {
    setLoading(true);
    setMessage('');
    const apiUrl = 'http://10.0.2.2:4000/api/users/register';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const responseData = await response.json();
      setTimeout(async () => {
        if (responseData.status == 'success') {
          const JWT = responseData.token;
          await AsyncStorage.setItem('JWT', JWT);
          setLoading(false);
          navigation.navigate('SelectField');
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
      <ScrollView contentContainerStyle={styles.containerPage}>
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
        <Animated.View style={[styles.FormHeader, { 
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim}]}]}>
        <FormHeader title="Sign up" 
        subtitle="Please fill the below required information to Create an Account" />
        </Animated.View>

        {/* Form Inputs */}
        <Animated.View style={[styles.FormInputs, { transform: [{ translateX: translateXFormInputs }] }]}>
          <FormInput label="Username" value={username} onChangeText={text => setUsername(text)} placeholder="Enter Your Username" type="text" />
          <FormInput label="Email" value={email} onChangeText={text => setEmail(text)} placeholder="Enter Your Email" type="text" />
          <FormInput label="Password" value={password} onChangeText={text => setPassword(text)} placeholder="Enter Your Password" type="password" />
        </Animated.View>
        
        <Animated.View style={[styles.buttonCon, {
        transform: [{translateX: buttonAnim}]
      }]}>
        <Button height={60} title="Sign Up" onPress={handleSignup} disabled={!username || !email || !password} />
      </Animated.View>

      {message ? <Text style={styles.message}>{message}</Text> : null}

        <Animated.View style={[styles.formFooter, { transform: [{ translateY: translateYFooter }] }]}>
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
              Already have an account? <Text style={styles.signupButton} onPress={() => navigation.navigate('Login')}>Sign In</Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerPage: {
      flexGrow: 1, 
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      justifyContent: 'flex-start', 
      paddingTop: 40,
      paddingBottom: 20,
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
      marginVertical: 10,
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
      paddingVertical: 10,
      borderRadius: 5,
      marginVertical: 5,
      justifyContent: 'center',
      paddingTop: 17,
      paddingBottom: 17,
      paddingRight: 77,
      paddingLeft: 77,
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
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#1822351A',
      paddingVertical: 10,
      borderRadius: 5,
      marginVertical: 5,
      justifyContent: 'center',
      paddingTop: 17,
      paddingBottom: 17,
      paddingRight: 77,
      paddingLeft: 77,
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

export default Signup;
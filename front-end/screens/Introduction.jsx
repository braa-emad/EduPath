import { View, Text, StyleSheet, Image, Animated, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Introduction = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeSwitch, setActiveSwitch] = useState(0); 
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const imageAnim = new Animated.Value(-100);
  const textAnim = new Animated.Value(-100);
  const buttonAnim = new Animated.Value(100);
  const switchesAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(imageAnim, {
      toValue: 1,
      duration: 400,
      tension: 100,
      friction: 6,
      useNativeDriver: true,
    }).start();

    Animated.spring(textAnim, {
      toValue: 1,
      duration: 700,
      tension: 100,
      friction: 6,
      useNativeDriver: true,
    }).start();

    Animated.spring(buttonAnim, {
      toValue: 1,
      duration: 1000,
      tension: 100,
      friction: 6,
      useNativeDriver: true,
    }).start();

    Animated.spring(switchesAnim, {
      toValue: 1,
      duration: 1000,
      tension: 100,
      friction: 6,
      useNativeDriver: true,
    }).start();
  })

  const pages = [
    {
      title: 'Discover Your CS Path',
      description: 'Computer Science opens countless doors. Take a guided journey to find the perfect specialization that matches your interests and strengths.',
      image: require('../assets/images/Icons/onboarding1.png'),
    },
    {
      title: 'Your Success Roadmap',
      description: 'Get a personalized learning path with exactly what you need to master your chosen field and prepare for real-world success.',
      image: require('../assets/images/Icons/onboarding2.png'),
    },
    {
      title: 'Level Up Together',
      description: 'Track your progress, celebrate milestones, and get support every step of the way. Your journey to becoming a tech professional starts here.',
      image: require('../assets/images/Icons/onboarding3.png'),
    },
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setActiveSwitch(activeSwitch + 1); 
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    const apiUrl = 'http://10.0.2.2:4000/api/users/loginwithtoken';
    try {
      const token = await AsyncStorage.getItem('JWT');
      if (!token) {
        setLoading(false);
        navigation.navigate('Login');
        return;
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const responseData = await response.json();

      setTimeout(() => {
          setLoading(false);
          if (responseData.status == 'success') {
            username = responseData.username;
            navigation.navigate('Home');
          } 
          else {
            navigation.navigate('Login');
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
    <View style={styles.pageContainer}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <View style={styles.container}>
        <Animated.View style={[styles.image, {
          transform: [{translateY: imageAnim}]
        }]}>
          <Image source={pages[currentPage].image} style={styles.image} />
        </Animated.View>
        <Animated.View style={[styles.textContainer, {
          transform: [{translateX: textAnim}]
        }]}>
          <Text style={styles.title}>{pages[currentPage].title}</Text>
          <Text style={styles.description}>{pages[currentPage].description}</Text>
        </Animated.View> 

        <View style={[styles.switchContainer, {
          transform: [{translateY: 1}]
        }]}>
          {pages.map((page, index) => (
            <View
              key={index}
              style={[
                styles.switch,
                activeSwitch === index && styles.activeSwitch, 
                activeSwitch === index && { width: 26 }, 
              ]}
            />
          ))}
        </View>

        <Animated.View style={[styles.buttonContainer, {
          transform: [{translateY: buttonAnim}]
        }]}>
          {currentPage < pages.length - 1 && (
            <>
            <Button title="Skip" width="50%" height={50} backgroundColor='transparent' borderWidth={1} borderRadius={30} fontSize={32} textColor='#628EFF' onPress={() => navigation.navigate('Login')} />
            <Button title="Next" width="50%" height={50} borderRadius={30} onPress={handleNext} />
            </>
          )}

          {message ? <Text style={styles.message}>{message}</Text> : null}

          {currentPage === pages.length - 1 && (
            <Button title='Start Now' width='100%' height={50} borderRadius={30} onPress={handleLogin} />
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  loading: {
    backgroundColor: '#eee',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  message: {
    position: 'absolute',
    bottom: 60,
    color: 'red',
  },
  container: {
    maxWidth: '335px',
    width: '80%',
    margin: 'auto',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#182235',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#18223599',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    gap: 8,
  },
  switch: {
    backgroundColor: '#7765DF33',
    width: 8,
    height: 8,
    borderRadius: 30,
  },
  activeSwitch: {
    backgroundColor: '#7765DF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    gap: 10,
  },
});

export default Introduction;

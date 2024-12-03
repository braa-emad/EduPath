import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SelectField = ({ navigation }) => {
  const [username, setUsername] = useState('');
  
  const textAnim = new Animated.Value(-100);
  const cardAnim = new Animated.Value(-30);
  const linkAnim = new Animated.Value(30);

  useEffect(() => {
    Animated.spring(textAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
    
    Animated.spring(cardAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.spring(linkAnim, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, [])

  useEffect(() => {
    const getUsername = async () => {
        const apiUrl = 'http://10.0.2.2:4000/api/users/profile';
        try {
          const token = await AsyncStorage.getItem('JWT');
          if (!token) {
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
          if (responseData.status == 'success') {
            setUsername(responseData.data.username)
          } 
          else {
            navigation.navigate('Login');
          }
        } 
        catch (error) {
            console.log('An error occurred', error);
        }
    };
    getUsername();
  }, [])

  const courses = [
    {
      id: '1',
      title: 'User Experience Design (UX)',
      description: 'Understanding UI and UX definitions, differences, and importance...',
      image: require('../assets/images/Icons/uiux.png'),
      screen: 'UIUX',
    },
    {
      id: '2',
      title: 'Web Development',
      description: 'What it is and its significance.Introduction to front-end, back-end...',
      image: require('../assets/images/Icons/web.png'),
      screen: 'Web', 
    },
    {
      id: '3',
      title: 'Cyber Security',
      description: 'This Cybersecurity course provides a comprehensive understanding of the principles',
      image: require('../assets/images/Icons/security.png'),
      screen: 'CyberSecurity', 
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Select Field</Text>
      </View>
      <View style={styles.body}>
        <Animated.View style={[styles.textCon, {
          transform: [{ translateY: textAnim }],
        }]}>
          <Text style={styles.welcomeText}>Welcome, {username}</Text>
          <Text style={styles.descriptionText}>Kindly choose the field you'd like to explore.</Text>
        </Animated.View>

        <Animated.View style={[styles.cardContainer, {
          transform: [{ translateX: cardAnim }],
        }]}>
          {courses.map(course => (
            <View style={styles.cardWrapper} key={course.id}>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(course.screen)}>
                <Image source={course.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{course.title}</Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>{course.description}</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={34} color="#18223566" />
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.linkCon, {
          transform: [{ translateX: linkAnim }],
        }]}>
          <Text style={styles.footerText}>Can’t decide on a field?{' '}
            <Text style={styles.footerLink} onPress={() => navigation.navigate('FieldHelp')}>Click here
            </Text>
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#1822351A',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#182235',
  },
  body: {
    paddingTop: 30,
    paddingLeft: 22,
    paddingRight: 22,
  },
  welcomeText: {
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#182235',
  },
  cardContainer: {
    marginTop: 22,
    marginBottom: 22,
  },
  cardWrapper: {
    marginBottom: 22,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 12,
  },
  cardImage: {
    resizeMode: 'contain',
    width: 30,
  },
  cardContent: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    color: 'black',
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 16,
  },
  cardDescription: {
    color: '#18223599',
    fontWeight: '500',
    fontSize: 14,
  },
  footerText: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    color: '#182235',
    marginTop: 20,
  },
  footerLink: {
    fontWeight: '500',
    fontSize: 16,
    color: '#628EFF',
    textDecorationLine: 'underline',
  },
});

export default SelectField;

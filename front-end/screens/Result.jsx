import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Result = ({ navigation, route }) => {
    const { score, questions } = route.params;
    const [username, setUsername] = useState('');

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
              console.log(responseData);
              if (responseData.status == 'success') {
                setUsername(responseData.data.username);
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

    const failScore = score < questions / 2
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <Image source={require('../assets/images/Icons/result.png')}
           style={{width: 250, height: 250}} />
          <View style={styles.resultContent}>
              <Text style={{
                  color: '#182235', fontSize: 20, fontWeight: '600', marginBottom: 20, textAlign: 'center', marginTop: 20
              }}>
                  {failScore ? "Better Luck Next Time!" : "Good Job!"}
              </Text>
              <Text style={{
                  color: '#18223599', fontSize: 16, marginBottom: 20, fontWeight: '400', textAlign: 'center', lineHeight: 20 }}>
                  {failScore 
                    ? `You scored ${score} out of ${questions}. Keep practicing, ` 
                    : `Congratulations, you have scored ${score} out of ${questions}. Keep going, `
                  }
                    <Text style={{ fontWeight: '700' }}>{username}</Text>
                    
              </Text>
              <View style={[styles.pointsContainer, {
                backgroundColor: failScore ? '#E74C3C' : '#91D28166',
              }]}>
                  <Image source={require('../assets/images/Icons/points.png')} style={{width: 20, height: 20}} />
                  <Text style={{color: failScore ? 'white' : '#258210', fontWeight: '400', fontSize: 14}}>{score} Points</Text>
              </View>
          </View>
          <View style={{position: 'absolute', bottom: 20, width: '80%'}}>
              <Button title={failScore ? 'Try Again' : 'Unlock Next Level'} height={60} onPress={failScore ? () => navigation.navigate('CourseLearning') : () => navigation.navigate('Home')} />
          </View>
      </View>
  </View>
    )
}

const styles = StyleSheet.create({
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', width: 150,
    height: 60,
    borderRadius: 40,
    padding: 20,
    margin: 'auto',
    marginBottom: 20,
    backgroundColor: '#91D28166'
  }
})

export default Result
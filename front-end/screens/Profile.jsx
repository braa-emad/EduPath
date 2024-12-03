import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import BottomTabs from '../components/BottomTabs'
import Mail from '@expo/vector-icons/Ionicons';
import Time from '@expo/vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const ongoingCourses = [
    {
      id: '1',
      title: 'Fundamentals of UI/UX Design',
      label1: 'CS',
      label2: 'Design & creativity',
      students: '124 Students',
      image: require('../assets/images/Icons/trackinfo.jpg'),
      progress: {
        phase: 0,
        totalPhases: 12,
        percentage: 0,
      },
    },
    {
      id: '2',
      title: 'Designing for User Experience',
      label1: 'CS',
      label2: 'Design & creativity',
      students: '250 Students',
      image: require('../assets/images/Icons/course2.png'),
      progress: {
        phase: 4,
        totalPhases: 16,
        percentage: 10,
      },
    },
    {
      id: '3',
      title: 'User interface Design and Prototyping',
      label1: 'CS',
      label2: 'Design & Productivity',
      students: '250 Students',
      image: require('../assets/images/Icons/course2.png'),
      progress: {
        phase: 10,
        totalPhases: 14,
        percentage: 80,
      },
    },
  ];
  const states = [
    {
      id: 1,
      title: 'Points',
      image: require('../assets/images/Icons/eduhome.png'),
      state: '500',
      desc: 'Come back tomorrow to keep it up!',
    },
    {
      id: 2,
      title: 'Level',
      image: require('../assets/images/Icons/trackname.png'),
      state: 'Beginner',
      desc: 'Keep working, you’re doing a great progress',
    },
  ]
  
    useEffect(() => {
        const getUserData = async () => {
            const apiUrl = 'http://10.0.2.2:4000/api/users/profile';
            const token = await AsyncStorage.getItem('JWT');
            try {
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
              if (responseData.status === 'success') {
                setUsername(responseData.data.username);
                setEmail(responseData.data.email);
              } 
              else {
                navigation.navigate('Login');
              }
            } 
            catch (error) {
                console.log('An error occurred', error);
            }
        };
        getUserData();
    }, []) 

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F9F9F9'}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={[styles.body, { paddingHorizontal: 22, paddingVertical: 22, marginBottom: 100 }]}>
        <View style={[styles.profile, {
          flexDirection: 'row', gap: 15, alignItems: 'center',
        }]}>
          <Image source={require('../assets/images/Icons/student1.jpg')} style={{width: 60, height: 60, borderRadius: 100 }}/>
          <View>
            <Text style={{ color: '#182235', fontWeight: '600', fontSize: 18, paddingBottom: 4 }}>{username}</Text>
            <Text style={{color: '#18223599', fontSize: 14, fontWeight: '500', fontSize: 14}}>UI / UX Design Track</Text>
          </View>
        </View>
        <View style={[styles.info, { marginTop: 22 }]}>
          <Text style={styles.mainTitle}>Basic Info</Text>
          <View style={styles.infoBox}>
            <View style={[styles.infoCard, { paddingBottom: 10 }]}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1}}>
                <Mail name="mail-outline" size={24} color="#7765DF" />
                <Text style={{color: '#18223599', fontWeight: '400', fontSize: 14}}>Email</Text>
              </View>
              <Text style={{color: '#182235', fontWeight: '400', fontSize: 14}}>{email}</Text>
            </View>
            <View style={styles.infoCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1}}>
              <Time name="access-time" size={24} color="#7765DF" />
                <Text style={{color: '#18223599', fontWeight: '400', fontSize: 14}}>Joined</Text>
              </View>
              <Text style={{color: '#182235', fontWeight: '400', fontSize: 14}}>24 Dec, 2023</Text>
            </View>
          </View> 
          <View style={styles.ongoing}>
                <Text style={styles.mainTitle}>My Progress</Text>
                <View style={styles.ongoingBox}>
                    <FlatList data={ongoingCourses} keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item: course }) => (
                        <TouchableOpacity
                            style={styles.ongoingCard}
                            onPress={() => navigation.navigate('CourseLearning')}
                        >
                            <Image source={course.image} style={styles.cardImage} />
                            <Text style={styles.ongoingTitle}>{course.title}</Text>
                            <View style={styles.box}>
                            <View style={styles.left}>
                                <View style={styles.leftCard}>
                                <Text style={styles.leftText}>{course.label1}</Text>
                                </View>
                                <View style={styles.leftCard}>
                                <Text style={styles.leftText}>{course.label2}</Text>
                                </View>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.rightText}>{course.students}</Text>
                            </View>
                            </View>
                            <View style={styles.progress}>
                            <View style={styles.progressLine}></View>
                            <View style={styles.progressStatus}>
                                <View style={styles.progressLeft}>
                                <Text style={styles.progressText}>
                                    Phase {course.progress.phase} / <Text style={styles.progressSpan}>{course.progress.totalPhases}</Text>
                                </Text>
                                </View>
                                <View style={styles.progressRight}>
                                <Text style={styles.progressPercentage}>{course.progress.percentage}%</Text>
                                </View>
                            </View>
                            </View>
                        </TouchableOpacity>
                        )}
                    />
                </View>
          </View>
          <View style={[styles.studentState, {
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, marginTop: 22,
          }]}>
            {states.map(state => (
              <View key={state.id} style={styles.stateCard}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12}}>
                  <Text style={{fontSize: 16, fontWeight: '400', color: '#182235'}}>{state.title}</Text>
                  <Image source={state.image} style={{width: 30, height: 30}} />
                </View>
                <Text style={{color: '#182235', fontWeight: '700', fontSize: 20, paddingBottom: 12}}>{state.state}</Text>
                <Text style={{color: '#18223599', fontWeight: '400', fontSize: 14}}>{state.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
            <BottomTabs onTabPress={(screen) => navigation.replace(screen)} />
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#1822351A',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#182235',
  },
  infoBox: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 22,
    backgroundColor: 'white',
    borderRadius: 14,
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mainTitle: {
    marginTop: 20,
    fontSize: 20,
    color: '#182235',
    fontWeight: '600',
    marginBottom: 20,
  },
  ongoingBox: {
    flexDirection: 'row',
  },
  ongoingCard: {
    maxWidth: 360,
    borderRadius: 12,   
    padding: 22,
    backgroundColor: 'white',
    marginRight: 12,
  },
  box: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 20,
  },
  left: {
    flexDirection: 'row',
  },
  leftCard: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#7765DF1A',
    marginRight: 12,
    lineHeight: 40,
    textAlign: 'center',
    borderRadius: 4,
  },
  leftText: {
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 14,
    color: '#7765DF',
    fontWeight: '400',
  },
  rightText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#18223599',
  },
  cardImage: {
      width: '100%',
      height: 120,
  },
  ongoingTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#182235',
      paddingTop: 12,
  },
  progressLine: {
      width: '100%',
      height: 6,
      backgroundColor: '#18223533',
      borderRadius: 12,
  },
  progressStatus: {
      paddingTop: 12,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  progressText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#182235',
  },
  progressSpan: {
      fontSize: 14,
      fontWeight: '400',
      color: '#18223599',
  },
  progressPercentage: {
      color: '#628EFF',
      fontWeight: '400',
      fontSize: 14,
  },
  stateCard: {
    width: '100%',
    padding: 22,
    backgroundColor: 'white',
    borderRadius: 12,
  }
})

export default Profile
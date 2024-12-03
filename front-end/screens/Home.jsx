import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import RightArrow from '@expo/vector-icons/AntDesign';  
import BottomTabs from '../components/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = ({ navigation }) => {
    const [username, setUsername] = useState('');
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
    const students = [
        {
            id: 1,
            image: require('../assets/images/Icons/student1.jpg'),
            name: 'Rahim Souliman',
            points: '200 Points',
        },
        {
            id: 2,
            image: require('../assets/images/Icons/student2.jpg'),
            name: 'John Doe',
            points: '180 Points',
        },
    ]
    
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

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F5F6F8'}}>
        <View style={styles.header}>
            <View>
                <Text style={{fontSize: 16, fontWeight: '400', marginBottom: 8, color: '#18223599'}}>Good Morning</Text>
                <Text style={{fontSize: 20, fontWeight: '600', color: '#182235'}}>{username}</Text>
            </View>
            <TouchableOpacity>
            <Image source={require('../assets/images/Icons/Bell.png')} style={{width: 30, height: 30}} />
        </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 22, paddingTop: 32}}>
            <View style={styles.cardBox}>
                <View style={styles.card}>
                    <Image style={styles.headIcon} source={require('../assets/images/Icons/eduhome.png')} />
                    <Text style={styles.cardTitle}>Level</Text>
                    <View style={styles.bottomCard}>
                    <Text style={styles.cardDesc}>Beginner</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Image style={styles.headIcon} source={require('../assets/images/Icons/trackname.png')} />
                    <Text style={[styles.cardTitle]}>Track name</Text>
                    <View style={styles.bottomCard}>
                    <Text style={styles.cardDesc}>UI/UX Design</Text>
                    </View>
                </View>
                <View style={[styles.card, styles.lastCard]}>
                    <Image style={styles.headIcon} source={require('../assets/images/Icons/score.png')} />
                    <Text style={styles.cardTitle}>Score</Text>
                    <View style={styles.bottomCard}>
                    <Text style={styles.cardDesc}>501 point</Text>
                    </View>
                </View>
            </View>
            <View style={styles.ongoing}>
                <Text style={[styles.mainTitle, { paddingBottom: 20 }]}>Ongoing courses</Text>
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
            <View style={styles.topStudents}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, marginBottom: 20 }}>
                    <Text style={styles.mainTitle}>Top Students</Text>
                    <View>
                        <TouchableOpacity style={styles.viewButton}>
                            <Text style={{fontWeight: '400', fontSize: 16, color: '#628EFF'}}>View all</Text>
                            <RightArrow name="right" size={16} color="#628EFF" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.studentBox}>
                <FlatList data={students} horizontal contentContainerStyle={styles.studentBox}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.studentCard}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={item.image} style={styles.studentImage} />
                            <Text style={{ marginLeft: 12 }}>{item.name}</Text>
                        </View>
                        <Text style={{paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#91D281', borderRadius: 100, fontWeight: '600', color: 'white', fontSize: 12 }}>
                            {item.points}
                        </Text>
                    </View>
                )}
            />
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
        backgroundColor: 'white', 
        paddingTop: 40,
        height: 150,
        paddingHorizontal: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 30,
        gap: 10,
    },
    card: {
        width: 160,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 14,
    },
    headIcon: {
        width: 32,
        height: 32,
        marginBottom: 12,
    },
    cardTitle: {
        fontWeight: '600',
        fontSize: 16,
        color: '#18223599',
        marginBottom: 8,
    },
    cardDesc: {
        fontSize: 16,
        fontWeight: '600',
        color: '#182235',
    },
    lastCard: {
        flexGrow: 1,
    },
    mainTitle: {
        fontSize: 20,
        color: '#182235',
        fontWeight: '600',
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
    viewButton: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    topStudents: {
        paddingBottom: 100,
    },
    studentBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    studentCard: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        marginRight: 12,
    },
    studentImage: {
        width: 40,
        height: 40,
        borderRadius: 60,
    },
})

export default Home;
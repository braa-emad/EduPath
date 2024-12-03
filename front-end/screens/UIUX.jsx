import { View, Text, Image, StyleSheet, StatusBar, ScrollView, Animated, FlatList } from 'react-native'
import React, { useState } from 'react'
import Back from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import RightArrow from '@expo/vector-icons/MaterialIcons';
import Star from '@expo/vector-icons/AntDesign';
const UIUX = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('About');
  const courses = [
    {
      id: 1,
      title: "Fundamentals of UI/UX Design",
      course: 'Course 1',
      hours: '11 hours',
      rates: '4.7',
      ratings:'(169 ratings)',
      content: "Learn the fundamentals of UI/UX design, including principles and tools.",
    },
    {
      id: 2,
      title: "Designing for User Experience",
      course: 'Course 2',
      hours: '24 hours',
      rates: '4.7',
      ratings:'(169 ratings)',
      content: "Learn the fundamentals of UI/UX design, including principles and tools.",
    },
    {
      id: 3,
      title: "User interface Design and Prototyping",
      course: 'Course 3',
      hours: '18 hours',
      rates: '4.7',
      ratings:'(160 ratings)',
      content: "Learn the fundamentals of UI/UX design, including principles and tools.",
    },
    {
      id: 4,
      title: "UX Design in Practice: Accessibitity",
      course: 'Course 4',
      hours: '20 hours',
      rates: '4.9',
      ratings:'(34 ratings)',
      content: "Learn the fundamentals of UI/UX design, including principles and tools.",
    },
  ];
  
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F9F9FB'}}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/Icons/trackinfo.jpg')}
          style={styles.image}
        />
        <Back
          name="arrow-back"
          size={30}
          color="white"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.text}>Track Info</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, activeTab === 'About' && styles.activeTab]} onPress={() => setActiveTab('About')}>
            <Text style={[styles.tabText, activeTab === 'About' && styles.activeTabText]}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'Courses' && styles.activeTab]} onPress={() => setActiveTab('Courses')}>
            <Text style={[styles.tabText, activeTab === 'Courses' && styles.activeTabText]}>Courses</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {activeTab === 'About' ? (
          <View style={styles.about}>
          <View style={styles.head}>
            <Text style={styles.uxTitle}>User Experience Design (UX)</Text>
            <Text style={styles.uxDesc}>Launch Your Career in UX/UI Design. Build job-ready UX design skills through hands-on projects and learn to use industry leading tools like Figma. No degree or experience required.</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <View style={styles.leftCard}>
                <Text style={styles.leftText}>CS</Text>
              </View>
              <View style={styles.leftCard}>
                <Text style={styles.leftText}>Design & creativity</Text>
              </View>
            </View>
            <View style={styles.right}>
              <Text style={styles.rightText}>124 Students</Text>
            </View>
          </View>
          <View style={styles.cardBox}>
            <View style={styles.card}>
              <Image style={styles.headIcon} source={require('../assets/images/Icons/eduIcon.png')} />
              <Text style={styles.cardTitle}>Beginner Level</Text>
              <View style={styles.bottomCard}>
                <Text style={styles.cardDesc}>Recommended experience</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Image style={styles.headIcon} source={require('../assets/images/Icons/schudule.png')} />
              <Text style={styles.cardTitle}>2 months</Text>
              <View style={styles.bottomCard}>
                <Text style={styles.cardDesc}>at 10 hours a week</Text>
              </View>
            </View>
            <View style={[styles.card, styles.lastCard]}>
              <Image style={styles.headIcon} source={require('../assets/images/Icons/time.png')} />
              <Text style={styles.cardTitle}>Flexible schedule</Text>
              <View style={styles.bottomCard}>
                <Text style={styles.cardDesc}>Learn at your own pace</Text>
              </View>
            </View>
          </View>
          <View style={styles.learning}>
            <Text style={styles.basicTitle}>What you'll learn</Text>
            <View style={{backgroundColor: 'white', borderRadius: 12, padding: 12}}>
              <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 22}}>
                <Image source={require('../assets/images/Icons/correction.png')} style={{width: 22, height: 22,}} />
                <Text style={{maxWidth: 300}}>Define the core principles of UX, Human-Centered Design, and design thinking frameworks, and identify UX team roles and user research methods.</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Image source={require('../assets/images/Icons/correction.png')} style={{width: 22, height: 22,}} />
                <Text style={{maxWidth: 300}}>Adapt design ideas into interactive prototypes using wireframing, mockups, prototyping tools, and leverage design systems and style guides.</Text>
              </View>
            </View>
          </View>
          <View style={[styles.skills, {marginBottom: 32}]}>
            <Text style={[styles.basicTitle, { marginTop: 12 }]}>Skills you'll gain</Text>
            <View style={styles.skillsBox}>
              <View style={styles.skillsList}>
                <Text style={{fontSize: 26}}>•</Text>
                <Text style={{fontWeight: '400', fontSize: 16, color: '#18223599'}}>User Experience (UX)</Text>
              </View> 
              <View style={styles.skillsList}>
                <Text style={{fontSize: 26}}>•</Text>
                <Text style={{fontWeight: '400', fontSize: 16, color: '#18223599'}}>Prototype</Text>
              </View>
              <View style={styles.skillsList}>
                <Text style={{fontSize: 26}}>•</Text>
                <Text style={{fontWeight: '400', fontSize: 16, color: '#18223599'}}>Wireframe</Text>
              </View>
              <View style={styles.skillsList}>
                <Text style={{fontSize: 26}}>•</Text>
                <Text style={{fontWeight: '400', fontSize: 16, color: '#18223599'}}>Artificial Intelligence</Text>
              </View>
              <View style={styles.skillsList}>
                <Text style={{fontSize: 26}}>•</Text>
                <Text style={{fontWeight: '400', fontSize: 16, color: '#18223599'}}>Figma (Design Software)</Text>
              </View>
            </View>
          </View>
        </View>
        ) : (
          <View style={styles.courses}>
            <View style={styles.head}>
              <Text style={styles.uxTitle}>Professional Certificate - 4 course series</Text>
              <Text style={styles.uxDesc}>Through hands-on projects and expert-led instruction, you'll learn the entire UX design process, from conducting user research and creating wireframes to designing high-fidelity mockups and prototypes. You'll also learn essential soft skills like collaboration and communication, crucial for success in any design role. <Text style={{textDecorationLine: 'underline', color: '#007BFF', fontSize: 14}}>Read More</Text></Text>
            </View>
            <View style={styles.courseList}>
              {courses.map((course) => (
                <View key={course.id} style={[styles.courseCard, course.id === courses.length  && { borderBottomWidth: 0, paddingBottom: 10 },]}>
                  <View style={styles.leftSide}>
                    <Text style={{ fontWeight: '600', color: '#182235', fontSize: 16 }}>{course.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                      <Text style={styles.subtitle}>{course.course}</Text>
                      <Text style={styles.subtitle}>{course.hours}</Text>
                      <Text style={styles.subtitle}>{course.rates}</Text>
                      <Star name="star" size={16} color="#E3912E" />
                      <Text style={[styles.subtitle, { color: '#628EFF', paddingLeft: 10 }]}>{course.ratings}</Text>
                    </View>
                  </View>
                  <RightArrow name="keyboard-arrow-right" size={30} color="#18223566" />
                </View>
              ))}
            </View>
          </View>
        )}
        
        <View style={{ marginBottom: 32, marginTop: 20 }}>
          <Button title='Enroll Now' height={50} onPress={() => navigation.navigate('Home')} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  icon: {
    position: 'absolute',
    top: 60,
    left: 10,
  },
  text: {
    position: 'absolute',
    top: 60,
    left: '50%',
    transform: [{ translateX: -50 }],
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  contentContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  tabs: {
    width: 350,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginHorizontal: 50,
    marginTop: 20,
  },
  tab: {
    width: '50%',
    paddingBottom: 8,
  },
  tabText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
  },
  activeTabText: {
    color: '#007BFF',
  },
  line: {
    width: 350,
    height: 1,
    backgroundColor: '#0079C826',
    marginVertical: 20,
  },
  head: {
    marginTop: 30,
  },
  uxTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 16,
  },
  uxDesc: {
    fontWeight: '400',
    fontSize: 14,
    color: '#18223599',
    lineHeight: 20,
  },
  box: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  cardBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 30,
    gap: 10,
  },
  lastCard: {
    flexGrow: 1,
  },
  card: {
    width: 165,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  headIcon: {
    width: 32,
    height: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#182235',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 12,
    fontWeight: '400',
    color: '#18223599',
  },
  basicTitle: {
    fontWeight: '600',
    fontSize: 22,
    color: '#182235',
    marginBottom: 22,
  },
  skillsBox: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  skillsList: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  courseList: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#1822351A',
    borderRadius: 14,
    padding: 14,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  courseCard: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1822351A',
  },
  subtitle: { 
    color: '#18223599',
    fontWeight: '600',
    fontSize: 12 
  }
});


export default UIUX
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import ArrowLeft from '@expo/vector-icons/AntDesign';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Button from '../components/Button';

const CourseLearning = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const sections = [
    {
      id: 1,
      title: 'Introduction to UX design',
      content: [
        {
          type: 'video',
          title: 'Video: Introduction',
          duration: '2 Min 18 Sec',
        },
        {
          type: 'reading',
          title: 'Reading: What is UX design?',
          duration: '18 Min 46 Sec',
        },
      ],
    },
    {
      id: 2,
      title: 'Learn about UX portfolio',
      content: [
        {
          type: 'video',
          title: 'Video: Introduction',
          duration: '2 Min 18 Sec',
        },
        {
          type: 'reading',
          title: 'Reading: What is UX design?',
          duration: '18 Min 46 Sec',
        },
      ],
    },
    {
      id: 3,
      title: 'Start a UX design portfolio',
      content: [
        {
          type: 'video',
          title: 'Video: Introduction',
          duration: '2 Min 18 Sec',
        },
        {
          type: 'reading',
          title: 'Reading: What is UX design?',
          duration: '18 Min 46 Sec',
        },
      ],
    },
    {
      id: 4,
      title: 'Learn about empathy map',
      content: [
        {
          type: 'video',
          title: 'Video: Introduction',
          duration: '2 Min 18 Sec',
        },
        {
          type: 'reading',
          title: 'Reading: What is UX design?',
          duration: '18 Min 46 Sec',
        },
      ],
    },
  ];

  const toggleSection = (id) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#F9F9FB' }}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: '600', color: '#182235' }}>User Experience Design (UX)</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 22, flex: 1 }}>
        <View style={styles.courseContent}>
          <View style={{ marginTop: 20 }}>
            <Image
              source={require('../assets/images/Icons/coursevideo.png')}
              style={{
                width: '100%',
                height: 200,
                resizeMode: 'cover',
                borderRadius: 12,
              }}
            />
            <Text
              style={{
                paddingVertical: 8,
                color: '#182235',
                fontWeight: '600',
                fontSize: 16,
              }}
            >
              Introduction to course 1: What is UX design?
            </Text>
            <Text
              style={{
                fontWeight: '400',
                lineHeight: 20,
                fontSize: 14,
                color: '#18223599',
              }}
            >
              Hi there, welcome to Introduction of UX design course, We started
              with the basics. You learned why user experience is so important
              in your role as an entry-level UX designer. Then you were
              introduced to common tools, frameworks, and platforms used in UX
              design, and we walked through the steps of a design sprint.
            </Text>
          </View>

          <View style={{marginTop: 20}}>
            <Button title='Next' height={50} onPress={() => navigation.navigate('Quiz')} />
          </View>
        </View>

        <FlatList
          data={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(item.id)}
              >
                <Text style={styles.sectionTitle}>{item.title}</Text>
                <AntDesign
                  name={expandedSections[item.id] ? 'up' : 'down'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>

              {expandedSections[item.id] && (
                <View style={styles.sectionContent}>
                  {item.content.length > 0 ? (
                    item.content.map((content, index) => (
                      <View style={styles.contentItem} key={index}>
                        {content.type === 'video' ? (
                          <AntDesign name="playcircleo" size={20} color="black" />
                        ) : (
                          <MaterialIcons name="menu-book" size={20} color="black" />
                        )}
                        <View style={{ marginLeft: 10 }}>
                          <Text style={styles.contentTitle}>
                            {content.title}
                          </Text>
                          <Text style={styles.contentDuration}>
                            {content.duration}
                          </Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noContent}>
                      No content available
                    </Text>
                  )}
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1822351A',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignItems: 'center',
  },
  courseContent: {
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F9F9FB',
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#182235',
  },
  sectionContent: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentTitle: {
    fontSize: 14,
    color: '#182235',
    fontWeight: '500',
  },
  contentDuration: {
    fontSize: 12,
    color: '#18223599',
  },
  noContent: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default CourseLearning;

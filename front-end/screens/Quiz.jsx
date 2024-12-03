import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ArrowLeft from '@expo/vector-icons/AntDesign';
import Button from '../components/Button';
const Quiz = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  const questions = [
    { id: "1", 
      question: "What is the primary goal of UX design?",
       options: [
        "To improve user satisfaction by enhancing usability and accessibility",
        "To create visually appealing designs",
        "To develop back-end logic for web applications",
        "To write technical documentation"
      ],
      answer: 0 
    },
    { 
      id: "2",
      question: "Which of the following is a key phase in the UX design process?",
      options: [
          "Coding",
          "Empathize",
          "Marketing",
          "Deployment"
      ], 
      answer: 1 
    },
    { 
      id: "3", 
      question: "What is a user persona in UX design?",
       options: [
        "A hypothetical representation of a user based on research",
        "A layout template for website design",
        "A navigation map for the application",
        "A wireframe of a page design"
      ],
      answer: 0 
    },
  ];

  const handleAnswerSelection = (index) => {
    if (!isAnswerSelected) {
      setSelectedAnswer(index);
      setIsAnswerSelected(true);
      if (index === questions[currentQuestionIndex].answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerSelected(false);
      setSelectedAnswer(null);
    } else {
      navigation.navigate('Result', { score, questions: questions.length });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F9FB', }}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: '600', color: '#182235' }}>User Experience Design (UX)</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        {questions.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressCircle,
              currentQuestionIndex === index && styles.activeCircle,
              currentQuestionIndex > index && styles.completedCircle,
            ]}
          />
        ))}
      </View>

      <View style={styles.quizContainer}>
        <Text style={{textAlign: 'right', marginTop: 10}}>Question {currentQuestionIndex + 1} / {questions.length}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 20 }}>
          <Image source={require('../assets/images/Icons/questionImg.png')} 
          style={{ width: 30, height: 30 }} />
          <Text style={{fontWeight: '600', color: '#182235', fontSize: 18, maxWidth: 350}}>{questions[currentQuestionIndex].question}</Text>
        </View>
        <View style={styles.quizContent}>
          {questions[currentQuestionIndex].options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === questions[currentQuestionIndex].answer;
            const isWrong = isSelected && !isCorrect;
            const showCorrectHighlight = isAnswerSelected && isCorrect;
            return (
              <TouchableOpacity
                key={index}
                style={styles.optionContainer}
                onPress={() => handleAnswerSelection(index)}
                disabled={isAnswerSelected}
              >
                <View
                  style={[
                    styles.radio,
                    isSelected && (isCorrect ? styles.correctRadio : styles.wrongRadio),
                    showCorrectHighlight && styles.correctRadio,
                  ]}
                />
                <Text style={[isSelected && isWrong && styles.wrongOption, { fontSize: 16, fontWeight: '400', color: '#182235'}]}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
        <View style={{position: 'absolute', bottom: 20, width: '80%', margin: 'auto', left: '50%', transform: [{translateX: -150}]}}>
          <Button title={currentQuestionIndex === questions.length - 1 ? 'Check Results' : 'Next'} onPress={handleNextQuestion} disabled={!isAnswerSelected} height={60} />
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  progressCircle: {
    width: 110,
    height: 8,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#628EFF33',
  },
  activeCircle: {
    backgroundColor: '#628EFF',
  },
  completedCircle: {
    backgroundColor: '#628EFF',
  },
  quizContainer: {
    paddingHorizontal: 16,
  },
  quizContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#18223566',
  },
  correctRadio: {
    backgroundColor: '#1dea65',
  },
  wrongRadio: {
    backgroundColor: '#f36060',
  },
  wrongOption: {
    textDecorationLine: 'line-through',
  },
});

export default Quiz;

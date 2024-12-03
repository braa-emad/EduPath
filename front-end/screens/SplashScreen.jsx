import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
const SplashScreen = ({navigation}) => {
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
          navigation.replace('Introduction');
        }, 3000);
    }, [navigation, opacity]);

  return (
    <View style={styles.container}>
        <View>
            <Animated.View style={[styles.splashContainer, {opacity}]}>
                <Image source={require('../assets/images/Icons/IntroIcon.png')} style={styles.eduPath} />
                <Text style={styles.text}>EduPath</Text>
            </Animated.View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#90AFFE',
    },
    splashContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eduPath: {
        resizeMode: 'contain',
        width: 120,
        height: 120,
    },
    text: {
        color: 'white',
        fontSize: 42,
    }
})
export default SplashScreen;

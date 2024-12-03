import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import IntroductionScreen from './screens/Introduction';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgotPassword from './screens/ForgotPassword';
import ForgotPasswordOtp from './screens/ForgotPasswordOtp';
import ResetPassword from './screens/ResetPassword';
import SelectField from './screens/SelectField';
import UIUX from './screens/UIUX';
import Web from './screens/Web';
import CyberSecurity from './screens/CyberSecurity';
import FieldHelp from './screens/FieldHelp';
import Home from './screens/Home';
import Tracks from './screens/Tracks';
import More from './screens/More';
import Quiz from './screens/Quiz';
import Result from './screens/Result';
import CourseLearning from './screens/CourseLearning';
import ResetPasswordUser from './screens/ResetPasswordUser';
import Profile from './screens/Profile';
const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" />
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Introduction" component={IntroductionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordOtp" component={ForgotPasswordOtp} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="SelectField" component={SelectField} options={{ headerShown: false }} />
      <Stack.Screen name="UIUX" component={UIUX} options={{ headerShown: false }} />
      <Stack.Screen name="Web" component={Web} options={{ headerShown: false }} />
      <Stack.Screen name="CyberSecurity" component={CyberSecurity} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Tracks" component={Tracks} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="More" component={More} options={{ headerShown: false }} />
      <Stack.Screen name="CourseLearning" component={CourseLearning} options={{ headerShown: false }} />
      <Stack.Screen name="FieldHelp" component={FieldHelp} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPasswordUser" component={ResetPasswordUser} options={{ headerShown: false }} />
      <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
      <Stack.Screen name="Result" component={Result} options={{ headerShown: false }} />
    </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;

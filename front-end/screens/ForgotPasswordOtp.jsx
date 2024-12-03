import {View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator} from "react-native";
import { useState, useRef, useEffect } from "react";
import React from "react";
import Back from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPasswordOtp = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [seconds, setSeconds] = useState(120);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timerInterval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [seconds]);

  const handleTextChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      sendOtpToApi(newOtp.join(""));
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };


  const sendOtpToApi = async (OTP) => {
    setLoading(true);
    const token = await AsyncStorage.getItem("TEMPJWT");
    const apiUrl = 'http://10.0.2.2:4000/api/users/checktoken';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ OTP, token }),
      });
      
      
      const responseData = await response.json();
      setTimeout(() => {
        if (responseData.status === "success") {
          setLoading(false);
          navigation.navigate("ResetPassword");
        } 
        else {
          setLoading(false);
          setMessage(responseData.data);
        }
      }, 1000);
    } 
    catch (error) {
      console.log("Error from catch", error);
      setMessage("An error occurred");
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <View style={styles.screenContainer}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <View style={styles.topSection}>
        <Back
          name="arrow-back"
          size={32}
          color="#182235"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>OTP</Text>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.codeDetails}>
        <View style={styles.digitDetails}>
          <Text style={styles.digitTitle}>Enter the 4 digit code</Text>
          <Text style={styles.digitSecText}>
            Enter OTP sent to email address
          </Text>
          <Text style={styles.DigitThirdText}>
            <Text style={styles.digitBold}>
              Enter the OTP that has been sent
            </Text>{" "}
            to verify login transaction.
          </Text>
        </View>
        <View style={styles.digitBox}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={[
                styles.digitInput,
                {
                  borderColor: focusedIndex === index ? "#628EFF" : "#18223533",
                },
              ]}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) =>
                handleTextChange(text.replace(/[^0-9]/g, ""), index)
              }
              onFocus={() => handleFocus(index)}
            />
          ))}
        </View>
        <View style={styles.DigitTimer}>
          <Text style={styles.digitTimerTitle}>The code will expire in</Text>
          <Text style={styles.digitTimerText}>{formatTime(seconds)}</Text>
        </View>
        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 22,
    flex: 1,
    backgroundColor: "#fff",
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  topSection: {
    paddingTop: 50,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1822351A",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#182235",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#182235",
  },
  codeDetails: {
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 32,
    paddingHorizontal: 22,
  },
  digitTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#182235",
    marginBottom: 29,
  },
  digitSecText: {
    textAlign: "center",
    color: "#182235",
    fontWeight: "normal",
    marginBottom: 12,
  },
  DigitThirdText: {
    textAlign: "center",
    color: "#182235",
    fontWeight: "normal",
    marginBottom: 12,
  },
  digitBold: {
    fontWeight: "bold",
  },
  digitBox: {
    maxWidth: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  digitInput: {
    width: 49,
    height: 49,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "normal",
    color: "#182235",
    backgroundColor: "#fff",
    textAlign: "center",
    marginHorizontal: 5,
  },
  digitTimerTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "normal",
    color: "#182235",
    marginBottom: 20,
  },
  digitTimerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "normal",
    color: "#182235",
    marginBottom: 20,
  },
  resendText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "normal",
    color: "#628EFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  message: {
    color: "#FF0000",
    marginVertical: 10,
  },
});

export default ForgotPasswordOtp;

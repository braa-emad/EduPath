import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormInput = ({ label, placeholder, type = "text", onChangeText, value, keyboardType}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === "password";

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
          <TextInput placeholder={placeholder}
            placeholderTextColor="#18223566"
            secureTextEntry={isPassword && !isPasswordVisible}
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType}
          />
          {isPassword && (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.iconContainer}
            >
              <Icon name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 22,
  },
  label: {
    marginBottom: 12,
    fontWeight: '400',
    fontSize: 16,
    color: '#0D184699',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  iconContainer: {
    paddingHorizontal: 5,
  },
  required: {
    color: 'red',
    fontWeight: '700',
  },
});

export default FormInput;

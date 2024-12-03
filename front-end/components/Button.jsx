import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({
  title,
  onPress,
  width = '100%',
  height,
  backgroundColor = '#628EFF',
  borderRadius = 5,
  borderWidth = 1,
  borderColor = '#628EFF',
  textColor = '#fff',
  disabled = false,
  marginBottom,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled} 
      style={[
        styles.button,
        {
          width,
          height,
          borderRadius,
          backgroundColor: disabled ? '#A9C4FF' : backgroundColor,
          borderWidth: disabled ? 0 : borderWidth,
          borderColor,
          marginBottom,
        },
      ]}
    >
      <Text
        style={[
          styles.buttonText, { color: textColor },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
});

export default Button;

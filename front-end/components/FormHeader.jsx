import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const FormHeader = ({title, subtitle}) => {
  return (
    <View>
        <View style={styles.icon}>
            <Image source={require('../assets/images/Icons/edupath.png')} style={styles.imageIcon} />
            <Text style={styles.introText}>EduPath</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    imageIcon: {
        width: 24,
        resizeMode: 'contain',
    },
    iconImage: {
        marginRight: 22, 
    },
    introText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#628EFF',
        marginLeft: 12, 
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        color: '#182235',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 20,
        color: '#18223599',
    },
})

export default FormHeader;
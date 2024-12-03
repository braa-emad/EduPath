import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import React from 'react'
import Settings from '@expo/vector-icons/Feather';
import ContactUs from '@expo/vector-icons/AntDesign';
import AboutUs from '@expo/vector-icons/Feather';
import RateUs from '@expo/vector-icons/AntDesign';
import Terms from '@expo/vector-icons/MaterialCommunityIcons';
import Privacy from '@expo/vector-icons/MaterialIcons';
import Logout from '@expo/vector-icons/MaterialIcons';
import RightArrow from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import BottomTabs from '../components/BottomTabs';
import ResetPassword from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const More = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    
    const options = [
        {
            id: 1,
            icon: <Settings name="settings" size={24} color="#182235" />,
            name: 'Settings',
            action: () => null,
        },
        {
            id: 2,
            icon: <ContactUs name="customerservice" size={24} color="#182235" />,
            name: 'Contact Us',
            action: () => null,
        },
        {
            id: 3,
            icon: <AboutUs name="users" size={24} color="#182235" />,
            name: 'About Us',
            action: () => null,
        },
        {
            id: 4,
            icon: <RateUs name="staro" size={24} color="#182235" />,
            name: 'Rate Us',
            action: () => null,
        },
        {
            id: 5,
            icon: <Privacy name="security" size={24} color="#182235" />,
            name: 'Privacy Policy',
            action: () => null,
        },
        {
            id: 6,
            icon: <ResetPassword name="password" size={24} color="#182235" />,
            name: 'Reset Passsword',
            action: () => navigation.navigate('ResetPasswordUser'),
        },
        {
            id: 7,
            icon: <Logout name="logout" size={24} color="#182235" />,
            name: 'Log Out',
            action: () => handleLogout(),
        },
    ]

    const handleLogout = async () => {
        console.log('Log out initiated');
        setLoading(true);
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        setLoading(false);
                    },
                },
                {
                    text: 'Log Out',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('JWT');
                            setLoading(false);
                            navigation.replace('Login');
                        } 
                        catch (error) {
                            console.error('Error during logout:', error);
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };
    
    return (
        <View style={{flex: 1, backgroundColor: '#F9F9FB'}}>
                {loading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                )}
            <View style={styles.header}>
                <Text style={styles.headerText}>More menu</Text>
            </View>
            <View style={styles.moreContent}>
                <View style={styles.optionBox}>
                    <View style={styles.optionCard}>
                        {options.map((option, index) => (
                            <TouchableOpacity key={index} style={[styles.option, index === options.length - 1 && { borderBottomWidth: 0, paddingBottom: -5 }]} 
                            onPress={option.action}>
                                <View style={styles.iconContainer}>
                                    {option.icon}
                                    <Text style={styles.optionText}>{option.name}</Text>
                                </View>
                                <RightArrow name="keyboard-arrow-right" size={30} color="#18223566" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
            <View style={{flex: 1}}>
                <BottomTabs onTabPress={(screen) => navigation.replace(screen)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 40,
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#1822351A',
    },
    headerText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#182235',
    },
    loading: {
        backgroundColor: '#eee',
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    optionBox: {
        flexDirection: 'column',
    },
    optionCard: {
        borderRadius: 12,
        backgroundColor: 'white',
        marginHorizontal: 22,
        marginVertical: 22,
        paddingVertical: 22,
        paddingHorizontal: 22,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingBottom: 22,
        paddingTop: 12,
        borderBottomColor: '#1822351A',
        borderBottomWidth: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    optionText: {
        color: '#182235',
        fontWeight: '500',
        fontSize: 16,
    },
})

export default More
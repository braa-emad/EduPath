import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
const BottomTabs = ({ onTabPress }) => {
    const route = useRoute();
    const tabs = [
        { id: 1, icon: 'home', label: 'Home', screen: 'Home', library: AntDesign },
        { id: 2, icon: 'book-outline', label: 'Tracks', screen: 'Tracks', library: Ionicons },
        { id: 3, icon: 'user', label: 'Profile', screen: 'Profile', library: FontAwesome5 },
        { id: 4, icon: 'menu', label: 'More', screen: 'More', library: Entypo },
    ];

    const currentRoute = route.name;

    return (
        <View style={styles.tabBar}>
            {tabs.map((tab) => {
                const IconComponent = tab.library;
                const isActive = currentRoute === tab.screen;
                return (
                    <TouchableOpacity key={tab.id} style={styles.tab} onPress={() => onTabPress(tab.screen)}
                    >
                        <IconComponent name={tab.icon} size={24} color={ isActive ? '#628EFF' : '#182235' }  />
                        <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    paddingTop: 8,
    fontSize: 12,
    color: '#182235',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#628EFF', 
  },
});

export default BottomTabs;

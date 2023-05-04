import SignIn from '../screens/SignIn';
import Register from '../screens/Register';
import HomeScreen from '../screens/HomeScreen';
import InitMeetScreen from '../screens/InitMeetScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import TapBarIcon from '../components/TapBarIcon';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // 헤더를 숨김
        tabBarStyle: styles.tabBar,
        tabBarInactiveBackgroundColor: '#5496FF',
        tabBarActiveTintColor: '#5496FF',
        tabBarInactiveTintColor: '#ffffff',
      }}
      initialRouteName='home_tap'
    >
      <Tab.Screen
        name='temp1'
        component={InitMeetScreen}
        options={items => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => (
            <TapBarIcon Name={'v-card'} active={items.navigation.isFocused()} />
          ),
        })}
      />
      <Tab.Screen
        name='temp2'
        component={Register}
        options={items => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => (
            <TapBarIcon Name={'users'} active={items.navigation.isFocused()} />
          ),
        })}
      />
      <Tab.Screen
        name='home_tap'
        component={HomeScreen}
        options={items => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => (
            <TapBarIcon Name={'home'} active={items.navigation.isFocused()} />
          ),
        })}
      />
      <Tab.Screen
        name='temp4'
        component={SignIn}
        options={items => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => (
            <TapBarIcon
              Name={'notification'}
              active={items.navigation.isFocused()}
            />
          ),
        })}
      />
      <Tab.Screen
        name='temp5'
        component={InitMeetScreen}
        options={items => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => (
            <TapBarIcon Name={'user'} active={items.navigation.isFocused()} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#5496FF',
    borderTopWidth: 1,
    borderColor: '#000',
    height: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default HomeStack;

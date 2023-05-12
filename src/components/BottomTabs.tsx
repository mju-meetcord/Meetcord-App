import MeetScreen from '../screens/MeetScreen';
import MemberScreen from '../screens/MemberScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MypageScreen from '../screens/MypageScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import TapBarIcon from '../components/TapBarIcon';
import { BottomTabParamList, StackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

const Tab = createBottomTabNavigator<BottomTabParamList>();

type BottomTabProps = StackScreenProps<StackParamList, 'BottomTab'>;

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
      initialRouteName='Home'
    >
      <Tab.Screen
        name='Meet'
        component={MeetScreen}
        options={items => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => (
            <TapBarIcon Name={'v-card'} active={items.navigation.isFocused()} />
          ),
        })}
      />
      <Tab.Screen
        name='Member'
        component={MemberScreen}
        options={items => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => (
            <TapBarIcon Name={'users'} active={items.navigation.isFocused()} />
          ),
        })}
      />
      <Tab.Screen
        name='Home'
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
        name='Notification'
        component={NotificationScreen}
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
        name='Mypage'
        component={MypageScreen}
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

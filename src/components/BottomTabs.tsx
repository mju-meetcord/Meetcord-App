import MeetScreen from '../screens/MeetScreen';
import MemberScreen from '../screens/MemberScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MypageScreen from '../screens/MypageScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform } from 'react-native';
import TabBarIcon from './TabBarIcon';
import { BottomTabParamList, RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

const Tab = createBottomTabNavigator<BottomTabParamList>();

type BottomTabProps = StackScreenProps<RootStackParamList, 'BottomTab'>;

const BottomTabs = () => {
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
        options={() => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Name={'list'} active={focused} />
          ),
        })}
      />
      <Tab.Screen
        name='Member'
        component={MemberScreen}
        options={() => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Name={'users'} active={focused} />
          ),
        })}
      />
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={() => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Name={'home'} active={focused} />
          ),
        })}
      />
      <Tab.Screen
        name='Notification'
        component={NotificationScreen}
        options={() => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Name={'notification'} active={focused} />
          ),
        })}
      />
      <Tab.Screen
        name='Mypage'
        component={MypageScreen}
        options={() => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Name={'user'} active={focused} />
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
    height: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
});

export default BottomTabs;

import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import SignIn from './screens/SignIn';
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './components/BottomTabs';
import CreateMeetScreen from './screens/CreateMeetScreen';
import NotiDetail from './screens/NotiDetailScreen';
import MeetScreen from './screens/MeetScreen';
import ModifyMypageScreen from './screens/ModifyMypageScreen';
import CreateNotiScreen from './screens/CreateNotiScreen';
import ModifyNotiScreen from './screens/ModifyNotiScreen';
import MeetSearchSreen from './screens/MeetSearchScreen';
import { RootStackParamList } from './types';
import ScheduleDetailScreen from './screens/ScheduleDetailScreen';
import AddActivityRecordScreen from './screens/AddActivityRecordScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Splash'
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignIn'
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BottomTab'
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='InitMeet'
          component={MeetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CreateMeet'
          component={CreateMeetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='NotiDetail'
          component={NotiDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ModifyMypage'
          component={ModifyMypageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CreateNoti'
          component={CreateNotiScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ModifyNoti'
          component={ModifyNotiScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MeetSearch'
          component={MeetSearchSreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ScheduleDetail'
          component={ScheduleDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AddActivityRecord'
          component={AddActivityRecordScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
};

registerRootComponent(App);

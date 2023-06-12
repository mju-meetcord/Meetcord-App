import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './screens/BottomTabs';
import CreateMeetScreen from './screens/meet/CreateMeetScreen';
import NotiDetail from './screens/notification/NotiDetailScreen';
import MeetScreen from './screens/meet/MeetScreen';
import ModifyMypageScreen from './screens/mypage/ModifyMypageScreen';
import CreateNotiScreen from './screens/notification/CreateNotiScreen';
import ModifyNotiScreen from './screens/notification/ModifyNotiScreen';
import MeetSearchSreen from './screens/meet/MeetSearchScreen';
import { RootStackParamList } from './types';
import EditMemberScreen from './screens/member/EditMemberScreen';
import AddSchduleScreen from './screens/home/AddScheduleScreen';
import ScheduleDetailScreen from './screens/home/ScheduleDetailScreen';
import AddActivityRecordScreen from './screens/home/AddActivityRecordScreen';
import AttendanceScreen from './screens/home/AttendanceScreen';

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
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BottomTab'
          component={BottomTabs}
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
          name='EditMember'
          component={EditMemberScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AddSchedule'
          component={AddSchduleScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
            gestureDirection: 'vertical',
          }}
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
        <Stack.Screen
          name='Attendance'
          component={AttendanceScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
};

registerRootComponent(App);

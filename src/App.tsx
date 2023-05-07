import { registerRootComponent } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './components/BottomTabs';
import CreateMeetScreen from './screens/CreateMeetScreen';
import NotiDetail from './screens/NotiDetailScreen';
import MeetScreen from './screens/MeetScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='home'
          component={HomeStack}
          options={{ headerShown: false }} // 이 부분을 추가해주세요
        />
        <Stack.Screen
          name='login'
          component={SignIn}
          options={{ headerShown: false }} // 이 부분을 추가해주세요
        />
        <Stack.Screen
          name='register'
          component={Register}
          options={{ headerShown: false }} // 이 부분을 추가해주세요
        />
        <Stack.Screen
          name='Meet'
          component={MeetScreen}
          options={{ headerShown: false }} // 이 부분을 추가해주세요
        />
        <Stack.Screen
          name='CreateMeet'
          component={CreateMeetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='notiDetail'
          component={NotiDetail}
          options={{ headerShown: false }} // 이 부분을 추가해주세요
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(App);

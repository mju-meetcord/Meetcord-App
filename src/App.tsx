import { registerRootComponent } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import Register from './screens/Register';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import InitMeetScreen from './screens/InitMeetScreen';

const Stack = createStackNavigator();

const App = () => {
  /*return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name='home'
          component={Home}
          options={{ headerShown: false }} // 이 부분을 추가해주세요
        />
      </Stack.Navigator>
    </NavigationContainer>
  );*/

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='home'
          component={HomeScreen}
          options={{ headerShown: false }} // 이 부분을 추가해주세요
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(App);

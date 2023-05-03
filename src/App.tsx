import { registerRootComponent } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import InitMeetScreen from './screens/InitMeetScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
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
        <Stack.Screen name='InitMeet' component={InitMeetScreen} />
        {/* name 대문자 시작 권장 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(App);

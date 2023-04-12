import { registerRootComponent } from 'expo';
import { SafeAreaView, View } from 'react-native';
import SignIn from './screens/SignIn';

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <SignIn />
      </View>
    </SafeAreaView>
  );
};

registerRootComponent(App);

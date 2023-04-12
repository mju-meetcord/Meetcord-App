import { registerRootComponent } from 'expo';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']}>
        <View>
          <Text>Meetcord : 만남을 기록하다.</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

registerRootComponent(App);

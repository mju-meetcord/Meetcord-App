import { registerRootComponent } from 'expo';
import { SafeAreaView, Text, View } from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Meetcord : 만남을 기록하다.</Text>
      </View>
    </SafeAreaView>
  );
};

registerRootComponent(App);

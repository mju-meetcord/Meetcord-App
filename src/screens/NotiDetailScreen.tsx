import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotiDetailScreen = ({ route }: any) => {
  return (
    <SafeAreaView>
      <View>
        <Text>NotiDetailScreen</Text>
        <Text>{route.params.title}</Text>
        <Text>커밋 테스트용</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotiDetailScreen;

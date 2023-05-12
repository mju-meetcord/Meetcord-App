import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

type NotiDetailScreenProps = StackScreenProps<StackParamList, 'NotiDetail'>;

const NotiDetailScreen = ({ route }: NotiDetailScreenProps) => {
  return (
    <SafeAreaView>
      <View>
        <Text>NotiDetailScreen</Text>
        <Text>{route.params.title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotiDetailScreen;

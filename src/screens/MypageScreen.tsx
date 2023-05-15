import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabParamList } from '../types';

type MypageScreen = BottomTabScreenProps<BottomTabParamList, 'Mypage'>;

const MypageScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>마이페이지 화면</Text>
      </View>
    </SafeAreaView>
  );
};

export default MypageScreen;

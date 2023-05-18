import { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  ImageSourcePropType,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeetSearchInput from '../components/MeetSearchInput';
import MeetList from '../components/MeetList';
import MeetLogo from '../components/MeetLogo';
import MeetBtn from '../components/MeetBtn';
import { TempMeetList } from '../data/TempMeetList';
import { NavigationProp } from '../types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CreateMeetOfferText from '../components/CreateMeetOfferText';
import MeetInfoModal from '../components/MeetInfoModal';

export interface Meet {
  id: number;
  meetImg: ImageSourcePropType;
  meetName: string;
  meetIntroduce: string;
  isJoin: boolean;
}

const MeetScreen = () => {
  const [joinMeetList, setJoinMeetList] = useState<Meet[]>([]);
  const [inputText, setInputText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const result = TempMeetList.filter(item => item.isJoin); // 목업 데이터 테스트
  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
    useCallback(() => {
      setInputText('');
    }, [])
  );

  const hasMeet = () => {
    return !!result.length;
  };

  useEffect(() => {
    if (hasMeet()) {
      setJoinMeetList(result);
    }
  }, []);

  const onPressMeetBtn = () => {
    navigation.navigate('CreateMeet');
  };

  const handleSubmit = () => {
    navigation.navigate('MeetSearch', {
      meetSearchText: inputText,
    });
  };

  const onPressMeetModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <MeetLogo />
        <MeetSearchInput
          inputText={inputText}
          setInputText={setInputText}
          handleSubmit={handleSubmit}
        />
        <MeetList
          hasMeet={hasMeet()}
          resultList={joinMeetList}
          onPressListItem={onPressMeetModal}
        />
        {isModalVisible && (
          <MeetInfoModal
            isModalVisible={isModalVisible}
            handleBackButtonPress={onPressMeetModal}
            hasJoined={true}
          />
        )}
        <View style={styles.buttonBox}>
          {!hasMeet() && <CreateMeetOfferText />}
          <MeetBtn onPress={onPressMeetBtn} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#E9F1FF',
    alignItems: 'center',
  },
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    width: 325,
    justifyContent: 'flex-end',
  },
});

export default MeetScreen;

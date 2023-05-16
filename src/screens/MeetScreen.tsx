import { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageSourcePropType,
  View,
  Text,
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
import { useNavigation } from '@react-navigation/native';

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
  const result = TempMeetList.filter(item => item.isJoin); // 목업 데이터 테스트
  const navigation = useNavigation<NavigationProp>();

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <MeetLogo />
        <MeetSearchInput
          inputText={inputText}
          setInputText={setInputText}
          handleSubmit={handleSubmit}
        />
        <MeetList hasMeet={hasMeet()} resultList={joinMeetList} />
        <View style={styles.buttonBox}>
          {!hasMeet() && (
            <Text style={styles.adviceText}>
              새로운 Meet을 만들고 싶은가요?
            </Text>
          )}
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
  adviceText: {
    fontWeight: '400',
    color: '#676767',
    fontSize: 13,
    lineHeight: 15,
    marginRight: 5,
  },
});

export default MeetScreen;

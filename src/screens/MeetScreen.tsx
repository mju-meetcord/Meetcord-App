import { StyleSheet, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeetSearchInput from '../components/MeetSearchInput';
import MeetList from '../components/MeetList';
import InitMeetBtn from '../components/InitMeetBtn';
import MeetLogo from '../components/MeetLogo';
import MeetBtn from '../components/MeetBtn';
import { useState, useEffect } from 'react';
import { TempMeetList } from '../data/TempMeetList';
import { StackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export interface Meet {
  id: number;
  meetImg: ImageSourcePropType;
  meetName: string;
  meetIntroduce: string;
  isJoin: boolean;
}

type MeetScreenProps = StackScreenProps<StackParamList, 'Meet'>;

const MeetScreen = () => {
  const [joinMeetList, setJoinMeetList] = useState<Meet[]>([]);
  const result = TempMeetList.filter(item => item.isJoin); // 목업 데이터 테스트

  const hasMeet = () => {
    return !!result.length;
  };

  useEffect(() => {
    if (hasMeet()) {
      setJoinMeetList(result);
    }
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {!hasMeet() && <MeetLogo />}
      <MeetSearchInput />
      <MeetList hasMeet={hasMeet()} resultList={joinMeetList} />
      {hasMeet() && <MeetBtn />}
      {!hasMeet() && <InitMeetBtn />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#E9F1FF',
    alignItems: 'center',
  },
});

export default MeetScreen;

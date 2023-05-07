import { StyleSheet, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeetSearchInput from '../components/MeetSearchInput';
import MeetList from '../components/MeetList';
import InitMeetBtn from '../components/InitMeetBtn';
import MeetLogo from '../components/MeetLogo';
import MeetBtn from '../components/MeetBtn';
import { useState, useEffect } from 'react';
import { TempMeetList } from '../data/TempMeetList';

export interface Meet {
  id: number;
  meetImg: ImageSourcePropType;
  meetName: string;
  meetIntroduce: string;
  isJoin: boolean;
}

const MeetScreen = () => {
  const [hasMeet, setHasMeet] = useState(false);
  const [resultMeetList, setResultMeetList] = useState<Meet[]>([]);

  useEffect(() => {
    const temp = TempMeetList.filter(item => item.isJoin);
    temp && setHasMeet(true);
    setResultMeetList(temp);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {!hasMeet && <MeetLogo />}
      <MeetSearchInput />
      <MeetList hasMeet={hasMeet} resultList={resultMeetList} />
      {hasMeet && <MeetBtn />}
      {!hasMeet && <InitMeetBtn />}
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

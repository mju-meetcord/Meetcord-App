import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeetSearchInput from '../components/MeetSearchInput';
import MeetList from '../components/MeetList';
import InitMeetBtn from '../components/InitMeetBtn';
import MeetLogo from '../components/MeetLogo';
import MeetBtn from '../components/MeetBtn';
import { useState } from 'react';

const MeetScreen = () => {
  const [hasMeet, setHasMeet] = useState(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {!hasMeet && <MeetLogo />}
      <MeetSearchInput />
      <MeetList hasMeet={hasMeet} />
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

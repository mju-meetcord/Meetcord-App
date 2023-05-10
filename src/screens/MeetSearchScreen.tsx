import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import MeetSearchInput from '../components/MeetSearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeetListItem from '../components/MeetListItem';
import BackButton from 'assets/back_btn.svg';
import { useState } from 'react';

export interface Meet {
  id: number;
  meetImg: ImageSourcePropType;
  meetName: string;
  meetIntroduce: string;
}

const MeetSearchSreen = () => {
  const [resultList, setResultList] = useState<Meet[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrap}>
        <TouchableOpacity style={styles.backButton}>
          <BackButton />
        </TouchableOpacity>
        <MeetSearchInput isMarginTop={false} setResultList={setResultList} />
      </View>
      <View style={styles.searchListBox}>
        <ScrollView keyboardDismissMode='on-drag'>
          {resultList.map(item => (
            <MeetListItem
              src={item.meetImg}
              meetName={item.meetName}
              intro={item.meetIntroduce}
              key={item.id}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F1FF',
    height: '100%',
    alignItems: 'center',
  },
  topWrap: {
    width: 325,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  searchListBox: {
    marginTop: 23,
    width: 325,
    height: 420,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default MeetSearchSreen;

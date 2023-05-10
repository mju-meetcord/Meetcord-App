import {
  Text,
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
  const listLength = resultList.length;
  const [isSearch, setIsSearch] = useState(false);

  return (
    <SafeAreaView style={styles(listLength).container}>
      <View style={styles(listLength).topWrap}>
        <TouchableOpacity style={styles(listLength).backButton}>
          <BackButton />
        </TouchableOpacity>
        <MeetSearchInput
          isMarginTop={false}
          setResultList={setResultList}
          setIsSearch={setIsSearch}
        />
      </View>
      <View style={styles(listLength).searchListBox}>
        <ScrollView keyboardDismissMode='on-drag'>
          {!listLength ? (
            !isSearch ? (
              <Text style={styles(listLength).emptyText}>
                가입하고 싶은 Meet의 이름을 입력해주세요!
              </Text>
            ) : (
              <Text style={styles(listLength).emptyText}>
                검색어를 다시 입력해주세요!
              </Text>
            )
          ) : null}
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

const styles = (len: number) =>
  StyleSheet.create({
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
    emptyText: {
      textAlign: 'center',
    },
    searchListBox: {
      marginTop: 23,
      width: 325,
      height: len * 60,
      minHeight: 60,
      maxHeight: 420,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
  });

export default MeetSearchSreen;

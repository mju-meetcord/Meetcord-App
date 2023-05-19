import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MeetSearchInput from '../components/MeetSearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeetListItem from '../components/MeetListItem';
import BackButton from 'assets/back_btn.svg';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../types';
import { Meet } from './MeetScreen';
import { TempMeetList } from '../data/TempMeetList';
import MeetBtn from '../components/MeetBtn';
import { StackScreenProps } from '@react-navigation/stack';
import CreateMeetOfferText from '../components/CreateMeetOfferText';

type MeetSearchScreenProps = StackScreenProps<RootStackParamList, 'MeetSearch'>;

const MeetSearchSreen = ({ route }: MeetSearchScreenProps) => {
  const [resultList, setResultList] = useState<Meet[]>([]);
  const [inputText, setInputText] = useState(route.params.meetSearchText);
  const [resultText, setResultText] = useState('');

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    handleSubmit();
  }, [route.params.meetSearchText]);

  const handleSubmit = () => {
    setResultText(inputText);
    if (!inputText) {
      setResultList([]);
      return;
    }
    const temp = TempMeetList.filter(item => item.meetName.includes(inputText));
    setResultList(temp);
  };

  const onPressMeetBtn = () => {
    navigation.navigate('CreateMeet');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topWrap}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.pop()}
          >
            <BackButton />
          </TouchableOpacity>
          <MeetSearchInput
            inputText={inputText}
            setInputText={setInputText}
            handleSubmit={handleSubmit}
          />
        </View>
        <View>
          <Text style={styles.searchResultText}>
            &apos;{resultText}&apos; 검색 결과
          </Text>
          {!resultList.length ? (
            <>
              <View style={styles.emptyResultBox}>
                <Text style={styles.emptyResultText}>
                  검색 결과가 없습니다. Meet이름과 {'\n'}초대코드를 다시
                  확인해주세요.
                </Text>
              </View>
              <View style={styles.buttonBox}>
                <CreateMeetOfferText />
                <MeetBtn onPress={onPressMeetBtn} />
              </View>
            </>
          ) : (
            <View style={styles.searchListBox}>
              <ScrollView keyboardDismissMode='on-drag'>
                {resultList.map(item => (
                  <MeetListItem
                    meetInfo={item}
                    userJoinInfo={item}
                    key={item.id}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <Text style={styles.searchScreenLogo}>Meetcord</Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    width: 340,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  searchResultText: {
    marginBottom: 8,
    marginLeft: 10,
    marginTop: 31,
  },
  searchListBox: {
    width: 340,
    minHeight: 60,
    maxHeight: 420,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  emptyResultBox: {
    width: 340,
    height: 360,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyResultText: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 25,
    color: '#5496FF',
  },
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    width: 340,
    justifyContent: 'flex-end',
  },
  searchScreenLogo: {
    fontWeight: '700',
    fontSize: 80,
    color: 'rgba(84, 150, 255, 0.3)',
    lineHeight: 80,
    position: 'absolute',
    bottom: 0,
  },
});

export default MeetSearchSreen;

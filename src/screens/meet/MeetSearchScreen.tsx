import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import MeetSearchInput from '../../components/meet/MeetSearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeetListItem from '../../components/meet/MeetListItem';
import BackButton from 'assets/back_btn.svg';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../types';
import { Meet } from './MeetScreen';
import MeetBtn from '../../components/meet/MeetBtn';
import { StackScreenProps } from '@react-navigation/stack';
import CreateMeetOfferText from '../../components/meet/CreateMeetOfferText';

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

    fetch(`http://121.124.131.142:4000/meet?keyword=${inputText}`, {
      // 검색어를 URL에 추가하여 GET 요청
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        if (response.data) {
          const meetData = response.data.map(
            (item: {
              group_id: number;
              profile: ImageSourcePropType;
              name: string;
              description: string;
              count: number;
            }) => {
              const index = route.params.data
                .map(i => i.id)
                .indexOf(item.group_id);
              return {
                id: item.group_id,
                meetImg: {
                  uri: 'http://121.124.131.142:4000/images/' + item.profile,
                },
                meetName: item.name,
                meetIntroduce: item.description,
                role: 'none',
                hasJoined:
                  index != -1
                    ? route.params.data[index].role != 'waiting'
                    : false,
                isWaiting:
                  index != -1
                    ? route.params.data[index].role == 'waiting'
                    : false,
                user_num: item.count,
              };
            }
          );

          setResultList(meetData);
        }
      })
      .catch(error => console.error(error));
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
                  검색 결과가 없습니다. {'\n'}
                  Meet이름을 다시 확인해주세요.
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
                    update={() => handleSubmit()}
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
    fontSize: Platform.OS === 'ios' ? 90 : 95,
    color: 'rgba(84, 150, 255, 0.3)',
    position: 'absolute',
    bottom: 0,
  },
});

export default MeetSearchSreen;

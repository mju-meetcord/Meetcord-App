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
import { NavigationProp } from '../types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CreateMeetOfferText from '../components/CreateMeetOfferText';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Meet {
  id: number;
  meetImg: ImageSourcePropType;
  meetName: string;
  meetIntroduce: string;
  role: string;
  hasJoined: boolean;
  isWaiting: boolean;
}

const MeetScreen = () => {
  const [joinMeetList, setJoinMeetList] = useState<Meet[]>([]);
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState([]);
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
    let status = 0;

    AsyncStorage.getItem('UserToken', (err, result) => {
      fetch('http://121.124.131.142:4000/mymeet', {
        method: 'POST',
        body: JSON.stringify({
          token: result,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          status = response.status;
          return response.json();
        })
        .then(response => {
          if (status == 200) {
            const meetData = response.data.map(
              (item: {
                group_id: number;
                profile: ImageSourcePropType;
                name: string;
                description: string;
                role: string;
              }) => {
                return {
                  id: item.group_id,
                  meetImg: {
                    uri: 'http://121.124.131.142:4000/images/' + item.profile,
                  },
                  meetName: item.name,
                  meetIntroduce: item.description,
                  role: item.role,
                  hasJoined: item.role !== 'waiting',
                  isWaiting: item.role === 'waiting',
                };
              }
            );

            setJoinMeetList(meetData);
            setResult(
              meetData.filter((item: { hasJoined: boolean }) => item.hasJoined)
            );
          } else if (status == 401) {
            //alert(response.message);
            console.log(response);
          }
        })
        .catch(error => console.error(error));
    });

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
    marginTop: 26,
    width: 325,
    justifyContent: 'flex-end',
  },
});

export default MeetScreen;

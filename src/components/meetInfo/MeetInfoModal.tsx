import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import BackButton from '../common/BackButton';
import MeetInfoModalButton from './MeetInfoModalButton';
import { NavigationProp } from '../../types';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

type MeetInfoModalProps = {
  isModalVisible: boolean;
  meetInfo: {
    id: number;
    meetImg: ImageSourcePropType;
    meetName: string;
    meetIntroduce: string;
    role: string;
    creator_id: number;
    user_num: number;
  };
  userJoinInfo: {
    hasJoined: boolean;
    isWaiting: boolean;
  };
  handleBackButtonPress: () => void;
  update: () => void;
};

const MeetInfoModal = ({
  isModalVisible,
  meetInfo,
  userJoinInfo,
  handleBackButtonPress,
  update,
}: MeetInfoModalProps) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const registerMeet = () => {
    let status = 0;
    AsyncStorage.getItem('UserToken', (err, result) => {
      fetch('http://121.124.131.142:4000/mymeet', {
        method: 'PUT',
        body: JSON.stringify({ token: result, group_id: meetInfo.id }),
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
            update();
            handleBackButtonPress();
            navigation.pop();
          } else if (status == 401) {
            console.log(response.message);
          }
        })
        .catch(error => console.error(error));
    });
  };

  const submitDelte = () => {
    Alert.alert('가입 신청을 취소하시겠습니까?', '', [
      {
        text: 'YES',
        onPress: () => {
          AsyncStorage.getItem('UserToken', (err, result) => {
            fetch(`http://121.124.131.142:4000/member`, {
              method: 'delete',
              body: JSON.stringify({
                mem_id: -1,
                meet_id: meetInfo.id,
                token: result,
                creator_id: meetInfo.creator_id,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(response => response.json())
              .then(() => {
                update();
                handleBackButtonPress();
              })
              .catch(error => console.error(error));
          });
        },
        style: 'default',
      },
      {
        text: 'NO',
        style: 'destructive',
      },
    ]);
  };

  const submitDelte2 = () => {
    Alert.alert('그룹을 탈퇴하시겠습니까?', '', [
      {
        text: 'YES',
        onPress: () => {
          AsyncStorage.getItem('UserToken', (err, result) => {
            fetch(`http://121.124.131.142:4000/member`, {
              method: 'delete',
              body: JSON.stringify({
                mem_id: -1,
                meet_id: meetInfo.id,
                token: result,
                creator_id: meetInfo.creator_id,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(response => response.json())
              .then(() => {
                update();
                handleBackButtonPress();
              })
              .catch(error => console.error(error));
          });
        },
        style: 'default',
      },
      {
        text: 'NO',
        style: 'destructive',
      },
    ]);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      swipeDirection='left'
      style={styles.modalContainer}
      onModalHide={handleBackButtonPress}
      onBackdropPress={handleBackButtonPress}
    >
      <View style={styles.innerContainer}>
        <View style={styles.topBox}>
          <BackButton onPress={handleBackButtonPress} />
          <Text style={styles.meetName}>{meetInfo.meetName}</Text>
        </View>
        <View style={styles.bottomBox}>
          <View style={styles.meetInfoBox}>
            <Image source={meetInfo.meetImg} style={styles.meetImage} />
            <View style={styles.meetDetailInfoBox}>
              <Text style={styles.meetDetailTextLabel}>구성원</Text>
              <Text style={styles.meetDetailText}>{meetInfo.user_num}명</Text>
            </View>
          </View>
          <View style={styles.meetIntroBox}>
            <Text style={styles.meetIntroText} numberOfLines={6}>
              {meetInfo.meetIntroduce}
            </Text>
          </View>
          {userJoinInfo.isWaiting ? (
            <MeetInfoModalButton
              firstText='승인 대기'
              secondText='취소'
              onpress={() => {
                handleBackButtonPress();
              }}
              onpress2={() => {
                submitDelte();
              }}
            />
          ) : userJoinInfo.hasJoined ? (
            <MeetInfoModalButton
              firstText='나의 Meet'
              secondText='탈퇴'
              onpress={() => {
                handleBackButtonPress();
                AsyncStorage.setItem('group_id', meetInfo.id.toString());
                AsyncStorage.setItem('group_name', meetInfo.meetName);
                AsyncStorage.setItem('group_role', meetInfo.role);
                AsyncStorage.setItem(
                  'creator_id',
                  meetInfo.creator_id.toString()
                );
                {
                  route.name === 'Meet'
                    ? navigation.navigate('Home')
                    : navigation.navigate('BottomTab');
                }
              }}
              onpress2={() => {
                submitDelte2();
              }}
            />
          ) : (
            <TouchableOpacity
              style={styles.joinMeetButton}
              onPress={() => registerMeet()}
            >
              <Text style={styles.joinButtonText}>가입 신청</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    padding: 0,
    margin: 0,
  },
  innerContainer: {
    height: 620,
    borderWidth: 1,
    borderColor: '#878787',
    borderRadius: 10,
    backgroundColor: '#E9F1FF',
  },
  topBox: {
    height: 153,
    paddingLeft: 30,
    paddingTop: 40,
  },
  meetName: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 52,
  },
  bottomBox: {
    height: 465,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  meetImage: {
    width: 100,
    height: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#B3B3B3',
  },
  meetInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  meetDetailInfoBox: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  meetDetailText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  meetDetailTextLabel: {
    fontSize: 24,
  },
  meetIntroBox: {
    width: 330,
    height: 150,
    marginTop: 30,
    marginLeft: 32,
  },
  meetIntroText: {
    color: '#000000',
    fontSize: 18,
    lineHeight: 25,
  },
  joinMeetButton: {
    width: 360,
    height: 40,
    backgroundColor: '#5496FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 56,
  },
  joinButtonText: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default MeetInfoModal;

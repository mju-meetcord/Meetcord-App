import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Modal from 'react-native-modal';
import BackButton from './BackButton';
import MeetInfoModalButton from './MeetInfoModalButton';

type MeetInfoModalProps = {
  isModalVisible: boolean;
  meetInfo: {
    meetImg: ImageSourcePropType;
    meetName: string;
    meetIntroduce: string;
  };
  userJoinInfo: {
    hasJoined: boolean;
    isWaiting: boolean;
  };
  handleBackButtonPress: () => void;
};

const MeetInfoModal = ({
  isModalVisible,
  meetInfo,
  userJoinInfo,
  handleBackButtonPress,
}: MeetInfoModalProps) => {
  return (
    <Modal
      isVisible={isModalVisible}
      swipeDirection='left'
      style={styles.modalContainer}
      onModalHide={handleBackButtonPress}
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
              <Text style={styles.meetDetailText}>6명</Text>
              <Text style={styles.meetDetailTextLabel}>구성원</Text>
            </View>
            <View style={styles.meetDetailInfoBox}>
              <Text style={styles.meetDetailText}>19개</Text>
              <Text style={styles.meetDetailTextLabel}>활동</Text>
            </View>
          </View>
          <View style={styles.meetIntroBox}>
            <Text style={styles.meetIntroText} numberOfLines={6}>
              {meetInfo.meetIntroduce}
            </Text>
          </View>
          {userJoinInfo.hasJoined ? (
            <MeetInfoModalButton firstText='나의 Meet' secondText='탈퇴' />
          ) : userJoinInfo.isWaiting ? (
            <MeetInfoModalButton firstText='승인 대기' secondText='취소' />
          ) : (
            <TouchableOpacity style={styles.joinMeetButton}>
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
  },
  meetInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-around',
    marginRight: 60,
  },
  meetDetailInfoBox: {
    alignItems: 'center',
  },
  meetDetailText: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 20,
  },
  meetDetailTextLabel: {
    fontSize: 18,
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

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import BackButton from './BackButton';

type MeetInfoModalProps = {
  isModalVisible: boolean;
  handleBackButtonPress: () => void;
};

const MeetInfoModal = ({
  isModalVisible,
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
          <Text style={styles.meetName}>명지바람 6조</Text>
        </View>
        <View style={styles.bottomBox}>
          <View style={styles.meetInfoBox}>
            <Image
              source={require('../../assets/testImg.png')}
              style={styles.meetImage}
            />
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
              세기의 천재들이 모여서 만드는 개쩌는 졸작 당신도 늦지 않았다.
              명지대학교 컴퓨터 공학과 수석 졸업을 원한다면 언제든 join! 앞으로
              20글자만 더 쓰면 끝이당 휴 80자 넘긴 했는데 만약에 글이 여기까지
              있다면 이런 느낌
            </Text>
          </View>
          {/* <TouchableOpacity style={styles.joinMeetButton}>
            <Text style={styles.joinButtonText}>가입 신청</Text>
          </TouchableOpacity> */}
          <View style={styles.bottomButtonBox}>
            <TouchableOpacity style={styles.hasJoinedButton}>
              <Text style={styles.hasJoinedButtonText}>나의 Meet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>탈퇴</Text>
            </TouchableOpacity>
          </View>
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
    lineHeight: 24,
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
  bottomButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 56,
  },
  hasJoinedButton: {
    backgroundColor: '#ffffff',
    borderColor: '#5496FF',
    borderWidth: 2,
    width: 280,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hasJoinedButtonText: {
    color: '#5496FF',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 2,
  },
  cancelButton: {
    width: 70,
    height: 40,
    borderColor: '#676767',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#676767',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
  },
});

export default MeetInfoModal;

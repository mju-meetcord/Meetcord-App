import Modal from 'react-native-modal';
import { View, Text, StyleSheet } from 'react-native';
import { MemberModerProps } from '../types';

const MemberModer = ({ isVisible, onBackdropPress }: MemberModerProps) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn='fadeIn'
      animationOut='fadeOut'
      onBackdropPress={onBackdropPress}
      style={{
        flex: 1,
        zIndex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 106,
        width: '90%',
        margin: 0,
        marginLeft: '5%',
      }}
      backdropColor='transparent'
    >
      <View style={styles.modal}>
        <View style={styles.modalTop}>
          <View style={styles.imageBox}></View>
        </View>
        <View style={styles.modalBottom}>
          <Text style={styles.modalTitle}>전소영</Text>
          <Text style={styles.modalText}>Mobile. 010-xxxx-xxxx</Text>
          <Text style={styles.modalText}>E-mail. test@naver.com</Text>
          <Text style={styles.modalText}>Birth. 2001년 06월 12일</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: 220,
    borderRadius: 15,
    borderWidth: 1,
    overflow: 'hidden',
  },
  modalTop: {
    width: '100%',
    height: 90,
    backgroundColor: '#E9F1FF',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 20,
  },
  imageBox: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#D9D9D9',
  },
  modalBottom: {
    width: '100%',
    height: 130,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    marginTop: 2,
    marginLeft: 2,
    color: '#676767',
  },
});

export default MemberModer;

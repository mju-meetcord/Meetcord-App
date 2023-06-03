import Modal from 'react-native-modal';
import { View, Text, StyleSheet } from 'react-native';
import { MemberModalProps } from '../types';
import { useEffect } from 'react';
import { Image } from 'expo-image';

const MemberModal = ({
  data,
  isVisible,
  onBackdropPress,
}: MemberModalProps) => {
  useEffect(() => {
    console.log();
  }, [data]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn='fadeInUp'
      animationOut='fadeOutDown'
      onBackdropPress={onBackdropPress}
      style={styles.container}
      backdropColor='#00000033'
    >
      <View style={styles.modal}>
        <View style={styles.modalTop}>
          <View style={styles.imageBox}>
            <Image
              source={{
                uri: 'http://121.124.131.142:4000/images/user/' + data.profile,
              }}
              style={styles.img}
            />
          </View>
        </View>
        <View style={styles.modalBottom}>
          <Text style={styles.modalTitle}>{data.name}</Text>
          <Text style={styles.modalText}>Mobile. {data.phone}</Text>
          <Text style={styles.modalText}>E-mail. {data.email}</Text>
          <Text style={styles.modalText}>
            Birth.{' '}
            {`${new Date(data.birthday).getFullYear()}년 ${
              new Date(data.birthday).getMonth() + 1
            }월 ${new Date(data.birthday).getDate()}일`}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 110,
    width: '94%',
    margin: 0,
    marginLeft: '3%',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: 220,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
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
  img: {
    height: 100,
    width: 100,
    borderRadius: 30,
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
    marginBottom: 4,
  },
  modalText: {
    fontSize: 18,
    marginTop: 2,
    marginLeft: 2,
    color: '#676767',
  },
});

export default MemberModal;

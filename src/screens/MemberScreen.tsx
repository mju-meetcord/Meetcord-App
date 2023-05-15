import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeberItem from '../components/MeberItem';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types';
import { useState } from 'react';
import Modal from 'react-native-modal';
import MemberModer from '../components/MemberModer';

type MemberScreenProps = BottomTabScreenProps<BottomTabParamList, 'Member'>;

const MemberScreen = () => {
  const [btnCheck, setBtnCheck] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const groupName = '명지바람';

  const dummyData = [
    { name: '전소영', role: 'Admin' },
    { name: '전준오', role: 'Admin' },
    { name: '전준삼', role: '일반 회원' },
    { name: '조민지', role: '일반 회원' },
    { name: '박민지', role: '일반 회원' },
    { name: '서민서', role: '일반 회원' },
    { name: '홍길동', role: '일반 회원' },
  ];

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#E9F1FF',
      }}
      edges={['right', 'left', 'top']}
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>{groupName}의 구성원</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setBtnCheck(true)}
          >
            <Text style={btnCheck ? styles.btnTextActive : styles.btnText}>
              회원
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setBtnCheck(false)}
          >
            <Text style={btnCheck ? styles.btnText : styles.btnTextActive}>
              운영자
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {btnCheck ? (
            <View style={{ minHeight: 200 }}>
              {dummyData
                .filter(data => data.role != 'Admin')
                .map((data, i) => {
                  return (
                    <MeberItem
                      name={data.name}
                      role={data.role}
                      key={i}
                      onpress={() => setModalVisible(true)}
                    />
                  );
                })}
            </View>
          ) : (
            <View style={styles.listBox}>
              {dummyData
                .filter(data => data.role == 'Admin')
                .map((data, i) => {
                  return (
                    <MeberItem
                      name={data.name}
                      role={data.role}
                      key={i}
                      onpress={() => setModalVisible(true)}
                    />
                  );
                })}
            </View>
          )}
        </ScrollView>
      </View>
      <MemberModer
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 120,
    justifyContent: 'flex-end',
    backgroundColor: '#E9F1FF',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 20,
  },

  btnContainer: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#C6C6C6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    height: '80%',
    width: '50%',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#C6C6C6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#878787',
  },
  btnTextActive: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },

  listBox: {
    minHeight: 100,
    maxHeight: 200,
    marginBottom: 60,
  },
  title2: {
    fontSize: 23,
    fontWeight: 'bold',
    left: 20,
  },
  main: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  bottomDommy: {
    height: 30,
  },
});
export default MemberScreen;

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeberItem from '../components/MeberItem';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types';

type MemberScreenProps = BottomTabScreenProps<BottomTabParamList, 'Member'>;

const MemberScreen = () => {
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
        backgroundColor: '#FFFFFF',
      }}
      edges={['right', 'left', 'top']}
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>{groupName}의 구성원</Text>
        </View>
        <ScrollView style={styles.main}>
          <Text style={styles.title2}>관리자--</Text>
          <View style={styles.listBox}>
            {dummyData
              .filter(data => data.role == 'Admin')
              .map((data, i) => {
                return <MeberItem name={data.name} role={data.role} key={i} />;
              })}
          </View>
          <Text style={styles.title2}>회원--</Text>
          <View style={{ minHeight: 200 }}>
            {dummyData
              .filter(data => data.role != 'Admin')
              .map((data, i) => {
                return <MeberItem name={data.name} role={data.role} key={i} />;
              })}
          </View>
          <View style={styles.bottomDommy}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 100,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    left: 20,
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

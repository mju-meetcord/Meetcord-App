import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotiItem from '../components/NotiItem';
import { BottomTabParamList, RootStackParamList } from '../types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

type NotificationScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Notification'>,
  StackScreenProps<RootStackParamList>
>;

const NotificationScreen = ({ navigation }: NotificationScreenProps) => {
  // 테스트용 더미 데이터
  const dummyData = [
    { title: 'test123', date: '2023.06.05 (화) 10:00' },
    { title: 'test123', date: '2023.06.05 (화) 10:00' },
    { title: 'test123', date: '2023.06.05 (화) 10:00' },
    { title: 'test123', date: '2023.06.05 (화) 10:00' },
    { title: 'test123', date: '2023.06.05 (화) 10:00' },
    { title: 'test123', date: '2023.06.05 (화) 10:00' },
    { title: 'test123', date: '2023.06.05 (화) 10:00' },
    { title: 'test123', date: '2023.06.05 (화) 10:00' },
    { title: 'test123', date: '2023.06.05 (화) 10:00' },
    { title: 'test123', date: '2023.06.05 (화) 10:00' },
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
          <Text style={styles.title}>공지 게시판</Text>
        </View>
        <ScrollView style={styles.main}>
          {dummyData.map((data, i) => (
            <NotiItem
              title={data.title}
              date={data.date}
              key={i}
              onpress={() =>
                navigation.navigate('NotiDetail', { title: data.title })
              }
            />
          ))}
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
    height: 120,
    justifyContent: 'flex-end',
    backgroundColor: '#E9F1FF',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 25,
  },
  main: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  bottomDommy: {
    height: 30,
  },
});

export default NotificationScreen;

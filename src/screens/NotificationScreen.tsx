import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotiItem from '../components/notiItem';

const NotificationScreen = ({ navigation }: any) => {
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
        backgroundColor: '#FFFFFF',
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
                navigation.navigate('notiDetail', { title: data.title })
              }
            />
          ))}
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
  main: {
    backgroundColor: '#E9F1FF',
    paddingTop: 10,
  },
});

export default NotificationScreen;

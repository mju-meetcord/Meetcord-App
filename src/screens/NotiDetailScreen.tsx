import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import BackBtn from '../../assets/back_btn.svg';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';

type NotiDetailScreenProps = StackScreenProps<RootStackParamList, 'NotiDetail'>;

const NotiDetailScreen = ({ route, navigation }: NotiDetailScreenProps) => {
  const { top } = useSafeAreaInsets();

  const [data, setData] = useState({ title: '', created_at: '', message: '' });

  /*const dummyData = {
    title: 'test123',
    date: '2023. 06. 05 (화) 10:00',
    message:
      '05월 07일의 운세 총운은 “어이상실” 입니다. 꼭 운이 많이 따르고 적게 따르고를 논하기 보다는 여러 가지로 바쁜 하루가 될 것으로 보이는군요. 몸과 마음이 부산하고 정신이 없는 날입니다. 무엇을 했는지도 모르게 하루가 지나가 버릴 확률이 많이 있습니다. 일이 많고 생각보다 성과는 적어 지치는 마음이 들 수도 있습니다. 하지만 결과가 그리 나쁜 것은 아니고 평소하던만큼의 성과는 거둘 수 있으니 편하게 생각하고 천천히 하나씩 해결해 나가다 보면 어느새 하루 해가 지고 있는 모습을 보게 될 것입니다.',
    // 테스트용 text
  };*/

  console.log(route.params.id);

  useEffect(() => {
    fetch(
      `http://121.124.131.142:4000/notificationDtail?id=${route.params.id}`,
      {
        // 검색어를 URL에 추가하여 GET 요청
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setData(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
      edges={['bottom']}
    >
      <View style={[styles.statusBarPlaceholder, { height: top }]}></View>
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.pop()}
          >
            <BackBtn />
          </TouchableOpacity>
          <Text style={styles.NotiDetail}>공지사항</Text>
        </View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.date}>{data.created_at}</Text>
        <View style={styles.border} />
      </View>
      <ScrollView>
        <Text style={styles.message}>{data.message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#E9F1FF',
  },

  statusBarPlaceholder: {
    backgroundColor: '#E9F1FF',
  },

  border: {
    borderBottomWidth: 1,
    borderColor: '#C6C6C6',
    marginHorizontal: 6,
  },

  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 12,
    marginTop: 40,
  },

  backBtn: {
    marginLeft: 12,
  },

  NotiDetail: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 10,
    marginLeft: 25,
  },

  date: {
    fontSize: 16,
    color: '#676767',
    marginLeft: 25,
    marginBottom: 14,
  },

  message: {
    fontSize: 16,
    width: '85%',
    marginTop: 14,
    marginHorizontal: 25,
  },
});

export default NotiDetailScreen;

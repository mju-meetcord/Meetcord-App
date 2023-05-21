import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotiItem from '../components/NotiItem';
import { BottomTabParamList, RootStackParamList } from '../types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';

type NotificationScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Notification'>,
  StackScreenProps<RootStackParamList>
>;

const NotificationScreen = ({ navigation }: NotificationScreenProps) => {
  const isFoused = useIsFocused();

  const [data, setData] = useState([
    { title: '', created_at: '', notification_id: '' },
  ]);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    return () => {
      getNotiData();
    };
  }, [isFoused]);

  useEffect(() => {
    getNotiData();
  }, []);

  const getNotiData = () => {
    fetch(`http://121.124.131.142:4000/notification?name=${'코사모'}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error(error));
  };

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
          <View style={styles.textBox}>
            <Text style={styles.title}>공지 게시판</Text>
            <TouchableOpacity
              disabled={!isAdmin}
              onPress={() => {
                navigation.navigate('CreateNoti');
              }}
            >
              <Text style={isAdmin ? styles.addBtn : styles.addBtnDisable}>
                추가
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.main}>
          {data.map((data, i) => (
            <NotiItem
              title={data.title}
              date={data.created_at}
              key={i}
              onpress={() =>
                navigation.navigate('NotiDetail', { id: data.notification_id })
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
    paddingLeft: 25,
    paddingRight: 45,
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addBtn: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5496FF',
  },
  addBtnDisable: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E9F1FF',
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

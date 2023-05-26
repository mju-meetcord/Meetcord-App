import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EditMemberItemProps } from '../types';
import { Image } from 'expo-image';

const EditMeberItem = ({ data, option, setReload }: EditMemberItemProps) => {
  const submitDelte = () => {
    Alert.alert(`${data.name}를(을) 삭제하겠습니까?`, '', [
      {
        text: 'YES',
        onPress: () => {
          fetch(`http://121.124.131.142:4000/member`, {
            method: 'delete',
            body: JSON.stringify({
              mem_id: data.mem_id,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(() => {
              setReload(data.mem_id.toString());
            })
            .catch(error => console.error(error));
        },
        style: 'default',
      },
      {
        text: 'NO',
        style: 'destructive',
      },
    ]);
  };

  const updateAdmin = (role: string) => {
    fetch(`http://121.124.131.142:4000/member`, {
      method: 'post',
      body: JSON.stringify({
        mem_id: data.mem_id,
        role: role,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(() => {
        setReload(data.mem_id.toString() + new Date().getTime());
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.itemBox}>
      <View style={styles.imageContainer}>
        <View style={styles.imageBox}>
          <Image
            source={{
              uri: 'http://121.124.131.142:4000/images/user/' + data.profile,
            }}
            style={styles.img}
          />
        </View>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.titleText}>
          {data.name}
          {data.nickname != ' ' ? ' - ' + data.nickname : ''}
        </Text>
        <Text style={styles.roleText}>{data.role}</Text>
      </View>
      <View style={styles.btnBox}>
        <TouchableOpacity
          disabled={option != 0}
          onPress={() => updateAdmin('member')}
          style={styles.btnTouch}
        >
          <Text
            style={
              option == 0
                ? { fontSize: 16, color: '#5496FF' }
                : { fontSize: 16, color: '#FFFFFF' }
            }
          >
            승인
          </Text>
        </TouchableOpacity>
        {option == 1 || option == 0 ? (
          <TouchableOpacity
            style={styles.btnTouch}
            onPress={() => submitDelte()}
          >
            <Text style={{ fontSize: 16, color: '#FA1F11' }}>삭제</Text>
          </TouchableOpacity>
        ) : option == 2 ? (
          <TouchableOpacity
            style={styles.btnTouch}
            onPress={() => updateAdmin('member')}
          >
            <Text style={{ fontSize: 16, color: '#676767' }}>해제</Text>
          </TouchableOpacity>
        ) : option == 3 ? (
          <TouchableOpacity
            style={styles.btnTouch}
            onPress={() => updateAdmin('admin')}
          >
            <Text style={{ fontSize: 16, color: '#5496FF' }}>등록</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnTouch}>
            <Text style={{ fontSize: 16, color: '#74f21b' }}>그룹장</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    width: '100%',
    height: 80,
    backgroundColor: '#FFFFFF',
    left: '5%',
    paddingLeft: 0,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 20,
  },
  textBox: {
    height: 80,
    justifyContent: 'center',
    gap: 5,
    width: '50%',
  },
  titleText: { fontSize: 20, fontWeight: '500', paddingLeft: '6%' },
  roleText: { color: '#676767', paddingLeft: '6%' },
  btnBox: {
    height: 80,
    justifyContent: 'space-between',
    gap: 5,
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnTouch: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditMeberItem;

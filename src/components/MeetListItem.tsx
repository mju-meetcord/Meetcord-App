import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import MeetInfoModal from './MeetInfoModal';
import { Image } from 'expo-image';

interface ListItemProps {
  meetInfo: {
    id: number;
    meetImg: ImageSourcePropType;
    meetName: string;
    meetIntroduce: string;
    role: string;
    creator_id: number;
    user_num: number;
  };
  userJoinInfo: {
    hasJoined: boolean;
    isWaiting: boolean;
  };
  update: () => void;
}

const MeetListItem = ({ meetInfo, userJoinInfo, update }: ListItemProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.wrapper}>
        <Image source={meetInfo.meetImg} style={styles.meetImg} />
        <View style={styles.meetInfoBox}>
          <Text style={styles.meetName}>{meetInfo.meetName}</Text>
          <Text style={styles.meetIntro} numberOfLines={1}>
            {meetInfo.meetIntroduce}
          </Text>
        </View>
      </View>
      {isModalVisible && (
        <MeetInfoModal
          isModalVisible={isModalVisible}
          meetInfo={meetInfo}
          userJoinInfo={userJoinInfo}
          handleBackButtonPress={handlePress}
          update={update}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 10,
    width: 340,
    height: 60,
  },
  meetImg: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  meetInfoBox: {
    justifyContent: 'space-between',
  },
  meetName: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 24,
    width: 260,
  },
  meetIntro: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 24,
    width: 260,
  },
});

export default MeetListItem;

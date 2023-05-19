import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
interface ListItemProps {
  meetInfo: {
    meetImg: ImageSourcePropType;
    meetName: string;
    meetIntroduce: string;
  };
  handleListItemPress: () => void;
}

const MeetListItem = ({ meetInfo, handleListItemPress }: ListItemProps) => {
  return (
    <TouchableOpacity onPress={handleListItemPress}>
      <View style={styles.wrapper}>
        <Image source={meetInfo.meetImg} style={styles.meetImg} />
        <View style={styles.meetInfoBox}>
          <Text style={styles.meetName}>{meetInfo.meetName}</Text>
          <Text style={styles.meetIntro} numberOfLines={1}>
            {meetInfo.meetIntroduce}
          </Text>
        </View>
      </View>
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

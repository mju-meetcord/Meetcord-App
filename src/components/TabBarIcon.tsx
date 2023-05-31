import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const TabBarIcon = ({ Name, active }: any) => {
  return (
    <View
      style={{
        borderRadius: 30,
        overflow: 'hidden',
        marginTop: 18,
      }}
    >
      <Icon
        name={Name}
        style={
          active == 1
            ? {
                backgroundColor: '#FFFFFF',
                width: 50,
                height: 50,
                color: '#5496FF',
                textAlign: 'center',
                lineHeight: 50,
                borderRadius: 30,
              }
            : {
                backgroundColor: '#5496FF',
                width: 50,
                height: 50,
                color: '#FFFFFF',
                textAlign: 'center',
                lineHeight: 50,
                borderRadius: 30,
              }
        }
        size={30}
      />
    </View>
  );
};

export default TabBarIcon;

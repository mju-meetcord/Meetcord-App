import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  BottomTab: undefined;
  SignIn: undefined;
  Register: undefined;
  InitMeet: undefined;
  CreateMeet: undefined;
  NotiDetail: {
    title: string;
  };
  MeetSearch: {
    meetSearchText: string;
  };
  Splash: undefined;
};

export type BottomTabParamList = {
  Meet: undefined;
  Member: undefined;
  Home: undefined;
  Notification: undefined;
  Mypage: undefined;
};

export type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<BottomTabParamList>
>;

export type MemberModalProps = {
  isVisible: boolean;
  onBackdropPress: () => void;
};

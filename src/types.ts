import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ModifyNoti: {
    id: string;
  };
  BottomTab: undefined;
  SignIn: undefined;
  Register: undefined;
  InitMeet: undefined;
  CreateMeet: undefined;
  CreateNoti: undefined;
  NotiDetail: {
    id: string;
  };
  MeetSearch: {
    meetSearchText: string;
  };
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

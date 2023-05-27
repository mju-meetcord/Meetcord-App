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
  CreateNoti: {
    meetname: string;
  };
  ModifyMypage: {
    name: string;
    nickName: string;
    phoneNum: string;
    email: string;
    birth: string;
    imageurl: string;
  };
  NotiDetail: {
    id: string;
    isAdmin: boolean;
  };
  MeetSearch: {
    meetSearchText: string;
  };
  Splash: undefined;
  ScheduleDetail: undefined;
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

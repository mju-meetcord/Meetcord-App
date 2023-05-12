import { NavigatorScreenParams } from '@react-navigation/native';

export type StackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  Login: undefined;
  Register: undefined;
  Meet: undefined;
  CreateMeet: undefined;
  NotiDetail: {
    title: string;
  };
};

export type BottomTabParamList = {
  Meet: undefined;
  Member: undefined;
  Home: undefined;
  Notification: undefined;
  Mypage: undefined;
};

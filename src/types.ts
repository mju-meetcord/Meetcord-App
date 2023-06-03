import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { Member } from './screens/MemberScreen';
import { Meet } from './screens/MeetScreen';
import React from 'react';
import { MeetEvent } from './screens/HomeScreen';
import { ImageSourcePropType } from 'react-native';
import { EventRecord } from './screens/ScheduleDetailScreen';

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
    data: Meet[];
  };
  Splash: undefined;
  EditMember: undefined;
  AddSchedule: {
    date: string;
    groupname: string;
    eventData?: MeetEvent;
  };
  ScheduleDetail: {
    data: MeetEvent;
    isAdmin: boolean;
  };
  AddActivityRecord: {
    data: EventRecord;
  };
  Attendance: {
    eventData: MeetEvent;
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
  data: Member;
  isVisible: boolean;
  onBackdropPress: () => void;
};

export type MemberItemProps = {
  data: Member;
  onpress: () => void;
};

export type EditMemberItemProps = {
  data: Member;
  option: number;
  setReload: React.Dispatch<React.SetStateAction<string>>;
};

export type EventItemProps = {
  data: MeetEvent;
  onpress: () => void;
  isAdmin: boolean;
  onpress2: () => void;
  memId: number;
  checking: () => void;
};

export type AttendanceItemProps = {
  data: Member;
  checked: boolean;
  isAdmin: boolean;
  event_id: number;
  checking: () => void;
};

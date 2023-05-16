import { View, Text, StyleSheet } from 'react-native';

const PersonalInfoBox = () => {
  return (
    <View style={styles.topContainer}>
      <Text style={styles.topInfoText}>
        ● Meetcord의 개인정보 수집·이용 목적은 다음과 같습니다. 내용을 자세히
        {'\n'} &nbsp; &nbsp;읽어보신 후 동의 여부를 결정하여 주시기 바랍니다.
      </Text>
      <View>
        <View style={styles.collectInfoTopBox}>
          <View style={styles.collectInfoLabelBox}>
            <Text style={styles.collectInfoLabelText}>수집목적</Text>
          </View>
          <Text style={styles.collectInfoText}>
            Meetcord 운영 및 서비스 지원
          </Text>
        </View>
        <View style={styles.collectInfoTopBox}>
          <View style={styles.collectInfoLabelBox}>
            <Text style={styles.collectInfoLabelText}>수집항목</Text>
          </View>
          <Text style={styles.collectInfoText}>
            이름, 전화번호, 이메일, 생년월일
          </Text>
        </View>
        <View style={styles.collectInfoTopBox}>
          <View style={styles.collectInfoLabelBox}>
            <Text style={styles.collectInfoLabelText}>보유·이용기간</Text>
          </View>
          <Text style={styles.collectInfoText}>수집일부터 회원탈퇴시까지</Text>
        </View>
      </View>
      <View style={styles.bottomInfoBox}>
        <Text style={[styles.bottomInfoText, styles.textMarginBottom]}>
          자세한 내용은 개인정보 처리방침을 확인해주세요.
        </Text>
        <Text style={styles.bottomInfoText}>
          귀하는 위와 같이 개인정보를 수집·이용하는데 동의를 거부할 권리가
          있습니다.
        </Text>
        <Text style={styles.importantText}>
          수집 항목에 대한 동의를 거절하는 경우 서비스 이용이 제한 될 수
          있습니다.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    borderWidth: 1,
    borderColor: '#676767',
    borderRadius: 5,
    width: 340,
    height: 196,
  },
  topInfoText: {
    fontSize: 10,
    lineHeight: 12,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 13,
    marginBottom: 12,
  },
  collectInfoTopBox: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EBEBF0',
    alignItems: 'center',
  },
  collectInfoLabelBox: {
    justifyContent: 'center',
    width: 90,
    height: 27,
    backgroundColor: '#F5F5F5',
    paddingLeft: 10,
  },
  collectInfoLabelText: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '500',
  },
  collectInfoText: {
    fontSize: 12,
    lineHeight: 12,
    paddingLeft: 9,
  },
  bottomInfoBox: {
    paddingLeft: 8,
    paddingVertical: 10,
  },
  bottomInfoText: {
    fontSize: 10,
    lineHeight: 12,
  },
  textMarginBottom: {
    marginBottom: 8,
  },
  importantText: {
    fontSize: 10,
    lineHeight: 12,
    color: '#FA1F11',
  },
});

export default PersonalInfoBox;

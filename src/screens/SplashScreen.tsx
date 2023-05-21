import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { useEffect } from 'react';

type SplashScreenProps = StackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const timeout = () => {
    setTimeout(() => {
      navigation.navigate('SignIn');
    }, 3000);
  };

  useEffect(() => {
    timeout();
    return () => {
      clearTimeout(3000);
    };
  });

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#8AB4F8',
      }}
      edges={['right', 'left', 'top']}
    >
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Text style={styles.topLogoText}>Meetcord</Text>
          <Text style={styles.bottomLogoText}>만남을 기록하다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8AB4F8',
  },

  logoBox: {
    alignItems: 'center',
    marginTop: 350,
  },

  topLogoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  bottomLogoText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default SplashScreen;

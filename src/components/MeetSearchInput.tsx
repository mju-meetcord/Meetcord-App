import { View, TextInput, StyleSheet } from 'react-native';
import SearchIcon from '../../assets/search_icon.svg';

interface inputStyleProps {
  isMarginTop: boolean;
}

const MeetSearchInput = ({ isMarginTop }: inputStyleProps) => {
  return (
    <View style={styles(isMarginTop).topContainer}>
      <View style={styles(isMarginTop).wrapper}>
        <SearchIcon style={styles(isMarginTop).searchIcon} />
        <TextInput
          style={styles(isMarginTop).searchInput}
          placeholder='Meet 검색하기...'
        />
      </View>
    </View>
  );
};

const styles = (isMarginTop: boolean) =>
  StyleSheet.create({
    topContainer: {
      alignItems: 'center',
    },
    wrapper: {
      width: 325,
      height: 40,
      marginTop: isMarginTop ? 54 : 16,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#D9D9D9',
    },
    searchIcon: {
      marginLeft: 16,
      marginRight: 8,
    },
    searchInput: {
      fontSize: 15,
      flex: 1,
    },
  });

export default MeetSearchInput;

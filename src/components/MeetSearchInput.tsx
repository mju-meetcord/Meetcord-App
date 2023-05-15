import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SearchIcon from '../../assets/search_icon.svg';
import { TempMeetList } from '../data/TempMeetList';

interface inputStyleProps {
  hasWideMarginTop?: boolean;
  onSubmitEditing?: () => void;
}

const MeetSearchInput = ({
  hasWideMarginTop,
  onSubmitEditing,
}: inputStyleProps) => {
  const [inputText, setInpuText] = useState('');

  return (
    <View
      style={hasWideMarginTop ? styles.wideMarginTop : styles.narrowMarginTop}
    >
      <View style={styles.wrapper}>
        <SearchIcon style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder='Meet 검색하기...'
          onChangeText={text => setInpuText(text)}
          returnKeyType='search'
          // onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wideMarginTop: {
    marginTop: 54,
  },
  narrowMarginTop: {
    marginTop: 16,
  },
  topContainer: {
    alignItems: 'center',
  },
  wrapper: {
    width: 340,
    height: 40,
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

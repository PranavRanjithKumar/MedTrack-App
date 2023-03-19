import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

const SearchInput = ({ onChangeText, placeholderText }) => {
  return (
    <TextInput
      placeholder={`${placeholderText}`}
      placeholderTextColor="#AAAAAA"
      cursorColor="black"
      style={styles.searchInput}
      onChangeText={onChangeText}
    />
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchInput: {
    borderColor: '#CFCFCF',
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 10,
    fontFamily: 'roboto400',
    backgroundColor: 'white',
  },
});

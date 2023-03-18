import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const GoBackButton = ({ custom }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.goBackButton, custom]}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <ArrowLeftIcon color="#000000" size={22} />
    </TouchableOpacity>
  );
};

export default GoBackButton;

const styles = StyleSheet.create({
  goBackButton: {
    paddingRight: 12,
  },
});

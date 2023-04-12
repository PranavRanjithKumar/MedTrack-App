import { StyleSheet, TouchableOpacity } from 'react-native';
import { QrCodeIcon } from 'react-native-heroicons/solid';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const QRButton = ({ id }) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate('View QR', id);
  };

  return (
    <TouchableOpacity onPress={onPressHandler} style={styles.button}>
      <QrCodeIcon color="white" size={20} />
    </TouchableOpacity>
  );
};

export default QRButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, Image, Pressable } from 'react-native';

const errorToast = ({ message, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.error}>
      <Image
        style={styles.errorImage}
        source={require('../../assets/error.png')}
      />
      <Text style={styles.errorText}>{message}</Text>
    </Pressable>
  );
};

export default errorToast;

const styles = StyleSheet.create({
  error: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    minWidth: '85%',
    marginHorizontal: 22,
    textAlign: 'center',
    backgroundColor: '#C9594B',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: '#C9594B',
    borderRadius: 8,
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  errorText: {
    paddingLeft: 10,
    flex: 5,
    color: 'white',
  },
});

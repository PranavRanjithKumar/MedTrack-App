import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const errorToast = ({ message }) => {
  return (
    <View style={styles.error}>
      <Image
        style={styles.errorImage}
        source={require('../assets/error.png')}
      />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

export default errorToast;

const styles = StyleSheet.create({
  error: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#C9594B',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: '#C9594B',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  errorText: {
    paddingLeft: 10,
    flex: 5,
    color: 'white',
  },
});

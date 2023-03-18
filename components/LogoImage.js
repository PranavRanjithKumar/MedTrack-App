import { StyleSheet, View } from 'react-native';
import React from 'react';

const LogoImage = ({ children }) => {
  return <View style={styles.imageContainer}>{children}</View>;
};

export default LogoImage;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#9B51E0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    height: 40,
    width: 40,
    marginRight: 8,
  },
});

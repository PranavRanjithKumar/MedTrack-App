import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';

const MapViewScreen = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.bottomBanner}>
        <Text style={styles.bannerText}>This is a marvelous banner</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  bannerText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default MapViewScreen;

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MapPinIcon } from 'react-native-heroicons/solid';
import React from 'react';

const OrganizationItem = ({ name, address, city, state }) => {
  return (
    <TouchableOpacity style={styles.organizationContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/organizationLogo.png')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.organizationTitle}>{name}</Text>
          <View style={styles.addressContainer}>
            <MapPinIcon color="#000000" size={15} />
            <Text
              style={styles.address}
            >{`${address}, ${city}, ${state}.`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrganizationItem;

const styles = StyleSheet.create({
  organizationContainer: {
    paddingVertical: 22,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    backgroundColor: '#9B51E0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    height: 40,
    width: 40,
    marginRight: 8,
  },
  textContainer: {
    justifyContent: 'space-between',
  },
  organizationTitle: {
    fontFamily: 'roboto400',
    fontSize: 15,
  },
  addressContainer: {
    flexDirection: 'row',
  },
  address: {
    marginLeft: 4,
    fontFamily: 'roboto400',
    fontSize: 13,
  },
});

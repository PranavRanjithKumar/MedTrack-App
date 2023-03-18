import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MapPinIcon } from 'react-native-heroicons/solid';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import LogoImage from './LogoImage';

const OrganizationItem = ({ _id, name, address, city, state }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.organizationContainer}
      onPress={() =>
        navigation.navigate('RequestDrugs', {
          _id,
          name,
          address,
          city,
          state,
        })
      }
    >
      <View style={styles.contentContainer}>
        <LogoImage>
          <Image source={require('../assets/organizationLogo.png')} />
        </LogoImage>
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

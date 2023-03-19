import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
import GoBackButton from '../../components/UI/GoBackButton';
import ItemsList from '../../components/Items/ItemsList';
import { selectBasketItems } from '../../features/requests/requestDrugCartSlice';

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }
  const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
  console.log(location);
};

const ConfirmRequestScreen = () => {
  const items = useSelector(selectBasketItems);
  return (
    <SafeAreaView style={styles.root}>
      <GoBackButton custom={styles.goBackButton} />
      <Text style={styles.headline}>Confirm Request</Text>
      <ItemsList id="catalogueId" data={items} component="cartItem" />
      <TouchableOpacity style={styles.confirmButton} onPress={getLocation}>
        <Text style={styles.buttonText}>Place Request</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ConfirmRequestScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 22,
    paddingBottom: 70,
  },
  goBackButton: {
    marginTop: 20,
  },
  headline: {
    color: '#4D6636',
    fontFamily: 'roboto500',
    fontSize: 20,
    marginTop: 20,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 10,
    marginHorizontal: 22,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#000000',
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 100,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'ibmPlex700',
    fontSize: 20,
  },
});

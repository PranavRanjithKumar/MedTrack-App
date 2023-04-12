/* eslint-disable consistent-return */
import * as Location from 'expo-location';

async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }
  const location = await Location.getLastKnownPositionAsync({ accuracy: 5 });
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

export default getLocation;

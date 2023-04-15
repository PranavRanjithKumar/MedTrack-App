import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { AnimatedRegion, MarkerAnimated } from 'react-native-maps';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
} from 'react-native-heroicons/solid';
import formatDate from '../../features/dateFormatter';

const MapViewScreen = ({ route }) => {
  const { data } = route.params;

  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);

  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: data[currentRegionIndex].data.currentOwnerLocation[0],
      longitude: data[currentRegionIndex].data.currentOwnerLocation[1],
    })
  );

  const markerRef = useRef(null);
  const mapRef = useRef(null);

  const moveToNextRegion = () => {
    const nextIndex = currentRegionIndex + 1;
    if (nextIndex < data.length) {
      setCurrentRegionIndex(nextIndex);
      setCoordinate({
        latitude: data[nextIndex].data.currentOwnerLocation[0],
        longitude: data[nextIndex].data.currentOwnerLocation[1],
      });
      mapRef.current.animateToRegion(
        {
          latitude: data[nextIndex].data.currentOwnerLocation[0],
          longitude: data[nextIndex].data.currentOwnerLocation[1],
          latitudeDelta: 0.3999,
          longitudeDelta: 0.3999,
        },
        2000
      );
      markerRef.current.animateMarkerToCoordinate(
        new AnimatedRegion({
          latitude: data[nextIndex].data.currentOwnerLocation[0],
          longitude: data[nextIndex].data.currentOwnerLocation[1],
        }),
        1000
      );
    }
  };

  const moveToPreviousRegion = () => {
    const previousIndex = currentRegionIndex - 1;
    if (previousIndex >= 0) {
      setCurrentRegionIndex(previousIndex);
      setCoordinate({
        latitude: data[previousIndex].data.currentOwnerLocation[0],
        longitude: data[previousIndex].data.currentOwnerLocation[1],
      });
      mapRef.current.animateToRegion(
        {
          latitude: data[previousIndex].data.currentOwnerLocation[0],
          longitude: data[previousIndex].data.currentOwnerLocation[1],
          latitudeDelta: 0.3999,
          longitudeDelta: 0.3999,
        },
        2000
      );
      markerRef.current.animateMarkerToCoordinate(
        new AnimatedRegion({
          latitude: data[previousIndex].data.currentOwnerLocation[0],
          longitude: data[previousIndex].data.currentOwnerLocation[1],
        }),
        1000
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        region={{
          latitude: data[0].data.currentOwnerLocation[0],
          longitude: data[0].data.currentOwnerLocation[1],
          latitudeDelta: 0.3999,
          longitudeDelta: 0.3999,
        }}
      >
        <MarkerAnimated ref={markerRef} coordinate={coordinate} />
      </MapView>
      <View style={styles.bottomBanner}>
        <Text style={styles.bannerHeader}>Track Provenance</Text>
        <Text
          style={styles.bannerHeader}
        >{`${data[0].data.currentOwnerOrgId.type.replace(/\b\w/g, (l) =>
          l.toUpperCase()
        )} to ${data
          .at(-1)
          .data.currentOwnerOrgId.type.replace(/\b\w/g, (l) =>
            l.toUpperCase()
          )}`}</Text>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.bannerText}>
            {data[currentRegionIndex].data.currentOwnerOrgId.name}
          </Text>
          <Text style={styles.bannerText}>{`Arriving on: ${formatDate(
            new Date(data[currentRegionIndex].timestamp.seconds * 1000)
          )}`}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={moveToPreviousRegion}
            disabled={currentRegionIndex === 0}
            style={styles.moveIcon}
          >
            <ChevronLeftIcon
              color={currentRegionIndex === 0 ? '#C7C8CC' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={moveToNextRegion}
            disabled={currentRegionIndex === data.length - 1}
            style={styles.moveIcon}
          >
            <ChevronRightIcon
              color={
                currentRegionIndex === data.length - 1 ? '#C7C8CC' : 'black'
              }
            />
          </TouchableOpacity>
        </View>
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
    height: '35%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  bannerHeader: {
    fontSize: 24,
    fontFamily: 'roboto500',
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 16,
    marginBottom: 8,
  },
  moveIcon: {
    backgroundColor: '#F5F7F9',
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 25,
  },
});

export default MapViewScreen;

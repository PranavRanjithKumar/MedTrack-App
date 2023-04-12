/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { isUUIDv4 } from '../../features/validations';

const BarcodeScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarcodeScan = ({ data }) => {
    if (isUUIDv4(data)) {
      setScanned(true);
      // navigate to asset history page with the data
      navigation.navigate('Asset Info', data);
    } else {
      setScanned(false);
      Alert.alert('Error', 'Please scan appropriate QR code');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scan Barcode</Text>
      </View>
      <View style={styles.barcodeScannerContainer}>
        {hasPermission === null ? (
          <Text style={styles.scannerOverlayText}>
            Requesting permission...
          </Text>
        ) : hasPermission === false ? (
          <Text style={styles.scannerOverlayText}>No access to camera</Text>
        ) : (
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.all]}
            onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
            style={styles.barcodeScanner}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 22,
    backgroundColor: '#F7F7F7',
    paddingBottom: 30,
  },
  headerText: {
    fontFamily: 'roboto700',
    fontSize: 20,
    padding: 10,
  },
  barcodeScannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeScanner: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  scannerOverlayText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scanAgainContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAgainText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: '#841584',
    padding: 10,
    borderRadius: 8,
  },
});

export default BarcodeScannerScreen;

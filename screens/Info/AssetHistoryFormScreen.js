/* eslint-disable no-nested-ternary */
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import useInput from '../../hooks/useInput';
import { notEmpty, isUUIDv4 } from '../../features/validations';

const getForm = (...inputStates) => {
  const formIsValid = inputStates.reduce(
    (prev, cur) => prev && cur.isValid,
    true
  );

  const formReset = () => {
    for (const inputState of inputStates) {
      inputState.reset();
    }
  };

  return { formIsValid, formReset };
};

const AssetHistoryFormScreen = ({ navigation }) => {
  const [assetIdInputStates, assetIdProps] = useInput('', [notEmpty, isUUIDv4]);

  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const { formIsValid } = getForm(assetIdInputStates);

  const handleOnPressScanner = () => {
    if (hasPermission === null) {
      Alert.alert(
        'Action Needed',
        'Please allow permission to access your Camera'
      );
      return;
    }
    if (hasPermission === false) {
      Alert.alert(
        'Action Denied',
        'Please allow permission to access your Camera'
      );
      return;
    }
    navigation.navigate('Scanner');
  };

  const moveToAssetInfoPage = () => {
    navigation.navigate('Asset Info', assetIdProps.value);
  };

  const handleOnPressImagePicker = async () => {
    try {
      // Request permission to access gallery
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Gallery permission denied');
      }

      // Open gallery to select an image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled) {
        // If an image is selected, read QR code from the image
        const qrCodeResult = await BarCodeScanner.scanFromURLAsync(
          result.assets[0].uri
        );
        if (qrCodeResult && qrCodeResult[0]) {
          navigation.navigate('Asset Info', qrCodeResult[0].data);
        } else {
          Alert.alert('Error', 'No QR code found in the selected image');
        }
      }
    } catch (error) {
      // Show error message
      Alert.alert('Error', `Error reading QR code from gallery: ${error}`);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scan QR / Paste ID</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text>Asset ID:</Text>
            <TextInput
              style={[
                styles.input,
                assetIdInputStates.isInValid && styles.inputInValid,
                assetIdInputStates.isFocus && styles.inputFocus,
              ]}
              cursorColor="black"
              placeholderTextColor="#AAAAAA"
              autoCapitalize="none"
              autoCorrect={false}
              {...assetIdProps}
            />
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Button
              title="Fetch Asset History"
              disabled={!formIsValid}
              color="#000"
              onPress={moveToAssetInfoPage}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Text style={styles.headerText}>Use QR Code</Text>

          <View style={{ margin: 10 }}>
            <Button
              onPress={handleOnPressScanner}
              title="Scan QR"
              color="#000"
            />
          </View>
          <Text
            style={{
              textTransform: 'uppercase',
              fontFamily: 'roboto500',
              fontSize: 16,
            }}
          >
            or
          </Text>
          <View style={{ margin: 10 }}>
            <Button
              title="Use QR from Gallery"
              onPress={handleOnPressImagePicker}
              color="#000"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AssetHistoryFormScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
  container: {
    backgroundColor: '#FFFFFF',
    padding: 22,
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    borderColor: '#CFCFCF',
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    fontFamily: 'roboto400',
  },
  inputFocus: {
    borderColor: '#000000',
  },
  inputInValid: {
    borderColor: '#C9594B',
  },
  formContainer: {
    marginBottom: 40,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  qrScannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F8F8F8',
  },
  barcodeScanner: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerOverlayText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

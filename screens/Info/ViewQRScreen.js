import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from 'react-native-heroicons/solid';
import QRCode from 'react-native-qrcode-svg';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Clipboard from 'expo-clipboard';
import React, { useRef, useState } from 'react';

const ViewQRScreen = ({ route }) => {
  const assetId = route.params;
  const qrCodeRef = useRef();

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(assetId);
    setCopied(true);
  };

  const handleSavePress = async () => {
    try {
      // Generate a base64-encoded PNG image of the QR code
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Error', 'Permission to access Media Library was denied');
        return;
      }

      const qrcodeData = qrCodeRef.current;

      const fileUri = `${
        FileSystem.cacheDirectory
      }${new Date().getTime()}-${assetId}.png`;

      // Write the base64 data to the file
      await FileSystem.writeAsStringAsync(fileUri, qrcodeData, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Save the image to the device's gallery
      await MediaLibrary.createAssetAsync(fileUri);
      Alert.alert('Success', 'QR code saved to gallery!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save QR code to gallery');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>View QR / Copy ID</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.codeContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.idText}>
            {assetId}
          </Text>
          {!copied && (
            <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
              <ClipboardDocumentIcon color="#323232" size={20} />
            </TouchableOpacity>
          )}
          {copied && (
            <View style={styles.button}>
              <ClipboardDocumentCheckIcon color="green" size={20} />
            </View>
          )}
        </View>
        <View style={styles.qrCodeContainer}>
          <Text style={[styles.headerText]}>Scan QR</Text>
          <QRCode
            value={assetId}
            getRef={(c) => {
              if (!c?.toDataURL) return;

              c?.toDataURL((base64Image) => {
                qrCodeRef.current = base64Image;
              });
            }}
            size={220}
            quietZone={20}
            backgroundColor="white"
            color="black"
          />
          <View style={{ marginTop: 20 }}>
            <Button title="Save QR Code to Gallery" onPress={handleSavePress} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewQRScreen;

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
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 22,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    padding: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
  },
  idText: {
    fontFamily: 'roboto500',
    fontSize: 15,
  },
  qrCodeContainer: {
    alignItems: 'center',
  },
});

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import GoBackButton from '../../components/UI/GoBackButton';
import RequestItem from '../../components/Items/RequestItem';

const RequestedItemsScreen = ({ navigation, route }) => {
  const request = route.params;

  const moveToPreviewTransferItemsScreen = () => {
    navigation.navigate('Preview Transferring Items', {
      id: request.id,
      items: request.requestedItems,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <GoBackButton custom={styles.goBackButton} />
        <Text style={[styles.headline, { color: '#000', fontSize: 16 }]}>
          {request.id}
        </Text>
      </View>
      <Text style={styles.headline}>Requested Items</Text>
      <ScrollView>
        {request.requestedItems.map((item) => (
          <RequestItem key={item.catalogueId._id} {...item} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={moveToPreviewTransferItemsScreen}
      >
        <Text style={styles.buttonText}>Preview Transfer Items</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RequestedItemsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 22,
    paddingBottom: 70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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

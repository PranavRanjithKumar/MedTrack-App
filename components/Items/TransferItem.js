import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TransferItem = ({ id, requestedDate, requestingOrgId }) => {
  return (
    <View style={styles.catalogueContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.drugName}>{id}</Text>
          <Text style={styles.codeHeader}>
            Requested Date: <Text style={styles.code}>{requestedDate}</Text>
          </Text>
          <Text style={styles.codeHeader}>
            Requesting Organization:{' '}
            <Text style={styles.code}>{requestingOrgId.name}</Text>
          </Text>
        </View>
        {/* <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={moveToAssetCreationPage}
          >
            <PlusIcon color="#FFFFFF" size={16} />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default TransferItem;

const styles = StyleSheet.create({
  catalogueContainer: {
    paddingVertical: 22,
  },
  container: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  drugName: {
    textTransform: 'uppercase',
    fontFamily: 'roboto500',
    fontSize: 16,
    marginBottom: 4,
  },
  codeHeader: {
    fontFamily: 'roboto400',
    marginBottom: 4,
  },
  code: {
    fontFamily: 'roboto500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 999,
  },
});

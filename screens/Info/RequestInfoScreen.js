/* eslint-disable no-nested-ternary */
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import QRButton from '../../components/UI/QRButton';
import formatDate from '../../features/dateFormatter';

const CompositionItem = ({ drug, assets }) => {
  return (
    <View style={styles.info}>
      <Text style={[styles.subheading, { fontSize: 15, color: 'black' }]}>
        {drug}
      </Text>
      {assets.map((asset) => (
        <View
          key={asset.assetId}
          style={{ paddingLeft: 12, marginVertical: 12 }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Text>{asset.assetId}</Text>
              <Text>{`${asset.quantity} ${asset.quantityType}`}</Text>
            </View>
            <QRButton id={asset.assetId} />
          </View>
        </View>
      ))}
    </View>
  );
};

function transformObjectFormat(inputObj) {
  const outputArr = [];
  inputObj.forEach((obj) => {
    const drug = Object.keys(obj)[0];
    const assets = obj[drug];
    outputArr.push({
      drug,
      assets,
    });
  });
  return outputArr;
}

const RequestInfoScreen = ({ route }) => {
  const requestDetails = route.params;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Request Details</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.subheading}>Request Info</Text>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Request ID</Text>
            <Text style={styles.infoValue}>{requestDetails.id}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Requested On</Text>
            <Text style={styles.infoValue}>
              {formatDate(new Date(requestDetails.requestedDate))}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Request Status</Text>
            <Text style={styles.infoValue}>
              {requestDetails.status.toUpperCase()}
            </Text>
          </View>
          {requestDetails.status !== 'sent' && (
            <View style={styles.info}>
              <Text style={styles.infoHeader}>Transferred On</Text>
              <Text style={styles.infoValue}>
                {formatDate(new Date(requestDetails.sentDate))}
              </Text>
            </View>
          )}
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Requesting Organization</Text>
            <Text style={styles.infoValue}>
              {requestDetails.requestingOrgId.name}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Requesting Organization Type</Text>
            <Text style={styles.infoValue}>
              {requestDetails.requestingOrgType.replace(/\b\w/g, (l) =>
                l.toUpperCase()
              )}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>
              Requesting Organization Address
            </Text>
            <Text style={styles.infoValue}>
              {`${requestDetails.requestingOrgId.address}, ${requestDetails.requestingOrgId.city}, ${requestDetails.requestingOrgId.state}`}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Transferring Organization</Text>
            <Text style={styles.infoValue}>
              {requestDetails.transferringOrgId.name}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>
              Transferring Organization Type
            </Text>
            <Text style={styles.infoValue}>
              {requestDetails.transferringOrgType.replace(/\b\w/g, (l) =>
                l.toUpperCase()
              )}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>
              Transferring Organization Address
            </Text>
            <Text style={styles.infoValue}>
              {`${requestDetails.transferringOrgId.address}, ${requestDetails.transferringOrgId.city}, ${requestDetails.transferringOrgId.state}`}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Requested Items</Text>
          {requestDetails.requestedItems.map((item) => (
            <View key={item.catalogueId} style={styles.info}>
              <Text style={[styles.subheading, styles.subHeading2]}>
                {item.catalogueId}
              </Text>
              <View style={styles.sideItem}>
                <Text>{item.name}</Text>
                <Text>{`${item.quantity} ${
                  item.quantity === 1 ? 'unit' : item.quantityType
                }`}</Text>
                <Text>{`${item.unitQuantity} ${item.unitQuantityType} per unit`}</Text>
              </View>
            </View>
          ))}
        </View>
        {requestDetails.status !== 'sent' && (
          <View style={styles.section}>
            <Text style={styles.subheading}>Transferred Items</Text>
            {transformObjectFormat(requestDetails.sentItems).map((item) => (
              <CompositionItem key={item.drug} {...item} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestInfoScreen;

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
    padding: 22,
  },
  section: {
    marginBottom: 22,
  },
  subheading: {
    fontFamily: 'roboto500',
    fontSize: 18,
    color: 'grey',
  },
  info: {
    marginVertical: 12,
  },
  infoHeader: {
    fontSize: 15,
  },
  infoValue: {
    color: '#808080',
  },
  loadingOrNoData: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeading2: {
    fontSize: 15,
    color: 'black',
  },
  sideItem: {
    paddingLeft: 12,
    marginBottom: 12,
  },
});

/* eslint-disable no-nested-ternary */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useCallback } from 'react';
import { AuthContext } from '../../store/auth-context';
import { getAssetDetails } from '../../apis/assets';
import QRButton from '../../components/UI/QRButton';

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

const AssetInfoScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const assetId = route.params;

  const { isLoading, data } = useQuery(
    ['asset info', user.organization._id, assetId],
    () =>
      getAssetDetails({
        orgId: user.organization._id,
        assetId,
      }),
    {
      refetchOnWindowFocus: true,
    }
  );

  const transformItems = useCallback(() => {
    if (
      !data ||
      !data.data ||
      data.data.docType !== 'drug' ||
      data.data.constitution.length === 0
    )
      return [];
    const outputArray = [];

    // Loop through the input array
    for (let i = 0; i < data.data.constitution.length; i += 1) {
      const currentObj = data.data.constitution[i];
      const drug = `${currentObj.name} (${currentObj.catalogueId})`;

      // Check if drug already exists in the output array
      const existingDrug = outputArray.find((obj) => obj.drug === drug);

      if (existingDrug) {
        // If drug already exists, add assetId to its assets array
        existingDrug.assets.push({
          assetId: currentObj.assetId,
          quantity: currentObj.quantity,
          quantityType: currentObj.quantityType,
        });
      } else {
        // If drug doesn't exist, create a new object and push to output array
        const newDrug = {
          drug,
          assets: [
            {
              assetId: currentObj.assetId,
              quantity: currentObj.quantity,
              quantityType: currentObj.quantityType,
            },
          ],
        };
        outputArray.push(newDrug);
      }
    }

    return outputArray;
  }, [data]);

  const transformedItems = transformItems();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Asset Details</Text>
      </View>
      {isLoading ? (
        <View style={[styles.container, styles.loadingOrNoData]}>
          <ActivityIndicator />
        </View>
      ) : !data.data ? (
        <View style={[styles.container, styles.loadingOrNoData]}>
          <Text>No Asset found with that ID...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.subheading}>Asset Info</Text>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>Asset ID</Text>
              <Text style={styles.infoValue}>{data.data.id}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>Asset Type</Text>
              <Text style={styles.infoValue}>
                {data.data.docType === 'drug' ? 'Drug' : 'Raw Material'}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>Drug Code</Text>
              <Text style={styles.infoValue}>
                {data.data.catalogueId.drug.code}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>Catalogue Code</Text>
              <Text style={styles.infoValue}>{data.data.catalogueId.code}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>About</Text>
              <Text style={styles.infoValue}>
                {data.data.catalogueId.drug.description}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>Unit Quantity</Text>
              <Text style={styles.infoValue}>
                {data.data.quantityProduced} {data.data.quantityType}
              </Text>
            </View>
            {data.data.docType === 'drug' && (
              <View style={styles.info}>
                <Text style={styles.infoHeader}>Batch Size</Text>
                <Text style={styles.infoValue}>{data.data.batchSize}</Text>
              </View>
            )}
            <View style={styles.info}>
              <Text style={styles.infoHeader}>Manufacturing Date</Text>
              <Text style={styles.infoValue}>
                {data.data.manufacturingDate}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>Expiry Date</Text>
              <Text style={styles.infoValue}>{data.data.expiryDate}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>Current Owner Organization</Text>
              <Text style={styles.infoValue}>
                {data.data.currentOwnerOrgId.name}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>
                Current Owner Organization Type
              </Text>
              <Text style={styles.infoValue}>
                {data.data.currentOwnerOrgType.replace(/\b\w/g, (l) =>
                  l.toUpperCase()
                )}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>
                Current Owner Organization Address
              </Text>
              <Text style={styles.infoValue}>
                {`${data.data.currentOwnerOrgId.address}, ${data.data.currentOwnerOrgId.city}, ${data.data.currentOwnerOrgId.state}`}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>Manufacturer Organization</Text>
              <Text style={styles.infoValue}>
                {data.data.manufacturingOrgId.name}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>
                Manufacturer Organization Type
              </Text>
              <Text style={styles.infoValue}>
                {data.data.manufacturingOrgId.type.replace(/\b\w/g, (l) =>
                  l.toUpperCase()
                )}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>
                Manufacturer Organization Address
              </Text>
              <Text style={styles.infoValue}>
                {`${data.data.manufacturingOrgId.address}, ${data.data.manufacturingOrgId.city}, ${data.data.currentOwnerOrgId.state}`}
              </Text>
            </View>
          </View>
          {transformedItems.length !== 0 && (
            <View style={styles.section}>
              <Text style={styles.subheading}>Composition</Text>
              {transformedItems.map((item) => (
                <CompositionItem key={item.drug} {...item} />
              ))}
            </View>
          )}
          <View style={{ marginBottom: 50, alignSelf: 'center' }}>
            <Button
              onPress={() => navigation.navigate('Map View')}
              color="#000"
              title="Trace Provenance"
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AssetInfoScreen;

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
});

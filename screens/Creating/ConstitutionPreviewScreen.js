import React, { useCallback, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  resetConstituents,
  selectDrugConstituents,
} from '../../features/composition/drugCompositionSlice';
import { storeManufcturerAsset } from '../../apis/assets';
import { AuthContext } from '../../store/auth-context';
import getLocation from '../../permissions/locator';
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
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ justifyContent: 'center' }}>
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

const ConstitutionPreviewScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const assetDetails = route.params;

  const queryClient = useQueryClient();

  const constituentItems = useSelector(selectDrugConstituents);
  const dispatch = useDispatch();

  const transformItems = useCallback(() => {
    const outputArray = [];

    // Loop through the input array
    for (let i = 0; i < constituentItems.length; i += 1) {
      const currentObj = constituentItems[i];
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
  }, [constituentItems]);

  const transformedItems = transformItems();

  const { isLoading, mutate: manufacturerAssetMutate } = useMutation({
    mutationFn: storeManufcturerAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['InHouseAssets'] });
      dispatch(resetConstituents());
      navigation.navigate('My Catalogue');
    },
  });

  const manufacturerAssetCreationHandler = async () => {
    const { latitude, longitude } = await getLocation();

    manufacturerAssetMutate({
      id: user.organization._id,
      code: assetDetails.code,
      manufacturingDate: assetDetails.manufacturingDate,
      expiryDate: assetDetails.expiryDate,
      latitude,
      longitude,
      quantity: +assetDetails.quantity,
      constitution: constituentItems,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Preview Drug</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.subheading}>Medicine Info</Text>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Name</Text>
            <Text style={styles.infoValue}>{assetDetails.drug.name}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Drug Code</Text>
            <Text style={styles.infoValue}>{assetDetails.drug.code}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Catalogue Code</Text>
            <Text style={styles.infoValue}>{assetDetails.code}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>About</Text>
            <Text style={styles.infoValue}>
              {assetDetails.drug.description}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Unit Quantity</Text>
            <Text style={styles.infoValue}>
              {assetDetails.unitQuantity} {assetDetails.unitQuantityType}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Quantity Produced</Text>
            <Text style={styles.infoValue}>{assetDetails.quantity}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Manufacturing Date</Text>
            <Text style={styles.infoValue}>
              {assetDetails.manufacturingDate}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Expiry Date</Text>
            <Text style={styles.infoValue}>{assetDetails.expiryDate}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Composition</Text>
          {transformedItems.map((item) => (
            <CompositionItem key={item.drug} {...item} />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={isLoading}
            onPress={manufacturerAssetCreationHandler}
            title="Create Drug"
            color="#000"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConstitutionPreviewScreen;

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
  buttonContainer: {
    marginHorizontal: 22,
    marginBottom: 70,
    borderRadius: 28,
    overflow: 'hidden',
  },
});

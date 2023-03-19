/* eslint-disable no-nested-ternary */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useSelector } from 'react-redux';
import SearchInput from '../../components/UI/SearchInput';
import { getCatalogueForOrganization } from '../../apis/requests';
import useFilteredData from '../../hooks/useFilteredData';
import LogoImage from '../../components/UI/LogoImage';
import ItemsList from '../../components/Items/ItemsList';
import { selectCartItemsQuantity } from '../../features/requests/requestDrugCartSlice';
import ErrorToast from '../../components/UI/errorToast';

const RequestDrugsScreen = ({ navigation, route }) => {
  const organization = route.params;

  const cartItemsQuantity = useSelector(selectCartItemsQuantity);

  const [errorVisibility, setErrorVisibility] = useState(false);

  const { filteredData, onChangeText, isLoading } = useFilteredData(
    ['Request_drugs_catalogue', organization._id],
    () => getCatalogueForOrganization(organization._id),
    'drug',
    'name'
  );

  const moveToConfirmPage = () => {
    if (cartItemsQuantity === 0) return;
    navigation.navigate('ConfirmRequest');
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headlineContainer}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowLeftIcon color="#000000" size={22} />
          </TouchableOpacity>
          <LogoImage>
            <Image source={require('../../assets/organizationLogo.png')} />
          </LogoImage>

          <Text style={styles.headline} numberOfLines={1} ellipsizeMode="tail">
            {organization.name}
          </Text>
        </View>
        <View>
          <SearchInput
            onChangeText={onChangeText}
            placeholderText={`Search for "Azithromycin"`}
          />
        </View>
      </View>
      <View
        style={[
          styles.catalogueList,
          (isLoading || filteredData.length === 0) && styles.loadingOrNoData,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : filteredData.length === 0 ? (
          <Text>No Items are in the catalogue...</Text>
        ) : (
          <ItemsList
            id="_id"
            data={filteredData}
            setError={setErrorVisibility}
            component="catalogueCart"
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.showCartButton}
        onPress={moveToConfirmPage}
      >
        <Text style={styles.itemsCount}>{cartItemsQuantity}</Text>
        <Text style={styles.cartText}>View Basket</Text>
      </TouchableOpacity>

      {errorVisibility && (
        <ErrorToast
          onPress={() => setErrorVisibility(false)}
          message="You can only make request from one organization at a time. Clear the cart items to make a new request."
        />
      )}
    </SafeAreaView>
  );
};

export default RequestDrugsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingBottom: 70,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 22,
    backgroundColor: '#F7F7F7',
  },
  headlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  headline: {
    flex: 1,
    fontFamily: 'roboto500',
    fontSize: 20,
  },
  goBackButton: {
    paddingRight: 12,
  },
  catalogueList: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingOrNoData: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  showCartButton: {
    position: 'absolute',
    bottom: 10,
    marginHorizontal: 32,
    width: '80%',
    textAlign: 'center',
    backgroundColor: '#000000',
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 100,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  itemsCount: {
    color: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 100,
    fontFamily: 'ibmPlex700',
    fontSize: 20,
  },
  cartText: {
    flex: 5,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'ibmPlex700',
    fontSize: 20,
  },
});

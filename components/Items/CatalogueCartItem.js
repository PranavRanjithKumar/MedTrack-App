import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  selectBasketItemCountForId,
  selectCartItemsQuantity,
} from '../../features/requests/requestDrugCartSlice';
import { selectOrganization } from '../../features/requests/requestOrganizationSlice';

const CatalogueCartItem = ({
  code,
  drug,
  unitQuantity,
  unitQuantityType,
  organization,
  setError,
}) => {
  const curItemCount = useSelector((state) =>
    selectBasketItemCountForId(state, code)
  );

  const curOrganization = useSelector(selectOrganization);
  const cartItemsQuantity = useSelector(selectCartItemsQuantity);

  const navigation = useNavigation();

  const moveToQuantitySelectionScreen = () => {
    if (cartItemsQuantity === 0 || curOrganization.id === organization._id)
      return navigation.navigate('Add request quantity', {
        code,
        drug,
        unitQuantity,
        organization,
        unitQuantityType,
      });
    return setError(true);
  };

  return (
    <TouchableOpacity
      onPress={moveToQuantitySelectionScreen}
      style={styles.catalogueContainer}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.drugName}>{drug.name}</Text>
          <Text style={styles.codeHeader}>
            Catalogue Code: <Text style={styles.code}>{code}</Text>
          </Text>
          <Text style={styles.codeHeader}>
            Drug Code: <Text style={styles.code}>{drug.code}</Text>
          </Text>
          <Text style={styles.codeHeader}>
            Quanity Per Unit:
            <Text
              style={styles.code}
            >{`${unitQuantity} ${unitQuantityType}`}</Text>
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Text style={styles.count}>{curItemCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CatalogueCartItem;

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
  count: {
    fontFamily: 'ibmPlex700',
    fontSize: 18,
    marginHorizontal: 8,
  },
});

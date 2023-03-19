import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PlusIcon, MinusIcon } from 'react-native-heroicons/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemCountForId,
  selectCartItemsQuantity,
} from '../../features/requests/requestDrugCartSlice';
import {
  selectOrganization,
  setOrganization,
  unsetOrganization,
} from '../../features/requests/requestOrganizationSlice';

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

  const dispatch = useDispatch();

  const addToCart = () => {
    if (cartItemsQuantity === 0) {
      dispatch(
        setOrganization({
          id: organization._id,
          name: organization.name,
        })
      );
    } else if (curOrganization.id !== organization._id) {
      return setError(true);
    }
    dispatch(
      addToBasket({ code, name: drug.name, unitQuantity, unitQuantityType })
    );
  };

  const removeFromCart = () => {
    if (curItemCount === 0) return;
    if (cartItemsQuantity === 1) dispatch(unsetOrganization());
    dispatch(removeFromBasket(code));
  };

  return (
    <View style={styles.catalogueContainer}>
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
          <TouchableOpacity onPress={removeFromCart} style={styles.icon}>
            <MinusIcon color="#FFFFFF" size={16} />
          </TouchableOpacity>
          <Text style={styles.count}>{curItemCount}</Text>
          <TouchableOpacity onPress={addToCart} style={styles.icon}>
            <PlusIcon color="#FFFFFF" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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

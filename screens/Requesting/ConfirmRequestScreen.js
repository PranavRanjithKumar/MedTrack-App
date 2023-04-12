import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import GoBackButton from '../../components/UI/GoBackButton';
import ItemsList from '../../components/Items/ItemsList';
import {
  selectBasketItems,
  resetBasketState,
} from '../../features/requests/requestDrugCartSlice';
import { AuthContext } from '../../store/auth-context';
import getLocation from '../../permissions/locator';
import { placeRequest } from '../../apis/requests';
import {
  selectOrganization,
  resetOrganizationState,
} from '../../features/requests/requestOrganizationSlice';

const ConfirmRequestScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const transferringOrganization = useSelector(selectOrganization);

  const { isLoading, mutate: placeRequestMutate } = useMutation({
    mutationFn: placeRequest,
    onSuccess: () => {
      dispatch(resetBasketState());
      dispatch(resetOrganizationState());
      navigation.navigate('RequestableOrganizations');
    },
  });

  const placeRequestHandler = async () => {
    const { latitude, longitude } = await getLocation();
    placeRequestMutate({
      id: user.organization._id,
      transferringOrgId: transferringOrganization.id,
      latitude,
      longitude,
      requestedItems: items,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <GoBackButton custom={styles.goBackButton} />
      <Text style={styles.headline}>Confirm Request</Text>
      <ItemsList id="catalogueId" data={items} component="cartItem" />
      <TouchableOpacity
        disabled={isLoading}
        style={styles.confirmButton}
        onPress={placeRequestHandler}
      >
        <Text style={styles.buttonText}>Place Request</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ConfirmRequestScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 22,
    paddingBottom: 70,
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

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import React, { useContext } from 'react';
import GoBackButton from '../../components/UI/GoBackButton';
import {
  resetTransferItems,
  selectTransferItems,
  selectTransferItemsForCatalogueId,
} from '../../features/transfers/transferItemsSlice';
import { makeTransfer } from '../../apis/requests';
import { AuthContext } from '../../store/auth-context';
import getLocation from '../../permissions/locator';

const ExportItem = ({ quantity, catalogueId: { code } }) => {
  const transferringItemsForCode = useSelector((state) =>
    selectTransferItemsForCatalogueId(state, code)
  );
  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemHeaderFont}>{code}</Text>
        <Text style={styles.itemHeaderFont}>
          Quantity requested: {quantity}
        </Text>
      </View>
      {transferringItemsForCode.map((item) => {
        return (
          <View style={styles.transferringItem} key={item.assetId}>
            <Text style={styles.transferringItemText}>{item.assetId}</Text>
            {item.batchSize && (
              <Text style={styles.transferringItemText}>
                {item.batchSize} per batch
              </Text>
            )}
            <Text style={styles.transferringItemText}>
              {item.quantity} {item.quantityType} per unit
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const PreviewTransferItemsScreen = ({ navigation, route }) => {
  const request = route.params;
  const { user } = useContext(AuthContext);
  const transferringItems = useSelector(selectTransferItems);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { isLoading, mutate: makeTransferMutate } = useMutation({
    mutationFn: makeTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['UnfulfilledTransfers'] });
      dispatch(resetTransferItems());
      navigation.navigate('UnFulfilled Transfers');
    },
  });

  const makeTransferHandler = async () => {
    const { latitude, longitude } = await getLocation();
    makeTransferMutate({
      id: user.organization._id,
      requestId: request.id,
      latitude,
      longitude,
      sentItems: transferringItems,
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
      <Text style={styles.headline}>Transferring Items</Text>
      <ScrollView>
        {request.items.map((item) => (
          <ExportItem key={item.catalogueId._id} {...item} />
        ))}
      </ScrollView>
      <TouchableOpacity
        disabled={isLoading}
        style={styles.confirmButton}
        onPress={makeTransferHandler}
      >
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PreviewTransferItemsScreen;

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
  container: {
    paddingVertical: 22,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemHeaderFont: {
    fontFamily: 'roboto500',
    fontSize: 17,
  },
  transferringItem: {
    marginVertical: 8,
  },
  transferringItemText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/UI/SearchInput';
import ItemsList from '../../components/Items/ItemsList';
import useFilteredData from '../../hooks/useFilteredData';
import { AuthContext } from '../../store/auth-context';
import { getUnfulfilledTransfers } from '../../apis/requests';

const AddCompositionScreen = () => {
  const { user } = useContext(AuthContext);

  const { filteredData, onChangeText, isLoading } = useFilteredData(
    ['UnfulfilledTransfers', user.organization._id],
    () => getUnfulfilledTransfers(user.organization._id),
    'id'
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>Add Composition</Text>
        </View>
        <View>
          <SearchInput
            onChangeText={onChangeText}
            placeholderText={`Search Catalogue Code: "XYZ-1000"`}
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
          <ItemsList id="id" data={filteredData} component="transfer" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddCompositionScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F7F7',
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

  catalogueList: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingOrNoData: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

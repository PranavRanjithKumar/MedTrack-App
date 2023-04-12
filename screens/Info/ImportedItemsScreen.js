/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/UI/SearchInput';
import ItemsList from '../../components/Items/ItemsList';
import useFilteredData from '../../hooks/useFilteredData';
import { AuthContext } from '../../store/auth-context';
import { getOutSourcedAssets } from '../../apis/assets';

const ImportedItemsScreen = () => {
  const { user } = useContext(AuthContext);

  const { filteredData, onChangeText, isLoading } = useFilteredData(
    ['OutSourcedAssets', user.organization._id],
    () => getOutSourcedAssets(user.organization._id),
    'id'
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>Imported Assets</Text>
        </View>
        <View>
          <SearchInput
            onChangeText={onChangeText}
            placeholderText={`Search Asset ID: "829253b7-c85b-4790-b464"`}
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
          <Text>You have no out-sourced items from other organizations</Text>
        ) : (
          <ItemsList id="id" data={filteredData} component="outsourcedItem" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ImportedItemsScreen;

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

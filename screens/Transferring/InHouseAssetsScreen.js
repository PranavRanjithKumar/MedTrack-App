/* eslint-disable no-nested-ternary */
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import SearchInput from '../../components/UI/SearchInput';
import { AuthContext } from '../../store/auth-context';
import ItemsList from '../../components/Items/ItemsList';
import { getInHouseAssetsForCatalogueId } from '../../apis/assets';
import useFilteredData from '../../hooks/useFilteredData';

const InHouseAssetsScreen = ({ route }) => {
  const { user } = useContext(AuthContext);

  const code = route.params;

  const { filteredData, onChangeText, isLoading } = useFilteredData(
    ['InHouseAssets', user.organization._id],
    () => getInHouseAssetsForCatalogueId(user.organization._id, code),
    'id'
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headlineContainer}>
          <Text style={styles.headline} numberOfLines={1} ellipsizeMode="tail">
            Selected Item: {code}
          </Text>
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
          styles.list,
          (isLoading || filteredData.length === 0) && styles.loadingOrNoData,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : filteredData.length === 0 ? (
          <Text>Produced Items will appear here...</Text>
        ) : (
          <ItemsList id="id" data={filteredData} component="assetItem" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default InHouseAssetsScreen;

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
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingOrNoData: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

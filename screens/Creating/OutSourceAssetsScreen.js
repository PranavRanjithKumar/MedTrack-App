/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/UI/SearchInput';
import ItemsList from '../../components/Items/ItemsList';
import useFilteredData from '../../hooks/useFilteredData';
import { AuthContext } from '../../store/auth-context';
import { getOutSourcedAssets } from '../../apis/assets';

const OutSourceAssetsScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);

  const assetDetails = route.params;

  const { filteredData, onChangeText, isLoading } = useFilteredData(
    ['OutSourcedAssets', user.organization._id],
    () => getOutSourcedAssets(user.organization._id),
    'id'
  );

  const onPressPreviewButton = () =>
    navigation.navigate('Preview Composition', assetDetails);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>Add Composition</Text>
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
          <ItemsList
            id="id"
            data={filteredData}
            component="outsourcedItem"
            componentType="composition"
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={onPressPreviewButton}
      >
        <Text style={styles.buttonText}>Preview Constitution</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OutSourceAssetsScreen;

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
  confirmButton: {
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
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'ibmPlex700',
    fontSize: 20,
  },
});

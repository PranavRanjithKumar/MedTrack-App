/* eslint-disable no-nested-ternary */
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCatalogueForOrganization } from '../../apis/requests';
import SearchInput from '../../components/UI/SearchInput';
import LogoImage from '../../components/UI/LogoImage';
import ItemsList from '../../components/Items/ItemsList';
import useFilteredData from '../../hooks/useFilteredData';
import { AuthContext } from '../../store/auth-context';

const MyCatalogueScreen = () => {
  const { user } = useContext(AuthContext);
  const { filteredData, onChangeText, isLoading } = useFilteredData(
    ['my_catalogue', user.organization._id],
    () => getCatalogueForOrganization(user.organization._id),
    'code'
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headlineContainer}>
          <LogoImage>
            <Image source={require('../../assets/organizationLogo.png')} />
          </LogoImage>

          <Text style={styles.headline} numberOfLines={1} ellipsizeMode="tail">
            {user.organization.name}
          </Text>
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
          <ItemsList id="_id" data={filteredData} component="catalogue" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyCatalogueScreen;

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

/* eslint-disable no-nested-ternary */
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../store/auth-context';
import useFilteredData from '../hooks/useFilteredData';
import getRequestableOrganizations from '../apis/requests';
import ItemsList from '../components/ItemsList';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);

  const { filteredData, onChangeText, isLoading } = useFilteredData(
    ['Requestable_Organizations'],
    getRequestableOrganizations,
    'name'
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>Categories</Text>
        </View>
        <View>
          <TextInput
            placeholder={`Search for "Cipla"`}
            placeholderTextColor="#AAAAAA"
            cursorColor="black"
            style={styles.searchInput}
            onChangeText={onChangeText}
          />
        </View>
      </View>
      <Button
        onPress={logout}
        title="Logout"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <View
        style={[
          styles.organizationList,
          (isLoading || filteredData.length === 0) && styles.loadingOrNoData,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : filteredData.length === 0 ? (
          <Text>No Organizations found...</Text>
        ) : (
          <ItemsList data={filteredData} />
        )}
      </View>
    </SafeAreaView>
  );
};

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
    marginTop: 10,
    marginBottom: 25,
  },
  headline: {
    fontFamily: 'roboto500',
    fontSize: 20,
  },
  searchInput: {
    borderColor: '#CFCFCF',
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 10,
    fontFamily: 'roboto400',
    backgroundColor: 'white',
  },
  organizationList: {
    flex: 1,
    paddingHorizontal: 22,
    backgroundColor: 'white',
  },
  loadingOrNoData: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;

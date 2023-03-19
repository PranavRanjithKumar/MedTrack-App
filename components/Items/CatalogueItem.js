import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PlusIcon } from 'react-native-heroicons/solid';

const CatalogueItem = ({ code, drug, unitQuantity, unitQuantityType }) => {
  const navigation = useNavigation();

  const moveToAssetCreationPage = () =>
    navigation.navigate('Asset Form', {
      code,
      drug,
      unitQuantity,
      unitQuantityType,
    });

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
          <TouchableOpacity
            style={styles.icon}
            onPress={moveToAssetCreationPage}
          >
            <PlusIcon color="#FFFFFF" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CatalogueItem;

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
});

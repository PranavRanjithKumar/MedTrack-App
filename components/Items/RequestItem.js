import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const RequestItem = ({
  quantity,
  catalogueId: { drug, code, unitQuantity, unitQuantityType },
}) => {
  const navigation = useNavigation();

  const moveToAssetSelectionScreen = () => {
    navigation.navigate('View In House Assets', code);
  };

  return (
    <TouchableOpacity
      onPress={moveToAssetSelectionScreen}
      style={styles.catalogueContainer}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.drugName}>{drug.name}</Text>
          <Text style={styles.codeHeader}>
            Catalogue Code: <Text style={styles.code}>{code}</Text>
          </Text>
          <Text style={styles.codeHeader}>
            Quanity Per Unit:
            <Text
              style={styles.code}
            >{`${unitQuantity} ${unitQuantityType}`}</Text>
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Text style={styles.count}>{quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestItem;

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

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CartItem = ({
  catalogueId,
  name,
  unitQuantity,
  unitQuantityType,
  quantity,
}) => {
  return (
    <View style={styles.catalogueContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.drugName}>{name}</Text>
          <Text style={styles.codeHeader}>
            Catalogue Code: <Text style={styles.code}>{catalogueId}</Text>
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
    </View>
  );
};

export default CartItem;

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
  count: {
    fontFamily: 'ibmPlex700',
    fontSize: 18,
    marginHorizontal: 8,
  },
});

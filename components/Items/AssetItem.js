import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkItemAvailability,
  toggleItem,
} from '../../features/transfers/transferItemsSlice';

const AssetItem = ({
  id,
  manufacturingDate,
  catalogueId,
  quantityProduced,
  quantityType,
  batchSize,
}) => {
  const isAvailable = useSelector((state) =>
    checkItemAvailability(state, catalogueId, id)
  );
  const dispatch = useDispatch();

  const onPressHandler = () =>
    dispatch(
      toggleItem({
        id,
        manufacturingDate,
        catalogueId,
        quantityProduced,
        quantityType,
        batchSize,
      })
    );

  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <View
        style={[styles.section, styles.wrapper, isAvailable && styles.selected]}
      >
        <Checkbox
          style={styles.checkbox}
          value={isAvailable}
          onValueChange={onPressHandler}
        />
        <View style={styles.item}>
          <Text style={styles.key}>
            ID: <Text style={styles.value}>{id}</Text>
          </Text>
          <Text style={styles.key}>
            Manufactured On:{' '}
            <Text style={styles.value}>{manufacturingDate}</Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AssetItem;

const styles = StyleSheet.create({
  section: {
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#F2F2F2',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
  },
  checkbox: {
    marginRight: 18,
  },
  key: {
    marginBottom: 4,
    fontSize: 16,
    fontFamily: 'roboto500',
  },
  value: {
    fontSize: 14,
    fontFamily: 'roboto400',
  },
});

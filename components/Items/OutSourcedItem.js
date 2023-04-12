import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import QRButton from '../UI/QRButton';

const ItemWrapper = ({ component, children, style, ...otherProps }) => {
  if (component === 'composition')
    return (
      <TouchableOpacity style={style} {...otherProps}>
        {children}
      </TouchableOpacity>
    );
  return <View style={style}>{children}</View>;
};

const OutSourcedItem = ({
  id,
  manufacturingDate,
  manufacturingOrgId: { name: manufacturingOrgName },
  manufacturingOrgId,
  componentType,
  ...otherProps
}) => {
  const navigation = useNavigation();

  const moveToCompositionQuantityFormScreen = () => {
    navigation.navigate('Add Composition Quantity', {
      id,
      manufacturingDate,
      manufacturingOrgId,
      ...otherProps,
    });
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <ItemWrapper
        component={componentType}
        style={styles.section}
        onPress={moveToCompositionQuantityFormScreen}
      >
        <View style={styles.item}>
          <View>
            <Text style={styles.key}>
              ID: <Text style={styles.value}>{id}</Text>
            </Text>

            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.key}>
              Manufacturer:{' '}
              <Text style={styles.value}>{manufacturingOrgName}</Text>
            </Text>

            <Text style={styles.key}>
              Manufactured On:{' '}
              <Text style={styles.value}>{manufacturingDate}</Text>
            </Text>
          </View>
        </View>
      </ItemWrapper>

      <QRButton id={id} />
    </View>
  );
};

export default OutSourcedItem;

const styles = StyleSheet.create({
  section: {
    paddingVertical: 12,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
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

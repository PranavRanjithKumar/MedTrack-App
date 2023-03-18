import { FlatList } from 'react-native';
import React from 'react';
import OrganizationItem from './OrganizationItem';
import CatalogueItem from './CatalogueItem';
import CartItem from './CartItem';

const ItemsList = ({ id, data, component, ...props }) => {
  const simpleRenderer = (item) => {
    if (component === 'organization') {
      return <OrganizationItem {...item.item} />;
    }
    if (component === 'catalogue') {
      return <CatalogueItem {...item.item} {...props} />;
    }
    // else if (component === 'catalogue') {
    return <CartItem {...item.item} />;
    // }
  };

  return (
    <FlatList
      style={{ paddingHorizontal: 22 }}
      data={data}
      renderItem={simpleRenderer}
      keyExtractor={(item) => item[id]}
    />
  );
};

export default ItemsList;

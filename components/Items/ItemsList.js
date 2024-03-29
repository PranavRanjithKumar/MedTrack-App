import { FlatList } from 'react-native';
import React from 'react';
import OrganizationItem from './OrganizationItem';
import CatalogueCartItem from './CatalogueCartItem';
import CartItem from './CartItem';
import CatalogueItem from './CatalogueItem';
import TransferItem from './TransferItem';
import AssetItem from './AssetItem';
import OutSourcedItem from './OutSourcedItem';

const ItemsList = ({ id, data, component, ...props }) => {
  const simpleRenderer = (item) => {
    if (component === 'organization') {
      return <OrganizationItem {...item.item} />;
    }
    if (component === 'catalogueCart') {
      return <CatalogueCartItem {...item.item} {...props} />;
    }
    if (component === 'cartItem') {
      return <CartItem {...item.item} />;
    }
    if (component === 'catalogue') {
      return <CatalogueItem {...item.item} />;
    }
    if (component === 'transfer') {
      return <TransferItem {...item.item} {...props} />;
    }
    if (component === 'assetItem') {
      return <AssetItem {...item.item} />;
    }
    if (component === 'outsourcedItem') {
      return <OutSourcedItem {...item.item} {...props} />;
    }
  };

  return (
    <FlatList
      style={component !== 'assetItem' && { paddingHorizontal: 22 }}
      data={data}
      renderItem={simpleRenderer}
      keyExtractor={(item) => item[id]}
    />
  );
};

export default ItemsList;

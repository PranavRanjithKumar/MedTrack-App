import { FlatList } from 'react-native';
import React from 'react';
import OrganizationItem from './OrganizationItem';

const simpleRenderer = (item) => {
  return <OrganizationItem {...item.item} />;
};

const ItemsList = ({ data }) => {
  return (
    <FlatList
      style={{ paddingHorizontal: 22 }}
      data={data}
      renderItem={simpleRenderer}
      keyExtractor={(item) => item._id}
    />
  );
};

export default ItemsList;

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  MapPinIcon,
  CalendarDaysIcon,
  BuildingOffice2Icon,
} from 'react-native-heroicons/solid';
import formatDate from '../../features/dateFormatter';

const TransferItem = ({
  id,
  requestedDate,
  requestingOrgId,
  requestedItems,
  componentType,
  ...otherProps
}) => {
  const RequestedDate = new Date(requestedDate);
  const requestedDateFormatted = formatDate(RequestedDate);

  const navigation = useNavigation();

  let moveToNextScreen;

  if (componentType === 'makeTransfer')
    moveToNextScreen = () => {
      navigation.navigate('Requested Items', { id, requestedItems });
    };
  else
    moveToNextScreen = () => {
      navigation.navigate('Request Info', {
        id,
        requestingOrgId,
        requestedDate,
        requestedItems,
        ...otherProps,
      });
    };

  return (
    <TouchableOpacity
      style={styles.catalogueContainer}
      onPress={moveToNextScreen}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.idStyle}>{id}</Text>
          <View style={styles.detailsItem}>
            <CalendarDaysIcon color="#808080" size={20} />
            <Text style={{ marginLeft: 4 }}>{requestedDateFormatted}</Text>
          </View>
          <View style={styles.detailsItem}>
            <BuildingOffice2Icon color="#808080" size={20} />
            <Text style={{ marginLeft: 4 }}>
              {componentType === 'requestInfo'
                ? otherProps.transferringOrgId.name
                : requestingOrgId.name}
            </Text>
          </View>
          <View style={styles.detailsItem}>
            <MapPinIcon color="#808080" size={20} />
            <Text style={{ marginLeft: 4 }}>
              {componentType === 'requestInfo'
                ? `${otherProps.transferringOrgId.address}, ${otherProps.transferringOrgId.city}, ${otherProps.transferringOrgId.state}`
                : `${requestingOrgId.address}, ${requestingOrgId.city}, ${requestingOrgId.state}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransferItem;

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
  idStyle: {
    fontFamily: 'roboto500',
    fontSize: 15,
    marginBottom: 4,
  },
  detailsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});

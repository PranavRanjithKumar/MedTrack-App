import React, { useState, useContext, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import { notEmpty, notZero } from '../../features/validations';
import { storeSupplierAsset } from '../../apis/assets';
import { AuthContext } from '../../store/auth-context';
import getLocation from '../../permissions/locator';
import { resetConstituents } from '../../features/composition/drugCompositionSlice';
import formatDate from '../../features/dateFormatter';

const getForm = (...inputStates) => {
  const formIsValid = inputStates.reduce(
    (prev, cur) => prev && cur.isValid,
    true
  );

  const formReset = () => {
    for (const inputState of inputStates) {
      inputState.reset();
    }
  };

  return { formIsValid, formReset };
};

const AssetCreationScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const asset = route.params;

  const CUR_DATE = new Date();
  const ONE_YEAR_AFTER = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(resetConstituents());
    }, [dispatch])
  );

  const [manufacturingDate, setManufacturingDate] = useState(
    new Date(CUR_DATE)
  );
  const [manufacturingDatePicker, setManufacturingDatePicker] = useState(false);

  const [expiryDatePicker, setExpiryDatePicker] = useState(false);
  const [expiryDate, setExpiryDate] = useState(ONE_YEAR_AFTER);

  const [quantityInputStates, quantityProps] = useInput('', [
    notEmpty,
    notZero,
  ]);

  const { formIsValid } = getForm(quantityInputStates);

  const manufacturingDateFormatted = formatDate(manufacturingDate);

  const expiryDateFormatted = formatDate(expiryDate);

  const quantityValue = quantityProps.value;

  const moveToAddCompositionPage = () =>
    navigation.navigate('View Out Sourced Assets', {
      ...asset,
      manufacturingDate: manufacturingDateFormatted,
      expiryDate: expiryDateFormatted,
      quantity: quantityValue,
    });

  const onManufacturingDateChange = useCallback((event, selectedDate) => {
    setManufacturingDatePicker(false);
    setManufacturingDate(selectedDate);
  }, []);

  const openManufacturingDatePicker = () => {
    setManufacturingDatePicker(true);
  };

  const onExpiryDateChange = useCallback((event, selectedDate) => {
    const currentDate = selectedDate;
    setExpiryDatePicker(false);
    setExpiryDate(currentDate);
  }, []);

  const openExpiryDatePicker = () => {
    setExpiryDatePicker(true);
  };

  const { isLoading, mutate: supplierAssetMutate } = useMutation({
    mutationFn: storeSupplierAsset,
    onSuccess: () => console.log('success'),
  });

  const supplierAssetCreationHandler = async () => {
    const { latitude, longitude } = await getLocation();

    supplierAssetMutate({
      id: user.organization._id,
      code: asset.code,
      manufacturingDate: manufacturingDateFormatted,
      expiryDate: expiryDateFormatted,
      latitude,
      longitude,
      quantity: +quantityValue,
    });
  };

  let assetType;
  let submitButtonTitle;
  let submitButtonOnPressFn;
  if (asset.drug.type === 'drug') {
    assetType = 'Drug';
    submitButtonTitle = 'Add Composition';
    submitButtonOnPressFn = moveToAddCompositionPage;
  } else {
    assetType = 'Raw Material';
    submitButtonTitle = 'Create Asset';
    submitButtonOnPressFn = supplierAssetCreationHandler;
  }

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.header}>
          <Text style={styles.headerText}>Create {assetType}</Text>
        </View>

        <View style={styles.formView}>
          <View style={styles.inputContainer}>
            <Text>Manufactured Date:</Text>
            <TouchableWithoutFeedback
              onPress={openManufacturingDatePicker}
              style={{ flex: 1 }}
            >
              <View style={[styles.dateInput, styles.input]}>
                <Text>{manufacturingDateFormatted}</Text>
                <CalendarDaysIcon size={20} color="black" />
                {manufacturingDatePicker && (
                  <DateTimePicker
                    onChange={onManufacturingDateChange}
                    value={manufacturingDate}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.inputContainer}>
            <Text>Expiry Date:</Text>
            <TouchableWithoutFeedback
              onPress={openExpiryDatePicker}
              style={{ flex: 1 }}
            >
              <View style={[styles.dateInput, styles.input]}>
                <Text>{expiryDateFormatted}</Text>
                <CalendarDaysIcon size={20} color="black" />
                {expiryDatePicker && (
                  <DateTimePicker
                    onChange={onExpiryDateChange}
                    value={expiryDate}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.inputContainer}>
            <Text>Quantity:</Text>
            <TextInput
              style={[
                styles.input,
                quantityInputStates.isInValid && styles.inputInValid,
                quantityInputStates.isFocus && styles.inputFocus,
              ]}
              cursorColor="black"
              placeholderTextColor="#AAAAAA"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              {...quantityProps}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            disabled={
              !formIsValid || (assetType === 'Raw Material' && isLoading)
            }
            onPress={submitButtonOnPressFn}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.pressed,
              formIsValid ? styles.buttonValid : styles.buttonInvalid,
            ]}
          >
            <Text
              style={[
                formIsValid ? styles.buttonTextValid : styles.buttonTextInvalid,
              ]}
            >
              {submitButtonTitle}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AssetCreationScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 22,
    backgroundColor: '#F7F7F7',
    paddingBottom: 40,
  },
  headerText: {
    fontFamily: 'roboto700',
    fontSize: 20,
    padding: 10,
  },
  formView: {
    paddingHorizontal: 22,
    marginVertical: 35,
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    borderColor: '#CFCFCF',
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    fontFamily: 'roboto400',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputFocus: {
    borderColor: '#000000',
  },
  inputInValid: {
    borderColor: '#C9594B',
  },
  buttonContainer: {
    marginHorizontal: 22,
    borderRadius: 28,
    overflow: 'hidden',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonInvalid: {
    backgroundColor: '#F7F7F7',
  },
  buttonValid: {
    backgroundColor: '#000000',
  },
  buttonTextInvalid: {
    color: '#AAAAAA',
  },
  buttonTextValid: {
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.7,
  },
});

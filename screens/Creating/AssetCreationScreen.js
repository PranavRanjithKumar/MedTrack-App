import React, { useState } from 'react';
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
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import DateTimePicker from '@react-native-community/datetimepicker';
import useInput from '../../hooks/useInput';

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
  const asset = route.params;
  const assetType = asset.drug.type === 'drug' ? 'Drug' : 'Raw Material';

  const CUR_DATE = new Date();
  const ONE_YEAR_AFTER = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  const [manufacturingDate, setManufacturingDate] = useState(CUR_DATE);
  const [manufacturingDatePicker, setManufacturingDatePicker] = useState(false);

  const [expiryDatePicker, setExpiryDatePicker] = useState(false);
  const [expiryDate, setExpiryDate] = useState(ONE_YEAR_AFTER);

  const [quantityInputStates, quantityProps] = useInput();

  const { formIsValid } = getForm(quantityInputStates);

  const moveToAddCompositionPage = () =>
    navigation.navigate('Add Composition', {
      ...route.params,
      manufacturingDate: `${manufacturingDate.getDate()}-${
        manufacturingDate.getMonth() + 1
      }-${manufacturingDate.getFullYear()}`,
      expiryDate: `${expiryDate.getDate()}-${
        expiryDate.getMonth() + 1
      }-${expiryDate.getFullYear()}`,
      quantity: quantityProps.value,
    });

  const onManufacturingDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setManufacturingDatePicker(false);
    setManufacturingDate(currentDate);
  };

  const openManufacturingDatePicker = () => {
    setManufacturingDatePicker(true);
  };

  const onExpiryDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setExpiryDatePicker(false);
    setExpiryDate(currentDate);
  };

  const openExpiryDatePicker = () => {
    setExpiryDatePicker(true);
  };

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
                <Text>{`${manufacturingDate.getDate()}-${
                  manufacturingDate.getMonth() + 1
                }-${manufacturingDate.getFullYear()}`}</Text>
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
                <Text>{`${expiryDate.getDate()}-${
                  expiryDate.getMonth() + 1
                }-${expiryDate.getFullYear()}`}</Text>
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
            disabled={!formIsValid}
            onPress={moveToAddCompositionPage}
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
              Preview
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
});

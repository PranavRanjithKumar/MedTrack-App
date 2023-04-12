import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { notEmpty, notZero } from '../../features/validations';
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemCountForId,
  selectBasketItems,
} from '../../features/requests/requestDrugCartSlice';
import {
  setOrganization,
  unsetOrganization,
} from '../../features/requests/requestOrganizationSlice';

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

const RequestQuantityFormScreen = ({ navigation, route }) => {
  const asset = route.params;

  const dispatch = useDispatch();

  const curItemCount = useSelector((state) =>
    selectBasketItemCountForId(state, asset.code)
  );

  const cartItems = useSelector(selectBasketItems);

  const initialState = curItemCount === 0 ? '' : `${curItemCount}`;

  const [quantityInputStates, quantityProps] = useInput(initialState, [
    notEmpty,
    notZero,
  ]);
  const { formIsValid } = getForm(quantityInputStates);

  let removeOrCancelButton;

  const onPressCancelButton = () => navigation.goBack();

  const onPressRemoveFromCartButton = () => {
    if (cartItems.length === 1) dispatch(unsetOrganization());
    dispatch(removeFromBasket(asset.code));
    navigation.goBack();
  };

  const onPressAddToCartButton = () => {
    if (cartItems.length === 0)
      dispatch(
        setOrganization({
          id: asset.organization._id,
          name: asset.organization.name,
        })
      );
    dispatch(
      addToBasket({
        code: asset.code,
        name: asset.drug.name,
        quantity: +quantityProps.value,
        unitQuantity: asset.unitQuantity,
        unitQuantityType: asset.unitQuantityType,
      })
    );
    navigation.goBack();
  };
  if (curItemCount === 0)
    removeOrCancelButton = (
      <Button title="Cancel" onPress={onPressCancelButton} color="#C9594B" />
    );
  else
    removeOrCancelButton = (
      <Button
        title="Remove from Cart"
        onPress={onPressRemoveFromCartButton}
        color="#C9594B"
      />
    );

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.header}>
          <View style={styles.headlineContainer}>
            <Text style={styles.headline}>{asset.drug.name}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.idsContainer}>
              <View style={styles.fieldView}>
                <Text style={styles.subFieldKey}>Catalogue ID:</Text>
                <Text style={styles.subFieldValue}>{asset.code}</Text>
              </View>
              <View style={[styles.fieldView, { alignItems: 'flex-end' }]}>
                <Text style={styles.subFieldKey}>Drug ID:</Text>
                <Text style={styles.subFieldValue}>{asset.drug.code}</Text>
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <View style={[styles.fieldView, { flex: 1 }]}>
                <Text style={styles.subFieldKey}>Quantity/Unit:</Text>
                <Text
                  style={styles.subFieldValue}
                >{`${asset.unitQuantity} ${asset.unitQuantityType}`}</Text>
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <View style={[styles.fieldView, { flex: 1 }]}>
                <Text style={styles.subFieldKey}>
                  Manufacturing Organization:
                </Text>
                <Text style={styles.subFieldValue}>
                  {asset.organization.name}
                </Text>
              </View>
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
                placeholder="Enter quantity in units"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                {...quantityProps}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                disabled={!formIsValid}
                onPress={onPressAddToCartButton}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.pressed,
                  formIsValid ? styles.buttonValid : styles.buttonInvalid,
                ]}
              >
                <Text
                  style={[
                    formIsValid
                      ? styles.buttonTextValid
                      : styles.buttonTextInvalid,
                  ]}
                >
                  Save
                </Text>
              </Pressable>
            </View>
            <View style={styles.buttonContainer}>{removeOrCancelButton}</View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RequestQuantityFormScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 22,
    backgroundColor: '#F7F7F7',
  },
  headlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  headline: {
    flex: 1,
    fontFamily: 'roboto500',
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
  },
  detailsContainer: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: 25,
  },
  idsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  fieldView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    width: 110,
  },
  subFieldKey: {
    fontFamily: 'roboto500',
    fontSize: 12,
  },
  subFieldValue: {
    fontFamily: 'roboto500',
    fontSize: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    marginBottom: 18,
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
  inputFocus: {
    borderColor: '#000000',
  },
  inputInValid: {
    borderColor: '#C9594B',
  },
  buttonContainer: {
    marginHorizontal: 22,
    marginBottom: 10,
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

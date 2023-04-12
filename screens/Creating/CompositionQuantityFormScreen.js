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
  addAsConstituent,
  removeFromConstituents,
  selectConstituentQuantity,
} from '../../features/composition/drugCompositionSlice';

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

const CompositionQuantityFormScreen = ({ navigation, route }) => {
  const asset = route.params;

  const currentCompositionQuantity = useSelector((state) =>
    selectConstituentQuantity(state, asset.id)
  );

  const initialState =
    currentCompositionQuantity === 0 ? '' : `${currentCompositionQuantity}`;

  const [quantityInputStates, quantityProps] = useInput(initialState, [
    notEmpty,
    notZero,
  ]);

  const dispatch = useDispatch();

  let removeOrCancelButton;
  let buttonText;

  const onPressCancelButton = () => navigation.goBack();

  const onPressDeleteConstituent = () => {
    dispatch(removeFromConstituents(asset.id));
    navigation.goBack();
  };

  const onPressAddAsConstituent = () => {
    dispatch(
      addAsConstituent({
        name: asset.name,
        id: asset.id,
        code: asset.catalogueId,
        quantity: +quantityProps.value,
        quantityType: asset.quantityType,
      })
    );
    navigation.goBack();
  };

  if (currentCompositionQuantity === 0) {
    buttonText = 'Add as constituent';
    removeOrCancelButton = (
      <Button title="Cancel" onPress={onPressCancelButton} color="#C9594B" />
    );
  } else {
    buttonText = 'Update constitution';
    removeOrCancelButton = (
      <Button
        title="Remove from constitution"
        onPress={onPressDeleteConstituent}
        color="#C9594B"
      />
    );
  }

  const { formIsValid } = getForm(quantityInputStates);

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.header}>
          <View style={styles.headlineContainer}>
            <Text style={styles.headline}>{asset.name}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.headline}>{asset.id}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.idsContainer}>
              <View style={styles.fieldView}>
                <Text style={styles.subFieldKey}>Catalogue ID:</Text>
                <Text style={styles.subFieldValue}>{asset.catalogueId}</Text>
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <View style={[styles.fieldView, { flex: 1 }]}>
                <Text style={styles.subFieldKey}>Quantity/Unit:</Text>
                <Text
                  style={styles.subFieldValue}
                >{`${asset.quantityProduced} ${asset.quantityType}`}</Text>
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <View style={[styles.fieldView, { flex: 1 }]}>
                <Text style={styles.subFieldKey}>
                  Manufacturing Organization:
                </Text>
                <Text style={styles.subFieldValue}>
                  {asset.manufacturingOrgId.name}
                </Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text>Constitution:</Text>
              <TextInput
                style={[
                  styles.input,
                  quantityInputStates.isInValid && styles.inputInValid,
                  quantityInputStates.isFocus && styles.inputFocus,
                ]}
                cursorColor="black"
                placeholderTextColor="#AAAAAA"
                placeholder={`Enter quantity in terms of ${asset.quantityType}`}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                {...quantityProps}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                disabled={!formIsValid}
                onPress={onPressAddAsConstituent}
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
                  {buttonText}
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

export default CompositionQuantityFormScreen;

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
    fontSize: 17,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  detailsContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 20,
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
    fontSize: 17,
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

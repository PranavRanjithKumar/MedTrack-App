import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import React from 'react';
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

const LoginScreen = () => {
  const [emailInputStates, emailProps] = useInput();
  const [passwordInputStates, passwordProps] = useInput();

  const { formIsValid, formReset } = getForm(
    emailInputStates,
    passwordInputStates
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Getting started</Text>
      </View>

      <View style={styles.loginView}>
        <Text style={styles.loginHeader}>Log In</Text>
        <Text style={styles.loginHelper}>Enter your email and password</Text>
      </View>

      <View style={styles.formView}>
        <TextInput
          style={[
            styles.loginInput,
            emailInputStates.isInValid && styles.loginInputInValid,
            emailInputStates.isFocus && styles.loginInputFocus,
          ]}
          placeholder="Email"
          placeholderTextColor="#AAAAAA"
          autoCapitalize="none"
          cursorColor="black"
          autoCorrect={false}
          {...emailProps}
        />

        <TextInput
          style={[
            styles.loginInput,
            passwordInputStates.isInValid && styles.loginInputInValid,
            passwordInputStates.isFocus && styles.loginInputFocus,
          ]}
          placeholder="Password"
          cursorColor="black"
          placeholderTextColor="#AAAAAA"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          {...passwordProps}
        />
      </View>

      <View style={styles.loginButtonContainer}>
        <Pressable
          disabled={!formIsValid}
          style={[
            styles.loginButton,
            formIsValid ? styles.loginButtonValid : styles.loginButtonInvalid,
          ]}
        >
          <Text
            style={[
              formIsValid
                ? styles.loginButtonTextValid
                : styles.loginButtonTextInvalid,
            ]}
          >
            Log In
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 22,
  },
  header: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'roboto500',
    fontSize: 18,
    padding: 10,
  },
  loginView: {
    marginTop: 72,
  },
  loginHeader: {
    fontFamily: 'ibmPlex600',
    fontSize: 24,
  },
  loginHelper: {
    fontFamily: 'roboto400',
    paddingTop: 8,
    fontSize: 15,
  },
  formView: {
    marginVertical: 25,
  },
  loginInput: {
    borderColor: '#CFCFCF',
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    fontFamily: 'roboto400',
  },
  loginInputFocus: {
    borderColor: '#000000',
  },
  loginInputInValid: {
    borderColor: '#C9594B',
  },
  loginButtonContainer: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  loginButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  loginButtonInvalid: {
    backgroundColor: '#F7F7F7',
  },
  loginButtonValid: {
    backgroundColor: '#000000',
  },
  loginButtonTextInvalid: {
    color: '#AAAAAA',
  },
  loginButtonTextValid: {
    color: '#FFFFFF',
  },
});

export default LoginScreen;

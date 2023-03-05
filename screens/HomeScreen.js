import { Text, View, StyleSheet, Button } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.root}>
      <Text>HomeScreen</Text>
      <Button
        onPress={logout}
        title="Logout"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;

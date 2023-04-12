import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Profile</Text>
      </View>
      <ScrollView style={styles.container}>
        <View
          style={[
            styles.options,
            { borderBottomWidth: 0.3, borderColor: '#CFCFCF' },
          ]}
        >
          <Image
            style={styles.image}
            source={require('../../assets/profile.png')}
          />
          <View>
            <Text style={styles.infoHeader}>
              {user.name.replace(/\b\w/g, (l) => l.toUpperCase())}
            </Text>
            <Text style={styles.infoValue}>{user.organization.name}</Text>
          </View>
        </View>
        {(user.organization.type === 'supplier' ||
          user.organization.type === 'manufacturer') && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Inventory Stock')}
            style={[styles.options, { padding: 8 }]}
          >
            <Image
              style={[styles.image, { color: 'black' }]}
              source={require('../../assets/ArrowUp.png')}
            />
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.infoHeader}>Inventory</Text>
              <Text style={styles.infoValue}>View In-House Assets</Text>
            </View>
          </TouchableOpacity>
        )}
        {user.organization.name !== 'supplier' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Imported Items')}
            style={[styles.options, { padding: 8 }]}
          >
            <Image
              style={[styles.image, { color: 'black' }]}
              source={require('../../assets/ArrowDown.png')}
            />
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.infoHeader}>Imports</Text>
              <Text style={styles.infoValue}>View Outsoured Assets</Text>
            </View>
          </TouchableOpacity>
        )}
        {user.organization.name !== 'supplier' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Requests')}
            style={[styles.options, { padding: 8 }]}
          >
            <Image
              style={[styles.image, { color: 'black' }]}
              source={require('../../assets/Send.png')}
            />
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.infoHeader}>Requests</Text>
              <Text style={styles.infoValue}>View Assets Requests made</Text>
            </View>
          </TouchableOpacity>
        )}
        {user.organization.name !== 'retailer' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Transfers')}
            style={[styles.options, { padding: 8 }]}
          >
            <Image
              style={[styles.image, { color: 'black' }]}
              source={require('../../assets/Swap.png')}
            />
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.infoHeader}>Transfers</Text>
              <Text style={styles.infoValue}>View Assets Transfers made</Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.options, { padding: 8 }]}>
          <Image
            style={[styles.image, { color: 'black' }]}
            source={require('../../assets/Document.png')}
          />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.infoHeader}>Catalogue</Text>
            <Text style={styles.infoValue}>
              View your Organization Catalogue
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('History Form')}
          style={[styles.options, { padding: 8 }]}
        >
          <Image
            style={[styles.image, { color: 'black' }]}
            source={require('../../assets/Info.png')}
          />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.infoHeader}>Asset History</Text>
            <Text style={styles.infoValue}>View entire asset history</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 22,
    backgroundColor: '#F7F7F7',
    paddingBottom: 30,
  },
  headerText: {
    fontFamily: 'roboto700',
    fontSize: 20,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  options: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 12,
  },
  infoHeader: {
    fontSize: 15,
  },
  infoValue: {
    color: '#808080',
  },
});

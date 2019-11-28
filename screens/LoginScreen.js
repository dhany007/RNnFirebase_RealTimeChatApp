/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  Alert,
  View,
  TextInput,
  AsyncStorage,
  StyleSheet,
} from 'react-native';

import { Container, Header, Content, Button } from 'native-base';

import firebase from 'firebase';
import User from '../User';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    phone: '',
    name: '',
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  submitForm = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert(
        'Error',
        `Wrong phone number. Your ${this.state.phone} have ${
          this.state.phone.length
        } digits. Must be atleast 10-13 digits`,
      );
    } else if (this.state.phone.name < 3) {
      Alert.alert(
        'Error',
        `Wrong Name. Your ${this.state.name} have ${
          this.state.name.length
        } digits. Must be atleast >3 digits`,
      );
    } else {
      // save user data
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase.database()
        .ref('users/' + User.phone)
        .set({name: this.state.name});
      this.props.navigation.navigate('App');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.head}>WhatzUp</Text>
        </View>
        <TextInput
          placeholder="Enter your phone number"
          placeholderTextColor='#FBFBF8'
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
          rounded
        />
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor='#FBFBF8'
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <View style={styles.enter}>
          <TouchableOpacity onPress={this.submitForm}>
              <Text style={{color: '#FBFBF8'}}>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E2C',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    width: '90%',
    borderRadius: 10,
    borderColor: '#FBFBF8',
    color: '#FBFBF8',
  },
  head: {
    marginBottom: 50,
    marginTop: -50,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FBFBF8',
  },
  enter: {
    marginTop: 10,
    width:'90%',
    borderWidth: 1,
    borderColor:'#FBFBF8',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

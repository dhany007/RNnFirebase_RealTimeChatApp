import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  Alert,
  View,
  TextInput,
  AsyncStorage,
} from 'react-native';

import firebase from 'firebase';
import User from '../User';
import styles from '../constants/styles';

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
      firebase
        .database()
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
          placeholder="Phone number"
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
          rounded
        />
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.submitForm}>
          <Text>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

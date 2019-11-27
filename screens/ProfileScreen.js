/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Alert,
} from 'react-native';
import User from '../User';
import firebase from 'firebase';

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: User.name,
    };
  }

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('Error', 'Please enter valid name');
    } else if (User.name !== this.state.name) {
      firebase
        .database()
        .ref('users')
        .child(User.phone)
        .set({name: this.state.name});
      User.name = this.state.name;
      Alert.alert('Success', 'Name changed succesful.');
    }
  };

  render() {
    return (
      <View>
        <Text> {User.phone} </Text>
        <TextInput
          value={this.state.name}
          onChangeText={this.handleChange('name')}
          style={{borderWidth: 1}}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text>Change Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._logOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

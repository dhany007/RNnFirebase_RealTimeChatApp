/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

import User from '../User';
import firebase from 'firebase';

const imgPP = require('../assets/img/user.png');

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
    console.log(User);
    return (
      <ScrollView>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image source={imgPP} style={{width: 200, height: 200}} />
          </View>
          <View style={{marginBottom: 10, marginTop: 20}}>
            <Text style={{fontWeight: 'bold'}}>Nomor Handphone</Text>
            <Text style={{fontSize: 23, fontWeight: 'bold'}}>{User.phone}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#b6b6b6',
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <View>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>Nama</Text>
            <TextInput
              value={this.state.name}
              onChangeText={this.handleChange('name')}
              style={{
                borderWidth: 1,
                padding: 3,
                borderRadius: 5,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            />
            <TouchableOpacity onPress={this.changeName}>
              <Text style={{marginTop: 10}}>Change Name</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#b6b6b6',
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <View style={{marginTop: 10}}>
            <TouchableOpacity onPress={this._logOut}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

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
} from 'react-native';

import firebase from 'firebase';

const imgPP = require('../assets/img/user.png');

export default class ProfilMateScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.navigation.getParam('name'),
      phone: props.navigation.getParam('phone'),
    };
  }

  render() {
    return (
      <View>
        <View style={{marginLeft: 30, marginRight: 30}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={imgPP}
              style={{width: 200, height: 200, marginTop: 50}}
            />
          </View>
          <View style={{marginBottom: 10, marginTop: 20}}>
            <Text style={{fontWeight: 'bold'}}>Nomor Handphone</Text>
            <Text style={{fontSize: 23, fontWeight: 'bold'}}>
              {this.state.phone}
            </Text>
          </View>
          <View>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>Nama</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {this.state.name}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

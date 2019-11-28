/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
} from 'react-native';
import User from '../User';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Chats',
      headerRight: (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Map')}>
            <Icon
              name="map-marker-alt"
              size={25}
              color="#000"
              style={{marginRight: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon
              name="user"
              size={25}
              color="#000"
              style={{marginRight: 15}}
            />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  state = {
    users: [],
  };

  UNSAFE_componentWillMount() {
    let dbRef = firebase.database().ref('users');
    dbRef.on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }

  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Chat', item)}
        style={{padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
        <Text style={{fontSize: 20}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
        />
      </View>
    );
  }
}

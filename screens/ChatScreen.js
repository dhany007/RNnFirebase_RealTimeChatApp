/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import User from '../User';
import firebase from 'firebase';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class ChatScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name', null),
      headerRight: (
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProfileMate', {
                name: navigation.getParam('name'),
                phone: navigation.getParam('phone'),
              })
            }>
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

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam('name'),
        phone: props.navigation.getParam('phone'),
      },
      textMessage: '',
      messageList: [],
    };
  }

  UNSAFE_componentWillMount() {
    firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(this.state.person.phone)
      .on('child_added', value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()],
          };
        });
      });
  }

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  };

  sendMessage = async () => {
    console.log(this.state.person.phone);
    console.log(User.phone);
    if (this.state.textMessage.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(User.phone)
        .child(this.state.person.phone)
        .push().key;
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone,
      };
      updates[
        'messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId
      ] = message;
      updates[
        'messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({textMessage: ''});
    }
  };

  renderRow = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '70%',
          alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
          backgroundColor: item.from === User.phone ? '#DCF8C6' : '#fff',
          borderRadius: 5,
          marginBottom: 5,
        }}>
        <Text style={{color: '#000', padding: 7, fontSize: 16}}>
          {item.message}
        </Text>
        <Text
          style={{color: '#000', padding: 2, fontSize: 10, marginLeft: 'auto'}}>
          {this.convertTime(item.time)}
        </Text>
      </View>
    );
  };

  render() {
    console.log(this.state.person.name);
    let {height, width} = Dimensions.get('window');
    return (
      <View style={{flex: 1, backgroundColor: '#1e1e2c'}}>
        <FlatList
          style={{padding: 10}}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{backgroundColor: '#fff'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 5,
              marginTop: 'auto',
            }}>
            <TextInput
              style={styles.input}
              value={this.state.textMessage}
              placeholder="Type message..."
              onChangeText={this.handleChange('textMessage')}
            />
            <TouchableOpacity onPress={() => this.sendMessage()}>
              {/* <Text style={styles.btnText}>Send</Text> */}
              <Icon
                name="arrow-circle-right"
                size={30}
                color="#000"
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
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
  },
  input: {
    padding: 7,
    borderWidth: 1,
    marginBottom: 5,
    width: '90%',
    borderRadius: 10,
    marginTop: 5,
  },
  head: {
    marginBottom: 50,
    marginTop: -50,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

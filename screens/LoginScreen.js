import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Container,
  TextInput,
  AsyncStorage,
} from 'react-native';

import User from '../User';

export default class Login extends Component {
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
      this.props.navigation.navigate('App');
    }
  };

  render() {
    return (
      <View>
        <Container style={styles.container}>
          <TextInput
            placeholder="Phone number"
            keyboardType="number-pad"
            style={styles.input}
            value={this.state.phone}
            onChangeText={this.handleChange('phone')}
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
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItmes: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
});

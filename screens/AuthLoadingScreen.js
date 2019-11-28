import React from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, View} from 'react-native';

import User from '../User';

import firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  UNSAFE_componentWillMount() {
    var firebaseConfig = {
      apiKey: 'AIzaSyCh5OJc42kcGNkKOdE-l0fy2gTvgemDgBE',
      authDomain: 'whatzup-219d2.firebaseapp.com',
      databaseURL: 'https://whatzup-219d2.firebaseio.com',
      projectId: 'whatzup-219d2',
      storageBucket: 'whatzup-219d2.appspot.com',
      messagingSenderId: '28720052644',
      appId: '1:28720052644:web:955aece45b2956aa966931',
      measurementId: 'G-FGCT2DJH4N',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

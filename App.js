import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
import ProfilMateScreen from './screens/ProfilMateScreen';

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,
  Profile: ProfileScreen,
  Map: MapScreen,
  ProfileMate: ProfilMateScreen,
});

const AuthStack = createStackNavigator({Login: LoginScreen});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

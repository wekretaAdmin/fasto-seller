import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {useSelector} from 'react-redux';

const AppContainer = () => {
  const adduser = useSelector(state => state.loginReducer.user);
  console.log('addUser', adduser);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#fff" barStyle={'default'} />
      <View style={{flex: 1, paddingTop: Platform.OS == 'ios' ? 50 : 0}}>
        <NavigationContainer>
          {adduser?.idToken ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </View>
    </View>
  );
};

export default AppContainer;

const styles = StyleSheet.create({});

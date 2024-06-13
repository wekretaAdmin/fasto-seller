import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RouteName from './Routeame';
import HomeScreen from '../screens/homeScreen';
import SuggestedProduct from '../screens/suggestedProduct';
import AddMoreProducts from '../screens/addMoreProducts';
import Login from '../screens/login';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={RouteName.LOGIN_SCREEN}>
      <Stack.Screen name={RouteName.LOGIN_SCREEN} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});

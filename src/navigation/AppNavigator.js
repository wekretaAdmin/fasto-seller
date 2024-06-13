import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RouteName from './Routeame';
import HomeScreen from '../screens/homeScreen';
import SuggestedProduct from '../screens/suggestedProduct';
import AddMoreProducts from '../screens/addMoreProducts';
import PreferedProduct from '../screens/login/PreferedProduct';
import CartScreen from '../screens/cartScreen';
import ChatScreen from '../screens/chatScreen';
import QRScanner from '../screens/homeScreen/QRScanner';
import {useSelector} from 'react-redux';
import Address from '../screens/address';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const adduser = useSelector(state => state.loginReducer.user.statusid);
  console.log('adduser', adduser);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={
        adduser == 1 ? RouteName.HOME_SCREEN : RouteName.PREFERED_PRODUCT
      }>
      <Stack.Screen name={RouteName.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen
        name={RouteName.PREFERED_PRODUCT}
        component={PreferedProduct}
      />
      <Stack.Screen
        name={RouteName.SUGGESTED_PRODUCT}
        component={SuggestedProduct}
      />
      <Stack.Screen
        name={RouteName.ADD_MORE_PRODUCTS}
        component={AddMoreProducts}
      />
      <Stack.Screen name={RouteName.CART_SCREEN} component={CartScreen} />
      <Stack.Screen name={RouteName.CHAT_SCREEN} component={ChatScreen} />
      <Stack.Screen name={RouteName.QR_SCANNER} component={QRScanner} />
      <Stack.Screen name={RouteName.ADDRESS} component={Address} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});

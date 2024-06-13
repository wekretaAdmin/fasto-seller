import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Apptheme from '../../assets/theme/AppTheme';
import Gap from '../../components/Gap';
import VectorIcon from '../../assets/vectorIcons';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/Routeame';
import {useDispatch} from 'react-redux';
import {addUser, addUserDetail, statusId} from '../../redux/reducer/LoginSlice';
import {SocialLogin} from '../../apiServices/ApiHelper';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '675621109269-5ie1qeiig6ljb2hp3ej4492b2l6t9dji.apps.googleusercontent.com',
      //   offlineAccess: true,
    });
  }, []);

  const navigation = useNavigation();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      SocialLoginApi(userInfo?.user.email, userInfo?.user.givenName);
      dispatch(addUserDetail(userInfo?.user));

      console.log(userInfo);
    } catch (error) {
      console.error('Google Sign-In error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else if (error.code === statusCodes.DEVELOPER_ERROR) {
        console.log('Developer error: Check your configuration and try again');
      } else {
        console.log('Some other error happened', error);
      }
    }
  };

  const SocialLoginApi = async (email, firstName) => {
    console.log('abcdwrd');
    const body = {
      firstName: firstName,
      lastName: '',
      phone: '',
      email: email,
      profileImgUrl: '',
      gender: '',
    };
    const url = SocialLogin();
    console.log('123socialLogin', url, body);
    try {
      const response = await axios.post(url, body);
      console.log('SocialLoginApi response', response.data);
      if (response.data.status) {
        dispatch(statusId(response.data?.object?.statusId));
        if (response.data?.object.statusId == 1) {
          dispatch(
            addUser({
              idToken: response.data?.object?.idToken,
              refreshToken: response.data?.object?.refreshToken,
            }),
          );
          navigation.navigate(RouteName.HOME_SCREEN);
        } else {
          dispatch(
            addUser({
              idToken: response.data?.object?.idToken,
              refreshToken: response.data?.object?.refreshToken,
            }),
          );
          navigation.navigate(RouteName.PREFERED_PRODUCT);
        }
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(39,75,205,1)'}}>
      <StatusBar backgroundColor={'rgba(39,75,205,1)'} />
      <View style={{flex: 1, paddingHorizontal: 22, paddingVertical: 42}}>
        <Text style={{color: 'white', fontSize: 54, fontWeight: '600'}}>
          FASTO
        </Text>
        <Gap m3 />
        <Text style={{width: 180, fontSize: 24, color: 'white'}}>
          Connect to your Local Vendors
        </Text>
        <Gap m8 />
        <Gap m8 />
        <Gap m8 />
        <TextInput
          placeholder="Enter Phone Number"
          placeholderTextColor={'black'}
          maxLength={10}
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            paddingHorizontal: 20,
            color: 'black',
          }}
        />
        <Gap m7 />
        <TouchableOpacity
          style={{
            height: 46,
            backgroundColor: 'rgb(101,153,233)',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '400', fontSize: 16}}>
            Submit
          </Text>
        </TouchableOpacity>
        <Gap m9 />
        <Gap m3 />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              borderTopWidth: 1,

              borderColor: 'white',
              borderStyle: 'dashed',
              flex: 1,
            }}
          />
          <Text style={{color: 'white', fontSize: 11}}> OR </Text>
          <View
            style={{
              borderTopWidth: 1,

              borderColor: 'white',
              borderStyle: 'dashed',
              flex: 1,
            }}
          />
        </View>
        <Gap m9 />
        <Gap m3 />
        <TouchableOpacity
          onPress={() => signIn()}
          style={{
            height: 46,
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VectorIcon name="google" material-community-icon size={20} />
          <Gap row m4 />
          <Text style={{color: 'black', fontWeight: '400', fontSize: 14}}>
            Continue with google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});

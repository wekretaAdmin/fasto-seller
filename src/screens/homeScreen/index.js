/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import VectorIcon from '../../assets/vectorIcons';
import AppIcon from '../../assets/images';
import Gap from '../../components/Gap';
import Apptheme from '../../assets/theme/AppTheme';
import {Modal, Portal} from 'react-native-paper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/Routeame';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../../redux/reducer/LoginSlice';
import AxiosInstance from '../../apiServices/AxiosInstance';
import {
  PostLinkQr,
  deleteSupplier,
  linkQrList,
} from '../../apiServices/ApiHelper';
import {addStoreUuid} from '../../redux/reducer/StoreUuid';
import {emptyProductData} from '../../redux/reducer/ProductsSlice';

const HomeScreen = () => {
  const [connectOption, setConnectOption] = useState(false);
  // const sellerData = useSelector(state => state.sellerReducer?.uuid);
  const [sellerData, setSellerData] = useState([1]);
  const [deleteMethod, setDeleteMethod] = useState(false);
  console.log('sellerData', sellerData);
  const isFocused = useIsFocused();

  useEffect(() => {
    supplierQrList();
    dispatch(emptyProductData());
  }, [isFocused, deleteMethod]);

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert(
  //       'Exit App',
  //       'Do you want to exit?',
  //       [
  //         {text: 'Cancel', onPress: () => null, style: 'cancel'},
  //         {text: 'OK', onPress: () => BackHandler.exitApp()},
  //       ],
  //       {cancelable: false},
  //     );
  //     return true; // Prevent default behavior (exit app)
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const navigation = useNavigation();
  const renderItem = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            height: 74,
            aspectRatio: 1,
            borderRadius: 360,
            backgroundColor: Apptheme.color.containerBackground,
          }}></View>
        <Text style={{color: 'black', fontSize: 12}}>kirana Store</Text>
      </View>
    );
  };

  const actionItem = () => {
    return (
      <View
        style={{
          height: 70,
          aspectRatio: 1,
          borderRadius: 10,
          backgroundColor: Apptheme.color.imageBackground,
          marginRight: 20,
        }}></View>
    );
  };

  const supplierQrList = async () => {
    console.log('abcdwrd');
    const url = linkQrList();
    console.log(url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('supplierList response', response.data);
      if (response.data.status) {
        if (response.data.object == null) {
          setSellerData([1]);
        } else {
          setSellerData([1, ...response.data.object]);
        }
      }
    } catch (err) {
      console.log('@ supplierList error', err);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to scan QR codes.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        navigation.navigate(RouteName.QR_SCANNER);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const supplierList = ({item}) => {
    console.log('item?.uuid', item?.uuid);

    const supplierDelete = async uuid => {
      console.log('abcdwrd', uuid);
      const body = {
        uuid,
      };
      const url = deleteSupplier();
      console.log(url);
      try {
        const response = await AxiosInstance.delete(url, {data: body});
        console.log('supplierDelete response', response.data);
        if (response.data.status) {
          setDeleteMethod(true);
        }
      } catch (err) {
        console.log('@ supplierList error', err);
      }
    };

    const deleteFunction = uuid => {
      Alert.alert(
        'Delete',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              supplierDelete(uuid);
              console.log('OK Pressed');
            },
          },
        ],
        {cancelable: false},
      );
    };

    return (
      <>
        {item == 1 ? (
          <TouchableOpacity
            onPress={() => requestCameraPermission()}
            style={{
              height: 75,
              aspectRatio: 1,
              borderRadius: 360,
              borderWidth: 1,
              borderColor: Apptheme.color.boxOutline,
              borderStyle: 'dashed',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 18,
            }}>
            <VectorIcon
              name="plus"
              material-community-icon
              size={28}
              color={Apptheme.color.boxOutline}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              alignItems: 'center',

              justifyContent: 'center',
              marginRight: 18,
            }}>
            <TouchableOpacity
              onPress={() => {
                // setConnectOption(true)
                dispatch(addStoreUuid(item?.uuid));
                if (item?.isActiveChat) {
                  navigation.navigate(RouteName.CHAT_SCREEN);
                } else {
                  navigation.navigate(RouteName.SUGGESTED_PRODUCT);
                }
              }}
              onLongPress={() => {
                setDeleteMethod(false);
                deleteFunction(item?.uuid);
              }}
              style={{
                height: 72,
                aspectRatio: 1,
                borderRadius: 360,

                borderStyle: 'dashed',
                backgroundColor: Apptheme.color.red,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: item?.logoUrl}}
                style={{height: '100%', width: '100%', borderRadius: 360}}
              />
            </TouchableOpacity>
            <Text style={{color: 'black', fontSize: 12}}>
              {item?.firstName}
            </Text>
          </View>
        )}
      </>
    );
  };

  const dispatch = useDispatch();

  const signOut = () => {
    try {
      // GoogleSignin.hasPlayServices();
      GoogleSignin.signOut();
      dispatch(addUser(''));
      navigation.navigate(RouteName.LOGIN_SCREEN);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: Apptheme.color.background,
        flex: 1,
      }}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 18,
          paddingHorizontal: 22,
        }}>
        <Text style={{color: 'black', fontSize: 24, fontWeight: '500'}}>
          WorkShop Detail
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => signOut()}>
            <VectorIcon name="logout" material-icon size={24} />
          </TouchableOpacity>
          <Gap row m7 />
          <Image
            source={AppIcon.pngImages.user}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />
        </View>
      </View>
      <Gap m5 />
      <View>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7]}
          horizontal
          renderItem={renderItem}
          style={{paddingLeft: 22}}
          contentContainerStyle={{paddingRight: 38}}
          ItemSeparatorComponent={<Gap row m5 />}
        />
      </View>
      <Gap m8 />
      <Gap m8 />
      <View>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={actionItem}
          numColumns={4}
          style={{paddingHorizontal: 22}}
          contentContainerStyle={{justifyContent: 'space-between'}}
          ItemSeparatorComponent={<Gap m6 />}
        />
      </View>
      <Gap m9 />
      <Text
        style={{
          color: 'black',
          paddingLeft: 22,
          fontWeight: '600',
          fontSize: 16,
        }}>
        Supplier History
      </Text>
      <Gap m6 />
      <View style={{paddingHorizontal: 22, flexDirection: 'row'}}>
        {/* <View
          style={{
            height: 70,
            aspectRatio: 1,
            borderRadius: 360,
            borderWidth: 1,
            borderColor: Apptheme.color.boxOutline,
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VectorIcon
            name="plus"
            material-community-icon
            size={28}
            color={Apptheme.color.boxOutline}
          />
        </View> */}
        <FlatList
          data={sellerData}
          renderItem={supplierList}
          numColumns={4}
          // style={{paddingHorizontal: 22}}
          contentContainerStyle={{justifyContent: 'space-between'}}
          ItemSeparatorComponent={<Gap m6 />}
        />
      </View>

      <Portal>
        <Modal
          visible={connectOption}
          onDismiss={() => setConnectOption(false)}
          style={{justifyContent: 'flex-end'}}>
          <View
            style={{
              height: 80,
              width: '100%',
              // backgroundColor: 'yellow',
              position: 'absolute',
              bottom: 25,
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 65,
                width: '37%',
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 38,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <VectorIcon name="video" material-community-icon size={28} />
              <Gap row m8 />
              <Gap row m5 />
              <VectorIcon name="call" material-icon size={24} />
            </View>
            <Gap row m5 />
            <TouchableOpacity
              onPress={() => {
                setConnectOption(false);
                navigation.navigate(RouteName.SUGGESTED_PRODUCT);
              }}
              style={{
                height: 65,
                width: 65,
                elevation: 5,
                backgroundColor: 'white',
                borderRadius: 360,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VectorIcon name="chat" material-icon size={24} />
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

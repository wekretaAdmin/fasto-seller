/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import VectorIcon from '../../assets/vectorIcons';
import Gap from '../../components/Gap';
import AppContainer from '../../navigation/AppContainer';
import Apptheme from '../../assets/theme/AppTheme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductToCart,
  addProducts,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/reducer/ProductsSlice';
import RouteName from '../../navigation/Routeame';
import {GetPrefernces} from '../../apiServices/ApiHelper';
import AxiosInstance from '../../apiServices/AxiosInstance';

const AddMoreProducts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const UpdateList = useSelector(store => store.productReducer?.products);
  console.log('UpdateList', UpdateList);
  const [loading, setLoading] = useState(true);
  const [preferncesData, setPreferncesData] = useState();
  const groceryItems = [
    {
      id: 1,
      quantity: 0,
      productName: 'Apple',
      images: 'https://example.com/images/apple.jpg',
    },
    {
      id: 2,
      quantity: 0,
      productName: 'Banana',
      images: 'https://example.com/images/banana.jpg',
    },
    {
      id: 3,
      quantity: 0,
      productName: 'Carrot',
      images: 'https://example.com/images/carrot.jpg',
    },
    {
      id: 4,
      quantity: 0,
      productName: 'Tomato',
      images: 'https://example.com/images/tomato.jpg',
    },
    {
      id: 5,
      quantity: 0,
      productName: 'Potato',
      images: 'https://example.com/images/potato.jpg',
    },
    {
      id: 6,
      quantity: 0,
      productName: 'Onion',
      images: 'https://example.com/images/onion.jpg',
    },
    {
      id: 7,
      quantity: 0,
      productName: 'Orange',
      images: 'https://example.com/images/orange.jpg',
    },
    {
      id: 8,
      quantity: 0,
      productName: 'Milk',
      images: 'https://example.com/images/milk.jpg',
    },
    {
      id: 9,
      quantity: 0,
      productName: 'Bread',
      images: 'https://example.com/images/bread.jpg',
    },
    {
      id: 10,
      quantity: 0,
      productName: 'Eggs',
      images: 'https://example.com/images/eggs.jpg',
    },
    {
      id: 11,
      quantity: 0,
      productName: 'Chicken',
      images: 'https://example.com/images/chicken.jpg',
    },
    {
      id: 12,
      quantity: 0,
      productName: 'Fish',
      images: 'https://example.com/images/fish.jpg',
    },
    {
      id: 13,
      quantity: 0,
      productName: 'Butter',
      images: 'https://example.com/images/butter.jpg',
    },
    {
      id: 14,
      quantity: 0,
      productName: 'Yogurt',
      images: 'https://example.com/images/yogurt.jpg',
    },
    {
      id: 15,
      quantity: 0,
      productName: 'Cheese',
      images: 'https://example.com/images/cheese.jpg',
    },
    {
      id: 16,
      quantity: 0,
      productName: 'Salt',
      images: 'https://example.com/images/salt.jpg',
    },
    {
      id: 17,
      quantity: 0,
      productName: 'Pepper',
      images: 'https://example.com/images/pepper.jpg',
    },
    {
      id: 18,
      quantity: 0,
      productName: 'Sugar',
      images: 'https://example.com/images/sugar.jpg',
    },
    {
      id: 19,
      quantity: 0,
      productName: 'Flour',
      images: 'https://example.com/images/flour.jpg',
    },
    {
      id: 20,
      quantity: 0,
      productName: 'Rice',
      images: 'https://example.com/images/rice.jpg',
    },
  ];

  useEffect(() => {
    GetPrefernceList();
  }, []);

  useEffect(() => {
    const backAction = () => {
      // Navigate to a particular image or any other screen
      navigation.navigate(RouteName.CART_SCREEN);
      return true; // Prevent default behavior (go back to previous screen)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  };

  const GetPrefernceList = async () => {
    console.log('abcdwrd');
    const url = GetPrefernces();
    console.log(url);
    setLoading(true);
    try {
      const response = await AxiosInstance.get(url);
      console.log('GetPrefernceList response', response.data);
      if (response.data.status) {
        setPreferncesData(response.data?.object.productList);
      }
      setLoading(false);
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
      setLoading(false);
    }
  };

  const cart = item => {
    const transformedItem = {
      id: item?.id,
      productImage: item?.mediaUrl,
      productName: item?.name,
    };

    dispatch(addProductToCart(transformedItem));
  };

  console.log('preferncesData', preferncesData);

  const renderItem = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            height: 50,
            aspectRatio: 1,
            borderRadius: 360,
            backgroundColor: Apptheme.color.imageBackground,
          }}
        />
        <Gap ms />
        <Text style={{color: 'black', fontSize: 12}}>Atta</Text>
      </View>
    );
  };

  const productList = ({item}) => {
    const productInCart = UpdateList.find(elem => elem.id === item.id);
    return (
      <View
        style={{
          height: 250,
          backgroundColor: 'white',
          width: '47%',
          margin: 5,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <View
          style={{
            height: 135,
            backgroundColor: Apptheme.color.boxOutline,
          }}>
          <Image
            source={{uri: item?.mediaUrl}}
            style={{height: '100%', width: '100%'}}
          />
        </View>
        <View style={{flex: 1, padding: 7}}>
          <Text
            style={{
              color: 'white',
              fontSize: 8,
              padding: 3,
              backgroundColor: Apptheme.color.boxOutline,
              maxWidth: 40,
              borderRadius: 8,
            }}>
            19 MINS
          </Text>
          <Text style={{color: 'black'}}>{truncateText(item?.name, 20)}</Text>
          <Text style={{color: 'gray', fontSize: 11}}>10 kg</Text>
          <Gap m3 />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* <Text style={{color: 'black', fontSize: 12}}>₹484</Text> */}
            {UpdateList?.find(elem => elem?.id == item?.id) ? (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Apptheme.color.boxOutline,
                  borderRadius: 8,
                  paddingHorizontal: 7,
                  paddingVertical: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => dispatch(decreaseQuantity({id: item.id}))}>
                  <VectorIcon name="minus" material-community-icon size={16} />
                </TouchableOpacity>
                <Gap row m2 />
                <Text style={{color: 'black'}}>{productInCart?.quantity}</Text>
                <Gap row m2 />

                <TouchableOpacity
                  onPress={() => dispatch(increaseQuantity({id: item.id}))}>
                  <VectorIcon name="plus" material-community-icon size={16} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => cart(item)}
                style={{
                  borderColor: Apptheme.color.green,
                  borderWidth: 1,
                  borderRadius: 7,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                }}>
                <Text style={{color: 'black', fontSize: 10}}>ADD</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'white'} />
      <View
        style={{
          height: 55,
          //   backgroundColor: 'yellow',
          paddingHorizontal: 22,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteName.CART_SCREEN)}>
          <VectorIcon name="arrow-back-ios" material-icon size={20} />
        </TouchableOpacity>
        <Text style={{color: 'black'}}>AddMoreProducts</Text>
        <VectorIcon name="search" material-icon size={20} />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 2, 2, 3, 4, 5, 6]}
            renderItem={renderItem}
            ItemSeparatorComponent={<Gap m6 />}
          />
        </View>
        <View
          style={{
            flex: 8,
            backgroundColor: Apptheme.color.imageBackground,
            padding: 5,
          }}>
          <View style={{height: 50, backgroundColor: 'yellow'}}></View>
          <Gap m2 />
          {loading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size={30} />
            </View>
          ) : (
            <FlatList
              data={preferncesData}
              renderItem={productList}
              numColumns={2}
              ItemSeparatorComponent={<Gap ms />}
            />
          )}
        </View>
      </View>
      {UpdateList.length > 0 ? (
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteName.CART_SCREEN)}
          style={{
            height: 70,
            aspectRatio: 1,
            borderRadius: 360,
            backgroundColor: 'red',
            position: 'absolute',
            bottom: 20,
            right: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}>{UpdateList?.length}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default AddMoreProducts;

const styles = StyleSheet.create({});

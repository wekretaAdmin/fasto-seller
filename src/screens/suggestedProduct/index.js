/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Apptheme from '../../assets/theme/AppTheme';
import Gap from '../../components/Gap';
import VectorIcon from '../../assets/vectorIcons';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/Routeame';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductToCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/reducer/ProductsSlice';
import AxiosInstance from '../../apiServices/AxiosInstance';
import {SuggestedProductList} from '../../apiServices/ApiHelper';

const SuggestedProduct = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const UpdateList = useSelector(store => store.productReducer?.products);
  console.log('UpdateList', UpdateList);
  const [suggestedItem, setSuggestedItem] = useState();
  const [loading, setLoading] = useState(true);

  const groceryItems = [
    {
      id: 21,
      quantity: 0,
      productName: 'Apple',
      images: 'https://example.com/images/apple.jpg',
    },
    {
      id: 22,
      quantity: 0,
      productName: 'Banana',
      images: 'https://example.com/images/banana.jpg',
    },
    {
      id: 23,
      quantity: 0,
      productName: 'Carrot',
      images: 'https://example.com/images/carrot.jpg',
    },
    {
      id: 24,
      quantity: 0,
      productName: 'Tomato',
      images: 'https://example.com/images/tomato.jpg',
    },
    {
      id: 25,
      quantity: 0,
      productName: 'Potato',
      images: 'https://example.com/images/potato.jpg',
    },
    {
      id: 26,
      quantity: 0,
      productName: 'Onion',
      images: 'https://example.com/images/onion.jpg',
    },
    {
      id: 27,
      quantity: 0,
      productName: 'Orange',
      images: 'https://example.com/images/orange.jpg',
    },
    {
      id: 28,
      quantity: 0,
      productName: 'Milk',
      images: 'https://example.com/images/milk.jpg',
    },
    {
      id: 29,
      quantity: 0,
      productName: 'Bread',
      images: 'https://example.com/images/bread.jpg',
    },
    {
      id: 30,
      quantity: 0,
      productName: 'Eggs',
      images: 'https://example.com/images/eggs.jpg',
    },
  ];

  useEffect(() => {
    SuggestedProductApi();
  }, []);

  const SuggestedProductApi = async () => {
    console.log('abcdwrd');
    const url = SuggestedProductList();
    console.log('url1234', url);
    setLoading(true);
    try {
      const response = await AxiosInstance.get(url);
      console.log('SuggestedProductApi response', response.data);
      if (response.data.status) {
        setSuggestedItem(response.data?.object);
      }
      setLoading(false);
    } catch (err) {
      console.log('@ SuggestedProductApi error', err);
      setLoading(false);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  };

  const RenderItem = ({item}) => {
    const productInCart = UpdateList.find(elem => elem.id === item?.id);
    const [checked, setChecked] = useState(false);
    return (
      <TouchableOpacity
        onPress={() => dispatch(addProductToCart(item))}
        style={{
          backgroundColor: 'rgba(39,75,205,1)',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        {UpdateList?.find(elem => elem?.id == item?.id) ? (
          <View
            style={{
              flex: -1,
              backgroundColor: 'rgb(101,153,233)',
              height: 70,
              width: '50%',
              position: 'absolute',
            }}></View>
        ) : null}
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}>
          <Checkbox
            status={
              UpdateList?.find(elem => elem?.id == item?.id)
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => {
              dispatch(addProductToCart(item));
              setChecked(!checked);
            }}
            color="white"
          />
          <Gap row m4 />
          <Text
            onPress={() => {
              dispatch(addProductToCart(item));
              setChecked(!checked);
            }}
            style={{color: 'white'}}>
            {truncateText(item?.productName, 20)}
          </Text>

          {UpdateList?.find(elem => elem?.id == item?.id) ? (
            <View
              style={{
                borderWidth: 1,
                borderColor: Apptheme.color.boxOutline,
                position: 'absolute',
                right: 10,
                borderRadius: 8,
                paddingHorizontal: 7,
                paddingVertical: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                hitSlop={20}
                onPress={() => dispatch(decreaseQuantity({id: item.id}))}>
                <VectorIcon
                  name="minus"
                  material-community-icon
                  size={16}
                  color={Apptheme.color.red}
                />
              </TouchableOpacity>
              <Gap row m2 />
              <Text style={{color: 'White'}}>{productInCart?.quantity}</Text>
              <Gap row m2 />

              <TouchableOpacity
                hitSlop={20}
                onPress={() => dispatch(increaseQuantity({id: item.id}))}>
                <VectorIcon
                  name="plus"
                  material-community-icon
                  size={16}
                  color={Apptheme.color.green}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(53,92,233,1)',
        padding: 22,
        paddingHorizontal: 26,
      }}>
      <StatusBar backgroundColor="rgba(53,92,233,1)" />
      <View style={{flex: 1}}>
        <View>
          <Text style={{fontSize: 24, fontWeight: '400', color: 'white'}}>
            Supplier Name
          </Text>
          <Gap m9 />
          {/* <Gap m2 /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Progress</Text>
            <Text style={{color: 'white'}}>1 of 2</Text>
          </View>
          <Gap m2 />
          <View
            style={{
              height: 3,
              width: '100%',
              backgroundColor: 'rgba(39,75,205,1)',
              borderRadius: 10,
            }}>
            <View
              style={{
                height: 3,
                width: '50%',
                backgroundColor: 'white',
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        <Gap m9 />
        <View>
          <Text style={{fontSize: 38, color: 'white'}}>
            What whould you like to order?
          </Text>
          <Gap m8 />
        </View>
        <View style={{flex: 1}}>
          {loading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size={20} />
            </View>
          ) : (
            <FlatList
              data={suggestedItem}
              renderItem={({item}) => <RenderItem item={item} />}
              ItemSeparatorComponent={<Gap m4 />}
            />
          )}
        </View>
        <Gap m8 />
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteName.ADD_MORE_PRODUCTS)}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'rgb(101,153,233)',
            width: 160,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>+ More Products</Text>
        </TouchableOpacity>
        <Gap m8 />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 55,
            aspectRatio: 1,
            backgroundColor: 'rgba(39,75,205,1)',
            borderRadius: 360,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VectorIcon name="arrow-back" material-icon size={22} color="white" />
        </TouchableOpacity>
        <Gap row m8 />
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteName.CART_SCREEN)}
          disabled={UpdateList?.length > 0 ? false : true}
          style={{
            height: 55,
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 26,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '500', fontSize: 14}}>
            Cart {UpdateList?.length}
          </Text>
        </TouchableOpacity>
      </View>
      <Gap m1 />
    </View>
  );
};

export default SuggestedProduct;

const styles = StyleSheet.create({});

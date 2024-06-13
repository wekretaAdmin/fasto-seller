/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Gap from '../../components/Gap';
import Apptheme from '../../assets/theme/AppTheme';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/Routeame';
import {useDispatch} from 'react-redux';
import {CreatePrefernce, GetPrefernces} from '../../apiServices/ApiHelper';
import axios from 'axios';
import AxiosInstance from '../../apiServices/AxiosInstance';
import VectorIcon from '../../assets/vectorIcons';

const PreferedProduct = () => {
  const navigation = useNavigation();

  const [select, setSelect] = useState([]);
  const [preferncesData, setPreferncesData] = useState();

  console.log('index.....', select);

  useEffect(() => {
    GetPrefernceList();
  }, []);

  const postPrefernces = async () => {
    const url = CreatePrefernce();
    console.log(url);

    try {
      const body = {
        productIds: select,
      };

      console.log('AddCart', body);
      const response = await AxiosInstance.post(url, body);
      console.log('productDetail response', response.data);
      if (response.data.status) {
        console.log('postPrefernces');
        navigation.replace(RouteName.HOME_SCREEN);
      } else {
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const GetPrefernceList = async () => {
    console.log('abcdwrd');
    const url = GetPrefernces();
    console.log(url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('HomePageCategoryListing response', response.data);
      if (response.data.status) {
        setPreferncesData(response.data?.object.productList);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  console.log('preferncesData', preferncesData);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  };

  const RenderItem = ({item, index}) => {
    const selectFunction = () => {
      if (select.includes(item?.id)) {
        console.log('hello', item?.id);

        setSelect(select.filter(elem => elem !== item?.id));
      } else {
        setSelect([...select, item?.id]);
      }
    };

    return (
      <View
        style={{
          height: 140,
          width: '33%',

          marginRight: 1,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={selectFunction}
          style={{
            height: 100,
            aspectRatio: 1,
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
          }}>
          <Image
            source={{uri: item?.mediaUrl}}
            style={{height: '100%', width: '100%', borderRadius: 8}}
          />
          {select.includes(item?.id) ? (
            <TouchableOpacity
              onPress={selectFunction}
              style={{
                height: 100,
                aspectRatio: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: select.includes(item?.id)
                  ? 'rgba(0,0,0,0.5)'
                  : '#f5f5f5',
                // backgroundColor: select.includes(index) ? 'red' : '#f5f5f5',
                borderRadius: 8,
              }}>
              <VectorIcon name="check" material-icon color="white" size={30} />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
        <Gap m3 />
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            width: '90%',
            // backgroundColor: 'yellow',
            textAlign: 'center',
          }}>
          {truncateText(item?.name, 20)}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 22,
        paddingTop: 42,
      }}>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'black', fontSize: 20}}>
          What are you interested in?
        </Text>
        <Gap m3 />
        <Text style={{color: 'black', fontSize: 13}}>
          Choose your top 5 products to streamline your order.
        </Text>
        <Gap m9 />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={preferncesData}
          numColumns={3}
          style={{flex: 1}}
          ItemSeparatorComponent={<Gap m1 />}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index} />
          )}
          ListFooterComponent={
            <>
              <Gap m9 />
              <Gap m9 />
              <Gap m9 />
              <Gap m9 />
            </>
          }
        />
      </View>
      <TouchableOpacity
        disabled={select.length >= 3 ? false : true}
        // onPress={ () => navigation.navigate(RouteName.HOME_SCREEN)}
        onPress={() => {
          postPrefernces();
        }}
        style={{
          height: 50,
          width: '100%',
          backgroundColor: select.length >= 3 ? Apptheme.color.blue : '#d5d5d5',
          position: 'absolute',
          bottom: 25,
          borderRadius: 20,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PreferedProduct;

const styles = StyleSheet.create({});

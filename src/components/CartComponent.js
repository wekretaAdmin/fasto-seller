import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Gap from './Gap';
import Apptheme from '../assets/theme/AppTheme';
import VectorIcon from '../assets/vectorIcons';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Button from './Button';
import RouteName from '../navigation/Routeame';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import {fetchAddress} from '../apiServices/ApiHelper';
import AxiosInstance from '../apiServices/AxiosInstance';

const CartComponent = ({setVisible, navigation, bottomSheetModalRef}) => {
  const [shippingModal, setShippingModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [checked, setChecked] = React.useState();
  const [addressData, setAddressData] = React.useState();

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    const url = fetchAddress();
    console.log(url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('getAddress response', response.data);
      if (response.data.status) {
        setAddressData(response.data.object);
      }
    } catch (err) {
      console.log('@ getAddress error', err);
    }
  };

  const showAddress = ({item}) => {
    return (
      <View>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
          {item?.customerName}
        </Text>
        <Text style={{color: 'black'}}>
          {item?.addressLine1},{item?.city},{item?.pincode}
        </Text>
      </View>
    );
  };

  return (
    <>
      {shippingModal ? (
        <View style={{paddingHorizontal: 18}}>
          <TouchableOpacity
            onPress={() => setShippingModal(false)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <VectorIcon name="arrow-back" material-icon size={20} />
            <Gap row m4 />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Shipping
            </Text>
          </TouchableOpacity>
          <Gap m5 />
          <FlatList
            data={addressData}
            renderItem={showAddress}
            ItemSeparatorComponent={
              <>
                <Gap m4 />
                <View
                  style={{
                    height: 1,
                    backgroundColor: Apptheme.color.boxOutline,
                  }}
                />
                <Gap m4 />
              </>
            }
          />
          <Gap m5 />
          <Button
            tittle={'Add Address'}
            backgroundColor="black"
            onPress={() => {
              bottomSheetModalRef.current.close();
              navigation.navigate(RouteName.ADDRESS);
            }}
          />
        </View>
      ) : paymentModal ? (
        <View style={{paddingHorizontal: 18}}>
          <Gap m3 />
          <TouchableOpacity
            onPress={() => setPaymentModal(false)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <VectorIcon name="arrow-back" material-icon size={20} />
            <Gap row m4 />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Choose Payment Mode
            </Text>
          </TouchableOpacity>

          <Gap m7 />
          <TouchableOpacity
            onPress={() => {
              setChecked('COD');
              setPaymentModal(false);
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox status={checked == 'COD' ? 'checked' : 'unchecked'} />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              COD
            </Text>
          </TouchableOpacity>
          <Gap m3 />
          <TouchableOpacity
            onPress={() => {
              setChecked('ONLINE');
              setPaymentModal(false);
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox status={checked == 'ONLINE' ? 'checked' : 'unchecked'} />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              ONLINE
            </Text>
          </TouchableOpacity>
          <Gap m9 />
          <Gap m9 />
        </View>
      ) : (
        <View style={{paddingHorizontal: 18}}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
            CheckOut
          </Text>
          <Gap m9 />
          <View
            style={{
              height: 1,
              backgroundColor: Apptheme.color.containerBackground,
            }}
          />
          <TouchableOpacity
            onPress={() => setShippingModal(true)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 50,
              alignItems: 'center',
            }}>
            <Text style={{color: Apptheme.color.subText}}>
              SHIPPING ADDRESS
            </Text>
            <VectorIcon name="navigate-next" material-icon size={24} />
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: Apptheme.color.containerBackground,
            }}
          />

          <TouchableOpacity
            onPress={() => setPaymentModal(true)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 50,
              alignItems: 'center',
            }}>
            <Text style={{color: Apptheme.color.subText}}>Payment Method</Text>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 14}}>{checked}</Text>
              <Gap row m6 />
              <VectorIcon name="navigate-next" material-icon size={24} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: Apptheme.color.containerBackground,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 50,
              alignItems: 'center',
            }}>
            <Text style={{color: Apptheme.color.subText}}>Total</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>₹ 2961</Text>
              <Gap row m4 />
              <VectorIcon name="navigate-next" material-icon size={24} />
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: Apptheme.color.containerBackground,
            }}
          />
          <Gap m9 />
          <TouchableOpacity
            // onPress={() => setVisible(true)}
            onPress={() => setVisible(true)}
            style={{
              height: 54,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>CheckOut</Text>
          </TouchableOpacity>
          <Gap m7 />
        </View>
      )}
    </>
  );
};

export default CartComponent;

const styles = StyleSheet.create({});

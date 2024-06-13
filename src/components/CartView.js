import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Gap from './Gap';
import Apptheme from '../assets/theme/AppTheme';
import {useSelector} from 'react-redux';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const CartView = ({UpdateList}) => {
  console.log('updateList123', UpdateList);

  const renderItem = ({item}) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: 60,
              aspectRatio: 1,
              backgroundColor: Apptheme.color.boxOutline,
              borderRadius: 8,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: item?.productImage}}
              style={{height: '100%', width: '100%'}}
            />
          </View>

          <Gap row m4 />
          <Text style={{color: 'black', alignSelf: 'center', fontSize: 15}}>
            {item?.productName}
          </Text>
        </View>
        <View>
          {/* <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
            ₹ 125.00
          </Text> */}
          <Text style={{fontSize: 14, color: 'black'}}>
            Quantity {item?.quantity}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{height: 500, paddingHorizontal: 18, paddingVertical: 10}}>
      <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
        Your sent cart
      </Text>
      <Gap m8 />
      <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
        {UpdateList?.length} Item
      </Text>
      <Gap m6 />
      <FlatList
        data={UpdateList}
        renderItem={renderItem}
        ItemSeparatorComponent={<Gap m4 />}
      />

      <Gap m6 />
      <View
        style={{height: 2, backgroundColor: Apptheme.color.containerBackground}}
      />
      <Gap m4 />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* <Text style={{color: 'black', fontSize: 14}}>SubTotal</Text>
        <Text style={{color: 'black', fontSize: 14}}>₹ 125.00 (estimated)</Text> */}
      </View>
      <Gap m2 />
      <Text style={{color: Apptheme.color.subText, fontSize: 13}}>
        3 june 2024 at 5:00 pm
      </Text>
    </View>
  );
};

export default CartView;

const styles = StyleSheet.create({});

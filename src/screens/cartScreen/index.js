/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Gap from '../../components/Gap';
import Apptheme from '../../assets/theme/AppTheme';
import {
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/reducer/ProductsSlice';
import VectorIcon from '../../assets/vectorIcons';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import CartComponent from '../../components/CartComponent';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import RouteName from '../../navigation/Routeame';
import ChatScreen from '../chatScreen';

const CartScreen = () => {
  const UpdateList = useSelector(store => store.productReducer?.products);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        bottomSheetModalRef.current?.close();
        setVisible(false);
        navigation.navigate(RouteName.CHAT_SCREEN);
      }, 2000);
    }
  }, [visible]);

  const BackDrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} opacity={1} disappearsOnIndex={-1} />
    ),
    [],
  );
  const handleContentSizeChange = (width, height) => {};

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  };

  const renderItem = ({item}) => {
    const productInCart = UpdateList.find(elem => elem.id === item.id);

    return (
      <View
        style={{
          height: 80,
          backgroundColor: Apptheme.color.containerBackground,
          borderRadius: 8,
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View
          style={{
            height: 60,
            aspectRatio: 1,
            backgroundColor: Apptheme.color.lightColor,
            borderRadius: 8,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item?.productImage ? (
            <Image
              source={{uri: item?.productImage}}
              style={{height: '100%', width: '100%'}}
            />
          ) : (
            <VectorIcon
              name="hide-image"
              material-icon
              size={26}
              color="black"
            />
          )}
        </View>
        <Gap row m4 />
        <View>
          <Text style={{color: 'black'}}>
            {truncateText(item?.productName, 30)}
          </Text>
          <Gap m4 />
          <View
            style={{
              borderWidth: 1,
              borderColor: Apptheme.color.boxOutline,
              borderRadius: 4,
              width: '100%',
              paddingHorizontal: 6,
              maxWidth: 80,
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
        </View>
      </View>
    );
  };

  if (UpdateList.length == 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(53,92,233,1)',
          padding: 22,
          paddingHorizontal: 26,
        }}>
        <StatusBar backgroundColor={'rgba(53,92,233,1)'} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <VectorIcon
              name="arrow-back-ios"
              material-icon
              size={22}
              color="white"
            />
          </TouchableOpacity>
          <Gap row m2 />
          <Text style={{fontSize: 26, fontWeight: '400', color: 'white'}}>
            Shopping Bag{' '}
            <Text style={{fontSize: 16}}> ({UpdateList?.length} Items) </Text>
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(53,92,233,1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 22}}>Nothing in bag</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(53,92,233,1)',
        padding: 22,
        paddingHorizontal: 26,
      }}>
      <StatusBar backgroundColor={'rgba(53,92,233,1)'} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon
            name="arrow-back-ios"
            material-icon
            size={22}
            color="white"
          />
        </TouchableOpacity>
        <Gap row m2 />
        <Text style={{fontSize: 26, fontWeight: '400', color: 'white'}}>
          Shopping Bag{' '}
          <Text style={{fontSize: 16}}> ({UpdateList?.length} Items) </Text>
        </Text>
      </View>
      <Gap m9 />
      <View style={{flex: 1}}>
        <FlatList
          data={UpdateList}
          style={{flex: 1}}
          renderItem={renderItem}
          ItemSeparatorComponent={<Gap m4 />}
        />
      </View>
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
      <TouchableOpacity
        onPress={() => bottomSheetModalRef.current?.present()}
        // onPress={() => navigation.navigate(RouteName.CHAT_SCREEN)}
        style={{
          height: 55,
          backgroundColor: Apptheme.color.imageBackground,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <Text style={{color: 'black'}}>CheckOut</Text>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        style={{backgroundColor: '#fff'}}
        index={0}
        backdropComponent={BackDrop}
        enableDynamicSizing={true}
        onDismiss={() => bottomSheetModalRef.current?.close()}
        keyboardBehavior="fillParent"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <BottomSheetView onContentSizeChange={handleContentSizeChange}>
          <CartComponent
            setVisible={setVisible}
            navigation={navigation}
            bottomSheetModalRef={bottomSheetModalRef}
          />
        </BottomSheetView>
      </BottomSheetModal>
      <Modal visible={visible} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: Apptheme.color.background,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../../assets/json/process.json')}
            autoPlay
            loop
            style={{height: 200, width: 200}}
          />
          <Text style={{color: 'black'}}>Processing your order</Text>
          <Gap m1 />
          <Text style={{width: 300, textAlign: 'center', color: 'black'}}>
            Please wait we are processing your payment. Do not close your App.
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});

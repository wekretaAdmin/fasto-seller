/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  BackHandler,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Apptheme from '../../assets/theme/AppTheme';
import VectorIcon from '../../assets/vectorIcons';
import Gap from '../../components/Gap';
import {useNavigation} from '@react-navigation/native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import CartView from '../../components/CartView';
import {Swipeable} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {emptyProductData} from '../../redux/reducer/ProductsSlice';
import RouteName from '../../navigation/Routeame';
import {initiateOrder} from '../../apiServices/ApiHelper';
import AxiosInstance from '../../apiServices/AxiosInstance';

const ChatScreen = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const [reply, setReply] = useState('');
  const UpdateList = useSelector(store => store.productReducer?.products);
  const userData = useSelector(store => store.loginReducer?.user?.userdata);
  const sellerUUId = useSelector(state => state.storeUuidReducer.storeUuid);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState();
  const [data, setData] = useState();
  const swipleRef = useRef(null);
  console.log('sellerUUId', UpdateList);
  const dispatch = useDispatch();
  console.log('userData', userData);
  const BackDrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} opacity={1} disappearsOnIndex={-1} />
    ),
    [],
  );

  useEffect(() => {
    const backAction = () => {
      // Navigate to a particular image or any other screen
      navigation.navigate(RouteName.HOME_SCREEN);
      return true; // Prevent default behavior (go back to previous screen)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const regex = /[.#$\[\]]/g;

  // // Replace the special characters with '@'
  // const result = inputString.replace(regex, '@');

  useEffect(() => {
    orderInitiate(sellerUUId);
  }, []);

  const orderInitiate = async data => {
    console.log('abcdwrd');
    const body = {
      uuid: data,
    };
    const url = initiateOrder();
    console.log(url);
    try {
      const response = await AxiosInstance.post(url, body);
      console.log('orderInitiate response', response.data);
      if (response.data.status) {
      }
    } catch (err) {
      console.log('@ orderInitiate error', err);
    }
  };

  useEffect(() => {
    const messagesRef = database().ref(
      `${userData?.email.replace(regex, '1')}-${sellerUUId}`,
    );
    // .orderByChild('timeSent');
    messagesRef.on('value', snapshot => {
      console.log('messagesData', snapshot);
      const messagesData = snapshot.val();

      if (messagesData) {
        // const messagesList = Object.keys(messagesData).map(key => ({
        //   ...messagesData[key],
        //   id: key,
        // }));
        const chatList = Object.values(messagesData).reverse();
        const _chatList = chatList.sort(sort_by_id());
        // setLastActiveUsers(_chatList);
        setMessages(_chatList.reverse());
      } else {
        setMessages([]);
      }
    });

    return () => {
      messagesRef.off('value');
    };
  }, []);

  useEffect(() => {
    if (UpdateList?.length > 0) {
      database()
        .ref(`${userData?.email.replace(regex, '1')}-${sellerUUId}`)
        .push(
          {
            text: message,
            orderData: UpdateList,

            id: Date.now(),
            // timestamp: getTimeStamp(),
            role: 'Customer',
          },
          // chatApi(),
        );
      dispatch(emptyProductData([]));
    }
  }, [UpdateList]);

  const sort_by_id = () =>
    function (elem1, elem2) {
      if (elem1.id < elem2.id) {
        return -1;
      }
      if (elem1.id > elem2.id) {
        return 1;
      }
      return 0;
    };

  const sendMessage = () => {
    if (message.trim() !== '') {
      database()
        .ref(`${userData?.email.replace(regex, '1')}-${sellerUUId}`)
        .push(
          {
            text: message,

            id: Date.now(),
            // timestamp: getTimeStamp(),
            role: 'Customer',
          },
          // chatApi(),
        );
      setMessage('');
    }
  };

  const onSwipeableWillOpen = data => {
    console.log(swipleRef.current);
    setReply(data);
    swipleRef.current?.close();
    console.log('hello1234');
  };

  const renderMessage = ({item}) => {
    console.log('renderMessage', item);

    const RenderRightActions = () => {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
          }}>
          <VectorIcon name="reply" material-icon size={20} />
        </View>
      );
    };

    if (item?.role === 'Customer') {
      if (item?.orderData) {
        return (
          <View
            style={[
              styles.messageContainer,
              {
                alignSelf: 'flex-end',
                backgroundColor: Apptheme.color.green,
              },
            ]}>
            <View
              style={{
                height: 70,
                backgroundColor: 'rgba(0,0,0,0.2)',
                width: 250,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 70,
                  aspectRatio: 1,
                  backgroundColor: Apptheme.color.boxOutline,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}>
                <Image
                  source={{uri: item?.orderData[0]?.productImage}}
                  style={{height: '100%', width: '100%'}}
                />
              </View>
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{color: 'white', fontSize: 14, fontWeight: '700'}}>
                  {item?.orderData?.length} Item
                </Text>
                <Gap m1 />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: '400',
                  }}></Text>
              </View>
            </View>
            <Text style={{fontSize: 10, color: 'white', alignSelf: 'flex-end'}}>
              12:20 PM
            </Text>
            <Gap m2 />

            <View style={{height: 1, backgroundColor: 'white'}} />
            <Gap m2 />
            <Text
              onPress={() => {
                bottomSheetModalRef.current?.present();
                setData(item?.orderData);
              }}
              style={[
                {
                  color: 'white',
                  marginRight: 16,
                  alignSelf: 'center',
                  fontWeight: '600',
                },
                styles.messageText,
              ]}>
              {/* {item.text} */}
              Wait For Prices
            </Text>
            <Gap m1 />
          </View>
        );
      }
      return (
        <Swipeable
          ref={swipleRef}
          onSwipeableWillOpen={() => {
            onSwipeableWillOpen(item?.text);
          }}
          renderRightActions={() => <RenderRightActions />}>
          <View
            style={[
              styles.messageContainer,
              {
                alignSelf: 'flex-end',
                backgroundColor: Apptheme.color.green,
              },
            ]}>
            <Text
              style={[{color: 'white', marginRight: 16}, styles.messageText]}>
              {item.text}
            </Text>
            <Gap m1 />
            <Text style={{fontSize: 10, color: 'white', alignSelf: 'flex-end'}}>
              12:20
            </Text>
          </View>
        </Swipeable>
      );
    }

    return (
      <View
        style={[
          styles.messageContainer,
          {
            alignSelf: 'flex-start',
            backgroundColor: Apptheme.color.imageBackground,
          },
        ]}>
        <Text style={[{color: 'black'}, styles.messageText]}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={Apptheme.color.background} />
      <View
        style={{
          flex: 1,
          backgroundColor: Apptheme.color.background,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 18,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}>
              <VectorIcon name="arrow-back-ios" material-icon size={18} />
            </TouchableOpacity>
            <Gap row m2 />
            <Text style={{fontSize: 20, fontWeight: '400', color: 'black'}}>
              Supplier Name
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(emptyProductData([]));
                navigation.replace(RouteName.SUGGESTED_PRODUCT);
              }}>
              <VectorIcon name="add-shopping-cart" material-icon size={18} />
            </TouchableOpacity>
            <Gap row m6 />

            <TouchableOpacity>
              <VectorIcon name="chat" material-icon size={18} />
            </TouchableOpacity>
            <Gap row m6 />

            <VectorIcon name="call" material-icon size={18} />
            <Gap row m6 />
            <VectorIcon name="video" material-community-icon size={20} />
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: Apptheme.color.boxOutline}}>
          <FlatList
            // data={[{role: 'Customer', text: 'will send money', cart: 2}]}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            inverted // to display messages from bottom to top
          />
        </View>
        {reply ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: Apptheme.color.containerBackground,
              padding: 10,
            }}>
            <View
              style={
                {
                  // height: 50,
                }
              }>
              <Text style={{color: Apptheme.color.black, fontSize: 9}}>
                Replying to yourself
              </Text>
              <Text style={{color: 'black', fontSize: 14}}>{reply}</Text>
            </View>
            <TouchableOpacity onPress={() => setReply(false)} style={{}}>
              <VectorIcon name="close" material-icon size={18} />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor={Apptheme.color.text}
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => sendMessage()}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
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
        <BottomSheetView>
          <CartView UpdateList={data} />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Apptheme.color.background,
  },
  messageContainer: {
    backgroundColor: Apptheme.color.imageBackground,
    borderRadius: 8,
    margin: 8,
    paddingHorizontal: 6,
    paddingVertical: 6,
    maxWidth: '70%',
  },
  messageText: {
    // color: Apptheme.color.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    backgroundColor: Apptheme.color.containerBackground,

    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: Apptheme.color.text,
  },
  sendButton: {
    backgroundColor: Apptheme.color.black,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  replyButton: {
    width: 80,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

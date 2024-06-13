import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useDispatch} from 'react-redux';
import SellerSlice, {addSeller} from '../../redux/reducer/SellerSlice';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/Routeame';
import {PostLinkQr} from '../../apiServices/ApiHelper';
import AxiosInstance from '../../apiServices/AxiosInstance';

const QRScanner = () => {
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    // Alert.alert('QR Code Scanned', `Type: ${type}\nData: ${data}`);
    // dispatch(addSeller(data));
    let QRcode = data.replace(/^"|"$/g, '');

    linkSupplier(QRcode);

    // Here, you can handle the QR code data as needed, e.g., fetch details from a server.
  };

  const linkSupplier = async data => {
    console.log('abcdwrd');
    const body = {
      uuid: data,
    };
    const url = PostLinkQr();
    console.log(url);
    try {
      const response = await AxiosInstance.post(url, body);
      console.log('linkSupplier response', response.data);
      if (response.data.status) {
        navigation.navigate(RouteName.HOME_SCREEN);
      }
    } catch (err) {
      console.log('@ linkSupplier error', err);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
        captureAudio={false}>
        <View style={styles.marker} />
      </RNCamera>
      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  scanButton: {
    position: 'absolute',
    bottom: 30,
    left: '25%',
    right: '25%',
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default QRScanner;

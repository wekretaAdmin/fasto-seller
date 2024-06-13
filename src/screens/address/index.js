import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Apptheme from '../../assets/theme/AppTheme';
import VectorIcon from '../../assets/vectorIcons';
import Gap from '../../components/Gap';
import InputField from '../../components/inputField';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/Routeame';
import AxiosInstance from '../../apiServices/AxiosInstance';
import {addAddress} from '../../apiServices/ApiHelper';
import {Controller, useForm} from 'react-hook-form';
const Address = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const submitAddress = async data => {
    console.log('data', data);
    const url = addAddress();

    try {
      const body = {
        addressLine1: data?.Address,
        addressLine2: '',
        city: data?.City,
        country: 'India',
        state: data?.State,
        pincode: data?.PinCode,
        addressOf: 'home',
        landmark: data?.Landmark,
        email: '',
        customerName: data?.Name,
      };

      const response = await AxiosInstance.post(url, body);
      console.log('submitAddress response', response.data);
      if (response.data.status) {
        console.log(response.data?.object);
        navigation.navigate(RouteName.CART_SCREEN);
      }
    } catch (err) {
      console.log('@ submitAddress error', err);
    }
  };

  const onSubmit = async data => {
    console.log('data', data);
    submitAddress(data);
  };

  return (
    <View
      style={{
        backgroundColor: Apptheme.color.background,
        flex: 1,
        padding: 20,
      }}>
      <StatusBar backgroundColor={Apptheme.color.background} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <VectorIcon material-icon name="arrow-back" size={20} />
        <Gap row m4 />
        <Text style={{color: Apptheme.color.black, fontSize: 20}}>Address</Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <Gap m9 />

        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="email"
                autoCapitalize="none"
              />
            )}
            name="Name"
            rules={{required: 'Name is required'}}
            defaultValue={''}
          />
          {errors.Name && (
            <Text style={{color: Apptheme.color.red, fontSize: 10}}>
              {errors.Name.message}
            </Text>
          )}
        </>
        <Gap m5 />

        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="email"
                autoCapitalize="none"
              />
            )}
            name="Address"
            rules={{required: 'Address is required'}}
            defaultValue={''}
          />
          {errors.Address && (
            <Text style={{color: Apptheme.color.red, fontSize: 10}}>
              {errors.Address.message}
            </Text>
          )}
        </>
        <Gap m5 />

        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="City"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="email"
                autoCapitalize="none"
              />
            )}
            name="City"
            rules={{required: 'City is required'}}
            defaultValue={''}
          />
          {errors.City && (
            <Text style={{color: Apptheme.color.red, fontSize: 10}}>
              {errors.City.message}
            </Text>
          )}
        </>
        <Gap m5 />

        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="State"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="email"
                autoCapitalize="none"
              />
            )}
            name="State"
            rules={{required: 'State is required'}}
            defaultValue={''}
          />
          {errors.State && (
            <Text style={{color: Apptheme.color.red, fontSize: 10}}>
              {errors.State.message}
            </Text>
          )}
        </>
        <Gap m5 />

        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="PinCode"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="phone"
                maxLength={6}
                autoCapitalize="none"
              />
            )}
            name="PinCode"
            rules={{required: 'State is required'}}
            defaultValue={''}
          />
          {errors.PinCode && (
            <Text style={{color: Apptheme.color.red, fontSize: 10}}>
              {errors.PinCode.message}
            </Text>
          )}
        </>
        <Gap m5 />

        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="Phone"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="phone"
                maxLength={10}
                autoCapitalize="none"
              />
            )}
            name="Phone"
            rules={{required: 'State is required'}}
            defaultValue={''}
          />
          {errors.Phone && (
            <Text style={{color: Apptheme.color.red, fontSize: 10}}>
              {errors.Phone.message}
            </Text>
          )}
        </>
        <Gap m5 />

        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="Landmark"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="email"
                autoCapitalize="none"
              />
            )}
            name="Landmark"
            rules={{required: 'Landmark is required'}}
            defaultValue={''}
          />
          {errors.Landmark && (
            <Text style={{color: Apptheme.color.red, fontSize: 10}}>
              {errors.Landmark.message}
            </Text>
          )}
        </>
      </ScrollView>
      <View>
        <Button
          tittle={'Save'}
          backgroundColor="black"
          //   onPress={() => navigation.navigate(RouteName.CART_SCREEN)}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({});

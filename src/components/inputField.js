import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Icons} from '../utils/styles/globalStyles';
import Apptheme from '../assets/theme/AppTheme';

// import svg from '../utils/styles/Svg/Index';

// import VectorIcon from '../../assets/vectorIcon';

const InputField = ({
  image,
  label,
  type,
  onChangeText,
  value,
  onPressIcon,
  rightIcon = false,
  leftIcon,
  error,
  inputStyles,
  onEndEditing,
  autoFocus,
  gstView,
  disabled = false,
  placeholder,
  readOnly = false,
  onFocus,

  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(!!value);
  const [secure, setSecure] = useState(true);
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const handleClear = () => {
    setInputValue('');
    onChangeText('');
  };
  return (
    <View style={[style.container, inputStyles]}>
      <View style={{flex: 1}}>
        <TextInput
          label={
            <Text
              style={[
                style.inputLabelStyle,
                {
                  color:
                    isFocused || inputFocus
                      ? Apptheme.color.black
                      : Apptheme.color.black,
                },
              ]}>
              {label}
            </Text>
          }
          value={value ?? inputValue}
          onChangeText={val => {
            setInputValue(val);
            onChangeText(val);
          }}
          disabled={disabled}
          textColor={Apptheme.color.black}
          autoFocus={autoFocus}
          readOnly={readOnly}
          onEndEditing={onEndEditing}
          placeholder={placeholder}
          maxLength={maxLength}
          secureTextEntry={type === 'password' ? secure : false}
          keyboardType={type === 'phone' ? 'number-pad' : 'default'}
          onFocus={() => {
            onFocus;
            setInputFocus(true);
            setIsFocused(true);
          }}
          onBlur={() => {
            setInputFocus(false);
            setIsFocused(false);
          }}
          style={{
            flex: 1,
            backgroundColor: '#f1f1f190',
            textTransform: gstView ? 'capitalize' : 'none',
          }}
          underlineStyle={{height: isFocused ? 0.7 : 2}}
          cursorColor={Apptheme.color.black}
          placeholderTextColor={Apptheme.color.subText}
          underlineColor="#fff"
          activeUnderlineColor={Apptheme.color.black}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {flexDirection: 'row', height: 60},
  imagestyle: {width: 20, height: 20, resizeMode: 'contain', padding: 6},
  imagepressStyle: {
    width: 64,
    // height: horizontalScale(54),
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  inputLabelStyle: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    lineHeight: 24,
    // color: Apptheme.color.textLight,
  },
});
export default InputField;

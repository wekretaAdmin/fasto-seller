import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Button = ({onPress, tittle, backgroundColor = 'blue'}) => {
  return (
    <View
      style={{
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          elevation: 5,
          height: 45,
          backgroundColor: backgroundColor,
          borderRadius: 30,
          paddingHorizontal: '10%',
          marginBottom: '5%',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
        }}
        onPress={() => {
          onPress();
        }}>
        <Text style={[{color: 'white'}]}>{tittle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

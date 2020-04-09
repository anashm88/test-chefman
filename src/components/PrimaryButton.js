import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../constants/Colors';

export const PrimaryButton = ({text, onPress, fullWidth}) => (
  <View style={styles.container}>
    <TouchableOpacity style={[styles.primaryButtonStyle, fullWidth ? {width: '100%'}: {}]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  </View>
);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '5rem',
    marginBottom: '5rem',
  },
  primaryButtonStyle: {
    borderRadius: '5rem',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: '10rem',
    backgroundColor: Colors.lightGreen,
  },
  text: {
    color: Colors.white,
    fontSize: '20rem',
  },
});

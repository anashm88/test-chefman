import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector} from 'react-redux';

const BillDetailsComponent = () => {
  const {totalItems, totalPrice} = useSelector(state => state);

  return (
    <View style={styles.billDetailOuter}>
      <View style={styles.billDetail}>
        <Text style={styles.billDetailText}>Bill Detail</Text>
      </View>
      <View style={styles.billDetailItemContainer}>
        <Text style={styles.billDetailItemText}>Items Count</Text>
        <Text style={styles.billDetailItemText}>{totalItems}</Text>
      </View>
      <View style={styles.billDetailItemContainer}>
        <Text style={styles.billDetailItemText}>Items Total</Text>
        <Text style={styles.billDetailItemText}>{`$ ${totalPrice}`}</Text>
      </View>
      <TouchableOpacity style={styles.placeOrderContainer}>
        <Text style={styles.placeOrderText}>Place Order</Text>
        <Text style={styles.placeOrderArrow}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  DetailsText: {
    fontSize: '18rem',
  },
  input: {
    backgroundColor: 'white',
    color: 'grey',
    paddingHorizontal: '15rem',
    height: '100%',
    width: '80%',
    textAlign: 'right',
    fontSize: '16rem',
  },
  billDetailOuter: {
    marginHorizontal: '10rem',
    backgroundColor: 'white',
    borderRadius: '5rem',
    marginBottom: '20rem',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: '3rem'},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  billDetail: {
    padding: '10rem',
    borderBottomColor: '#eee',
    borderBottomWidth: '3rem',
  },
  billDetailItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10rem',
  },
  detailsNameAddPhone: {
    fontSize: '16rem',
    fontWeight: '500',
  },
  billDetailText: {
    fontSize: '18rem',
  },
  placeOrderContainer: {
    marginTop: '5rem',
    borderRadius: '5rem',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '10rem',
    backgroundColor: '#339933',
  },
  placeOrderText: {
    fontSize: '22rem',
    color: 'white',
    marginRight: '10rem',
  },
  placeOrderArrow: {
    fontSize: '22rem',
    color: 'white',
    fontWeight: '600',
  },
});

export default BillDetailsComponent;

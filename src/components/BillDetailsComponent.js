import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../constants/Colors';
import {PrimaryButton} from './PrimaryButton';
import ApiService from '../lib/ApiService';

const BillDetailsComponent = () => {
  const {totalItems, totalPrice} = useSelector(state => state);
  const {products, catalog, ingredients} = useSelector(state => state);

  const onSubmit = async () => {
    let isItemOutOfStock = false;
    for (const productId in ingredients) {
      const maxQuantity = catalog[productId]
        ? catalog[productId].maxQuantity
        : 0;
      const quantity = ingredients[productId].quantity;
      debugger;
      if (quantity > maxQuantity) {
        isItemOutOfStock = true;
      }
    }

    if (isItemOutOfStock) {
      alert('Placing order with some out of stock items');
    } else {
      alert('Placing order successfully');
    }
    await ApiService.placeOrder(ingredients);
  };

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
      <PrimaryButton
        fullWidth={true}
        onPress={onSubmit}
        text={'Place Order >'}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  DetailsText: {
    fontSize: '18rem',
  },
  input: {
    backgroundColor: Colors.white,
    color: 'grey',
    paddingHorizontal: '15rem',
    height: '100%',
    width: '80%',
    textAlign: 'right',
    fontSize: '16rem',
  },
  billDetailOuter: {
    marginHorizontal: '10rem',
    backgroundColor: Colors.white,
    borderRadius: '5rem',
    marginBottom: '20rem',
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: '3rem'},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  billDetail: {
    padding: '10rem',
    borderBottomColor: Colors.lightWhite,
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
    backgroundColor: Colors.lightGreen,
  },
  placeOrderText: {
    fontSize: '22rem',
    color: Colors.white,
    marginRight: '10rem',
  },
  placeOrderArrow: {
    fontSize: '22rem',
    color: Colors.white,
    fontWeight: '600',
  },
});

export default BillDetailsComponent;

import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToIngredientsListAction,
  removeItemFromIngredientsListAction,
} from '../redux/actions/actions';

const OrderDetailsScreen = ({productId, quantity}) => {
  const {products, catalog} = useSelector(state => state);
  const productName = products[productId].productName;
  const price = catalog[productId] ? catalog[productId].price : 0;
  const dispatch = useDispatch();

  const removeItemFromCart = productId => {
    dispatch(removeItemFromIngredientsListAction(productId));
  };

  const addItemToCart = productId => {
    dispatch(addItemToIngredientsListAction(productId));
  };


  return (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.ingredientName}>{productName}</Text>
        <Text style={styles.ingredientWeight}>{`Pack: ${
          products[productId].quantitySize
        }`}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.addSubtractIngredient}>
          <TouchableOpacity onPress={() => removeItemFromCart(productId)}>
            <Image
              style={styles.incrDecrIcon}
              source={require('../assets/plusIcon.png')}
            />
          </TouchableOpacity>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.ingredientCounter}>{`${quantity} Pack`}</Text>
          </View>
          <TouchableOpacity onPress={() => addItemToCart(productId)}>
            <Image
              style={styles.incrDecrIcon}
              source={require('../assets/minusIcon.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 2}}>
          <Text style={styles.ingredientWeight}>{`TOT: $${price *
            quantity}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  content: {
    marginTop: '15rem',
    flex: 1,
  },
  EstimatedDeliveryContainer: {
    marginHorizontal: '15rem',
    borderBottomColor: 'white',
    borderBottomWidth: '1rem',
    paddingVertical: '5rem',
    marginBottom: '15rem',
  },
  EstimatedDeliveryText: {
    color: 'white',
    fontSize: '15rem',
  },
  backArrowContainer: {
    marginBottom: '5rem',
  },
  backArrow: {
    fontSize: '20rem',
    color: 'white',
    fontWeight: 'bold',
  },
  DetailsTopContainer: {
    paddingVertical: '20rem',
  },
  DetailsContainer: {
    paddingHorizontal: '10rem',
    borderBottomColor: '#eee',
    borderBottomWidth: '1rem',
    paddingBottom: '10rem',
  },
  DetailsText: {
    fontSize: '18rem',
  },
  listItem: {
    borderBottomColor: '#eee',
    borderBottomWidth: '1rem',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  ingredientName: {
    fontSize: '18rem',
    fontWeight: '600',
    paddingBottom: '5rem',
  },
  ingredientWeight: {
    fontSize: '13rem',
    color: 'grey',
  },
  addSubtractIngredient: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  incrDecrIcon: {
    width: '25rem',
    height: '25rem',
  },
  ingredientCounter: {
    fontSize: '16rem',
    marginHorizontal: '15rem',
    color: '#00cc00',
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
  billDetailText: {
    fontSize: '18rem',
  },
  billDetailItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10rem',
  },
  billDetailItemText: {
    fontSize: '16rem',
    color: 'grey',
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
  detailsNameAddPhone: {
    fontSize: '16rem',
    fontWeight: '500',
  },
});

export default OrderDetailsScreen;

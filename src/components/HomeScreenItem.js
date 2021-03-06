import {useDispatch, useSelector} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../constants/Colors';
import React from 'react';
import {
  addItemToIngredientsListAction,
  deleteItemFromCartAction,
  removeItemFromIngredientsListAction,
} from '../redux/actions/Actions';

const HomeScreenItem = ({productId, quantity}) => {
  const {products, catalog} = useSelector(state => state);
  const maxQuantity = catalog[productId] ? catalog[productId].maxQuantity : 0;
  const productName = products[productId].productName;
  const price = catalog[productId] ? catalog[productId].price : 0;
  const dispatch = useDispatch();

  const deleteItemFromCart = productId => {
    dispatch(deleteItemFromCartAction(productId));
  };

  const removeItemFromCart = productId => {
    dispatch(removeItemFromIngredientsListAction(productId));
  };

  const addItemToCart = productId => {
    dispatch(addItemToIngredientsListAction(productId));
  };

  return (
    <View style={styles.ingredient}>
      <View style={styles.imageAndDetails}>
        <Image
          style={styles.ingredientImage}
          source={require('../assets/randomImage.png')}
        />
        <View style={styles.ingredientDetails}>
          <View>
            <Text style={styles.ingredientName}>{productName}</Text>
            <Text style={styles.ingredientWeight}>
              {products[productId].quantitySize}
            </Text>
          </View>
          <Text style={styles.ingredientAmount}>
            {maxQuantity === 0 ? (
              <Text style={{color: Colors.red}}>Out of Stock</Text>
            ) : (
              '$ ' + price
            )}
          </Text>
        </View>
      </View>
      <View style={styles.listRightItems}>
        {quantity > 0 ? (
          <TouchableOpacity onPress={() => deleteItemFromCart(productId)}>
            <Text>x</Text>
          </TouchableOpacity>
        ) : null}
        <View>
          {maxQuantity === 0 ? (
            <Text />
          ) : (
            <Text style={[styles.ingredientAmount, {color: Colors.green}]}>
              $ {price * quantity}
            </Text>
          )}
        </View>
        <View style={styles.addSubtractIngredient}>
          <TouchableOpacity onPress={() => removeItemFromCart(productId)}>
            <Image
              style={styles.incrDecrIcon}
              source={require('../assets/minusIcon.png')}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.ingredientCounter,
              maxQuantity === 0 || quantity === 0 ? {color: 'grey'} : null,
            ]}>
            {quantity === 0 && maxQuantity === 0 ? '-' : quantity}
          </Text>
          <TouchableOpacity onPress={() => addItemToCart(productId)}>
            <Image
              style={styles.incrDecrIcon}
              source={require('../assets/plusIcon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  content: {
    marginTop: '30rem',
    flex: 1,
  },
  locationContainer: {
    marginHorizontal: '15rem',
    borderBottomColor: Colors.white,
    borderBottomWidth: '1rem',
    paddingVertical: '5rem',
  },
  locationText: {
    color: Colors.white,
    fontSize: '15rem',
  },
  inputContainer: {
    marginHorizontal: '15rem',
    marginTop: '15rem',
    paddingBottom: '15rem',
  },
  input: {
    backgroundColor: Colors.white,
    color: Colors.lightGray,
    paddingHorizontal: '15rem',
    height: '35rem',
    fontSize: '15rem',
    borderRadius: '5rem',
  },
  ingredientsListContainer: {
    height: '80%',
    backgroundColor: Colors.white,
  },
  ingredient: {
    padding: '15rem',
    borderBottomColor: Colors.lightWhite,
    borderBottomWidth: '1rem',
    flexDirection: 'row',
  },
  checkoutOuterContainer: {
    position: 'absolute',
    width: '100%',
    bottom: '20rem',
    zIndex: 5,
  },
  checkoutInnerContainer: {
    marginHorizontal: '15rem',
    height: '50rem',
    borderRadius: '5rem',
    backgroundColor: Colors.lightGreen,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '15rem',
  },
  checkoutTouchable: {
    height: '100%',
    justifyContent: 'center',
  },
  checkoutContainerText: {
    fontSize: '18rem',
    color: Colors.white,
    fontWeight: '600',
  },
  imageAndDetails: {
    flexDirection: 'row',
    flex: 1,
  },
  ingredientImage: {
    width: '90rem',
    height: '90rem',
  },
  ingredientDetails: {
    marginLeft: '20rem',
    justifyContent: 'space-around',
  },
  ingredientName: {
    fontSize: '16rem',
    paddingBottom: '3rem',
  },
  ingredientWeight: {
    fontSize: '11rem',
    color: 'grey',
  },
  ingredientAmount: {
    fontSize: '15rem',
  },
  addSubtractIngredient: {
    flexDirection: 'row',
  },
  incrDecrIcon: {
    width: '20rem',
    height: '20rem',
  },
  ingredientCounter: {
    fontSize: '15rem',
    marginHorizontal: '15rem',
    color: Colors.green,
  },
  listRightItems: {
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
});

export default HomeScreenItem;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {bindActionCreators} from 'redux';
import {
  fetchProducts,
  fetchStores,
  fetchCatalog,
  fetchIngredients,
} from '../redux/actions/actionCreators';

import _ from 'lodash';

const tempData = [
  {
    id: 1,
    ingredient: 'Sugar',
    pack_Weight: '200g',
    amount: 50,
  },
  {
    id: 2,
    ingredient: 'Cinnamon',
    pack_Weight: '200g',
    amount: 50,
  },
  {
    id: 3,
    ingredient: 'Salt',
    pack_Weight: '200g',
    amount: 50,
  },
  {
    id: 4,
    ingredient: 'Cucumber',
    pack_Weight: '200g',
    amount: 50,
  },
  {
    id: 5,
    ingredient: 'Banana',
    pack_Weight: '200g',
    amount: 50,
  },
  {
    id: 6,
    ingredient: 'Apple',
    pack_Weight: '200g',
    amount: 50,
  },
  {
    id: 7,
    ingredient: 'Baking Soda',
    pack_Weight: '200g',
    amount: 50,
  },
  {
    id: 8,
    ingredient: 'Corn Starch',
    pack_Weight: '200g',
    amount: 50,
  },
  {
    id: 9,
    ingredient: 'Vinegar',
    pack_Weight: '200g',
    amount: 50,
  },
  {
    id: 10,
    ingredient: 'Tomato',
    pack_Weight: '200g',
    amount: 50,
  },
];

const ItemsScreen = props => {
  const [value, onChangeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await props.fetchProducts();
      await props.fetchStores();
      await props.fetchCatalog('S2');
      await props.fetchIngredients();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (_.isEmpty(props.ingredients) || isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading</Text>
      </View>
    );
  }

  const cartItems = {};

  for (const productId in props.ingredients) {
    let cartItem = {};
    const {price = 0, maxQuantity = 0} = props.catalog[productId] || {};
    const {quantity} = props.ingredients[productId];
    cartItem = {price, maxQuantity, quantity};
    cartItems[productId] = cartItem;
  }

  let priceTotal = 0;
  let itemsTotal = 0;
  for (const productId in cartItems) {
    priceTotal += cartItems[productId].price * cartItems[productId].quantity;
    if (cartItems[productId].maxQuantity) {
      itemsTotal += cartItems[productId].quantity;
    }
  }

  const renderCart = items => {
    const cartList = [];
    for (const productId in items) {
      cartList.push(
        <View style={styles.ingredient}>
          <View style={styles.imageAndDetails}>
            <Image
              style={styles.ingredientImage}
              source={require('../assets/randomImage.png')}
            />
            <View style={styles.ingredientDetails}>
              <View>
                <Text style={styles.ingredientName}>
                  {props.products[productId].productName}
                </Text>
                <Text style={styles.ingredientWeight}>
                  {props.products[productId].quantitySize}
                </Text>
              </View>
              <Text style={styles.ingredientAmount}>
                {items[productId].maxQuantity === 0 ? (
                  <Text style={{color: '#ff6666'}}>Out of Stock</Text>
                ) : (
                  '$ ' + items[productId].price
                )}
              </Text>
            </View>
          </View>
          <View style={styles.listRightItems}>
            <TouchableOpacity>
              <Text>x</Text>
            </TouchableOpacity>
            <View>
              {items[productId].maxQuantity === 0 ? (
                <Text />
              ) : (
                <Text style={[styles.ingredientAmount, {color: '#00cc00'}]}>
                  $ {items[productId].price * items[productId].quantity}
                </Text>
              )}
            </View>
            <View style={styles.addSubtractIngredient}>
              <TouchableOpacity>
                <Image
                  style={styles.incrDecrIcon}
                  source={require('../assets/plusIcon.png')}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.ingredientCounter,
                  items[productId].maxQuantity === 0 ? {color: 'grey'} : null,
                ]}>
                {items[productId].maxQuantity === 0
                  ? '-'
                  : items[productId].quantity}
              </Text>
              <TouchableOpacity>
                <Image
                  style={styles.incrDecrIcon}
                  source={require('../assets/minusIcon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>,
      );
    }
    return cartList;
  };

  // const renderIngredients = item => {
  //   return (
  //     <View style={styles.ingredient}>
  //       <View style={styles.imageAndDetails}>
  //         <Image
  //           style={styles.ingredientImage}
  //           source={require('../assets/randomImage.png')}
  //         />
  //         <View style={styles.ingredientDetails}>
  //           <View>
  //             <Text style={styles.ingredientName}>{item.ingredient}</Text>
  //             <Text style={styles.ingredientWeight}>{item.pack_Weight}</Text>
  //           </View>
  //           <Text style={styles.ingredientAmount}>$ {item.amount}/packet</Text>
  //         </View>
  //       </View>
  //       <View style={styles.addSubtractIngredient}>
  //         <TouchableOpacity>
  //           <Image
  //             style={styles.incrDecrIcon}
  //             source={require('../assets/plusIcon.png')}
  //           />
  //         </TouchableOpacity>
  //         <Text style={styles.ingredientCounter}>0</Text>
  //         <TouchableOpacity>
  //           <Image
  //             style={styles.incrDecrIcon}
  //             source={require('../assets/minusIcon.png')}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Ambience Mall, Gurugram, Haryana
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            value={value}
            placeholder={'Search'}
          />
        </View>
        <View style={styles.ingredientsListContainer}>
          {/*<FlatList*/}
          {/*  data={tempData}*/}
          {/*  keyExtractor={data => data.id}*/}
          {/*  renderItem={({item}) => renderIngredients(item)}*/}
          {/*/>*/}
          <ScrollView>{renderCart(cartItems)}</ScrollView>
        </View>
      </View>
      <View style={styles.checkoutOuterContainer}>
        <View style={styles.checkoutInnerContainer}>
          <View>
            <Text style={styles.checkoutContainerText}>
              {itemsTotal} items for: ${priceTotal}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutTouchable}
            disabled={!itemsTotal}>
            <Text
              style={[
                styles.checkoutContainerText,
                !itemsTotal ? {opacity: 0.4} : null,
              ]}>
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  content: {
    marginTop: '30rem',
    flex: 1,
  },
  locationContainer: {
    marginHorizontal: '15rem',
    borderBottomColor: 'white',
    borderBottomWidth: '1rem',
    paddingVertical: '5rem',
  },
  locationText: {
    color: 'white',
    fontSize: '15rem',
  },
  inputContainer: {
    marginHorizontal: '15rem',
    marginTop: '15rem',
    paddingBottom: '15rem',
  },
  input: {
    backgroundColor: 'white',
    color: '#262626',
    paddingHorizontal: '15rem',
    height: '35rem',
    fontSize: '15rem',
    borderRadius: '5rem',
  },
  ingredientsListContainer: {
    height: '80%',
    backgroundColor: 'white',
  },
  ingredient: {
    padding: '15rem',
    borderBottomColor: '#eee',
    borderBottomWidth: '0.6rem',
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
    backgroundColor: '#339933',
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
    color: 'white',
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
    color: '#00cc00',
  },
  listRightItems: {
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts,
      fetchStores,
      fetchCatalog,
      fetchIngredients,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsScreen);

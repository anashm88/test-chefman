import React, {useState} from 'react';
import {connect} from 'react-redux';
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
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  userNameUpdate,
  userAddressUpdate,
  userPhoneUpdate,
} from '../redux/actions/actions';

const OrderDetails = props => {
  const [name, setName] = useState(props.userDetails.name);
  const [address, setAddress] = useState(props.userDetails.address);
  const [phone, setPhone] = useState(props.userDetails.phone);
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

  const cartList = [];

  const renderCart = items => {
    for (const productId in items) {
      if (
        props.ingredients[productId].quantity > 0 &&
        items[productId].maxQuantity > 0
      ) {
        cartList.push(
          <View style={styles.listItem}>
            <View>
              <Text style={styles.ingredientName}>
                {props.products[productId].productName}
              </Text>
              <Text style={styles.ingredientWeight}>{`Pack: ${
                props.products[productId].quantitySize
              }`}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={styles.addSubtractIngredient}>
                <TouchableOpacity>
                  <Image
                    style={styles.incrDecrIcon}
                    source={require('../assets/plusIcon.png')}
                  />
                </TouchableOpacity>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.ingredientCounter}>{`${
                    items[productId].quantity
                  } Pack`}</Text>
                </View>
                <TouchableOpacity>
                  <Image
                    style={styles.incrDecrIcon}
                    source={require('../assets/minusIcon.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 2}}>
                <Text style={styles.ingredientWeight}>{`TOT: $${items[productId]
                  .price * items[productId].quantity}`}</Text>
              </View>
            </View>
          </View>,
        );
      }
    }
    return cartList;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.EstimatedDeliveryContainer}>
          <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Text style={styles.backArrow}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.EstimatedDeliveryText}>
            Expected Delivery:{' '}
            {props.stores[props.selectedStoreId].deliveryTime}
          </Text>
        </View>
        <ScrollView style={{backgroundColor: 'white'}}>
          <View style={styles.DetailsTopContainer}>
            <View style={styles.DetailsContainer}>
              <Text style={styles.DetailsText}>ORDER DETAILS</Text>
            </View>
            <View>{renderCart(cartItems)}</View>
          </View>
          <View style={styles.billDetailOuter}>
            <View style={styles.billDetail}>
              <Text style={styles.DetailsText}>YOUR DETAILS</Text>
            </View>
            <View style={styles.billDetailItemContainer}>
              <Text style={styles.detailsNameAddPhone}>Name : </Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setName(text)}
                value={name}
              />
            </View>
            <View style={styles.billDetailItemContainer}>
              <Text style={styles.detailsNameAddPhone}>Address : </Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setAddress(text)}
                value={address}
              />
            </View>
            <View style={styles.billDetailItemContainer}>
              <Text style={styles.detailsNameAddPhone}>Phone : </Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setPhone(text)}
                value={phone}
              />
            </View>
          </View>
          <View style={styles.billDetailOuter}>
            <View style={styles.billDetail}>
              <Text style={styles.DetailsText}>STORE DETAILS</Text>
            </View>
            <View style={styles.billDetailItemContainer}>
              <Text style={styles.detailsNameAddPhone}>Name : </Text>
              <Text style={styles.billDetailItemText}>
                {props.stores[props.selectedStoreId].name}
              </Text>
            </View>
            <View style={styles.billDetailItemContainer}>
              <Text style={styles.detailsNameAddPhone}>Address : </Text>
              <Text style={styles.billDetailItemText}>
                {props.stores[props.selectedStoreId].address}
              </Text>
            </View>
          </View>
          <View style={styles.billDetailOuter}>
            <View style={styles.billDetail}>
              <Text style={styles.billDetailText}>Bill Detail</Text>
            </View>
            <View style={styles.billDetailItemContainer}>
              <Text style={styles.billDetailItemText}>Items Count</Text>
              <Text style={styles.billDetailItemText}>{cartList.length}</Text>
            </View>
            <View style={styles.billDetailItemContainer}>
              <Text style={styles.billDetailItemText}>Items Total</Text>
              <Text style={styles.billDetailItemText}>{`$ ${priceTotal}`}</Text>
            </View>
            <TouchableOpacity style={styles.placeOrderContainer}>
              <Text style={styles.placeOrderText}>PLACE ORDER</Text>
              <Text style={styles.placeOrderArrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    userNameUpdate: payload => dispatch(userNameUpdate(payload)),
    userAddressUpdate: payload => dispatch(userAddressUpdate(payload)),
    userPhoneUpdate: payload => dispatch(userPhoneUpdate(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetails);

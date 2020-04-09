import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import {bindActionCreators} from 'redux';
import {
  fetchCatalog,
  fetchIngredients,
  fetchProducts,
  fetchStores,
} from '../redux/actions/actionCreators';

import _ from 'lodash';
import HomeScreenItem from '../Components/HomeScreenItem';
import {Colors} from '../constants/constants';

const ItemsScreen = props => {
  const [value, onChangeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {totalItems, totalPrice, ingredients, catalog} = useSelector(
    state => state,
  );
  const [address, setAddress] = useState('java');

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

  if (_.isEmpty(ingredients) || isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading</Text>
      </View>
    );
  }

  const cartItems = {};

  for (const productId in ingredients) {
    let cartItem = {};
    const {price = 0, maxQuantity = 0} = catalog[productId] || {};
    const {quantity} = ingredients[productId];
    cartItem = {price, maxQuantity, quantity, productId};
    cartItems[productId] = cartItem;
  }

  for (const productId in catalog) {
    if (!cartItems[productId]) {
      const quantity = 0;
      let cartItem = {...catalog[productId], quantity};
      cartItems[productId] = cartItem;
    }
  }

  const placeholder = {
    label: 'Select a sport...',
    value: null,
    color: '#9EA0A4',
  };
  const sports = [
    {
      label: 'Football',
      value: 'football',
    },
    {
      label: 'Baseball',
      value: 'baseball',
    },
    {
      label: 'Hockey',
      value: 'hockey',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.locationContainer}>
          <RNPickerSelect
            placeholder={placeholder}
            items={sports}
            inputIOS={pickerSelectStyles.inputIOS}
            inputAndroid={pickerSelectStyles.inputAndroid}
            onValueChange={setAddress}
            style={{
              inputAndroid: {
                backgroundColor: 'transparent',
              },
              iconContainer: {
                top: 5,
                right: 15,
              },
            }}
            value={address}
            useNativeAndroidPickerStyle={false}
            textInputProps={{underlineColorAndroid: 'cyan'}}
          />
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
          <ScrollView>
            {Object.keys(cartItems)
              .sort()
              .map(pid => (
                <HomeScreenItem
                  productId={pid}
                  quantity={cartItems[pid].quantity}
                  key={pid}
                />
              ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.checkoutOuterContainer}>
        <View style={styles.checkoutInnerContainer}>
          <View>
            <Text style={styles.checkoutContainerText}>
              {totalItems} items for: ${totalPrice}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('OrderDetailsScreen')}
            style={styles.checkoutTouchable}
            disabled={!totalItems}>
            <Text
              style={[
                styles.checkoutContainerText,
                !totalItems ? {opacity: 0.4} : null,
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
  picker: {
    width: '100%',
    height: 44,
  },
  pickerItem: {
    color: Colors.white,
  },
});

const pickerSelectStyles = EStyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

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
  null,
  mapDispatchToProps,
)(ItemsScreen);

import React, {useEffect, useState, useCallback} from 'react';
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
  setSelectedStore,
} from '../redux/actions/ActionCreators';

import _ from 'lodash';
import HomeScreenItem from '../components/HomeScreenItem';
import {Colors} from '../constants/Colors';

const ItemsScreen = props => {
  const [value, onChangeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    totalItems,
    totalPrice,
    ingredients,
    catalog,
    stores,
    selectedStoreId,
  } = useSelector(state => state);

  const [storeId, setStoreId] = useState(selectedStoreId);

  const fetchData = useCallback(async () => {
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
  }, [props]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    label: 'Select a store...',
    value: null,
    color: Colors.gray,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.locationContainer}>
          <RNPickerSelect
            placeholder={placeholder}
            items={Object.values(stores).map(store => {
              return {
                label: `${store.name}, ${store.address}`,
                value: store.storeId,
              };
            })}
            onValueChange={v => {
              debugger;
              setStoreId(v);
            }}
            onDonePress={() => props.setSelectedStore(storeId)}
            style={pickerStyle}
            value={storeId}
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
        <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetailsScreen')} style={styles.checkoutInnerContainer}>
          <View>
            <Text style={styles.checkoutContainerText}>
              {totalItems} items for: ${totalPrice}
            </Text>
          </View>
          <View
            style={styles.checkoutTouchable}
            disabled={!totalItems}>
            <Text
              style={[
                styles.checkoutContainerText,
                !totalItems ? {opacity: 0.4} : null,
              ]}>
              Checkout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  picker: {
    width: '100%',
    height: 44,
  },
  pickerItem: {
    color: Colors.white,
  },
});

const pickerStyle = {
  inputIOS: {
    color: Colors.white,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: Colors.white,
  },
  placeholderColor: Colors.white,
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: Colors.lightGray,
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts,
      fetchStores,
      fetchCatalog,
      fetchIngredients,
      setSelectedStore,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(ItemsScreen);

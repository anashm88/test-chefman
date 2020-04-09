import React from 'react';
import {useSelector} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import OrderDetailsScreen from '../components/OrderDetailsItem';
import UserDetailsComponent from '../components/UserDetailsComponent';
import StoreDetailsComponent from '../components/StoreDetailsComponent';
import BillDetailsComponent from '../components/BillDetailsComponent';

const OrderDetails = props => {
  const {ingredients, stores, selectedStoreId} = useSelector(state => state);
  debugger;

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
            Expected Delivery: {stores[selectedStoreId].deliveryTime}
          </Text>
        </View>
        <ScrollView style={{backgroundColor: Colors.white}}>
          <View style={styles.DetailsTopContainer}>
            <View style={styles.DetailsContainer}>
              <Text style={styles.DetailsText}>ORDER DETAILS</Text>
            </View>
            <View>
              {Object.keys(ingredients).map(key => (
                <OrderDetailsScreen
                  productId={key}
                  quantity={ingredients[key].quantity}
                  key={key}
                />
              ))}
            </View>
          </View>
          <UserDetailsComponent />
          <StoreDetailsComponent />
          <BillDetailsComponent />
        </ScrollView>
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
    marginTop: '15rem',
    flex: 1,
  },
  EstimatedDeliveryContainer: {
    marginHorizontal: '15rem',
    borderBottomColor: Colors.white,
    borderBottomWidth: '1rem',
    paddingVertical: '5rem',
    marginBottom: '15rem',
  },
  EstimatedDeliveryText: {
    color: Colors.white,
    fontSize: '15rem',
  },
  backArrowContainer: {
    marginBottom: '5rem',
  },
  backArrow: {
    fontSize: '20rem',
    color: Colors.white,
    fontWeight: 'bold',
  },
  DetailsTopContainer: {
    paddingVertical: '20rem',
  },
  DetailsContainer: {
    paddingHorizontal: '10rem',
    borderBottomColor: Colors.lightWhite,
    borderBottomWidth: '1rem',
    paddingBottom: '10rem',
  },
  DetailsText: {
    fontSize: '18rem',
  },
  listItem: {
    borderBottomColor: Colors.black,
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
    color: Colors.black,
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
    borderBottomColor: Colors.black,
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
    backgroundColor: Colors.black,
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
  detailsNameAddPhone: {
    fontSize: '16rem',
    fontWeight: '500',
  },
});

export default OrderDetails;

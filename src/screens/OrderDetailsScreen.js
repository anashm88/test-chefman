import React from 'react';
import {useSelector} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import OrderDetailsScreen from '../Components/OrderDetailsItem';
import UserDetailsComponent from '../Components/UserDetailsComponent';
import StoreDetailsComponent from '../Components/StoreDetailsComponent';
import BillDetailsComponent from '../Components/BillDetailsComponent';

const OrderDetails = props => {
  const {ingredients, stores, selectedStoreId} = useSelector(state => state);

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
        <ScrollView style={{backgroundColor: 'white'}}>
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

export default OrderDetails;

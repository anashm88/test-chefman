import {createStackNavigator} from 'react-navigation-stack';
import ItemsScreen from '../screens/ItemsScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const StartNavigator = createStackNavigator(
  {
    ItemsScreen,
    OrderDetailsScreen,
  },
  {
    initialRouteName: 'ItemsScreen',
    headerMode: 'none',
  },
);

export {StartNavigator};

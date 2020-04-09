import {createStackNavigator} from 'react-navigation-stack';
import ItemsScreen from '../Components/ItemsScreen';
import OrderDetailsScreen from '../Components/OrderDetailsScreen';

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

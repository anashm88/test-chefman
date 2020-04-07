import {createStackNavigator} from 'react-navigation-stack';
import ItemsScreen from '../Components/ItemsScreen';

const StartNavigator = createStackNavigator(
  {
    ItemsScreen,
  },
  {
    initialRouteName: 'ItemsScreen',
    headerMode: 'none',
  },
);

export {StartNavigator};

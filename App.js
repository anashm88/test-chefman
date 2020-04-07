import React from 'react';
import {Provider} from 'react-redux';
import {Dimensions} from 'react-native';
import {createStore} from 'redux';
import {createAppContainer} from 'react-navigation';
import {StartNavigator} from './src/navigation/StartContainer';
import rootReducer from './src/redux/reducers/rootReducer';
import EStyleSheet from 'react-native-extended-stylesheet';

const StartContainer = createAppContainer(StartNavigator);

let entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <StartContainer />
    </Provider>
  );
};

export default App;

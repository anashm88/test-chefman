import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

const ItemsScreen = ({item}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>{item}</Text>
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
    marginTop: '20rem',
  },
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ItemsScreen);

import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector} from 'react-redux';
import {Colors} from '../constants/Colors';

const UserDetailsComponent = () => {
  const {userDetails} = useSelector(state => state);
  const [name, setName] = useState(userDetails.name);
  const [address, setAddress] = useState(userDetails.address);
  const [phone, setPhone] = useState(userDetails.phone);

  return (
    <View style={styles.billDetailOuter}>
      <View style={styles.billDetail}>
        <Text style={styles.DetailsText}>User details</Text>
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
  );
};

const styles = EStyleSheet.create({
  DetailsText: {
    fontSize: '18rem',
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
    borderBottomColor: Colors.lightWhite,
    borderBottomWidth: '3rem',
  },
  billDetailItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10rem',
  },
  detailsNameAddPhone: {
    fontSize: '16rem',
    fontWeight: '500',
  },
});

export default UserDetailsComponent;

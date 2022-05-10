import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from '../utils/Mytextinput';
import Mybutton from '../utils/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const RegisterUser = ({ navigation }) => {
  let [userFirtName, setFirtName] = useState('');
  let [userLastName, setUserLastName] = useState('');
  let [userMotoMaker, setUserMotoMaker] = useState('');
  let [userMotoMileage, setUserMotoMileage] = useState('');
  let date = new Date().getMonth() + 1 + "-" + new Date().getDate() + "-" + new Date().getFullYear()
  

  let register_user = () => {
    console.log(userFirtName, userLastName, userMotoMaker, userMotoMileage, date);

    if (!userFirtName) {
      alert('Please fill name');
      return;
    }

    // if for all columns 
    

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_firstname, user_lastname, user_motomaker, user_motomileage, joining_date) VALUES (?,?,?,?,?)',
        [userFirtName, userLastName, userMotoMaker, userMotoMileage, date],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter First Name "
                onChangeText={
                  (userFirtName) => setFirtName(userFirtName)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Last Name "
                onChangeText={
                  (userLastName) => setUserLastName(userLastName)
                }
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Enter Motorcycle Maker"
                onChangeText={
                  (userMotoMaker) => setUserMotoMaker(userMotoMaker)
                }
                style={{ padding: 10 }}
              />

            <Mytextinput
                placeholder="Enter Motorcycle Mileage"
                onChangeText={
                  (userMotoMileage) => setUserMotoMileage(userMotoMileage)
                }
                style={{ padding: 10 }}
              />


              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          Design and Developt by Christian Martinez
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
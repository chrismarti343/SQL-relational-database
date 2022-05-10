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

var db = openDatabase({ name: 'UserDatabase.db'});

const UpdateUser = ({ navigation }) => {
    let [inputUserId, setInputUserId] = useState('');
    let [userFirtName, setFirtName] = useState('');
    let [userLastName, setUserLastName] = useState('');
    let [userMotoMaker, setUserMotoMaker] = useState('');
    let [userMotoMileage, setUserMotoMileage] = useState('');

    let updateAllStates = (firstName, lastName, motoMaker, motoMileage ) => {
        setFirtName(firstName);
        setUserLastName(lastName);
        setUserMotoMaker(motoMaker);
        setUserMotoMileage(motoMileage);
    };

    let searchUser = () => {
        console.log(inputUserId);
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_user where user_id = ?',
                [inputUserId],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        let res = results.rows.item(0);
                        updateAllStates(
                            res.user_firstname,
                            res.user_lastname,
                            res.user_motomaker,
                            res.user_motomileage,
                        );
                    } else {
                        alert('No user found')
                        updateAllStates('','','','');
                    }
                }
            );
        });
    };

    let updateUser = () => {
        console.log(inputUserId, userFirtName, userLastName, userMotoMaker, userMotoMileage );

        if(!inputUserId) {
            alert('Please fill User id');
            return;
        }

        if(!userFirtName) {
            alert('Please fill First name');
            return;
        }

        if(!userLastName) {
            alert('Please fill Last name');
            return;
        }

        if(!userMotoMaker) {
            alert('Please fill motorcycle maker');
            return;
        }

        if(!userMotoMileage) {
            alert('Please fill motocycle mileage');
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE table_user set user_firstname=?, user_lastname=?, user_motomaker=?, user_motomileage=? where user_id=?',
                [userFirtName, userLastName, userMotoMaker, userMotoMileage, inputUserId],
                (tx,results) => {
                    console.log('Result', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'User updatec successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('HomeScreen'),
                                },
                            ],
                            { cancelable : false}
                        );
                    } else alert(' Update Failed');
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
                    placeholder="Enter User Id"
                    style={{ padding: 10 }}
                    onChangeText={
                      (inputUserId) => setInputUserId(inputUserId)
                    }
                  />
                  <Mybutton
                    title="Search User"
                    customClick={searchUser} 
                  />
                  <Mytextinput
                    placeholder="Enter First Name"
                    value={userFirtName}
                    style={{ padding: 10 }}
                    onChangeText={
                        (userFirtName) => setFirtName(userFirtName)
                    }
                  />

                  <Mytextinput
                    placeholder="Enter Last Name"
                    value={userLastName}
                    style={{ padding: 10 }}
                    onChangeText={
                        (userLastName) => setUserLastName(userLastName)
                    }
                  />

                 <Mytextinput
                    placeholder="Enter Motorcycle Maker"
                    value={userMotoMaker}
                    style={{ padding: 10 }}
                    onChangeText={
                        (userMotoMaker) => setUserMotoMaker(userMotoMaker)
                    }
                  />  

                <Mytextinput
                    placeholder="Enter Motorcycle Mileage"
                    value={userMotoMileage}
                    style={{ padding: 10 }}
                    onChangeText={
                        (userMotoMileage) => setUserMotoMileage(userMotoMileage)
                    }
                  />
                  


                  <Mybutton
                    title="Update User"
                    customClick={updateUser}
                  />
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'grey'
              }}>
            
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
     
    export default UpdateUser;
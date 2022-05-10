

import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from '../utils/Mybutton';
import Mytext from '../utils/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_firstname VARCHAR(20), user_lastname VARCHAR(20), user_motomaker VARCHAR(20), user_motomileage VARCHAR(20), joining_date TEX)',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={{ flex: 1, backgroundColor: 'white',justifyContent: 'center',}}>
        <View style={{ flex: 1, justifyContent: 'center', }}>
          <Mytext 
          text="Motorcycle User Registration" />
          <Mybutton
            title="Register"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
       
          <Mybutton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
         Design and Developt by Christian Martinez
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
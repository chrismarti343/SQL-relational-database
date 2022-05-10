import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text style ={{fontWeight: "bold"}}>Id: {item.user_id}</Text>
        <Text>First Name: {item.user_firstname}</Text> 
        <Text>Last Name:  {item.user_lastname}</Text>
        <Text>Motorcycle Maker:  {item.user_motomaker}</Text>
        <Text>Motorcycle Mileage:  {item.user_motomileage}</Text>
        <Text>Joing Date:  {item.joining_date}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
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

export default ViewAllUser;

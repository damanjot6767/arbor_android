import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '../../actions/client';
import { Color } from '../../constants/colors';
import { ListItem } from '../../common/list';
import { ActivityIndicator } from 'react-native-paper';

export default function Client() {
   const dispatch = useDispatch()
   const { clients, loader} = useSelector(({ client }) => client)
  
   useEffect(() => {
      dispatch(fetchClients())
   }, [])
   return (
      <View style={styles.conatiner1}>
         <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 7, paddingHorizontal: 10, marginHorizontal: 13, marginVertical: 5, backgroundColor: "#fff", height: 45, marginBottom: 15 }}>
            <Icon name="search" size={20} color="gray" style={{ marginRight: 5 }} />
            <TextInput
               style={{ flex: 1 }}
               placeholder="Search client here..."
            />

         </View>
         {/* <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}> */}
         {/* List of items */}
         {loader ?
        <ActivityIndicator style={{flex:1}} animating={true} color={Color.main} size={70} />
        :
         <FlatList
            data={clients}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ListItem item={item} label="clients"/>}
         />}
      </View>
   );
}

const styles = StyleSheet.create({
   conatiner1: {
      flex: 1,
      width: '100%',
      height: '100%',
      padding: 12
   },
})
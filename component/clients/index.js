import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '../../actions/client';
import { Color } from '../../constants/colors';
import { ListItem } from '../../common/list';

export default function Client() {
   const dispatch = useDispatch()
   const { clients } = useSelector(({ client }) => client)
   console.log("clients", clients?.map((client) => client.clientName))
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
         <FlatList
            data={clients}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ListItem item={item} label="clients" />}
         />
         {/* {clients?.length ?
            clients?.map((client) => (
               <View key={client._id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', gap: 6, margin: 3 }}>
                  <View style={{ padding: 15, backgroundColor: Color.white, width: '100%', flexDirection: '1', borderRadius: 15 }}>
                     <Text style={{ fontSize: 18, marginBottom: 2, color: Color.main, fontWeight: 'bold' }}>{client.clientName}</Text>
                     <Text style={{ fontSize: 16, marginBottom: 2, color: Color.main, lineHeight: 20 }}>{client.address}</Text>
                  </View>
               </View>
            )) : null} */}

         {/* </ScrollView> */}
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
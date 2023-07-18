import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProperties } from "../../actions/property";
import { Color } from '../../constants/colors';
import { ListItem } from '../../common/list';

export default function Property() {
   const dispatch = useDispatch()
   const { properties } = useSelector(({ property }) => property)
   console.log("prop", properties)

   useEffect(() => {
      dispatch(fetchAllProperties())
   }, [])

   return (
      <View style={styles.conatiner1}>
         <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 7, paddingHorizontal: 10, marginHorizontal: 13, marginVertical: 5, backgroundColor: "#fff", height: 45, marginBottom: 15 }}>
            <Icon name="search" size={20} color="gray" style={{ marginRight: 5 }} />
            <TextInput
               style={{ flex: 1 }}
               placeholder="Search property here..."
            />

         </View>
         {/* <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}> */}
         {/* List of items */}
         <FlatList
            data={properties}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ListItem item={item} label="property" />}
         />
         {/* {properties?.length ?
               properties?.map((prop) => (
                  <View key={prop?._id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', gap: 6, margin: 3 }}>
                     <View style={{ padding: 15, backgroundColor: Color.white, width: '100%', flexDirection: '1', borderRadius: 15 }}>
                        <Text style={{ fontSize: 18, marginBottom: 2, color: Color.main, fontWeight: 'bold' }}>{prop?.propertyName}</Text>
                        <Text style={{ fontSize: 16, marginBottom: 2, color: Color.main, lineHeight: 20 }}>{prop?.location}</Text>
                     </View>
                  </View>
               )) : null} */}
         {/* </ScrollView> */}
      </View>
   )
}

const styles = StyleSheet.create({
   conatiner1: {
      flex: 1,
      width: '100%',
      height: '100%',
      padding: 12
   }
})
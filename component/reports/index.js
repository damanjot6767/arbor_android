import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getReport } from '../../actions/report';
import { Color } from '../../constants/colors';
export default function Report({ navigation }) {
  const dispatch = useDispatch()
  const [selectedText, setSelectedText] = useState('Text 1');
  const { allReports } = useSelector(({ report }) => report)
  console.log("report", allReports?.data?.map((val) => val?.reportName))

  useEffect(() => {
    dispatch(getReport())
  }, [])

  const handleTextPress = (text) => {
    setSelectedText(text);
  };

  return (
    <View style={styles.conatiner1}>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 7, paddingHorizontal: 10, marginHorizontal: 13, marginVertical: 5, backgroundColor: "#fff", height: 45 }}>
        <Icon name="search" size={20} color="gray" style={{ marginRight: 5 }} />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Search report here..."
        />

      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", gap: 13, marginHorizontal: 13, marginVertical: 15 }}>
        <TouchableOpacity onPress={() => handleTextPress('Text 1')}>
          <Text style={{ color: 'white', backgroundColor: selectedText === 'Text 1' ? '#1D4840' : 'gray', paddingHorizontal: 35, paddingVertical: 8, borderRadius: 50 }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTextPress('Text 2')}>
          <Text style={{ color: 'white', backgroundColor: selectedText === 'Text 2' ? '#1D4840' : 'gray', paddingHorizontal: 30, paddingVertical: 8, borderRadius: 50 }}>Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTextPress('Text 3')}>
          <Text style={{ color: 'white', backgroundColor: selectedText === 'Text 3' ? '#1D4840' : 'gray', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 50 }}>Completed</Text>
        </TouchableOpacity>

      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* List of items */}
        {allReports?.data?.length ? allReports?.data?.map((row) => (
          <View key={row?._id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', gap: 6 }}>
            <View style={{ padding: 15, backgroundColor: Color.white, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 15 }}>
              <View>
                <Text style={{ fontSize: 18, marginBottom: 2, color: Color.main, fontWeight: 'bold' }}>{row?.reportName}</Text>
                <Text style={{ fontSize: 16, marginBottom: 2, color: Color.main, lineHeight: 20 }}>{row?.property?.propertyName}</Text>
              </View>
              <View>
                <TouchableOpacity>
                  <Text style={{ color: 'white', backgroundColor: '#1D4840', paddingHorizontal: 23, paddingVertical: 8, borderRadius: 50 }}>DRAFT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )) : null}
      </ScrollView>
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
});

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Color } from '../constants/colors';

const SegmentedControl = (props) => {

  const { reportData, setReportData, label } = props
  const [selectedIndex, setSelectedIndex] = useState(0);


  const handleSegmentPress = (index) => {
    setSelectedIndex(index);
    if (label === "treeDBH") {
      setReportData({ ...reportData, treeDBHUnit: index === 0 ? props.options[0] : props.options[1] })
    } else {
      setReportData({ ...reportData, treeHeightUnit: index === 0 ? props.options[0] : props.options[1] })
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.segment, selectedIndex === 0 && styles.selectedSegment]}
        onPress={() => handleSegmentPress(0)}
      >
        <Text style={[styles.segmentText, selectedIndex === 0 && styles.selectedText]}>{props.options[0]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.segment, selectedIndex === 1 && styles.selectedSegment]}
        onPress={() => handleSegmentPress(1)}
      >
        <Text style={[styles.segmentText, selectedIndex === 1 && styles.selectedText]}>{props.options[1]}</Text>
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     width:'22%',
//     // height:'7%',
//     borderRadius: 8,
//     padding:5,
//     // borderWidth: 1,
//     // borderColor: '#ccc',
//     backgroundColor:Color.grey,
//     // overflow: 'hidden',
//   },
//   segment: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   segmentText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   selectedSegment: {
//     backgroundColor: Color.white,
//     borderWidth:1,
//     borderRadius:8,
//     borderColor:Color.grey

//   },
//   selectedText: {
//     color: Color.black,
//   },
// });
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    width: '30%',
    borderColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 10,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  segment: {
    // flex:1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedSegment: {
    backgroundColor: Color.main,
  },
  selectedText: {
    color: 'white',
  },
});


export default SegmentedControl;

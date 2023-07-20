import { SafeAreaView, View, Text, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import { TextInput, Card, Button } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";
import MapContainer from '../../../common/mapContainer';
import { DATA } from "../../../constants/reportConstant";
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddTree = ({ reportData, setReportData }) => {
    const [show, setShow] = useState(false)
    const renderItem = ({ item }) => (

        <Pressable onPress={() => setShow(true)}>
            <View
                style={styles.AddTree}>
                <Icon style={{ borderRadius: 50, padding: 3, borderWidth: 1 }} name="add" size={24} color="black" />
                <Text style={{ color: Color.main, margin: 15, fontSize: 14 }}>Add Tree</Text>
            </View>
        </Pressable>
    );
    return (
        <View style={styles.stepContainer} >
            {show ?
                <View style={{ height: '95%' }}>
                    <MapContainer reportData={reportData} setReportData={setReportData} />
                </View> :
                <Card style={styles.treeCard}>

                    <Card.Content>
                        <Text variant="titleLarge" style={styles.title}>Add a tree</Text>
                        <Pressable onPress={() => setShow(true)}>
                            <View
                                style={styles.AddTree}>
                                <Icon style={{ borderRadius: 50, padding: 3, borderWidth: 1 }} name="add" size={24} color="black" />
                                <Text style={{ color: Color.main, margin: 15, fontSize: 14 }}>Add Tree</Text>
                            </View>
                        </Pressable>
                        {DATA?.length > 0 && <View>
                            <FlatList
                                data={DATA}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                numColumns={2} // Number of boxes per row
                            />
                        </View>}
                    </Card.Content>
                </Card>}
        </View>
    )
}

export default AddTree
import { SafeAreaView, View, Text, Pressable, FlatList } from "react-native";
import SegmentedControl from '../../../common/segments';
import { dbh, height } from "../../../constants/reportConstant"

import { useState } from "react";
import { TextInput, Card, Button } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";

const TreeHeight = ({ reportData, setReportData }) => {
    const [show, setShow] = useState(false)

    return (
        <View style={styles.stepContainer}>
            {/* <SegmentedControl /> */}
            <Card style={styles.card}>
                <Card.Content style={{ marginVertical: 10 }}>
                    <Text variant="titleLarge" style={styles.title}>Tree DBH?</Text>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                label="Tree DBH"
                                mode="flat"
                                theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                                style={{ backgroundColor: 'transparent', fontSize: 16, flex: 1, paddingHorizontal: 0 }}
                                value={reportData.treeDBH}
                                onChangeText={(text) => setReportData({ ...reportData, treeDBH: text })}
                                textColor={Color.black}
                            />
                            <SegmentedControl options={dbh} label="treeDBH" reportData={reportData} setReportData={setReportData} />
                        </View>
                    </View>
                </Card.Content>
                <Card.Content style={{ marginVertical: 50 }}>
                    <Text variant="titleLarge" style={styles.title}>How tall is this tree?</Text>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                label="Tree Height"
                                mode="flat"
                                theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                                style={{ backgroundColor: "transparent", flex: 1, fontSize: 16, paddingHorizontal: 0 }}
                                value={reportData.treeHeight}
                                onChangeText={(text) => setReportData({ ...reportData, treeHeight: text })}
                                textColor={Color.black}
                            />

                            <SegmentedControl options={height} label="treeHeight" reportData={reportData} setReportData={setReportData} />
                        </View></View>


                </Card.Content>
            </Card>
        </View>
    )
}

export default TreeHeight
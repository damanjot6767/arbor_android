import { SafeAreaView, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { TextInput, Card, RadioButton } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";
import { fetchHealthRate, fetchRecomendation, getJurisdiction } from '../../../actions/tree';
import { useDispatch, useSelector } from "react-redux";
import { treeDistance } from "../../../constants/reportConstant";

const TreeDistance = ({ reportData, setReportData }) => {

    const renderOptions = (item) => {

        return (
            <View key={item}>
                <RadioButton.Item
                    label={item}
                    value={item}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        );

    };
    return (
        <View style={styles.stepContainer}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>Is the tree near any structures or power lines?</Text>
                    <RadioButton.Group
                        onValueChange={(newValue) => setReportData({ ...reportData, treeDistance: newValue })}
                        value={reportData.treeDistance}>
                        {treeDistance.map(renderOptions)}
                    </RadioButton.Group>
                </Card.Content>
            </Card>
        </View>
    )

}

export default TreeDistance
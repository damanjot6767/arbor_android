import { SafeAreaView, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { TextInput, Card, RadioButton } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";
import { fetchHealthRate, fetchRecomendation, getJurisdiction } from '../../../actions/tree';
import { useDispatch, useSelector } from "react-redux";

const Jurisdiction = ({ reportData, setReportData }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getJurisdiction())
    }, [])

    const { jurisdiction } = useSelector(({ tree }) => tree)
    const renderOptions = (item) => {
        return (
            <View key={item?._id}>
                <RadioButton.Item
                    label={item.jurisdiction}
                    value={item._id}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        )
    }
    return (
        <View style={styles.stepContainer}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>
                        Jurisdiction</Text>
                    <RadioButton.Group
                        onValueChange={(newValue) => setReportData({ ...reportData, jurisdiction: newValue })}
                        value={reportData.jurisdiction}>
                        {jurisdiction.map(renderOptions)}
                    </RadioButton.Group>
                </Card.Content>
            </Card>
        </View>
    )

}

export default Jurisdiction
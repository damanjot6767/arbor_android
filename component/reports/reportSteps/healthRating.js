import { SafeAreaView, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { TextInput, Card, RadioButton } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";
import { fetchHealthRate, fetchRecomendation, getJurisdiction } from '../../../actions/tree';
import { useDispatch, useSelector } from "react-redux";

const HealthRate = ({ reportData, setReportData }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchHealthRate())
    }, [])
    
    const { healthRate } = useSelector(({ tree }) => tree)
    const renderOptions = (item) => {
        return (
            <View key={item?._id}>
                <RadioButton.Item
                    label={item.rating}
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
                    <Text variant="titleLarge" style={styles.title}>What is the health rating of this tree?</Text>
                    <RadioButton.Group
                        onValueChange={(newValue) => setReportData({ ...reportData, healthRating: newValue })}
                        value={reportData.healthRating}>
                        {healthRate.map(renderOptions)}
                    </RadioButton.Group>
                </Card.Content>
            </Card>
        </View>
    )

}

export default HealthRate
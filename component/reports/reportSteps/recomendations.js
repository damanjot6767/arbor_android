import { SafeAreaView, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { TextInput, Card, RadioButton } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";
import { fetchHealthRate, fetchRecomendation, getJurisdiction } from '../../../actions/tree';
import { useDispatch, useSelector } from "react-redux";

const Recomendation = ({ reportData, setReportData }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRecomendation())
    }, [])

    const { recomendations } = useSelector(({ tree }) => tree)
    const renderOptions = (item) => {
        return (
            <View key={item?._id}>
                <RadioButton.Item
                    label={item.recomendation}
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
                        Recomendations</Text>
                    <RadioButton.Group
                        onValueChange={(newValue) => setReportData({...reportData, recomendations:newValue})}
                        value={reportData.recomendations}>
                        {recomendations.map(renderOptions)}
                    </RadioButton.Group>
                </Card.Content>
            </Card>
        </View>
    )

}

export default Recomendation
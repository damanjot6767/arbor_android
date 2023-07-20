import { SafeAreaView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { TextInput, Card, ActivityIndicator } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";
import { SelectList } from "react-native-dropdown-select-list";
import { fetchClients } from '../../../actions/client';
import { getclientProperty } from "../../../actions/property";
import { useDispatch, useSelector } from "react-redux";

const Property = ({ reportData, setReportData }) => {
    const dispatch = useDispatch()
    const [selected, setSelected] = useState("")
    const [propertyData, setPropertyData] = useState(null)


    useEffect(() => {
        reportData.client && dispatch(getclientProperty(reportData.client?._id))
    }, [reportData.client])
    const { clientProperty, loader } = useSelector(({ property }) => property)


    useEffect(() => {
        let newArray = clientProperty?.map((item) => {
            return { key: item._id, value: item.propertyName }
        })
        setPropertyData(newArray)
    }, [])

    console.log("reportData", reportData?.property)
    const handlePropertySelect = () => {
        const selectedOption = clientProperty.find((option) => option._id === selected);
        console.log("seeeeeeee", selectedOption)
        setReportData({ ...reportData, property: selectedOption })
    }
    return (
        <View style={styles.stepContainer}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>Please select a property</Text>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={propertyData}
                        defaultOption={{ key:reportData?.property?._id, value:reportData?.property?.propertyName }}   //default selected option
                        onSelect={handlePropertySelect}
                        boxStyles={{
                            borderRadius: 0,
                            marginTop: 10,
                            borderTopWidth: 0,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            paddingHorizontal: 0,
                            borderBottomColor: Color.gray,
                        }}
                        inputStyles={{ color: Color.gray, fontSize: 16, padding: 0 }}
                        placeholder="Select Property "
                        dropdownStyles={{ paddingHorizontal: 10, borderWidth: 0 }}
                        dropdownItemStyles={{
                            height: 50,
                            paddingHorizontal: 0,
                            justifyContent: 'center',
                            borderBottomWidth: 0.8,
                            borderColor: '#8e8e8e',
                        }}
                    />
                </Card.Content>
            </Card>
        </View>
    )

}

export default Property
import { SafeAreaView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { TextInput, Card } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";
import { SelectList } from "react-native-dropdown-select-list";
import { fetchSpecies } from "../../../actions/tree";
import { useDispatch, useSelector } from "react-redux";

const Species = ({ reportData, setReportData }) => {
    const dispatch = useDispatch()
    const [selected, setSelected] = useState("")
    const [speciesData, setSpeciesData] = useState(null)
    useEffect(() => {
        dispatch(fetchSpecies())
    }, [])
    const { species } = useSelector(({ tree }) => tree)

    useEffect(() => {
        let newArray = species?.map((item) => {
            return { key: item._id, value: item.commonName }
        })
        setSpeciesData(newArray)
    }, [])

    const handleSpecies = () => {
        const selectedOption = species.find((option) => option._id === selected);
        setReportData({ ...reportData, species: selectedOption })
    }
    return (
        <View style={styles.stepContainer}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>What species is this tree?</Text>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={speciesData}
                        onSelect={handleSpecies}
                        defaultOption={{ key: reportData?.species?._id, value: reportData?.species?.commonName }}   //default selected option
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
                        placeholder="Select Species"
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

export default Species
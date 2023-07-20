import { SafeAreaView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { TextInput, Card } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";
import { SelectList } from "react-native-dropdown-select-list";
import { fetchClients } from '../../../actions/client';
import { useDispatch, useSelector } from "react-redux";

const Client = ({ reportData, setReportData }) => {
    const dispatch = useDispatch()
    const [selected, setSelected] = useState("")
    const [clientData, setClientData] = useState(null)
    const { reports } = useSelector(({ report }) => report)

    useEffect(() => {
        dispatch(fetchClients())
    }, [])

    useEffect(() => {
        let newArray = clients.map((item) => {
            return { key: item._id, value: item.clientName }
        })
        setClientData(newArray)
    }, [])

    const handleClientSelect = () => {
        const selectedOption = clients.find((option) => option._id === selected);
        setReportData({ ...reportData, client: selectedOption })
    }
    const { clients } = useSelector(({ client }) => client)
    return (
        <View style={styles.stepContainer}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>Please select a client</Text>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={clientData}
                        onSelect={handleClientSelect}
                        defaultOption={{ key:reportData?.client?._id, value:reportData?.client?.clientName }}   //default selected option
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
                        // placeholder="Select Client Type"
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

export default Client
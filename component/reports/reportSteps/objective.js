import { SafeAreaView, View, Text } from "react-native";
import { TextInput, Card } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";

const Objective = ({ reportData, setReportData }) => {
    return (
        <View style={styles.stepContainer}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>What is the objective of this report?</Text>
                    <TextInput
                        label="Objective"
                        mode="flat"
                        multiline
                        theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                        style={{ backgroundColor: "transparent", fontSize: 16, paddingHorizontal: 0 }}
                        value={reportData.objective}
                        onChangeText={(text) => setReportData({ ...reportData, objective: text })}
                        textColor={Color.black}
                    />
                </Card.Content>
            </Card>
        </View>
    )
}

export default Objective
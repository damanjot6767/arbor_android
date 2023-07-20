import { SafeAreaView, View, Text } from "react-native";
import { TextInput, Card } from "react-native-paper";
import styles from "../reportStyle/style";
import { Color } from "../../../constants/colors";

const ReportName = ({ reportData, setReportData }) => {
    return (
        <View style={styles.stepContainer}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>Please name your report</Text>

                    <TextInput
                        label="Report Name"
                        mode="flat"
                        theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                        style={{ backgroundColor: "transparent", fontSize: 16, paddingHorizontal: 0 }}
                        value={reportData.reportName}
                        onChangeText={(text) => setReportData({ ...reportData, reportName: text })}
                        textColor={Color.black}
                    />
                </Card.Content>
            </Card>
        </View>
    )

}

export default ReportName
import { StyleSheet } from "react-native";
import { Color } from "../../../constants/colors";

 const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        width: "100%",
        height: "100%",

    },
    container: {
        flex: 1,
        padding: 20,
        // margin: 20

    },
    card: {
        // flex:1,
        // margin: 16,
        minHeight: 150,
        maxHeight: 'auto',
        // height: 150,
        backgroundColor: Color.white
    },
    treeCard: {
        marginBottom: 25,
        width: '100%',
        height: '80%'
    },
    AddTree: {
        height: 180,
        width: 150,
        margin: 5,
        padding: 4,
        elevation: 5,
        backgroundColor: Color.main1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'

    },
    title: {
        textAlign: 'center',
        color: Color.black,
        fontSize: 18, margin: 5
    },
    progressContainer: {
        width: '100%',
        height: 5,
        borderRadius: 30,
        backgroundColor: 'lightgray',
    },
    progressBar: {
        height: '100%',
        paddingHorizontal: 0,
        borderRadius: 30,
        backgroundColor: Color.main,
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
    },
    button: {
        padding: 5,
        marginBottom:"20%",
        borderRadius: 50,
    },
    nextButton: {
        width: '40%',
        padding: 5,
        marginBottom:"20%",
        borderRadius: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles
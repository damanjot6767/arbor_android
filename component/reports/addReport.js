import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { Color } from '../../constants/colors';
const steps =['1','2','3','4','5','6','7','8','9','10','11','12']
const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dateOfBirth: '',
    });

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = () => {
        // Process the form data here
        console.log(formData);
        // You can perform further actions like submitting the data to a server or saving it locally.
    };

    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${(step - 1) * 5.55}%` }]} />
            </View>
            <View style={styles.container}>
                {step === 1 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>Please name your report</Text>
                                <TextInput
                                    label="Report Name"
                                    mode="flat"
                                    // style={{ }}
                                    theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                                    style={{ backgroundColor: "transparent", fontSize: 16, paddingHorizontal: 0 }}
                                    value={formData.name}
                                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                                    textColor={Color.black}
                                />
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 2 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>Please select a client</Text>
                                <TextInput
                                    label="Client Name"
                                    mode="flat"
                                    theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                                    style={{ backgroundColor: "transparent", fontSize: 16, paddingHorizontal: 0 }}
                                    value={formData.name}
                                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                                    textColor={Color.black}
                                />
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 3 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>Please Select a property</Text>
                                <TextInput
                                    label="Property Name"
                                    mode="flat"
                                    theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                                    style={{ backgroundColor: "transparent", fontSize: 16, paddingHorizontal: 0 }}
                                    value={formData.name}
                                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                                    textColor={Color.black}
                                />
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 4 && (
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
                                    value={formData.name}
                                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                                    textColor={Color.black}
                                />
                            </Card.Content>
                        </Card>
                    </View>
                )}
                 {step === 5 && (
                    <View>
                        <Card style={styles.treeCard}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>Add a Tree</Text>
                                <Card style={styles.AddTree}>

                                </Card>
                                
                               
                            </Card.Content>
                        </Card>
                    </View>
                )}
                <View style={step !== 1 && styles.buttonsContainer}>
                    {step > 1 && (
                        <Button
                            style={step === 1 ? styles.button : styles.nextButton}
                            contentStyle={{ flexDirection: 'row-reverse' }}
                            mode="contained"
                            labelStyle={{ fontSize: 15, marginRight: 28 }}
                            buttonColor={Color.main}
                            onPress={handlePreviousStep}>
                            Previous
                        </Button>
                    )}
                    {step < steps?.length && (
                        <Button
                            style={step === 1 ? styles.button : styles.nextButton}
                            contentStyle={{ flexDirection: 'row-reverse' }}
                            mode="contained"
                            labelStyle={{ fontSize: 15, marginRight: 28 }}
                            buttonColor={Color.main}
                            onPress={handleNextStep}>
                            Next
                        </Button>
                        // <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                        //     <Text style={styles.buttonText}>Next</Text>
                        // </TouchableOpacity>
                    )}
                    {step === steps?.length && (
                        <Button
                            style={styles.button}
                            contentStyle={{ flexDirection: 'row-reverse' }}
                            mode="contained"
                            labelStyle={{ fontSize: 15, marginRight: 28 }}
                            buttonColor={Color.main}
                            onPress={handleNextStep}>
                            Submit
                        </Button>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

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
    treeCard:{
        width: "100%",
        height: "95%",
    },
    AddTree:{
        width:'55%',
        height:'65%',
        marginVertical:15,
        backgroundColor: '#ECF4F3',

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
        borderRadius: 50,
    },
    nextButton: {
        width: '40%',
        padding: 5,
        borderRadius: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MultiStepForm;

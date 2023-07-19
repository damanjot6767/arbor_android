import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView, Dimensions, Pressable } from 'react-native';
import { Card, TextInput, Button, RadioButton } from 'react-native-paper';
import { Color } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapContainer from '../../common/mapContainer';
import SegmentedControl from '../../common/segments';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHealthRate, fetchRecomendation, getJurisdiction } from '../../actions/tree';
import { fetchClients } from '../../actions/client';
import { SelectList } from 'react-native-dropdown-select-list';
import {DATA, heritageTree, hardScapeDamage, treeDistance, level, steps, dbh, height, secondaryReport, diseasePresent} from "../../constants/reportConstant"


const MultiStepForm = ({ navigation }) => {
    const dispatch = useDispatch()
    const [step, setStep] = useState(1);
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState("")
    const [clientData, setClientData] = useState(null)
    const [value, setValue] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dateOfBirth: '',
    });

    useEffect(() => {
        dispatch(fetchClients())
        dispatch(fetchHealthRate())
        dispatch(getJurisdiction())
        dispatch(fetchRecomendation())
    }, [])

    useEffect(() => {
        let newArray = clients.map((item) => {
            return { key: item._id, value: item.clientName }
        })
        setClientData(newArray)
    }, [])
    const { clients } = useSelector(({ client }) => client)
    const { healthRate, jurisdiction, recomendations } = useSelector(({ tree }) => tree)

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
    const renderItem = ({ item }) => (

        <Pressable onPress={() => setShow(true)}>
            <View
                style={styles.AddTree}>
                <Icon style={{ borderRadius: 50, padding: 3, borderWidth: 1 }} name="add" size={24} color="black" />
                <Text style={{ color: Color.main, margin: 15, fontSize: 14 }}>Add Tree</Text>
            </View>
        </Pressable>
    );
    const renderTreeImage = ({ item }) => (

        <Pressable onPress={() => setShow(true)}>
            <View
                style={styles.AddTree}>
                <Icon style={{ borderRadius: 50, padding: 3, borderWidth: 1 }} name="add" size={24} color="black" />
                <Text style={{ color: Color.main, margin: 15, fontSize: 14 }}>Add Tree Image</Text>
            </View>
        </Pressable>
    );
    const renderOptions = (item) => {
        if (step === 9) {
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
            );
        }
        else if (step === 10) {
            return (
                <View key={item}>
                    <RadioButton.Item
                        label={item}
                        value={item}
                        color="black"
                        labelStyle={{
                            color: 'black'
                        }}
                    />
                </View>
            );
        }
        else if (step === 11) {
            return (
                <View key={item}>
                    <RadioButton.Item
                        label={item}
                        value={item}
                        color="black"
                        labelStyle={{
                            color: 'black'
                        }}
                    />
                </View>
            );
        }
        else if (step === 12) {
            return (
                <View key={item}>
                    <RadioButton.Item
                        label={item}
                        value={item}
                        color="black"
                        labelStyle={{
                            color: 'black'
                        }}
                    />
                </View>
            );
        }
        else if (step === 13) {
            return (
                <View key={item}>
                    <RadioButton.Item
                        label={item}
                        value={item}
                        color="black"
                        labelStyle={{
                            color: 'black'
                        }}
                    />
                </View>
            );
        }
        else if (step === 14) {
            return (
                <View key={item?._id}>
                    <RadioButton.Item
                        label={item?.jurisdiction}
                        value={item?._id}
                        color="black"
                        labelStyle={{
                            color: 'black'
                        }}
                    />
                </View>
            );
        }
        else if (step === 15) {
            return (
                <View key={item}>
                    <RadioButton.Item
                        label={item}
                        value={item}
                        color="black"
                        labelStyle={{
                            color: 'black'
                        }}
                    />
                </View>
            );
        }
        else if (step === 17) {
            return (
                <View key={item}>
                    <RadioButton.Item
                        label={item}
                        value={item}
                        color="black"
                        labelStyle={{
                            color: 'black'
                        }}
                    />
                </View>
            );
        }
        else if (step === 18) {
            return (
                <View key={item?._id}>
                    <RadioButton.Item
                        label={item?.recomendation}
                        value={item?._id}
                        color="black"
                        labelStyle={{
                            color: 'black'
                        }}
                    />
                </View>
            );
        }


    };
    
    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${(step) * 5.55}%` }]} />
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
                                <SelectList
                                    setSelected={setSelected}
                                    data={clientData}
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
                                    placeholder="Select Client Type"
                                    dropdownStyles={{ paddingHorizontal: 10, borderWidth: 0 }}
                                    dropdownItemStyles={{
                                        height: 50,
                                        paddingHorizontal:0,
                                        justifyContent: 'center',
                                        borderBottomWidth: 0.8,
                                        borderColor: '#8e8e8e',
                                    }}
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
                    <View style={styles.stepContainer} >
                        {show ?
                            <View style={{ height: '95%' }}>
                                <MapContainer />
                            </View> :
                            <Card style={styles.treeCard}>
                                <Card.Content>
                                    <Text variant="titleLarge" style={styles.title}>Add a tree</Text>
                                    <View>
                                        <FlatList
                                            data={DATA}
                                            renderItem={renderItem}
                                            keyExtractor={(item) => item.id}
                                            numColumns={2} // Number of boxes per row
                                        />
                                    </View>
                                </Card.Content>
                            </Card>}
                    </View>

                )}
                {step === 6 && (
                    <View style={styles.stepContainer} >
                        <Card style={styles.treeCard}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>Images</Text>
                                <View>
                                    <FlatList
                                        data={DATA}
                                        renderItem={renderTreeImage}
                                        keyExtractor={(item) => item.id}
                                        numColumns={2} // Number of boxes per row
                                    />
                                </View>
                            </Card.Content>
                        </Card>
                    </View>

                )}
                {step === 7 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>What species is this tree?</Text>
                                <TextInput
                                    label="Select Species"
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
                {step === 8 && (
                    <View style={styles.stepContainer}>
                        {/* <SegmentedControl /> */}
                        <Card style={styles.card}>
                            <Card.Content style={{ marginVertical: 10 }}>
                                <Text variant="titleLarge" style={styles.title}>Tree DBH?</Text>
                                <TextInput
                                    label="Tree DBH"
                                    mode="flat"
                                    theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                                    style={{ backgroundColor: "transparent", fontSize: 16, paddingHorizontal: 0 }}
                                    value={formData.name}
                                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                                    textColor={Color.black}
                                    render={() => (
                                        <View style={{ flex: 1, alignItems: "flex-end", marginTop: 8 }}>
                                            <SegmentedControl options={dbh} />
                                        </View>
                                    )}
                                // left={<SegmentedControl />}
                                />
                            </Card.Content>
                            <Card.Content style={{ marginVertical: 50 }}>
                                <Text variant="titleLarge" style={styles.title}>How tall is this tree?</Text>
                                <TextInput
                                    label="Tree Height"
                                    mode="flat"
                                    theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                                    style={{ backgroundColor: "transparent", fontSize: 16, paddingHorizontal: 0 }}
                                    value={formData.name}
                                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                                    textColor={Color.black}
                                    render={() => (
                                        <View style={{ flex: 1, alignItems: "flex-end", marginTop: 8 }}>
                                            <SegmentedControl options={height} />
                                        </View>
                                    )}
                                />
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 9 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>What is the health rating of this tree?</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) => setValue(newValue)}
                                    value={value}>
                                    {healthRate.map(renderOptions)}
                                </RadioButton.Group>
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 10 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>Is there hardscape damage?</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) => setValue(newValue)}
                                    value={value}>
                                    {hardScapeDamage.map(renderOptions)}
                                </RadioButton.Group>
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 11 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>Select inspection level</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) => setValue(newValue)}
                                    value={value}>
                                    {level.map(renderOptions)}
                                </RadioButton.Group>
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 12 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>Is the tree near any structures or power lines?</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) => setValue(newValue)}
                                    value={value}>
                                    {treeDistance.map(renderOptions)}
                                </RadioButton.Group>
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 13 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>
                                    Is this a heritage tree?</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) => setValue(newValue)}
                                    value={value}>
                                    {heritageTree.map(renderOptions)}
                                </RadioButton.Group>
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 14 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>
                                    Jurisdiction</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) => setValue(newValue)}
                                    value={value}>
                                    {jurisdiction.map(renderOptions)}
                                </RadioButton.Group>
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 15 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>
                                    Any Disease present?</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) => setValue(newValue)}
                                    value={value}>
                                    {diseasePresent.map(renderOptions)}
                                </RadioButton.Group>
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 16 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>What are your Observations?</Text>
                                <TextInput
                                    label="Observations"
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
                {step === 17 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>
                                    Is secondary report required?</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) => setValue(newValue)}
                                    value={value}>
                                    {secondaryReport.map(renderOptions)}
                                </RadioButton.Group>
                            </Card.Content>
                        </Card>
                    </View>
                )}
                {step === 18 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>
                                    Recomendations</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) => setValue(newValue)}
                                    value={value}>
                                    {recomendations.map(renderOptions)}
                                </RadioButton.Group>
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
        </SafeAreaView >
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

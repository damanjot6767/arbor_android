import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView, Dimensions, Pressable } from 'react-native';
import { Card, TextInput, Button, RadioButton } from 'react-native-paper';
import { Color } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addReport, updateReport } from '../../actions/report';
import { steps } from '../../constants/reportConstant';
import {
    ReportName, Client, Property, Objective, AddTree, TreeImage, Species,
    TreeHeight, HealthRate, HardScapeDamage, InspectionLevel, TreeDistance, HeritageTree, Jurisdiction, SecondaryReport, Recomendation,
    DiseasePresent, Observations
} from "./reportSteps";
import { addTree, editTree as editTrees } from '../../actions/tree';
import styles from './reportStyle/style';
import { ReportErrorAlert } from './alert';
import { report } from '../../reducers/report';

const AddReport = ({ navigation }) => {
    const dispatch = useDispatch()
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState('draft')
    const { reports } = useSelector(({ report }) => report)
    const { trees, editTree } = useSelector(({ tree }) => tree)
    console.log("reports", reports)
    const [reportData, setReportData] = useState({
        reportName: '',
        client: '',
        property:  '',
        objective : "The Objective of this report is",
        treeLat: "",
        treeLong: "",
        treeAddress: "",
        treeImage: [],
        treeMapImage: "",
        species: "",
        treeDBHUnit: "",
        treeDBH: "",
        treeHeight: "",
        treeHeightUnit: "",
        healthRating: "",
        hardscapedamage: "",
        hardScapeDamageImage: "",
        hardScapeDamageImageCaption: "",
        damageReason: "",
        level: "",
        treeDistance: "",
        treeDistanceDesc: "",
        treeDistanceImage: "",
        treeDistanceImageCaption: "",
        heritageTree: "",
        heritageDesc: "",
        heritageImage: "",
        heritageImageCaption: "",
        observations: "My Observation for this tree is",
        secondaryReport: "",
        jurisdiction: "",
        diseasePresent: "",
        diseasePresentDesc: "",
        diseasePresentImage: "",
        diseasePresentImageCaption: "",
        recomendations: "",

    });

    console.log("reportData", reportData);

    const handleStatus = () => {
        if (reportData.reportName && reportData.client && reportData.property && reportData.objective &&
            reportData.treeLat && reportData.treeLong && reportData.level && reportData.healthRating &&
            reportData.observations && reportData.recomendations?.length > 0 && reportData.treeAddress &&
            reportData.hardscapedamage && reportData.treeDistance !== null && reportData.treeMapImage &&
            reportData.treeImage?.length > 0 && reportData.treeHeight && reportData.heritageTree !== null &&
            reportData.secondaryReport !== null && reportData.jurisdiction
            && reportData.diseasePresent !== null) {
            setStatus("completed")
        } else {
            setStatus("draft")
        }
    }
    const handleNextStep = () => {
        const reportId = reports?._id
        switch (step) {
            case 1:
                if (reportData?.reportName) {
                    handleStatus()
                    const data = {
                        reportName: reportData.reportName ? reportData.reportName : "",
                        pageNumber: step,
                        status: status
                    }
                    setStep((prevStep) => prevStep + 1);

                    reportId ? dispatch(updateReport(reportId, data)) :
                        dispatch(addReport(data))
                } else {
                    ReportErrorAlert("Please enter report name")
                }
                break;
            case 2:
                if (reportData.client) {
                    handleStatus()
                    const data = {
                        reportName: reportData.reportName ? reportData.reportName : "",
                        client: reportData.client ? reportData.client?._id : "",
                        property: "",
                        pageNumber: step,
                        status: status
                    }
                    setReportData({ ...reportData, property: "" })
                    reportId ? dispatch(updateReport(reportId, data)) :
                        dispatch(addReport(data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please Select Client ")
                }

                break;
            case 3:
                if (reportData.property) {
                    handleStatus()
                    const data = {
                        pageNumber: step,
                        property: reportData.property ? reportData.property?._id : "",
                        status: status
                    }
                    reportId ? dispatch(updateReport(reportId, data)) :
                        dispatch(addReport(data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please Select Property")
                }
                break;
            case 4:
                if (reportData.objective !== "" && reportData.objective !== undefined) {
                    handleStatus()
                    const data = {
                        pageNumber: step,
                        objective: reportData.objective ? reportData.objective : "",
                        status: status
                    }
                    reportId ? dispatch(updateReport(reportId, data)) :
                        dispatch(addReport(data))
                    setStep((prevStep) => prevStep + 1);
                }
                break;
            case 5:
                if (reportData?.treeLat !== "" && reportData?.treeLong !== undefined) {
                    handleStatus()
                    const treeMap = {
                        treeLat: reportData?.treeLat,
                        treeLong: reportData?.treeLong,
                        treeAddress: reportData?.treeAddress,
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, treeMap)) :
                    trees?._id ? dispatch(editTrees(trees?.report, trees?._id, treeMap)) :
                        dispatch(addTree(reports?._id, treeMap))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please Select Tree Location")
                }
                break;
            case 6:
                // if (reportData.treeImage.length > 0) {
                //     handleStatus()
                //     const treesImages = {
                //         treeImages: formik.values.treeImage
                //     }
                //     const page = {
                //         pageNumber: activeStep,
                //         status: status
                //     }
                //     dispatch(updateReport(reportId, page))
                //     editClick ? dispatch(editTrees(editTree?.report, editTree?._id, treesImages)) :
                //         trees?._id ? dispatch(editTrees(trees?.report, trees?._id, treesImages)) :
                //             dispatch(addTree(reports?._id, treesImages))
                setStep((prevStep) => prevStep + 1);

                // }
                break;
            case 7:
                if (reportData?.species) {
                    handleStatus()
                    let data
                    // if (formik.values.commonName || formik.values.scientificName) {
                    //     data = {
                    //         otherSpeciesCommonName: formik.values.commonName,
                    //         otherSpeciesScientificName: formik.values.scientificName,
                    //         species: ""
                    //     }
                    // } else {
                    data = {
                        species: reportData.species?._id,
                        otherSpeciesCommonName: "",
                        otherSpeciesScientificName: "",
                        // }
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                    trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                        dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please Select Species")
                }

                break;
            case 8:
                if (reportData?.treeHeight && reportData?.treeDBH) {
                    handleStatus()
                    const data = {
                        treeDBH: reportData.treeDBH,
                        treeDBHUnit: reportData.treeDBHUnit,
                        treeHeight: reportData.treeHeight,
                        treeHeightUnit: reportData.treeHeightUnit
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                    trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                        dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please Select Tree DBH and Height")
                }
                break;
            case 9:
                if (reportData?.healthRating) {
                    handleStatus()
                    const data = {
                        healthRating: reportData.healthRating
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                    trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                        dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please select an option")
                }
                break;
            case 10:
                if (reportData.hardscapedamage !== "" && reportData.hardscapedamage !== null && reportData.hardscapedamage !== undefined) {
                    handleStatus()
                    const data = {
                        hardScapeDamage: reportData.hardscapedamage,
                        damageReason: reportData.damageReason ? reportData.damageReason : "",
                        hardScapeDamageImage: reportData.hardScapeDamageImage ? reportData.hardScapeDamageImage : "",
                        hardScapeDamageImageCaption: reportData.hardScapeDamageImageCaption ? reportData.hardScapeDamageImageCaption : ""
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                    trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                        dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please select an option")
                }
                break;
            case 11:
                if (reportData.level !== "" && reportData.level !== null && reportData.level !== undefined) {
                    handleStatus()
                    const data = {
                        inspectionLevel: reportData.level
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                        trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                            dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please select an option")
                }
                break;
            case 12:
                if (reportData.treeDistance !== "" && reportData.treeDistance !== null && reportData.treeDistance !== undefined) {
                    handleStatus()
                    const data = {
                        isTreeDistance: reportData.treeDistance,
                        treeDistanceDesc: reportData.treeDistanceDesc ? reportData.treeDistanceDesc : "",
                        treeDistanceImage: reportData.treeDistanceImage ? reportData.treeDistanceImage : "",
                        treeDistanceImageCaption: reportData.treeDistanceImageCaption ? reportData.treeDistanceImageCaption : ""
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                        trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                            dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please select an option")
                }
                break;
            case 13:
                if (reportData.heritageTree !== "" && reportData.heritageTree !== null && reportData.heritageTree !== undefined) {
                    handleStatus()
                    const data = {
                        isHeritageTree: reportData.heritageTree,
                        heritageDesc: reportData.heritageDesc ? reportData.heritageDesc : "",
                        heritageImage: reportData.heritageImage ? reportData.heritageImage : "",
                        heritageImageCaption: reportData.heritageImageCaption ? reportData.heritageImageCaption : ""
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                        trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                            dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please select an option")
                }
                break;
            case 14:
                if (reportData.jurisdiction !== "" && reportData.jurisdiction !== undefined && reportData.jurisdiction !== null) {
                    handleStatus()
                    const data = {
                        jurisdiction: reportData.jurisdiction
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                    trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                        dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please select an option")
                }
                break;
            case 15:
                if (reportData.diseasePresent !== "" && reportData.diseasePresent !== undefined && reportData.diseasePresent !== null) {
                    handleStatus()
                    const data = {
                        diseasePresent: reportData.diseasePresent,
                        diseasePresentDesc: reportData.diseasePresentDesc ? reportData.diseasePresentDesc : "",
                        diseasePresentImage: reportData.diseasePresentImage ? reportData.diseasePresentImage : "",
                        diseasePresentImageCaption: reportData.diseasePresentImageCaption ? reportData.diseasePresentImageCaption : ""
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                    trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                        dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please select an option")
                }
                break;
            case 16:
                if (reportData.observations !== "" && reportData.observations !== undefined) {
                    handleStatus()
                    const data = {
                        observations: reportData.observations
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                    trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                        dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                }
                break;
            case 17:
                if (reportData.secondaryReport !== "" && reportData.secondaryReport !== null && reportData.secondaryReport !== undefined) {
                    handleStatus()
                    const data = {
                        isSecondaryReportRequired: reportData.secondaryReport
                    }
                    const page = {
                        pageNumber: step,
                        status: status
                    }
                    dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(e/ditTree?.report, editTree?._id, data)) :
                        trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                            dispatch(addTree(reports?._id, data))
                    setStep((prevStep) => prevStep + 1);
                } else {
                    ReportErrorAlert("Please select an option")
                }
                break;
            case 18:
                if (reportData?.recomendations) {
                    // handleStatus()
                    // const data = {
                    //     recomendations: recomValues
                    // }
                    // const page = {
                    //     pageNumber: step,
                    //     status: status
                    // }
                    // dispatch(updateReport(reportId, page))
                    // editClick ? dispatch(editTrees(editTree?.report, editTree?._id, data)) :
                    //     trees?._id ? dispatch(editTrees(trees?.report, trees?._id, data)) :
                    //         dispatch(addTree(reports?._id, data))
                    // handleComplete()
                }
                break;
        }
    }

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = () => {
        // Process the form data here
        console.log(formData);
        // You can perform further actions like submitting the data to a server or saving it locally.
    };

    const formContent = (step) => {
        switch (step) {
            case 1:
                return <ReportName reportData={reportData} setReportData={setReportData} />;
            case 2:
                return <Client reportData={reportData} setReportData={setReportData} />;
            case 3:
                return <Property reportData={reportData} setReportData={setReportData} />;
            case 4:
                return <Objective reportData={reportData} setReportData={setReportData} />;
            case 5:
                return <AddTree reportData={reportData} setReportData={setReportData} />;
            case 6:
                return <TreeImage reportData={reportData} setReportData={setReportData} />;
            case 7:
                return <Species reportData={reportData} setReportData={setReportData} />;
            case 8:
                return <TreeHeight reportData={reportData} setReportData={setReportData} />;
            case 9:
                return <HealthRate reportData={reportData} setReportData={setReportData} />;
            case 10:
                return <HardScapeDamage reportData={reportData} setReportData={setReportData} />;
            case 11:
                return <InspectionLevel reportData={reportData} setReportData={setReportData} />;
            case 12:
                return <TreeDistance reportData={reportData} setReportData={setReportData} />;
            case 13:
                return <HeritageTree reportData={reportData} setReportData={setReportData} />;
            case 14:
                return <Jurisdiction reportData={reportData} setReportData={setReportData} />;
            case 15:
                return <DiseasePresent reportData={reportData} setReportData={setReportData} />;
            case 16:
                return <Observations reportData={reportData} setReportData={setReportData} />;
            case 17:
                return <SecondaryReport reportData={reportData} setReportData={setReportData} />;
            case 18:
                return <Recomendation reportData={reportData} setReportData={setReportData} />;
            default:
                return <View>404: Not Found</View>
        }
    };
    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${(step) * 5.55}%` }]} />
            </View>
            <View style={styles.container}>
                {formContent(step)}

                {/* {step === 13 && (
                    <View style={styles.stepContainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>
                                    Is this a heritage tree?</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) => setReportData({ ...reportData, heritageTree: newValue })}
                                    value={reportData.heritageTree}>
                                    {heritageTree.map(renderOptions)}
                                </RadioButton.Group>
                            </Card.Content>
                        </Card>
                    </View>
                )} */}
                {/* {step === 14 && (
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
                )} */}
                {/* {step === 15 && (
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
                )} */}
                {/* {step === 16 && (
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
                )} */}
                {/* {step === 17 && (
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
                )} */}
                {/* {step === 18 && (
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
                )} */}
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



export default AddReport;

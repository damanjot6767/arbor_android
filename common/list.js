import { View, Text, TouchableOpacity } from "react-native"
import { Color } from "../constants/colors"
export const ListItem = ({ item, label }) => {

    return (
        <>
            {label === "reports" &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', gap: 6, margin: 3 }}>
                    <View style={{ padding: 15, backgroundColor: Color.white, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 15 }}>
                        <View>
                            <Text style={{ fontSize: 18, marginBottom: 2, color: Color.main, fontWeight: 'bold' }}>{item?.reportName}</Text>
                            <Text style={{ fontSize: 16, marginBottom: 2, color: Color.main, lineHeight: 20 }}>{item?.property?.propertyName}</Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={{ color: 'white', backgroundColor: '#1D4840', paddingHorizontal: 23, paddingVertical: 8, borderRadius: 50 }}>DRAFT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>}
            {
                label === "clients" &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', gap: 6, margin: 3 }}>
                    <View style={{ padding: 15, backgroundColor: Color.white, width: '100%', flexDirection: '1', borderRadius: 15 }}>
                        <Text style={{ fontSize: 18, marginBottom: 2, color: Color.main, fontWeight: 'bold' }}>{item?.clientName}</Text>
                        <Text style={{ fontSize: 16, marginBottom: 2, color: Color.main, lineHeight: 20 }}>{item?.address}</Text>
                    </View>
                </View>
            }
            {
                label === "property" &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', gap: 6, margin: 3 }}>
                    <View style={{ padding: 15, backgroundColor: Color.white, width: '100%', flexDirection: '1', borderRadius: 15 }}>
                        <Text style={{ fontSize: 18, marginBottom: 2, color: Color.main, fontWeight: 'bold' }}>{item?.propertyName}</Text>
                        <Text style={{ fontSize: 16, marginBottom: 2, color: Color.main, lineHeight: 20 }}>{item?.location}</Text>
                    </View>
                </View>
            }
        </>
    )
}


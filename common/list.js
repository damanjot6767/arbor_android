import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import { Color } from "../constants/colors";
import { deleteClientData, setClient } from "../actions/client";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CHILD_WIDTH = SCREEN_WIDTH * 1.05;
export const ListItem = ({ item, label }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSetSelectedItem = (type, row) => {
    console.log("working");
    switch (type) {
      case "client":
        dispatch(setClient(row));
        navigation.navigate("Edit Client");
        break;

        return;
    }
  };

  const handleDeleteItem = (type,id)=>{
    switch(type){
      case 'client':
      dispatch(deleteClientData(id))
    }
  }

  return (
    <>
      {label === "reports" && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 6,
            margin: 3,
          }}
        >
          <View
            style={{
              padding: 15,
              backgroundColor: Color.white,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 15,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 2,
                  color: Color.main,
                  fontWeight: "bold",
                }}
              >
                {item?.reportName}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 2,
                  color: Color.main,
                  lineHeight: 20,
                }}
              >
                {item?.property?.propertyName}
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "#1D4840",
                    paddingHorizontal: 23,
                    paddingVertical: 8,
                    borderRadius: 50,
                  }}
                >
                  DRAFT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {label === "clients" && (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: 3,
              width: CHILD_WIDTH,
              gap: 30,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => handleSetSelectedItem("client", item)}
            >
              <View
                style={{
                  padding: 15,
                  backgroundColor: Color.white,
                  width: "88%",
                  flexDirection: "1",
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 6,
                    color: Color.main,
                    fontWeight: "bold",
                  }}
                >
                  {item?.clientName}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 6,
                    color: Color.main,
                    lineHeight: 20,
                  }}
                >
                  {item?.address}
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <View>
              <Icon name="delete" size={24} color="black" onPress={()=>handleDeleteItem("client",item._id)}/>
            </View>
          </View>
        </ScrollView>
      )}
      {label === "addClient" && (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: 3,
              width: CHILD_WIDTH,
              gap: 30,
            }}
          >
            <View
              style={{
                padding: 15,
                backgroundColor: Color.white,
                width: "84%",
                flexDirection: "1",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 6,
                  color: Color.main,
                  fontWeight: "bold",
                }}
              >
                {item?.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                  color: Color.main,
                  lineHeight: 20,
                }}
              >
                {item?.email}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                  color: Color.main,
                  lineHeight: 20,
                }}
              >{`${item?.countryCode} ${item?.phone}`}</Text>
            </View>
            <View>
              <Icon name="delete" size={24} color="black" />
            </View>
          </View>
        </ScrollView>
      )}
      {label === "editClient" && (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: 3,
              width: CHILD_WIDTH,
              gap: 30,
            }}
          >
            <View
              style={{
                padding: 15,
                backgroundColor: Color.white,
                width: "84%",
                flexDirection: "1",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 6,
                  color: Color.main,
                  fontWeight: "bold",
                }}
              >
                {item?.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                  color: Color.main,
                  lineHeight: 20,
                }}
              >
                {item?.email}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                  color: Color.main,
                  lineHeight: 20,
                }}
              >{`${item?.countryCode} ${item?.phone}`}</Text>
            </View>
            <View>
              <Icon name="delete" size={24} color="black" />
            </View>
          </View>
        </ScrollView>
      )}
      {label === "property" && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 6,
            margin: 3,
          }}
        >
          <View
            style={{
              padding: 15,
              backgroundColor: Color.white,
              width: "100%",
              flexDirection: "1",
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                marginBottom: 2,
                color: Color.main,
                fontWeight: "bold",
              }}
            >
              {item?.propertyName}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 2,
                color: Color.main,
                lineHeight: 20,
              }}
            >
              {item?.location}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SafeAreaView from "react-native-safe-area-view";
// screens
import ListScreen from "./tabnavigator/ListScreen";
import { useEffect, useState } from "react";
import axios from "axios";

const Tab = createMaterialTopTabNavigator();

export default function KorScreen() {
  const [standardData, setStandardData] = useState([]);
  const [expressData, setExpressData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.post(
        "http://st.24mall.mn/rest/V1/kor/shipping/list",
        //production
        // "http://back.24mall.mn/rest/V1/kor/shipping/list",
        {
          shippingStep: "received_in_korea",
          status: "pending",
          pageIndex: 0,
          pageSize: 1000,
        }
      );
      setStandardData(
        res.data.filter((data) => data.service_type === "standard")
      );
      setExpressData(
        res.data.filter((data) => data.service_type === "express")
      );
    })();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#eb8465" }}>
      <Tab.Navigator
        screenOptions={
          {
            headerShown: false,
            tabBarActiveBackgroundColor: "#f0f0f0",
            tabBarShowLabel: true,
          }
        }
        initialRouteName="Express"
      >
        <Tab.Screen name="Агаар">
          {(props) => <ListScreen {...props} data={expressData} />}
        </Tab.Screen>
        <Tab.Screen name="Газар">
          {(props) => <ListScreen {...props} data={standardData} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}

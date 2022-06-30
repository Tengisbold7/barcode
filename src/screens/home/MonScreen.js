import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SafeAreaView from "react-native-safe-area-view";
// screens
import ListScreen from "./tabnavigator/ListScreen";
import { useEffect, useState } from "react";
import {ImageBackground} from 'react-native'
import axios from "axios";

const Tab = createMaterialTopTabNavigator();

export default function MonScreen() {
  const [standardData, setStandardData] = useState([]);
  const [expressData, setExpressData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.post(
        "http://st.24mall.mn/rest/V1/kor/shipping/list",

        //production
        // "http://back.24mall.mn/rest/V1/kor/shipping/list",
        {
          // TODO: replace shippingStep to correct one
          shippingStep: "delivery_complete",
          status: "pending",
          pageIndex: 0,
          pageSize: 1000,
        }
      );
      //console.log(res);
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
             tabBarActiveBackgroundColor: "#eb8465",
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

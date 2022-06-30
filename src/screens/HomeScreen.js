import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
// screens
import MonScreen from "./home/MonScreen";
import BarCodeScreen from "./home/BarCodeScreen";
import KorScreen from "./home/KorScreen";

import { Icon } from "@rneui/base";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "#3a8eaa",
        tabBarShowLabel: false,
        tabBarInactiveBackgroundColor:"#eb8465",
      }}
      initialRouteName="BarCode"
      >
      <Tab.Screen
        name="Mon"
        component={MonScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./../assets/icons/mongolia_flag.png")}
              style={{ width: 35, height: 20 }}
            />
            
          ),
        }}
      />
      <Tab.Screen
        name="BarCode"
        component={BarCodeScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="qr-code-scanner" type="material-icons" color="white" />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Kor"
        component={KorScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./../assets/icons/korea_flag.png")}
              style={{ width: 35, height: 20 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

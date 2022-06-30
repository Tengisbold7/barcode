import { View, Alert, ImageBackground, StyleSheet } from "react-native";
import { Text, Button, Input } from "@rneui/base";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/slices/login";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const dispatch = useDispatch();

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://st.24mall.mn/rest/V1/integration/admin/token",
        { username, password }
      );

      //production
      // const res = await axios.post(
      //   "http://back.24mall.mn/rest/V1/integration/admin/token",
      //   { username, password}
      // );

      await AsyncStorage.setItem("token", res.data);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data}`;
      dispatch(setLogin(true));
    } catch (e) {
      Alert.alert("Username or Password is incorrect");
      setPassword("");
      console.log(e)
    }
    
  };

  const [username, setUserName] = useState("Admin");
  const [password, setPassword] = useState("Admin#073017");
  //production
  // const [username, setUserName] = useState("anhaa_cargo");
  // const [password, setPassword] = useState("Aa#123456");



  return (
      <ImageBackground
        style = {style.background}
        source = {require('../assets/appbackground.jpg')}
      >
        <Text
          style={style.titleText}
        >
        ADMIN
        </Text>
        <Input
          style={style.input}
          placeholder="Username"
          onChangeText={setUserName}
          value={username}
        />
        <Input
          style={style.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <Button 
          style={style.loginButton}
          onPress={loginHandler} 
          title="LOG IN" 
        />
      </ImageBackground>

  );
}
const style = StyleSheet.create({
  background:{
      flex:1,
      justifyContent: 'center',
      alignItems:'center',
  },
  loginButton:{
      width:'50%',
      height:10,
      color:"blue",
  },
  input:{
      height:'10%',
      margin:0,
      borderWidth:0,
      padding:10,
      color:'white',
  },
  titleText:{
      textAlign:'center',
      color:'white',
      fontSize:50,
      fontFamily:'sans-serif-thin',
  },
})

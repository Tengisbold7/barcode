import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, ImageBackground, Alert } from "react-native";
import { Button, Text, Input } from "@rneui/base";
import { BarCodeScanner } from "expo-barcode-scanner";
import Modal from "react-native-modal";
import {SafeAreaView, useSafeAreaInsets,} from "react-native-safe-area-context";
import axios from "axios";
import Image from "react-native-scalable-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {Picker} from '@react-native-picker/picker';

export default function BarCodeScreen() {
  const { top: safeAreaTop } = useSafeAreaInsets();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [data, setData] = useState({});
  const [formatedData, setFormatedData] = useState([]);
  const [qty, setQty] = useState();
  const [productweight, setProductWeight] = useState("");
  const [productNotFound, setProductNotFound] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('no_status');
  const [shippingCost, setShippingCost] = useState();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  const saveProduct = async () => {
    await axios.post(`http://st.24mall.mn/rest/V1/kor/shipping/barcode`, {
      barcode,
      // TODO: require qty
      shipping_step: selectedStatus,
      weight: parseInt(productweight),
      shipping_cost: parseInt(shippingCost),
      qty: parseInt(qty) || 1,
    }).catch(function(error){
      console.log(error);
      return Alert.alert('Хоосон талбар','Төлөв болон талбарыг оруулна уу?', [
        {text: 'За'}
      ])
     
    });
    console.log(barcode,selectedStatus,productweight,shippingCost,qty);

    //production
    // await axios.post(`http://back.24mall.mn/rest/V1/kor/shipping/barcode`, {
      // barcode,
      // // TODO: require qty
      // qty: parseInt(qty) || 1,
      // shipping_step: selectedStatus,
      // weight: parseInt(productweight),
      // shipping_cost: parseInt(shippingCost),
    // });

    setIsResultModalVisible(false);
    setScanned(false);
  };

  const prepareScan = async () => {
    setScanned(false);
    setProductNotFound(false);
  }

  const showResult = async () => {
    setIsResultModalVisible(true);
    // TODO: uncomment below
    const res = await axios.get(
      `http://st.24mall.mn/rest/V1/kor/shipping/barcode?barcode=${barcode}`
    );

    // TODO: delete below
    // const res = await axios.get(
    //   `http://st.24mall.mn/rest/V1/kor/shipping/barcode?barcode=307145113553`
    // );

    //production
    // const res = await axios.get(
    //   `http://back.24mall.mn/rest/V1/kor/shipping/barcode?barcode=${barcode}`
    // );
    const { product, shipping } = JSON.parse(res.data);

    if (!(product || shipping)) return setProductNotFound(true);

    setData({ product, shipping });
    const tempFormatedData = [];
    tempFormatedData.push({ field: "Огноо", value: product.payment_date });
    tempFormatedData.push({ field: "Карго", value: product.service_type });
    tempFormatedData.push({
      field: "Барааны дугаар",
      value: shipping[0].product_id,
    });
    tempFormatedData.push({
      field: "Хүргэлтийн төрөл",
      value: shipping[0].shipping_method,
    });

    setFormatedData(tempFormatedData);

    setSelectedStatus(product.shipping_step);
    setQty(product.qty);
    setProductWeight(product.weight);
    setShippingCost(product.shipping_cost);
    console.log(product);
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    
    setScanned(true);
    setBarcode(data);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.maintext}>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.maintext}>No access to camera</Text>
        <Button 
          style={styles.button}
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <ImageBackground
      style = {styles.background}
      source = {require('../../assets/appbackground.jpg')}
    >
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 600, width: 400, padding: 8, color: 'black' }}
          />
        </View>
        <Text
          style={{
            ...styles.maintext,
            color: scanned ? "limegreen" : "white",
            fontFamily: 'sans-serif-thin',
          }}
        >
          {scanned ? "SCANNED" : "BAR CODE SCAN ХИЙНЭ ҮҮ?"}
        </Text>
        <View
          style={styles.view}>
          <Button
            title={"ДАХИН SCAN"}
            onPress={() => scanned && prepareScan()}
            type={scanned ? "solid" : "outline"}
            style={styles.button}
          />
          <Text> </Text>
          <Button
            title={"ҮР ДҮН ХАРАХ"}
            type={scanned ? "solid" : "outline"}
            onPress={() => scanned && showResult()}
            style={styles.button}
          />
        </View>
        <Modal
          isVisible={isResultModalVisible}
          swipeDirection="down"
          swipeThreshold={100}
          onSwipeComplete={() => setIsResultModalVisible(false)}
          style={{ margin: 0 }}
        >
          <KeyboardAwareScrollView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              flex: 1,
              backgroundColor: "#71B8D0",
              marginTop: safeAreaTop,
              padding: 10,
              alignContent: "flex-start",
            }}
          >
            <Text style={{fontSize:25, fontFamily:'sans-serif-thin', textAlign: "center", color:'white'}}>
              {barcode}
            </Text>
            {productNotFound ? (
              <Text style={{fontSize:40, fontFamily:'sans-serif-thin', textAlign: "center",color:'white' }}>
                Бараа олдсонгүй
              </Text>
            ) : (
              <>
                {formatedData.length ? (
                  <>
                    <View style={{ marginBottom: 5 }}>
                      <Image
                        source={{
                          uri: `http://image.auction.co.kr/itemimage${data.shipping[0].product_image_url}`,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    {formatedData.map((data) => (
                      <View
                        key={data.field}
                        style={{
                          color:'white',
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignItems: "center",
                          marginBottom: 5,
                          paddingBottom: 5,
                          borderBottomColor: "white",
                          borderBottomWidth: 1,
                        }}
                      >
                        <View style={{ width: "30%" }}>
                          <Text>{data.field}:</Text>
                        </View>
                        <View style={{ width: "70%" }}>
                          <Text>{data.value}</Text>
                        </View>
                      </View>
                    ))}
                  </>
                ) : (
                  <></>
                )}
                <Text>Төлөв:</Text>
                <Picker
                  selectedValue={selectedStatus}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedStatus(itemValue)
                  }>
                  <Picker.Item label="Солонгост хүлээж авсан" onChangeText={selectedStatus} value="received_in_korea"  />
                  <Picker.Item label="Солонгосоос явуулсан" onChangeText={selectedStatus} value="departed_from_korea" />
                  <Picker.Item label="Хүлээж авсан" onChangeText={selectedStatus} value="received" />
                  <Picker.Item label="Хүргэлтийн захиалга үүсгэх" onChangeText={selectedStatus} value="delivery_create" />
                  <Picker.Item label="Хүргэгдсэн" onChangeText={selectedStatus} value="delivery_complete" />
                </Picker>
                <Text>Тоо ширхэг:</Text>
                <Input 
                  placeholder="Тоо ширхэг" 
                  onChangeText={setQty} 
                  value={qty} />
                <Text>Shipping cost:</Text>
                <Input 
                  placeholder="Shipping cost" 
                  onChangeText={setShippingCost} 
                  value={shippingCost} />
                <Text>Жин:</Text>
                <Input
                  placeholder="Жин"
                  onChangeText={setProductWeight}
                  value={productweight}
                />
                <Button onPress={saveProduct} title="Хадгалах" />
              </>
            )}
          </KeyboardAwareScrollView>
        </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    margin: 10,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 350,
    width: 500,
    overflow: "hidden",
    borderRadius: 400,
  },
  button: {
    fontSize: 16,
    color: '#3a8eaa',
    down:10,
    borderColor: "success"
  },
  view: {
    flex:0.1,
    alignContent: 'center',
  },
});

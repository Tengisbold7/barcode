import InsideApp from "./src/InsideApp";
import store from "./src/redux/store";
import { Provider } from "react-redux";

import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeViewAndroid from "./src/components/SafeViewAndroid";


export default function App() {
  return (
    <SafeAreaProvider style={SafeViewAndroid.AndroidSafeArea}>
      <Provider store={store}>
        <InsideApp />
      </Provider>
    </SafeAreaProvider>
  );
}

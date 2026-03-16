import { Provider } from "react-redux";
import { store } from "@/store/store";
import { View } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <View></View>
    </Provider>
  );
}

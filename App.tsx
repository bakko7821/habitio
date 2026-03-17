import { Provider } from "react-redux";
import { store } from "@/store/store";
import { View } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <View className="w-screen h-screen flex-1 bg-red-600"></View>
    </Provider>
  );
}

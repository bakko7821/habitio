import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Header } from './src/components/Header';
import { useTheme } from './src/theme/useTheme';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReadingNowScreen from './src/screens/ReadingNowScreen';
import AllBooksScreen from './src/screens/AllBooksScreen';
import MainScreen from './src/screens/MainScreen';

export type RootStackParamList = {
  ReadingNow: undefined;
  AllBooks: undefined;
  Main: undefined;
};

export default function App() {
  const Stack = createNativeStackNavigator();

  const colors = useTheme();
  const { width, height } = Dimensions.get('window');

  return (
    <View style={[styles.body, { width, height, backgroundColor: colors.background }]}>
      <StatusBar style={'auto'} />
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            contentStyle: {backgroundColor: colors.background }}}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="ReadingNow" component={ReadingNowScreen} />
          <Stack.Screen name="AllBooks" component={AllBooksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 40,
    padding: 12,
    flex: 1,
    borderWidth: 1,
    borderColor: 'green'
  }
});


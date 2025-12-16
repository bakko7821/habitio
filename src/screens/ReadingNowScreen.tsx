import { View, Text } from 'react-native';
import { Header } from '../components/Header';

export default function ReadingNowScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Читаю сейчас" />
      <Text>Контент страницы "Читаю сейчас"</Text>
    </View>
  );
}


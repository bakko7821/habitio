import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Header } from '../components/Header';

export default function MainScreen() {
    const { width, height } = Dimensions.get('window');
    return (
        <View style={[styles.screen]}>
            <Header title="Главная" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        position: 'relative',
        borderWidth: 1,
        borderColor: 'green'
    }
})
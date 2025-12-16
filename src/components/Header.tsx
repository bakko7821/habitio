import { View, Pressable, StyleSheet, Text, Dimensions } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../theme/useTheme';
import { BurgerIcon } from '../icons/icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  const colors = useTheme();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.header, {backgroundColor: colors.surface}]}>
      

      {/* <DropdownMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}>
          <Pressable 
            style={styles.navLinkContainer}
            onPress={() => {
            navigation.navigate('Main');
              () => setMenuOpen(false);
            }}>
            <Text style={[styles.navLinkContent, { color: colors.text }]}>Главная</Text>
          </Pressable>
          <Pressable 
            style={styles.navLinkContainer}
            onPress={() => {
            navigation.navigate('AllBooks');
              () => setMenuOpen(false);
            }}>
            <Text style={[styles.navLinkContent, { color: colors.text }]}>Мои книги</Text>
          </Pressable>
          <Pressable 
            style={styles.navLinkContainer}
            onPress={() => {
            navigation.navigate('ReadingNow');
              () => setMenuOpen(false);
            }}>
            <Text style={[styles.navLinkContent, { color: colors.text }]}>Читаю Сейчас</Text>
          </Pressable>
      </DropdownMenu> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 16,
    padding: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },

  navLinkContainer: {
    padding: 8,
  },

  navLinkContent: {
    fontSize: 16,
  },

  titleText: {
    fontSize: 24,
    fontWeight: 500
  }
});

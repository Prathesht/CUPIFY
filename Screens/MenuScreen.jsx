import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Menu ☕</Text>
      {/* Menu items will go here */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.cartText}>View Cart 🛒</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf6ee', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#6F4E37', marginTop: 40 },
  cartButton: {
    position: 'absolute', bottom: 30, alignSelf: 'center',
    backgroundColor: '#6F4E37', paddingVertical: 14,
    paddingHorizontal: 40, borderRadius: 30,
  },
  cartText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default MenuScreen;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Your Cart 🛒</Text>
      <Text style={styles.empty}>Your cart is empty.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf6ee', padding: 20 },
  back: { marginTop: 40 },
  backText: { fontSize: 16, color: '#6F4E37' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#6F4E37', marginTop: 20 },
  empty: { fontSize: 16, color: '#999', marginTop: 20 },
});

export default CartScreen;

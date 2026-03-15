import React from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, Image,
} from 'react-native';
import BottomTabBar from '../Components/BottomTabBar';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// Temporary cart data — later you can pass via navigation params or global state
const CartScreen = ({ navigation, route }) => {
  const [cartItems, setCartItems] = React.useState([]);

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.safeArea}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart 🛍️</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>☕</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some coffee from the menu!</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseBtnText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.cartCard}>
                <Image source={item.image} style={styles.cartImage} resizeMode="cover" />
                <View style={styles.cartInfo}>
                  <Text style={styles.cartName}>{item.name}</Text>
                  <Text style={styles.cartType}>{item.type}</Text>
                  <Text style={styles.cartPrice}>$ {(item.price * item.qty).toFixed(2)}</Text>
                </View>
                <View style={styles.qtyControl}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}>
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.qty}</Text>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, 1)}>
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Order Summary */}
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>$ {total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>$ 1.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>$ {(total + 1).toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.orderBtn}>
              <Text style={styles.orderBtnText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <BottomTabBar navigation={navigation} activeTab="Cart" />
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20,
    paddingTop: 16, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1a1a1a' },
  itemCount: { fontSize: 14, color: '#aaa' },

  emptyContainer: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', paddingHorizontal: 40,
  },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#aaa', textAlign: 'center', marginBottom: 24 },
  browseBtn: {
    backgroundColor: '#C47E50', paddingVertical: 14,
    paddingHorizontal: 36, borderRadius: 14,
  },
  browseBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  listContent: { padding: 20, gap: 14 },
  cartCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16,
    padding: 12, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  cartImage: { width: 70, height: 70, borderRadius: 12 },
  cartInfo: { flex: 1 },
  cartName: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', marginBottom: 2 },
  cartType: { fontSize: 12, color: '#aaa', marginBottom: 6 },
  cartPrice: { fontSize: 15, fontWeight: '800', color: '#C47E50' },
  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center',
  },
  qtyBtnText: { fontSize: 18, color: '#1a1a1a', fontWeight: '600' },
  qtyText: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', minWidth: 16, textAlign: 'center' },

  summary: {
    backgroundColor: '#fff', padding: 20,
    borderTopWidth: 1, borderTopColor: '#f0f0f0',
  },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 14, color: '#aaa' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  totalRow: {
    borderTopWidth: 1, borderTopColor: '#f0f0f0',
    paddingTop: 12, marginTop: 4, marginBottom: 16,
  },
  totalLabel: { fontSize: 16, fontWeight: '800', color: '#1a1a1a' },
  totalValue: { fontSize: 18, fontWeight: '800', color: '#C47E50' },
  orderBtn: {
    backgroundColor: '#C47E50', paddingVertical: 16,
    borderRadius: 16, alignItems: 'center',
  },
  orderBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});

export default CartScreen;
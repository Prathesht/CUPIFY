import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import BottomTabBar from '../Components/BottomTabBar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// Demo cart items — replace with your real cart state/context
const initialCart = [
  { id: '1', name: 'Caffe Mocha', type: 'Deep Foam', price: 4.53, rating: 4.8, qty: 2, image: require('../Assets/mocha.jpg') },
  { id: '2', name: 'Flat White', type: 'Espresso', price: 3.53, rating: 4.9, qty: 1, image: require('../Assets/flatwhite.jpg') },
];

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState(initialCart);

  const increment = (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decrement = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = 2.00;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={styles.cartCountBadge}>
            <Text style={styles.cartCountText}>{cartCount}</Text>
          </View>
        </View>

        {cart.length === 0 ? (
          /* ── Empty State ── */
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>☕</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Looks like you haven't added any coffee yet. Let's fix that!
            </Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => navigation.navigate('Menu')}
            >
              <Text style={styles.browseBtnText}>Browse Menu</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Delivery Toggle */}
              <View style={styles.deliveryToggle}>
                <TouchableOpacity style={[styles.toggleBtn, styles.toggleBtnActive]}>
                  <Text style={[styles.toggleText, styles.toggleTextActive]}>Deliver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toggleBtn}>
                  <Text style={styles.toggleText}>Pick Up</Text>
                </TouchableOpacity>
              </View>

              {/* Cart Items */}
              <Text style={styles.sectionTitle}>
                {cart.length} Item{cart.length > 1 ? 's' : ''}
              </Text>

              {cart.map((item) => (
                <View key={item.id} style={styles.cartCard}>
                  <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
                  <View style={styles.itemInfo}>
                    <View style={styles.itemTopRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemType}>{item.type}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={() => removeItem(item.id)}
                      >
                        <Text style={styles.removeBtnText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.itemBottomRow}>
                      <Text style={styles.itemPrice}>
                        $ {(item.price * item.qty).toFixed(2)}
                      </Text>
                      <View style={styles.qtyControl}>
                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() => decrement(item.id)}
                        >
                          <Text style={styles.qtyBtnText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyValue}>{item.qty}</Text>
                        <TouchableOpacity
                          style={[styles.qtyBtn, styles.qtyBtnActive]}
                          onPress={() => increment(item.id)}
                        >
                          <Text style={[styles.qtyBtnText, styles.qtyBtnTextActive]}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}

              {/* Promo Code */}
              <View style={styles.promoRow}>
                <Text style={styles.promoLabel}>🎟️  Promo Code</Text>
                <TouchableOpacity>
                  <Text style={styles.promoAdd}>Add</Text>
                </TouchableOpacity>
              </View>

              {/* Order Summary */}
              <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>$ {subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Fee</Text>
                  <Text style={styles.summaryValue}>$ {deliveryFee.toFixed(2)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>$ {total.toFixed(2)}</Text>
                </View>
              </View>

              {/* Spacer for bottom bar */}
              <View style={{ height: 100 }} />
            </ScrollView>

            {/* Checkout Button */}
            <View style={styles.checkoutWrapper}>
              <TouchableOpacity style={styles.checkoutBtn}>
                <Text style={styles.checkoutText}>Place Order  •  $ {total.toFixed(2)}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <BottomTabBar navigation={navigation} activeTab="Cart" cartCount={cartCount} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { fontSize: 18, color: '#1a1a1a', marginTop: -2 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1a1a1a', flex: 1 },
  cartCountBadge: {
    backgroundColor: '#C47E50',
    borderRadius: 10,
    minWidth: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  cartCountText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#aaa', textAlign: 'center', marginBottom: 28, lineHeight: 22 },
  browseBtn: {
    backgroundColor: '#C47E50',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 14,
  },
  browseBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  // Delivery toggle
  deliveryToggle: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 14,
    padding: 4,
    marginTop: 16,
    marginBottom: 20,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 11,
  },
  toggleBtnActive: { backgroundColor: '#C47E50' },
  toggleText: { fontSize: 14, fontWeight: '600', color: '#999' },
  toggleTextActive: { color: '#fff' },

  // Section title
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a1a', marginBottom: 14 },

  // Cart card
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  itemImage: { width: 100, height: 110 },
  itemInfo: { flex: 1, padding: 12, justifyContent: 'space-between' },
  itemTopRow: { flexDirection: 'row', alignItems: 'flex-start' },
  itemName: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', marginBottom: 2 },
  itemType: { fontSize: 12, color: '#aaa' },
  removeBtn: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText: { fontSize: 10, color: '#999', fontWeight: '700' },
  itemBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemPrice: { fontSize: 16, fontWeight: '800', color: '#1a1a1a' },

  // Qty control
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnActive: { backgroundColor: '#C47E50' },
  qtyBtnText: { fontSize: 18, color: '#555', lineHeight: 22, fontWeight: '600' },
  qtyBtnTextActive: { color: '#fff' },
  qtyValue: { fontSize: 14, fontWeight: '700', color: '#1a1a1a', paddingHorizontal: 10 },

  // Promo row
  promoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fdf6f0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 6,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#f0e0d0',
    borderStyle: 'dashed',
  },
  promoLabel: { fontSize: 14, fontWeight: '600', color: '#555' },
  promoAdd: { fontSize: 14, fontWeight: '700', color: '#C47E50' },

  // Summary box
  summaryBox: {
    backgroundColor: '#fafafa',
    borderRadius: 18,
    padding: 18,
    marginBottom: 10,
  },
  summaryTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a1a', marginBottom: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: '#999' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#555' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: '#1a1a1a' },
  totalValue: { fontSize: 18, fontWeight: '800', color: '#C47E50' },

  // Checkout
  checkoutWrapper: {
    position: 'absolute',
    bottom: 72,
    left: 20,
    right: 20,
  },
  checkoutBtn: {
    backgroundColor: '#C47E50',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#C47E50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
});

export default CartScreen;
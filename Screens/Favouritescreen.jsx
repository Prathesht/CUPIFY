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

// Demo favourites — replace with your real favourites state/context
const initialFavourites = [
  { id: '1', name: 'Caffe Mocha', type: 'Deep Foam', price: 4.53, rating: 4.8, image: require('../Assets/mocha.jpg') },
  { id: '2', name: 'Flat White', type: 'Espresso', price: 3.53, rating: 4.9, image: require('../Assets/flatwhite.jpg') },
  { id: '3', name: 'Cappuccino', type: 'with Foam', price: 4.20, rating: 4.7, image: require('../Assets/cappuccino.jpg') },
  { id: '4', name: 'Americano', type: 'Black Coffee', price: 3.10, rating: 4.6, image: require('../Assets/americano.jpg') },
];

const FavouriteScreen = ({ navigation }) => {
  const [favourites, setFavourites] = useState(initialFavourites);
  const [cart, setCart] = useState([]);

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((i) => i.id !== id));
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favourites</Text>
          {favourites.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{favourites.length}</Text>
            </View>
          )}
        </View>

        {favourites.length === 0 ? (
          /* ── Empty State ── */
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={styles.emptyTitle}>No favourites yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart on any coffee to save it here for quick ordering.
            </Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => navigation.navigate('Menu')}
            >
              <Text style={styles.browseBtnText}>Browse Menu</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Subtitle */}
            <Text style={styles.subtitle}>Your saved coffees ☕</Text>

            {/* Favourite Cards */}
            {favourites.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

                {/* Heart remove button */}
                <TouchableOpacity
                  style={styles.heartBtn}
                  onPress={() => removeFavourite(item.id)}
                >
                  <Text style={styles.heartIcon}>❤️</Text>
                </TouchableOpacity>

                <View style={styles.cardBody}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <Text style={styles.cardType}>{item.type}</Text>
                    <View style={styles.ratingRow}>
                      <Text style={styles.ratingStar}>⭐</Text>
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.cardRight}>
                    <Text style={styles.cardPrice}>$ {item.price.toFixed(2)}</Text>
                    <TouchableOpacity
                      style={styles.addBtn}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.addBtnText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {/* Add all to cart */}
            <TouchableOpacity
              style={styles.addAllBtn}
              onPress={() => favourites.forEach((item) => addToCart(item))}
            >
              <Text style={styles.addAllText}>Add All to Cart</Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} />
          </ScrollView>
        )}

        <BottomTabBar navigation={navigation} activeTab="Favourites" cartCount={cartCount} />
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
    gap: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1a1a1a', flex: 1 },
  countBadge: {
    backgroundColor: '#C47E50',
    borderRadius: 10,
    minWidth: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  countBadgeText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Subtitle
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '500',
    marginTop: 18,
    marginBottom: 16,
  },

  // Favourite Card (horizontal)
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: { width: '100%', height: 150 },

  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heartIcon: { fontSize: 16 },

  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  cardLeft: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: '700', color: '#1a1a1a', marginBottom: 2 },
  cardType: { fontSize: 12, color: '#aaa', marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingStar: { fontSize: 12 },
  ratingText: { fontSize: 13, fontWeight: '700', color: '#555' },

  cardRight: { alignItems: 'flex-end', gap: 10 },
  cardPrice: { fontSize: 18, fontWeight: '800', color: '#1a1a1a' },
  addBtn: {
    backgroundColor: '#C47E50',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 12,
  },
  addBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Add All button
  addAllBtn: {
    borderWidth: 2,
    borderColor: '#C47E50',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  addAllText: { color: '#C47E50', fontSize: 15, fontWeight: '800' },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  emptySubtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  browseBtn: {
    backgroundColor: '#C47E50',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 14,
  },
  browseBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});

export default FavouriteScreen;
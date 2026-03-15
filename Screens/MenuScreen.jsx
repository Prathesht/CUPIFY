import React, { useState } from 'react';
import BottomTabBar from '../Components/BottomTabBar';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const categories = ['All Coffee', 'Machiato', 'Latte', 'Americano', 'Espresso'];

const menuItems = [
  { id: '1', name: 'Caffe Mocha', type: 'Deep Foam', price: 4.53, rating: 4.8, image: require('../Assets/mocha.jpg') },
  { id: '2', name: 'Flat White', type: 'Espresso', price: 3.53, rating: 4.9, image: require('../Assets/flatwhite.jpg') },
  { id: '3', name: 'Cappuccino', type: 'with Foam', price: 4.20, rating: 4.7, image: require('../Assets/cappuccino.jpg') },
  { id: '4', name: 'Americano', type: 'Black Coffee', price: 3.10, rating: 4.6, image: require('../Assets/americano.jpg') },
  { id: '5', name: 'Latte', type: 'Milk Foam', price: 3.80, rating: 4.5, image: require('../Assets/latte.jpg') },
  { id: '6', name: 'Machiato', type: 'Strong', price: 4.00, rating: 4.7, image: require('../Assets/machiato.jpg') },
];

const MenuScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Coffee');
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filtered = menuItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All Coffee' || item.type.toLowerCase().includes(selectedCategory.toLowerCase()) || item.name.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchSearch && matchCat;
  });

  return (
     <SafeAreaProvider>
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>Location</Text>
            <TouchableOpacity style={styles.locationRow}>
              <Text style={styles.locationText}>Bilzen, Tanjungbalai</Text>
              <Text style={styles.locationArrow}> ›</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Text style={styles.profileEmoji}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Search + Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search coffee"
              placeholderTextColor="#aaa"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoLeft}>
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>Promo</Text>
            </View>
            <Text style={styles.promoTitle}>Buy one get{'\n'}one FREE</Text>
          </View>
          <Image
            source={require('../Assets/Home.jpg')}
            style={styles.promoImage}
            resizeMode="cover"
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryBtn, selectedCategory === cat && styles.categoryBtnActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Grid */}
        <View style={styles.grid}>
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => navigation.navigate('Cart')}
              activeOpacity={0.9}
            >
              <View style={styles.imageWrapper}>
                <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingStar}>⭐</Text>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardType}>{item.type}</Text>
                <View style={styles.cardBottom}>
                  <Text style={styles.cardPrice}>$ {item.price.toFixed(2)}</Text>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                    <Text style={styles.addBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>
       {/* ✅ Component use பண்றோம் */}
    <BottomTabBar navigation={navigation} activeTab="Home" cartCount={cartCount} />
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff' },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  locationLabel: { fontSize: 12, color: '#aaa' },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  locationArrow: { fontSize: 18, color: '#1a1a1a' },
  profileBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center',
  },
  profileEmoji: { fontSize: 18 },

  // Search
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 12,
    alignItems: 'center',
    gap: 10,
  },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f5f5f5', borderRadius: 14,
    paddingHorizontal: 14, height: 48,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  filterBtn: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: '#C47E50', justifyContent: 'center', alignItems: 'center',
  },
  filterIcon: { fontSize: 18 },

  // Promo Banner
  promoBanner: {
    marginHorizontal: 20, borderRadius: 20,
    backgroundColor: '#3d2c1e', height: 140,
    overflow: 'hidden', flexDirection: 'row',
    marginBottom: 20,
  },
  promoLeft: { flex: 1, padding: 18, justifyContent: 'center' },
  promoBadge: {
    backgroundColor: '#C47E50', alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 8, marginBottom: 10,
  },
  promoBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  promoTitle: { fontSize: 22, fontWeight: '800', color: '#fff', lineHeight: 30 },
  promoImage: { width: 140, height: 140 },

  // Categories
  categoryScroll: { marginBottom: 16 },
  categoryContent: { paddingHorizontal: 20, gap: 10 },
  categoryBtn: {
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 24, backgroundColor: '#f5f5f5',
  },
  categoryBtnActive: { backgroundColor: '#C47E50' },
  categoryText: { fontSize: 13, color: '#888', fontWeight: '600' },
  categoryTextActive: { color: '#fff' },

  // Grid
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 16,
    justifyContent: 'space-between',
  },
  card: {
    width: '47%', backgroundColor: '#fff',
    borderRadius: 18, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 4,
  },
  imageWrapper: { position: 'relative' },
  cardImage: { width: '100%', height: 130 },
  ratingBadge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 10, flexDirection: 'row',
    alignItems: 'center', paddingHorizontal: 6, paddingVertical: 3,
  },
  ratingStar: { fontSize: 10 },
  ratingText: { color: '#fff', fontSize: 11, fontWeight: '700', marginLeft: 2 },
  cardInfo: { padding: 12 },
  cardName: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', marginBottom: 2 },
  cardType: { fontSize: 12, color: '#aaa', marginBottom: 10 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 16, fontWeight: '800', color: '#1a1a1a' },
  addBtn: {
    width: 30, height: 30, borderRadius: 10,
    backgroundColor: '#C47E50', justifyContent: 'center', alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 20, fontWeight: '600', lineHeight: 28 },

  // Tab Bar
  tabBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 70, backgroundColor: '#fff',
    flexDirection: 'row', justifyContent: 'space-around',
    alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f0f0f0',
    paddingBottom: 10,
  },
  tabItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabIcon: { fontSize: 22 },
  tabIconActive: { fontSize: 22 },
  cartBadge: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: '#C47E50', borderRadius: 8,
    width: 16, height: 16, justifyContent: 'center', alignItems: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
});

export default MenuScreen;
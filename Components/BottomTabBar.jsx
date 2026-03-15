import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomTabBar = ({ navigation, activeTab = 'Home', cartCount = 0 }) => {
  const tabs = [
    { name: 'Home', icon: '🏠', route: 'Menu' },
    { name: 'Favourites', icon: '🤍', route: 'Favourite' },
    { name: 'Cart', icon: '🛍️', route: 'Cart' },
    { name: 'Notifications', icon: '🔔', route: 'Notification' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabItem}
          onPress={() => navigation.navigate(tab.route)}
        >
          <View>
            <Text style={[styles.tabIcon, activeTab === tab.name && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            {tab.name === 'Cart' && cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.tabLabel, activeTab === tab.name && styles.tabLabelActive]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 5,
    paddingBottom: 5,
  },
  tabItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabIcon: { fontSize: 22, textAlign: 'center', opacity: 0.4 },
  tabIconActive: { opacity: 1 },
  tabLabel: { fontSize: 10, color: '#aaa', marginTop: 2 },
  tabLabelActive: { color: '#C47E50', fontWeight: '700' },
  cartBadge: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: '#C47E50', borderRadius: 8,
    width: 16, height: 16, justifyContent: 'center', alignItems: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
});

export default BottomTabBar;
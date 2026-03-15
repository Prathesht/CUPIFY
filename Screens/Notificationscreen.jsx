import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BottomTabBar from '../Components/BottomTabBar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const FavouriteScreen = ({ navigation }) => {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications 🔔</Text>
        </View>

        {/* Empty Notifications */}
          <View style={styles.emptyContainer}>
                  <Text style={styles.emptyIcon}>☕</Text>
                  <Text style={styles.emptyTitle}>Under maintenance!</Text>
                  <Text style={styles.emptySubtitle}>
                    Notification feature will be available soon.
                  </Text>
        
                  <TouchableOpacity
                    style={styles.browseBtn}
                    onPress={() => navigation.navigate('Menu')}
                  >
                    <Text style={styles.browseBtnText}>Back to Menu</Text>
                  </TouchableOpacity>
                </View>

        {/* Bottom Tab */}
        <BottomTabBar navigation={navigation} activeTab="Notifications" />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 24,
  },

  browseBtn: {
    backgroundColor: '#C47E50',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 14,
  },

  browseBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default FavouriteScreen;
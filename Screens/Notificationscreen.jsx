import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import BottomTabBar from '../Components/BottomTabBar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const notificationsData = [
  {
    id: '1',
    type: 'order',
    icon: '☕',
    title: 'Order on its way!',
    message: 'Your Caffe Mocha is being prepared and will be ready in 10 mins.',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'promo',
    icon: '🎉',
    title: 'Buy 1 Get 1 Free!',
    message: 'Today only — grab any Latte and get a second one absolutely free.',
    time: '1 hr ago',
    read: false,
  },
  {
    id: '3',
    type: 'order',
    icon: '✅',
    title: 'Order Delivered',
    message: 'Your Flat White has been delivered. Enjoy your coffee!',
    time: '3 hr ago',
    read: true,
  },
  {
    id: '4',
    type: 'promo',
    icon: '🏷️',
    title: '20% Off This Weekend',
    message: 'Use code WEEKEND20 at checkout to enjoy 20% off your entire order.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    type: 'reminder',
    icon: '⏰',
    title: 'Your usual order?',
    message: "It's 9 AM — time for your morning Cappuccino. Tap to reorder quickly.",
    time: 'Yesterday',
    read: true,
  },
  {
    id: '6',
    type: 'promo',
    icon: '⭐',
    title: 'Rate Your Last Order',
    message: 'How was your Americano? Share your feedback and earn loyalty points.',
    time: '2 days ago',
    read: true,
  },
];

const typeIconBg = {
  order: '#4CAF50',
  promo: '#C47E50',
  reminder: '#42A5F5',
};

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Orders', 'Promos', 'Reminders'];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Orders') return n.type === 'order';
    if (activeFilter === 'Promos') return n.type === 'promo';
    if (activeFilter === 'Reminders') return n.type === 'reminder';
    return true;
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <Text style={styles.headerSub}>{unreadCount} unread</Text>
            )}
          </View>
          <View style={styles.headerRight}>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
              </View>
            )}
            {unreadCount > 0 && (
              <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
                <Text style={styles.markAllText}>Mark all read</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            {filters.map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterBtn,
                  activeFilter === f && styles.filterBtnActive,
                ]}
                onPress={() => setActiveFilter(f)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === f && styles.filterTextActive,
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySubtitle}>
              You're all caught up! Check back later for updates and offers.
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            {filtered.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.notifCard,
                  !item.read && styles.notifCardUnread,
                ]}
                activeOpacity={0.85}
                onPress={() => markRead(item.id)}
              >
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: typeIconBg[item.type] },
                  ]}
                >
                  <Text style={styles.iconEmoji}>{item.icon}</Text>
                </View>

                <View style={styles.notifBody}>
                  <View style={styles.notifTopRow}>
                    <Text
                      style={[
                        styles.notifTitle,
                        !item.read && styles.notifTitleUnread,
                      ]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    {!item.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notifMessage} numberOfLines={2}>
                    {item.message}
                  </Text>
                  <Text style={styles.notifTime}>{item.time}</Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => deleteNotification(item.id)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.deleteBtnText}>✕</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            <View style={{ height: 100 }} />
          </ScrollView>
        )}

        <BottomTabBar navigation={navigation} activeTab="Notifications" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1a1a1a' },
  headerSub: { fontSize: 12, color: '#aaa', marginTop: 2, fontWeight: '500' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  unreadBadge: {
    backgroundColor: '#C47E50',
    borderRadius: 10,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  markAllBtn: {
    backgroundColor: '#fdf6f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  markAllText: { color: '#C47E50', fontSize: 12, fontWeight: '700' },

  // Filter tabs
  filterWrapper: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterContent: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
  },
  filterBtnActive: { backgroundColor: '#C47E50' },
  filterText: { fontSize: 13, color: '#888', fontWeight: '600' },
  filterTextActive: { color: '#fff' },

  // List
  listContent: { paddingHorizontal: 20, paddingTop: 14 },

  // Notification card
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  notifCardUnread: {
    backgroundColor: '#fdf6f0',
    borderLeftWidth: 3,
    borderLeftColor: '#C47E50',
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  iconEmoji: { fontSize: 22 },

  notifBody: { flex: 1 },
  notifTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  notifTitle: { fontSize: 14, fontWeight: '600', color: '#555', flex: 1 },
  notifTitleUnread: { fontWeight: '800', color: '#1a1a1a' },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C47E50',
    flexShrink: 0,
  },
  notifMessage: { fontSize: 13, color: '#888', lineHeight: 19, marginBottom: 6 },
  notifTime: { fontSize: 11, color: '#bbb', fontWeight: '500' },

  deleteBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  deleteBtnText: { fontSize: 10, color: '#999', fontWeight: '700' },

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

export default NotificationScreen;
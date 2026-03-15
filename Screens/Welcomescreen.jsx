import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Welcomescreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../Assets/Home.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Freshly brewed, just for you ☕</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 60 },
  title: { fontSize: 36, color: '#fff', fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#f0e6d3', marginBottom: 40 },
  button: {
    backgroundColor: '#6F4E37',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default Welcomescreen;
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function MemeCard({ meme }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: meme.image }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
    borderColor: '#fff',
    borderWidth: 2
  },
  image: {
    width: 250,
    height: 250
  }
});

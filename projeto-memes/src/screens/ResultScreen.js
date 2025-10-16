import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { result, meme } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result === 'Acertou!' ? '🎉 Parabéns! 🎉' : '😅 Errou!'}</Text>
      <Image source={{ uri: meme.image }} style={styles.image} />
      <Text style={styles.text}>Era: {meme.name}</Text>
      <Button title="Voltar ao início" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 26, marginBottom: 20 },
  image: { width: 250, height: 250, borderRadius: 15, marginBottom: 20 },
  text: { color: '#bbb', marginBottom: 20 },
});

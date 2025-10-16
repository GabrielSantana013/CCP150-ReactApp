import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { loadProgress } from '../utils/storage';

export default function RankingScreen() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    loadProgress().then(setProgress);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Seu Progresso</Text>
      {progress ? (
        <>
          <Text style={styles.text}>Data: {progress.date}</Text>
          <Text style={styles.text}>Último resultado: {progress.result}</Text>
          <Text style={styles.text}>Tentativas restantes: {progress.tries}</Text>
        </>
      ) : (
        <Text style={styles.text}>Nenhum jogo registrado ainda!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 26, marginBottom: 20 },
  text: { color: '#bbb', marginBottom: 10 },
});

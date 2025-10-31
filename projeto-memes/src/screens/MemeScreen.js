import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-audio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../config/firebaseConfig';
import MemeCard from '../components/MemeCard';

export default function MemeScreen({ navigation }) {
  const [meme, setMeme] = useState(null);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [sound, setSound] = useState();

  const userId = 'user01';
  const today = new Date().toDateString();

  // 🔹 Carrega meme e progresso
  useEffect(() => {
    async function loadData() {
      try {
        // Carrega memes do Firebase
        const memesSnap = await firebase.database().ref('memes').once('value');
        if (memesSnap.exists()) {
          const memesData = Object.values(memesSnap.val());
          const todayIndex = new Date().getDate() % memesData.length;
          setMeme(memesData[todayIndex]);
        } else {
          console.log('Nenhum meme encontrado!');
        }

        // Carrega progresso local
        const saved = await AsyncStorage.getItem(`progress_${userId}_${today}`);
        if (saved) {
          const data = JSON.parse(saved);
          setAttempts(data.attempts || 0);
          setResult(data.result || null);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }

    loadData();
  }, []);

  async function playSound() {
    if (!meme?.sound) return;
    const { sound } = await Audio.Sound.createAsync({ uri: meme.sound });
    setSound(sound);
    await sound.playAsync();
  }

  // 🔹 Salva progresso localmente
  async function saveProgress(newData) {
    try {
      const data = { ...newData, date: today };
      await AsyncStorage.setItem(`progress_${userId}_${today}`, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  }

  function normalizeString(str) {
    return String(str)
      .replace(/\u00A0/g, ' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  async function handleTry() {
  if (!meme) return;

  const guess = normalizeString(input);
  const correct = normalizeString(meme.name);
  const newAttempts = attempts + 1;
  
  console.log('RAW GUESS:', `"${input}"`, 'len=', input.length);
  console.log('RAW CORRECT:', `"${meme.name}"`, 'len=', meme.name.length);
  console.log('NORMALIZED GUESS:', `"${guess}"`);
  console.log('NORMALIZED CORRECT:', `"${correct}"`);
  console.log(guess===correct);

  setAttempts(newAttempts);

  if (guess === correct) {
    setResult('Acertou!');
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await playSound();
    
    // 🔹 PRIMEIRO navega, DEPOIS salva (ou usa await)
    navigation.navigate('Result', { 
      result: 'Acertou!', 
      meme, 
      attempts: newAttempts 
    });
    
    // 🔹 Salva após navegar (não bloqueia a navegação)
    saveProgress({ result: 'Acertou!', attempts: newAttempts });
  } else {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    // 🔹 Remove o await para não bloquear
    saveProgress({ result: null, attempts: newAttempts });
  }

  setInput('');
}

  if (!meme) return <Text>Carregando meme...</Text>;

  return (
    <View style={styles.container}>
      <MemeCard meme={meme} />
      <Text style={styles.hint}>Dica: {meme.hint}</Text>
      <Text style={styles.attempts}>Tentativas: {attempts}</Text>

      <TextInput
        style={styles.input}
        placeholder="Qual é o meme?"
        value={input}
        onChangeText={setInput}
      />

      <Button title="Enviar resposta" onPress={handleTry} />
      <Button title="Ouvir som" onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center' },
  hint: { color: '#bbb', marginVertical: 10 },
  attempts: { color: '#fff', marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 10, width: '80%', marginBottom: 10 },
});

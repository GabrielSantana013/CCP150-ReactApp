import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import firebase from '../../config/firebaseConfig';
import MemeCard from '../components/MemeCard';

export default function MemeScreen({ navigation }) {
  const [meme, setMeme] = useState(null);
  const [input, setInput] = useState('');
  const [tries, setTries] = useState(3);
  const [result, setResult] = useState(null);
  const [sound, setSound] = useState();

  const userId = 'user01';

  useEffect(() => {
    const today = new Date().toDateString();

    async function loadData() {
      try {
        // 🔹 Carrega todos os memes
        const memesSnap = await firebase.database().ref('memes').once('value');
        if (memesSnap.exists()) {
          const memesData = Object.values(memesSnap.val());
          const todayIndex = new Date().getDate() % memesData.length;
          setMeme(memesData[todayIndex]);
        } else {
          console.log('Nenhum meme encontrado!');
        }

        // 🔹 Carrega o progresso do usuário
        const progressSnap = await firebase
          .database()
          .ref(`progress/${userId}/${today}`)
          .once('value');

        if (progressSnap.exists()) {
          const data = progressSnap.val();
          setTries(data.tries);
          setResult(data.result);
        }
      } catch (error) {
        console.error('Erro ao carregar memes:', error);
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

  async function saveProgress(newData) {
    const today = new Date().toDateString();
    await firebase.database().ref(`progress/${userId}/${today}`).set(newData);
  }

  async function handleTry() {
    if (!meme || result) return;

    const guess = input.trim().toLowerCase();
    const correct = meme.name.toLowerCase();

    if (guess === correct) {
      setResult('Acertou!');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await playSound();
      await saveProgress({ result: 'Acertou!', tries });
      navigation.navigate('Result', { result: 'Acertou!', meme });
    } else {
      const newTries = tries - 1;
      setTries(newTries);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      if (newTries <= 0) {
        setResult('Errou!');
        await saveProgress({ result: 'Errou!', tries: 0 });
        navigation.navigate('Result', { result: 'Errou!', meme });
      } else {
        await saveProgress({ result: null, tries: newTries });
      }
    }

    setInput('');
  }

  if (!meme) return <Text>Carregando meme...</Text>;

  return (
    <View style={styles.container}>
      <MemeCard meme={meme} />
      <Text style={styles.hint}>Dica: {meme.hint}</Text>
      <Text style={styles.tries}>Tentativas restantes: {tries}</Text>

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
  tries: { color: '#fff', marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 10, width: '80%', marginBottom: 10 },
});
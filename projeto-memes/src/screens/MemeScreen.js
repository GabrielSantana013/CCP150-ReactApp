import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { memes } from '../data/memes';
import { saveProgress, loadProgress } from '../utils/storage';
import MemeCard from '../components/MemeCard';

export default function MemeScreen({ navigation }) {
  const [meme, setMeme] = useState(null);
  const [input, setInput] = useState('');
  const [tries, setTries] = useState(3);
  const [result, setResult] = useState(null);
  const [sound, setSound] = useState();

  useEffect(() => {
    //escolhe o meme com "base" no dia
    const todayIndex = new Date().getDate() % memes.length;
    setMeme(memes[todayIndex]);
    loadProgress().then((data) => {
      if (data && data.date === new Date().toDateString()) {
        setTries(data.tries);
        setResult(data.result);
      }
    });
  }, []);

  //função q toca o som
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: meme.sound });
    setSound(sound);
    await sound.playAsync();
  }

  //função da tentativa
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

  //erro
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

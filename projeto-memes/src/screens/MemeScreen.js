import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../config/firebaseConfig';
import MemeCard from '../components/MemeCard';
import { localSounds } from '../data/localSounds';

export default function MemeScreen({ navigation }) {
  const [meme, setMeme] = useState(null);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [sound, setSound] = useState();
  const [buttonVibrating, setButtonVibrating] = useState(false); // 🔹 Novo estado para vibração

  const userId = 'user01';
  const today = new Date().toDateString();
  const showSoundButton = attempts >= 5;
  const showHint = attempts >= 3;

  //Sistema de zoom progressivo
  const getZoomLevel = () => {
    // Zoom inicial gigante: 3.0 
    // Zoom final: 1.0 (100% - tamanho normal)
    const zoomLevels = [3.0, 2.5, 2.0, 1.8, 1.6, 1.4, 1.2, 1.0];
    
    const levelIndex = Math.min(attempts, zoomLevels.length - 1);
    return zoomLevels[levelIndex];
  };

  const zoomLevel = getZoomLevel();

  // Função para vibrar o botão
  const vibrateButton = async () => {
    setButtonVibrating(true);
    
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Remove a animação
    setTimeout(() => {
      setButtonVibrating(false);
    }, 200);
  };

  //Carrega meme e progresso
  useEffect(() => {
    async function loadData() {
      try {
        const memesSnap = await firebase.database().ref('memes').once('value');
        if (memesSnap.exists()) {
          const memesData = Object.values(memesSnap.val());
          const todayIndex = new Date().getDate() % memesData.length;
          setMeme(memesData[todayIndex]);
        }

        const saved = await AsyncStorage.getItem(`progress_${userId}_${today}`);
        if (saved) {
          const data = JSON.parse(saved);
          setAttempts(data.attempts || 0);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }

    loadData();
  }, []);

  async function playSound() {
    if (!meme?.sound) return;

    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const soundKey = meme.sound.split('/').pop().replace('.mp3', '');
      const localSound = localSounds[soundKey];
      
      if (!localSound) return;

      const { sound: newSound } = await Audio.Sound.createAsync(
        localSound,
        { 
          shouldPlay: false,
          isLooping: false,
          volume: 1.0,
        }
      );
      
      setSound(newSound);
      await newSound.playAsync();
      
      const stopTimer = setTimeout(async () => {
        try {
          await newSound.stopAsync();
          await newSound.unloadAsync();
          clearTimeout(stopTimer);
        } catch (error) {
          console.log('Erro ao parar som:', error);
        }
      }, 5000);

      return () => clearTimeout(stopTimer);
      
    } catch (error) {
      console.error('Erro ao reproduzir som:', error);
    }
  }

async function saveProgress(newData) {
  try {
    const today = new Date().toDateString();
    const data = { 
      ...newData, 
      date: today,
      timestamp: new Date().getTime()
    };
    
    // Salva o progresso de hoje
    await AsyncStorage.setItem(`progress_${userId}_${today}`, JSON.stringify(data));
    
    // Adiciona ao histórico
    const historyKey = `history_${userId}`;
    const existingHistory = await AsyncStorage.getItem(historyKey);
    const history = existingHistory ? JSON.parse(existingHistory) : [];
    
    // Remove entrada do mesmo dia se existir (evita duplicatas)
    const filteredHistory = history.filter(item => item.date !== today);
    
    // Adiciona o novo registro no início do array
    const updatedHistory = [data, ...filteredHistory];
    
    // Mantém apenas os últimos 30 registros
    const limitedHistory = updatedHistory.slice(0, 30);
    
    await AsyncStorage.setItem(historyKey, JSON.stringify(limitedHistory));
    
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
    
    console.log(guess === correct);
    setAttempts(newAttempts);

    if (guess === correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        .catch(e => console.log('Haptics error:', e));
      
      playSound().catch(e => console.log('Audio error:', e));
      saveProgress({ result: 'Acertou!', attempts: newAttempts })
        .catch(e => console.log('Save error:', e));
      
      navigation.navigate('Result', { 
        result: 'Acertou!', 
        meme, 
        attempts: newAttempts 
      });
    } else {
      // VIBRAÇÃO APENA1S NO ERRO
      vibrateButton(); 
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        .catch(e => console.log('Haptics error:', e));
      
      saveProgress({ result: null, attempts: newAttempts })
        .catch(e => console.log('Save error:', e));
    }

    setInput('');
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, [sound]);

  if (!meme) return <Text style={styles.loadingText}>Carregando meme...</Text>;

  return (
    <View style={styles.container}>
      {/* 🔹 MemeCard com zoom progressivo */}
      <MemeCard 
        meme={meme}
        showHint={showHint}
        showAttempts={true}
        attempts={attempts}
        zoomLevel={zoomLevel} // 🔹 Nova prop
      />

      {/* 🔹 Indicador visual do zoom */}
      <View style={styles.zoomIndicator}>
        <Text style={styles.zoomText}>
          Zoom: {Math.round(zoomLevel * 100)}% 
        </Text>
        <View style={styles.zoomBar}>
          <View 
            style={[
              styles.zoomProgress, 
              { width: `${(zoomLevel - 0.3) / 0.7 * 100}%` }
            ]} 
          />
        </View>
      </View>

      {showHint && attempts === 3 && (
        <Text style={styles.hintUnlocked}>🎉 Dica liberada!</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Qual é o meme?"
        placeholderTextColor="#999"
        value={input}
        onChangeText={setInput}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[
            styles.button, 
            styles.primaryButton,
            buttonVibrating && styles.buttonVibrating // 🔹 Aplica animação quando vibrating
          ]}
          onPress={handleTry}
        >
          <Text style={styles.buttonText}>🎮 Enviar resposta</Text>
        </TouchableOpacity>

        {showSoundButton && (
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={playSound}
          >
            <Text style={styles.buttonText}>🔊 Ouvir som</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  zoomIndicator: {
    width: '100%',
    marginBottom: 15,
  },
  zoomText: {
    color: '#BB86FC',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  zoomBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
  },
  zoomProgress: {
    height: '100%',
    backgroundColor: '#BB86FC',
    borderRadius: 3,
  },
  hintCounter: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA000',
  },
  hintCounterText: {
    color: '#FFA000',
    fontSize: 14,
    textAlign: 'center',
  },
  hintUnlocked: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: { 
    backgroundColor: '#1E1E1E', 
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '100%', 
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ scale: 1 }], // Estado normal
  },
  primaryButton: {
    backgroundColor: '#BB86FC',
  },
  secondaryButton: {
    backgroundColor: '#03DAC5',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // 🔹 Estilo de vibração/animação
  buttonVibrating: {
    transform: [{ scale: 0.95 }], // Leve redução
    backgroundColor: '#9c67c9', // Cor levemente diferente durante a vibração
  },
});
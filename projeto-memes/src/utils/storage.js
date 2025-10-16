import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveProgress(data) {
  const payload = { date: new Date().toDateString(), ...data };
  await AsyncStorage.setItem('@meme_progress', JSON.stringify(payload));
}

export async function loadProgress() {
  const data = await AsyncStorage.getItem('@meme_progress');
  return data ? JSON.parse(data) : null;
}

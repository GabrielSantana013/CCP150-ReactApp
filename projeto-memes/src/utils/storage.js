import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveProgress(data) {
  const payload = { date: new Date().toDateString(), ...data };
  await AsyncStorage.setItem('@meme_progress', JSON.stringify(payload));
}

export async function loadProgress() {
  const data = await AsyncStorage.getItem('@meme_progress');
  return data ? JSON.parse(data) : null;
}

export const loadHistory = async (userId = 'user01') => {
  try {
    const historyKey = `history_${userId}`;
    const history = await AsyncStorage.getItem(historyKey);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    return [];
  }
};

export const clearHistory = async (userId = 'user01') => {
  try {
    const historyKey = `history_${userId}`;
    await AsyncStorage.removeItem(historyKey);
  } catch (error) {
    console.error('Erro ao limpar histórico:', error);
  }
};
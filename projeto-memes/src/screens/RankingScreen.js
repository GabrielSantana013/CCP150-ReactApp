import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { loadHistory, clearHistory } from '../utils/storage';

export default function RankingScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistoryData();
  }, []);

  const loadHistoryData = async () => {
    const historyData = await loadHistory();
    setHistory(historyData);
  };

  const handleClearHistory = async () => {
    await clearHistory();
    setHistory([]);
  };

  // 🔹 Formata a data para exibição
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formato DD/MM/AAAA
  };

  // 🔹 Formata o resultado para exibição mais amigável
  const formatResult = (result) => {
    return result === 'Acertou!' ? '✅ Acertou' : '❌ Errou';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Seu Histórico</Text>
      
      {history.length > 0 ? (
        <>
          <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
            {history.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>{formatDate(item.date)}</Text>
                  {index === 0 && <Text style={styles.badge}>HOJE</Text>}
                </View>
                <View style={styles.details}>
                  <Text style={styles.result}>{formatResult(item.result)}</Text>
                  <Text style={styles.attempts}>
                    {item.attempts || 0} tentativa{item.attempts > 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          
          <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
            <Text style={styles.clearButtonText}>🗑️ Limpar Histórico</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nenhum jogo registrado ainda!</Text>
          <Text style={styles.emptySubtext}>Jogue alguns memes para ver seu histórico aqui</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: { 
    color: '#fff', 
    fontSize: 26, 
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  historyList: {
    flex: 1,
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#BB86FC',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#BB86FC',
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  result: {
    color: '#03DAC5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  attempts: {
    color: '#bbb',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#FF4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
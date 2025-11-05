import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { result, meme, attempts } = route.params;

  const getPerformanceMessage = () => {
    if (attempts === 1) {
      return "🎯 ACERTO DE PRIMEIRA! Incrível!";
    } else if (attempts <= 3) {
      return "🌟 Excelente! Você mandou bem!";
    } else if (attempts <= 5) {
      return "👍 Muito bom! Quase acertou de primeira!";
    } else {
      return "💪 Persistência é a chave! Parabéns!";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.title}>PARABÉNS!</Text>
      
      <View style={styles.resultCard}>
        <Image source={{ uri: meme.image }} style={styles.image} />
        <Text style={styles.memeName}>Era: {meme.name}</Text>
        
        <View style={styles.statsContainer}>
          <Text style={styles.performanceText}>{getPerformanceMessage()}</Text>
          <Text style={styles.attemptsText}>
            Você acertou em <Text style={styles.highlight}>{attempts}</Text> tentativa{attempts > 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>🏠 Voltar ao Início</Text>
      </TouchableOpacity>
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
  emoji: {
    fontSize: 64,
    marginBottom: 10,
  },
  title: { 
    color: '#BB86FC', 
    fontSize: 32, 
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#1E1E1E',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#BB86FC',
    shadowColor: '#BB86FC',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    width: '100%',
  },
  image: { 
    width: 200, 
    height: 200, 
    borderRadius: 15, 
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#333',
  },
  memeName: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  performanceText: {
    color: '#03DAC5',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  attemptsText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  highlight: {
    color: '#BB86FC',
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#BB86FC',
    paddingVertical: 16,
    paddingHorizontal: 32,
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
    minWidth: 200,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
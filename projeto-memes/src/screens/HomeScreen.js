import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';


export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header com a home_image */}
        <View style={styles.header}>
           <Image
            source={require('../../images/home_image-removebg-preview.png')}
            style={styles.imageIcon}
          />
          <Text style={styles.title}>Meme do Dia</Text>
          <Text style={styles.subtitle}>Descubra o meme de hoje!</Text>
        </View>
        {/* Botões estilizados */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('Meme')}
          >
            <Text style={styles.buttonText}>🎮 Jogar Agora</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('Ranking')}
          >
            <Text style={styles.buttonText}>🏆 Ver Ranking</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <Text style={styles.footer}>
          Calma calabreso! 😄
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
    imageIcon: {
    width: 160,
    height: 160,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#BB86FC',
    fontSize: 18,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#BB86FC',
    marginVertical: 20,
  },
  infoText: {
    color: '#E0E0E0',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
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
  footer: {
    color: '#666',
    fontSize: 14,
    marginTop: 20,
  },
});
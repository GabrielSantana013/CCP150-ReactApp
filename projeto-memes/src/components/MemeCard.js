import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native';

export default function MemeCard({ meme, showHint = false, showAttempts = false, attempts = 0, zoomLevel = 1.0 }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const isImageFormatSupported = (uri) => {
    if (!uri) return false;
    const extension = uri.split('.').pop().toLowerCase();
    const supportedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    return supportedFormats.includes(extension);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (!meme?.image) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>Imagem não disponível</Text>
      </View>
    );
  }

  const isSupported = isImageFormatSupported(meme.image);

  return (
    <View style={styles.container}>
      {/* 🔹 Container com overflow para o zoom não vazar */}
      <View style={styles.zoomContainer}>
        {/* Card da imagem com ZOOM IN aplicado */}
        <View style={styles.card}>
          {imageLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#BB86FC" />
              <Text style={styles.loadingText}>Carregando...</Text>
            </View>
          )}
          
          {(!isSupported || imageError) ? (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>Formato não suportado</Text>
            </View>
          ) : (
            <Image 
              source={{ uri: meme.image }} 
              style={[
                styles.image,
                {
                  transform: [{ scale: zoomLevel }]
                }
              ]}
              onError={handleImageError}
              onLoad={handleImageLoad}
              resizeMode="cover"
            />
          )}
        </View>
      </View>

      {/* Informações extras */}
      {showHint && (
        <Text style={styles.hint}>Dica: {meme.hint}</Text>
      )}
      
      {showAttempts && (
        <Text style={styles.attempts}>Tentativas: {attempts}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  zoomContainer: {
    width: 300, // Tamanho fixo do container
    height: 300,
    overflow: 'hidden', // 🔹 IMPORTANTE: esconde as partes que saem do zoom
    borderRadius: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: '#BB86FC',
    borderWidth: 3,
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    // O transform scale vai fazer o zoom agora
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  loadingText: {
    color: '#BB86FC',
    marginTop: 10,
    fontSize: 14,
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
  hint: {
    color: '#BB86FC',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  attempts: {
    color: '#03DAC5',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
});
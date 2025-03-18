import React, { useState } from 'react';
import { View, Button, StyleSheet, ActivityIndicator, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';


type Mode = 'happy' | 'sad' | 'peaceful' | 'energetic' | 'romantic' | 'meditation';

const MODES: { id: Mode; label: string; description: string; audio: any }[] = [
  { 
    id: 'happy', 
    label: 'Happy', 
    description: 'Upbeat and cheerful',
    audio: require('../assets/music/sad.mp3')
  },
  { 
    id: 'sad', 
    label: 'Sad', 
    description: 'Melancholic and emotional',
    audio: require('../assets/music/sad.mp3')
  },
  { 
    id: 'peaceful', 
    label: 'Peaceful', 
    description: 'Calm and relaxing',
    audio: require('../assets/music/sad.mp3')
  },
  { 
    id: 'energetic', 
    label: 'Energetic', 
    description: 'Dynamic and powerful',
    audio: require('../assets/music/sad.mp3')
  },
  { 
    id: 'meditation', 
    label: 'Meditation', 
    description: 'Zen and mindful',
    audio: require('../assets/music/sad.mp3')
  },
];

const TextToMusic = ({  }) => {
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);

  const playSound = async (audio: any) => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        audio,
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (error) {
      console.error('Error playing sound:', error);
      setError('Failed to play audio');
    }
  };

  const handleGenerate = async (mode: Mode) => {
    setSelectedMode(mode);
    setLoading(true);
    setError(null);
    try {
      const selectedAudio = MODES.find(m => m.id === mode)?.audio;
      if (!selectedAudio) {
        throw new Error('Audio file not found');
      }
      await playSound(selectedAudio);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Music Player</Text>
      <Text style={styles.subtitle}>Select a mood to play music</Text>
      
      <View style={styles.modesContainer}>
        {MODES.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            style={[
              styles.modeButton,
              selectedMode === mode.id && styles.selectedMode
            ]}
            onPress={() => handleGenerate(mode.id)}
            disabled={loading}
          >
            <Text style={[
              styles.modeLabel,
              selectedMode === mode.id && styles.selectedModeText
            ]}>
              {mode.label}
            </Text>
            <Text style={styles.modeDescription}>{mode.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {sound && (
        <Button
          title="Stop Music"
          onPress={handleStop}
          color="red"
        />
      )}
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading music...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  modesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  modeButton: {
    width: '45%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  selectedMode: {
    backgroundColor: '#007AFF',
  },
  modeLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedModeText: {
    color: '#fff',
  },
  modeDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default TextToMusic; 
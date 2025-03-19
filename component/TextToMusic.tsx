import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Mode =
  | "happy"
  | "sad"
  | "peaceful"
  | "energetic"
  | "romantic"
  | "meditation";

const MODES: {
  id: Mode;
  label: string;
  description: string;
  audio: any;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}[] = [
  {
    id: "happy",
    label: "Happy",
    description: "Upbeat and cheerful",
    audio: require("../assets/music/sad.mp3"),
    icon: "emoticon-happy",
  },
  {
    id: "sad",
    label: "Sad",
    description: "Melancholic and emotional",
    audio: require("../assets/music/sad.mp3"),
    icon: "emoticon-sad",
  },
  {
    id: "peaceful",
    label: "Peaceful",
    description: "Calm and relaxing",
    audio: require("../assets/music/sad.mp3"),
    icon: "peace",
  },
  {
    id: "energetic",
    label: "Energetic",
    description: "Dynamic and powerful",
    audio: require("../assets/music/sad.mp3"),
    icon: "lightning-bolt",
  },
  {
    id: "meditation",
    label: "Meditation",
    description: "Zen and mindful",
    audio: require("../assets/music/sad.mp3"),
    icon: "meditation",
  },
];

const TextToMusic = ({}) => {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const handleGenerate = async (mode: Mode) => {
    setSelectedMode(mode);
    setLoading(true);
    setError(null);

    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: createdSound } = await Audio.Sound.createAsync(
        MODES.find((m) => m.id === mode)?.audio ||
          require("../assets/music/sad.mp3")
      );
      setSound(createdSound);
      await createdSound?.playAsync();
    } catch (e) {
      console.error("Error generating music:", e);
      setError("An error occurred while generating music.");
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    if (sound) {
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
              selectedMode === mode.id && styles.selectedMode,
            ]}
            onPress={() => handleGenerate(mode.id)}
            disabled={loading}
          >
            <MaterialCommunityIcons
              name={mode.icon}
              size={32}
              color={selectedMode === mode.id ? "#fff" : "#007AFF"}
            />
            <Text
              style={[
                styles.modeLabel,
                selectedMode === mode.id && styles.selectedModeText,
              ]}
            >
              {mode.label}
            </Text>
            <Text
              style={[
                styles.modeDescription,
                selectedMode === mode.id && styles.selectedModeText,
              ]}
            >
              {mode.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {sound && <Button title="Stop Music" onPress={handleStop} color="red" />}

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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  modesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  modeButton: {
    width: "45%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  selectedMode: {
    backgroundColor: "#007AFF",
  },
  modeLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },
  selectedModeText: {
    color: "#fff",
  },
  modeDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default TextToMusic;

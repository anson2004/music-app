import React, { useEffect, useState } from "react";
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

type Mode = "happy" | "sad" | "peaceful" | "energetic" | "meditation";

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
    audio: require("../../assets/music/happy.mp3"),
    icon: "emoticon-happy",
  },
  {
    id: "sad",
    label: "Sad",
    description: "Melancholic and emotional",
    audio: require("../../assets/music/sad.mp3"),
    icon: "emoticon-sad",
  },
  {
    id: "peaceful",
    label: "Peaceful",
    description: "Calm and relaxing",
    audio: require("../../assets/music/sad.mp3"),
    icon: "peace",
  },
  {
    id: "energetic",
    label: "Energetic",
    description: "Dynamic and powerful",
    audio: require("../../assets/music/sad.mp3"),
    icon: "lightning-bolt",
  },
  {
    id: "meditation",
    label: "Meditation",
    description: "Zen and mindful",
    audio: require("../../assets/music/meditation.mp3"),
    icon: "meditation",
  },
];

const VolumeControl = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  const steps = 10;
  return (
    <View style={styles.mixerControl}>
      <Text style={styles.mixerLabel}>{label}</Text>
      <View style={styles.volumeBar}>
        {Array.from({ length: steps }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.volumeSegment,
              index < value * steps && styles.volumeSegmentActive,
            ]}
            onPress={() => onChange((index + 1) / steps)}
          />
        ))}
      </View>
      <Text style={styles.volumeValue}>{Math.round(value * 100)}%</Text>
    </View>
  );
};

const TextToMusic = ({}) => {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [mixerVolumes, setMixerVolumes] = useState({
    happy: 1.0,
    sad: 1.0,
    peaceful: 1.0,
    energetic: 1.0,
    meditation: 1.0,
  });

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
          require("../../assets/music/happy.mp3")
      );
      await createdSound.setVolumeAsync(
        mixerVolumes[mode] * mixerVolumes.master
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

  const updateVolume = (type: keyof typeof mixerVolumes, value: number) => {
    setMixerVolumes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

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
         
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.mixer}>
        <Text style={styles.mixerTitle}>Mixer</Text>
        {MODES.map((mode) => (
          <VolumeControl
            key={mode.id}
            label={`${mode.label} Volume`}
            value={mixerVolumes[mode.id]}
            onChange={(value) => updateVolume(mode.id, value)}
          />
        ))}
        <VolumeControl
          label="Master Volume"
          value={mixerVolumes.master}
          onChange={(value) => updateVolume("master", value)}
        />
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
    width: "20%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
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
  mixer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  mixerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  mixerControl: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  mixerLabel: {
    width: 120,
    fontSize: 14,
  },
  volumeBar: {
    flex: 1,
    flexDirection: "row",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  volumeSegment: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 1,
  },
  volumeSegmentActive: {
    backgroundColor: "#007BFF",
  },
  volumeValue: {
    width: 50,
    textAlign: "right",
    fontSize: 14,
  },
});

export default TextToMusic;

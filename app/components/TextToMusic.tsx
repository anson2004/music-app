import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Path, Circle } from "react-native-svg";

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

const PieVolumeControl = ({
  value,
  onChange,
  icon,
  size = 60,
}: {
  value: number;
  onChange: (value: number) => void;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
}) => {
  const radius = size / 2;
  const strokeWidth = 8;
  const center = radius;
  const circumference = 2 * Math.PI * (radius - strokeWidth / 2);
  const progress = value * circumference;
  const startAngle = -Math.PI / 2; // Start from top
  const endAngle = startAngle + (2 * Math.PI * value);

  const getPoint = (angle: number) => {
    const x = center + (radius - strokeWidth / 2) * Math.cos(angle);
    const y = center + (radius - strokeWidth / 2) * Math.sin(angle);
    return `${x},${y}`;
  };

  const getArcPath = () => {
    const start = getPoint(startAngle);
    const end = getPoint(endAngle);
    const largeArcFlag = value > 0.5 ? 1 : 0;
    return `M ${start} A ${radius - strokeWidth / 2} ${radius - strokeWidth / 2} 0 ${largeArcFlag} 1 ${end}`;
  };

  const handlePress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    const dx = locationX - center;
    const dy = locationY - center;
    let angle = Math.atan2(dy, dx);
    
    // Adjust angle to start from top
    angle = angle - startAngle;
    if (angle < 0) angle += 2 * Math.PI;
    
    // Convert angle to value between 0 and 1
    const newValue = Math.min(Math.max(angle / (2 * Math.PI), 0), 1);
    onChange(newValue);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.pieContainer}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2}
          stroke="#ddd"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <Path
          d={getArcPath()}
          stroke="#007AFF"
          strokeWidth={strokeWidth}
          fill="none"
        />
      </Svg>
      <View style={[styles.iconContainer, { position: 'absolute' }]}>
        <MaterialCommunityIcons name={icon} size={24} color="#007AFF" />
      </View>
    </TouchableOpacity>
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
    master: 1.0,
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
        <View style={styles.pieMixerContainer}>
          {MODES.map((mode) => (
            <View key={mode.id} style={styles.pieControlWrapper}>
              <PieVolumeControl
                value={mixerVolumes[mode.id]}
                onChange={(value) => updateVolume(mode.id, value)}
                icon={mode.icon}
                size={80}
              />
              <Text style={styles.volumeValue}>{Math.round(mixerVolumes[mode.id] * 100)}%</Text>
            </View>
          ))}
        </View>
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
  pieMixerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  pieContainer: {
    width: 90,
    height:90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieControlWrapper: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeValue: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
});

export default TextToMusic;

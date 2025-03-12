import React, { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import * as FileSystem from 'expo-file-system';

// Import sound files
import soundDo from "../assets/sounds/C.mp3";
import soundRe from "../assets/sounds/D.mp3";
import soundMi from "../assets/sounds/E.mp3";
import soundFa from "../assets/sounds/F.mp3";
import soundSo from "../assets/sounds/G.mp3";
import soundLa from "../assets/sounds/A.mp3";
import soundSi from "../assets/sounds/B.mp3";

const WHITE_KEY_WIDTH = 35;
const BLACK_KEY_WIDTH = 30;
const BLACK_KEY_WIDTH_OFFSET = 25;

// Mapping object for note sounds
const noteSounds = {
  do: soundDo,
  re: soundRe,
  mi: soundMi,
  fa: soundFa,
  so: soundSo,
  la: soundLa,
  si: soundSi,
};

const MiniPianoBoard = () => {
  const [soundObjects, setSoundObjects] = useState<Audio.Sound[]>([]);
  const recordingRef = useRef<Audio.Recording | null>(null);

  useEffect(() => {
    // Change orientation to landscape when the component is mounted
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Reset orientation to default when the component is unmounted
    return () => {
      ScreenOrientation.unlockAsync();
      // Unload all sound objects when the component is unmounted
      soundObjects.forEach(soundObject => soundObject.unloadAsync());
    };
  }, [soundObjects]);

  const playSound = async (note: keyof typeof noteSounds) => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(noteSounds[note]);
      await soundObject.playAsync();
      setSoundObjects(prev => [...prev, soundObject]);
    } catch (error) {
      console.error(error);
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access microphone is required!');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      recordingRef.current = recording;
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        console.log('Recording saved at', uri);

        // Save the recording to the file system
        const newUri = `${FileSystem.documentDirectory}recording.mp3`;
        await FileSystem.moveAsync({
          from: uri!,
          to: newUri,
        });
        console.log('Recording moved to', newUri);
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  return (
    <View>
      <View style={styles.piano}>
        <TouchableOpacity
          key={`white-do`}
          style={[styles.key, styles.whiteKey]}
          onPress={() => playSound("do")}
        >
          <Text style={styles.keyLabel}>do</Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={`black-do-half`}
          style={[styles.key, styles.blackKey, { left: BLACK_KEY_WIDTH_OFFSET }]}
        />
        <TouchableOpacity
          key={`white-re`}
          style={[styles.key, styles.whiteKey]}
          onPress={() => playSound("re")}
        >
          <Text style={styles.keyLabel}>re</Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={`black-re-half`}
          style={[
            styles.key,
            styles.blackKey,
            { left: WHITE_KEY_WIDTH + BLACK_KEY_WIDTH_OFFSET },
          ]}
        />
        <TouchableOpacity
          key={`white-mi`}
          style={[styles.key, styles.whiteKey]}
          onPress={() => playSound("mi")}
        >
          <Text style={styles.keyLabel}>mi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={`white-fa`}
          style={[styles.key, styles.whiteKey]}
          onPress={() => playSound("fa")}
        >
          <Text style={styles.keyLabel}>fa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={`black-fa-half`}
          style={[
            styles.key,
            styles.blackKey,
            { left: 3 * WHITE_KEY_WIDTH + BLACK_KEY_WIDTH_OFFSET },
          ]}
        />
        <TouchableOpacity
          key={`white-so`}
          style={[styles.key, styles.whiteKey]}
          onPress={() => playSound("so")}
        >
          <Text style={styles.keyLabel}>so</Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={`black-so-half`}
          style={[
            styles.key,
            styles.blackKey,
            { left: 4 * WHITE_KEY_WIDTH + BLACK_KEY_WIDTH_OFFSET },
          ]}
        />
        <TouchableOpacity
          key={`white-la`}
          style={[styles.key, styles.whiteKey]}
          onPress={() => playSound("la")}
        >
          <Text style={styles.keyLabel}>la</Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={`black-la-half`}
          style={[
            styles.key,
            styles.blackKey,
            { left: 5 * WHITE_KEY_WIDTH + BLACK_KEY_WIDTH_OFFSET },
          ]}
        />
        <TouchableOpacity
          key={`white-si`}
          style={[styles.key, styles.whiteKey]}
          onPress={() => playSound("si")}
        >
          <Text style={styles.keyLabel}>si</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={startRecording} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>Start Recording</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopRecording} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>Stop Recording</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  piano: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  key: {
    height: 150,
    margin: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  whiteKey: {
    width: WHITE_KEY_WIDTH,
    backgroundColor: "#fff",
  },
  blackKey: {
    width: BLACK_KEY_WIDTH,
    backgroundColor: "#000",
    height: 100,
    position: "absolute",
    zIndex: 1,
  },
  keyLabel: {
    color: "#000",
    marginBottom: 5,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  controlButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  controlButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MiniPianoBoard;
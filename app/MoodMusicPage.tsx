import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextToMusic from '../component/TextToMusic';

export default function MoodMusicPage() {
  return (
    <View style={styles.container}>
      <TextToMusic />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 
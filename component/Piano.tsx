import { View, TouchableOpacity, StyleSheet } from 'react-native';

const Piano = () => {
  const renderPianoKeys = () => {
    const keys = [];
    for (let i = 0; i < 14; i++) {
      keys.push(
        <TouchableOpacity key={i} style={[styles.key, i % 2 === 0 ? styles.whiteKey : styles.blackKey]} />
      );
    }
    return keys;
  };

  return (
    <View style={styles.piano}>
      {renderPianoKeys()}
    </View>
  );
};

const styles = StyleSheet.create({
  piano: {
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  key: {
    width: 30,
    height: 150,
    margin: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  whiteKey: {
    backgroundColor: '#fff',
  },
  blackKey: {
    backgroundColor: '#000',
    height: 100,
    marginBottom: 50,
    zIndex: 1,
    position: 'absolute',
    marginLeft: 20,
  },
});

export default Piano;
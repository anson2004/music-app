import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const WHITE_KEY_WIDTH = 35;
const BLACK_KEY_WIDTH = 30;
const BLACK_KEY_WIDTH_OFFSET = 25;

const Piano: React.FC = () => {
  return (
    <View style={styles.piano}>
      <TouchableOpacity key={`white-do`} style={[styles.key, styles.whiteKey]}>
        <Text style={styles.keyLabel}>do</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key={`black-do-half`}
        style={[styles.key, styles.blackKey, { left: BLACK_KEY_WIDTH_OFFSET }]}
      />
      <TouchableOpacity key={`white-re`} style={[styles.key, styles.whiteKey]}>
        <Text style={styles.keyLabel}>re</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key={`black-re-half`}
        style={[styles.key, styles.blackKey, { left: WHITE_KEY_WIDTH + BLACK_KEY_WIDTH_OFFSET }]}
      />
      <TouchableOpacity key={`white-mi`} style={[styles.key, styles.whiteKey]}>
        <Text style={styles.keyLabel}>mi</Text>
      </TouchableOpacity>
      <TouchableOpacity key={`white-fa`} style={[styles.key, styles.whiteKey]}>
        <Text style={styles.keyLabel}>fa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key={`black-fa-half`}
        style={[styles.key, styles.blackKey, { left: 3 * WHITE_KEY_WIDTH + BLACK_KEY_WIDTH_OFFSET }]}
      />
      <TouchableOpacity key={`white-so`} style={[styles.key, styles.whiteKey]}>
        <Text style={styles.keyLabel}>so</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key={`black-so-half`}
        style={[styles.key, styles.blackKey, { left: 4 * WHITE_KEY_WIDTH + BLACK_KEY_WIDTH_OFFSET }]}
      />
      <TouchableOpacity key={`white-la`} style={[styles.key, styles.whiteKey]}>
        <Text style={styles.keyLabel}>la</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key={`black-la-half`}
        style={[styles.key, styles.blackKey, { left: 5 * WHITE_KEY_WIDTH + BLACK_KEY_WIDTH_OFFSET }]}
      />
      <TouchableOpacity key={`white-si`} style={[styles.key, styles.whiteKey]}>
        <Text style={styles.keyLabel}>si</Text>
      </TouchableOpacity>
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
});

export default Piano;

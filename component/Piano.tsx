import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const Piano: React.FC = () => {
 

  return (
    <View style={styles.piano}>
            <TouchableOpacity key={`white-do`} style={[styles.key, styles.whiteKey]}>
        <Text style={styles.keyLabel}>do</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key={`black-do-half`}
        style={[styles.key, styles.blackKey, { left: 25 }]}
      />
      <TouchableOpacity
        key={`white-re`}
        style={[styles.key, styles.whiteKey]}
      />
      <TouchableOpacity
        key={`black-re-half`}
        style={[styles.key, styles.blackKey, { left: 35 +25 }]}
      />

      <TouchableOpacity
        key={`white-mi`}
        style={[styles.key, styles.whiteKey]}
      />
       <TouchableOpacity
        key={`white-fa`}
        style={[styles.key, styles.whiteKey]}
      />
       <TouchableOpacity
        key={`black-fa-half`}
        style={[styles.key, styles.blackKey, { left: 3*35 +25 }]}
      />
      <TouchableOpacity
        key={`white-so`}
        style={[styles.key, styles.whiteKey]}
      />
       <TouchableOpacity
        key={`black-so-half`}
        style={[styles.key, styles.blackKey, { left: 4*35 +25 }]}
      />
        <TouchableOpacity
        key={`white-la`}
        style={[styles.key, styles.whiteKey]}
      />
         <TouchableOpacity
        key={`black-la-half`}
        style={[styles.key, styles.blackKey, { left: 5*35 +25 }]}
      />
       <TouchableOpacity
        key={`white-si`}
        style={[styles.key, styles.whiteKey]}
      />
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
    },
    whiteKey: {
      width: 35,
      backgroundColor: "#fff",
    },
    blackKey: {
      width: 30,
      backgroundColor: "#000",
      height: 100,
      position: "absolute",
      zIndex: 1,
    },
    keyLabel: {
        color: "#000",
        marginTop: 5,
      },
  });
  
export default Piano;

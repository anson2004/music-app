import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const MainContainer = ({ children, title }: Props) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default MainContainer;

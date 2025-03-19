import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const MainContainer = ({ children, title }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </SafeAreaView>
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
    marginTop: 60,
    marginBottom: 20,
  },
});

export default MainContainer;

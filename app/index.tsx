import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Link } from "expo-router";
import MainContainer from "../component/MainContainer";

const HomeScreen = () => {
  return (
    <MainContainer title="Have fun with music!">
      <Link href="/PaintPage" style={styles.block}>
        <ImageBackground
          source={require("../assets/favicon.png")}
          style={styles.imageBackground}
        ></ImageBackground>
      </Link>
      <Link href="/MiniPiano" style={styles.block}>
        <ImageBackground
          source={require("../assets/icon.png")}
          style={styles.imageBackground}
        ></ImageBackground>
      </Link>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  block: {
    width: "80%",
    height: 100,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;

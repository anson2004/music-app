import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from "react-native";
import { Link } from "expo-router";
import MainContainer from "../component/MainContainer";

const HomeScreen = () => {
  return (
    <MainContainer title="Select your playground">
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <Link href="/PaintPage" asChild>
            <TouchableOpacity style={styles.block}>
              <ImageBackground
                source={require("../assets/paint/paint1.jpg")}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
              >
                <Text style={styles.linkText}>Paint</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Link>
          <Link href="/MiniPiano" asChild>
            <TouchableOpacity style={styles.block}>
              <ImageBackground
                source={require("../assets/icon.png")}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
              >
                <Text style={styles.linkText}>Piano</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.row}>
          <Link href="/ComingSoon" asChild>
            <TouchableOpacity style={styles.block}>
              <ImageBackground
                source={require("../assets/favicon.png")}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
              >
                <Text style={styles.linkText}>Coming Soon</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Link>
          <Link href="/ComingSoon2" asChild>
            <TouchableOpacity style={styles.block}>
              <ImageBackground
                source={require("../assets/favicon.png")}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
              >
                <Text style={styles.linkText}>Coming Soon</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  block: {
    width: 150,
    height: 150,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageStyle: {
    opacity: 0.7,
  },
  linkText: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    padding: 8,
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;

import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import MainContainer from "../component/MainContainer";

const HomeScreen = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  // assume it is phone
  const isLandscape = screenWidth > screenHeight * 1.5;

  const blocks = [
    { href: "/PaintPage", title: "Paint", image: require("../assets/paint/paint1.jpg") },
    { href: "/MiniPiano", title: "Piano", image: require("../assets/icon.png") },
    { href: "/ComingSoon", title: "Coming Soon", image: require("../assets/favicon.png") },
    { href: "/ComingSoon2", title: "Coming Soon", image: require("../assets/favicon.png") },
  ];

  return (
    <MainContainer title="Select your playground">
      <View style={[
        styles.container,
        isLandscape ? styles.landscapeContainer : styles.portraitContainer
      ]}>
        {blocks.map((block, index) => (
          <Link key={index} href={block.href} style={[
            styles.block,
            isLandscape ? styles.landscapeBlock : styles.portraitBlock
          ]} asChild>
            <TouchableOpacity >
              <ImageBackground
                source={block.image}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
              >
                <Text style={styles.linkText}>{block.title}</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    paddingVertical: 20,
  },
  portraitContainer: {
    paddingHorizontal: 20,
  },
  landscapeContainer: {
    paddingHorizontal: 15,
  },
  block: {
    aspectRatio: 1,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  portraitBlock: {
    width: 150,
  },
  landscapeBlock: {
    width: 150,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  imageStyle: {
    opacity: 0.9,
  },
  linkText: {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    padding: 12,
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default HomeScreen;

import React, { useState } from "react";
import { StyleSheet, View, Image, Button, PanResponder } from "react-native";
import MainContainer from "../component/MainContainer";
import ColorPickerWheel from 'react-native-color-picker-wheel';


const PaintPage = () => {
    const [selectedColor, setSelectedColor] = useState<string>('#000000');
    const [paths, setPaths] = useState<{ x: number, y: number, color: string }[]>([]);
  
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // called every time the touch moves so we only need to mark dot when finger move
        const { locationX, locationY } = evt.nativeEvent;
        //filter outlier points
        if (locationX < 10 && locationY < 10) return;
        // console.log(locationX, locationY);
        //TODO check if the point is inside the image
         // Ensure the points are within the bounds of the image
        if (locationX >= 0 && locationX <= 400 && locationY >= 0 && locationY <= 450) {
          setPaths(prevPaths => [...prevPaths, { x: locationX, y: locationY, color: selectedColor }]);
        }
      },
    });

    const clearPaint = () => {
      setPaths([]);
    };
  
    return (
      <MainContainer>
          <Image
            source={require('../assets/paint/paint1.jpg')} // Replace with the correct path to your image
            style={styles.image}
            resizeMode="contain"
            {...panResponder.panHandlers}
          />
          <View style={styles.overlay}>
            {paths.map((path, index) => (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  left: path.x,
                  top: path.y,
                  width: 10,
                  height: 10,
                  backgroundColor: path.color,
                  borderRadius: 5,
                }}
              />
            ))}
          </View>
          <View style={styles.controls}>
          <ColorPickerWheel
            initialColor={selectedColor}
            onColorChangeComplete={(color: React.SetStateAction<string>) => setSelectedColor(color)}
            style={styles.colorPicker}
          />
          <Button title="Clear" onPress={clearPaint} />
        </View>
      </MainContainer>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: "95%",
      height: "70%",
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: "95%",
    },
    controls: {

      flex: 1,
     flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    colorPicker: {
      width: '80%',
      height: 50,
      alignSelf: 'flex-start',

      marginRight: 10,
    },
  });
export default PaintPage;

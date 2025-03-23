import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, GestureResponderEvent, PanResponder, ImageSourcePropType } from "react-native";
import Svg, { Path } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import usePaintStore from '../store/paintStore';

const COLORS = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'];

const BOUNDART_HEIGHT = 530;
const BOUNDART_WIDTH = 400;

interface Props {
  imageSource: ImageSourcePropType;
}

const Paint = ({ imageSource }: Props) => {
    const { color, setColor } = usePaintStore();
    const [currentPath, setCurrentPath] = useState<string>('');
    const [paths, setPaths] = useState<{path: string, color: string}[]>([]);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
  
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt: GestureResponderEvent) => {
        const { locationX, locationY } = evt.nativeEvent;
        if (locationX < 10 && locationY < 10) return;
        if (locationX >= 0 && locationX <= BOUNDART_WIDTH && locationY >= 0 && locationY <= BOUNDART_HEIGHT) {
          setCurrentPath(`M ${locationX} ${locationY}`);
          setIsDrawing(true);
        }
      },
      onPanResponderMove: (evt: GestureResponderEvent) => {
        const { locationX, locationY } = evt.nativeEvent;
        if (!isDrawing) return;
        if (locationX < 10 && locationY < 10) return;
        if (locationX >= 0 && locationX <= BOUNDART_WIDTH && locationY >= 0 && locationY <= BOUNDART_HEIGHT) {
          try {
            setCurrentPath(prevPath => {
              // Only add L command if we have a valid previous path
              if (prevPath && prevPath.startsWith('M')) {
                return `${prevPath} L ${locationX} ${locationY}`;
              }
              // If no valid previous path, start a new one
              return `M ${locationX} ${locationY}`;
            });
          } catch (error) {
            console.log('Error updating path:', error);
            // Reset the path if there's an error
            setCurrentPath(`M ${locationX} ${locationY}`);
          }
        }
      },
      onPanResponderRelease: () => {
        if (currentPath && isDrawing) {
          setPaths(prevPaths => [...prevPaths, { path: currentPath, color }]);
          setCurrentPath('');
          setIsDrawing(false);
        }
      }
    });

    const clearPaint = () => {
      setPaths([]);
      setCurrentPath('');
      setIsDrawing(false);
    };
  
    return (
      <View style={styles.container}>
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="contain"
        />
        <Svg style={[styles.overlay]} {...panResponder.panHandlers}>
          {paths.map((path, index) => (
            <Path
              key={index}
              d={path.path}
              stroke={path.color}
              strokeWidth={5}
              fill="none"
            />
          ))}
          {currentPath ? (
            <Path
              d={currentPath}
              stroke={color}
              strokeWidth={5}
              fill="none"
            />
          ) : null}
        </Svg>
        <View style={styles.controls}>
          <View style={styles.colorPicker}>
            {COLORS.map((colorOption, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: colorOption },
                  color === colorOption && styles.selectedColor
                ]}
                onPress={() => setColor(colorOption)}
              />
            ))}
          </View>
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={clearPaint}
          >
            <MaterialCommunityIcons name="eraser" size={28} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  image: {
    width: "100%",
    height: "95%",
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  controls: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '50%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#333',
  },
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A0C878',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Paint; 
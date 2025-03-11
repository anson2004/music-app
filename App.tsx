import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MiniPiano from './component/MiniPiano';
import MainContainer from './component/MainContainer';

const Stack = createStackNavigator();

import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<any, 'Home'>;

const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  return (
    <MainContainer title="Professional Piano Keyboard">
      <View style={styles.block}>
        <Text>Block 1</Text>
      </View>
      <TouchableOpacity style={styles.block} onPress={() => navigation.navigate('MiniPiano')}>
        <Text>Go to MiniPiano</Text>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MiniPiano" component={MiniPiano} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '80%',
    height: 100,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
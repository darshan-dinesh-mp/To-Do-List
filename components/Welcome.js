import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import TodoList from './TodoList';

export default function Welcome({ navigation }) {

  useEffect(() => {

    const timeout = setTimeout(() => {
      navigation.navigate(TodoList)
    }, 2000)
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./images/background.jpg')}
        style={styles.backgroundImage}>

        <Image style={styles.img}
          source={{ uri: "https://png.pngtree.com/png-clipart/20220812/ourmid/pngtree-green-to-do-list-paper-png-image_6108017.png" }}
        />

      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
    borderColor: "grey",
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },

  img: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },

})
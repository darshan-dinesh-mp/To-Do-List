import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import TodoList from './TodoList';

export default function Welcome({ navigation }) {

  function getstart() {
    navigation.navigate(TodoList)
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./images/background.jpg')}
        style={styles.backgroundImage}>

        <Image style={styles.img}
          source={{ uri: "https://png.pngtree.com/png-clipart/20220812/ourmid/pngtree-green-to-do-list-paper-png-image_6108017.png" }}
        />
        <View>
          <Text style={styles.welcome}>Welcome</Text>
        </View>


        <View >
          <TouchableOpacity style={styles.btn} onPress={getstart}>
            <Text style={styles.buttonText}>
              {title = 'Get Started '}
            </Text>
            <Image style={styles.playimg}
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/3318/3318660.png" }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ display: "flex", gap: 3, alignItems: "flex-start", justifyContent: "center", position: 'absolute', left: 20, bottom: 20 }}>
          <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 12 }}>Developed by:</Text>
          <View style={{ alignSelf: 'flex-end' }}>
            <Text style={styles.name}>Darshan</Text>
            <Text style={styles.name}>Chirashree</Text>
            <Text style={styles.name}>Sakshi J Shetty</Text>
            <Text style={styles.name}>Nisha Shetty</Text>
            <Text style={styles.name}>Kavana Navada</Text>
          </View>
        </View>
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

  welcome: {
    fontFamily: "Montserrat-Bold",
    fontSize: 50,
    color: 'black',
    letterSpacing: 1,
    marginBottom: 30,
  },

  name: {
    fontFamily: "Montserrat-Bold",
    fontSize: 10,
    color: '#797777',
  },

  btn: {
    marginTop: 35,
    borderWidth: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    color: "black",
    paddingRight: 40
  },

  buttonText: {
    fontSize: 20,
    color: "black",
    fontWeight: 'bold',
  },

  img: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  playimg: {
    height: 20,
    width: 20,
    position: "absolute",
    top: 14,
    right: 15
  }

})
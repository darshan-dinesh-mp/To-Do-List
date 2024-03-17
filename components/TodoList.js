import { View, Text, TextInput, Button, Touchable, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from './Welcome'


export default function TodoList({ navigation }) {

  const [value, setValue] = useState("")
  const [list, setList] = useState([])
  const [deletedList, setDeletedList] = useState([])
  const [isVisible, setIsVisible] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [toggleRecentDelete, setToggleRecentDelete] = useState(false);

  const STORAGE_KEY_MAIN_LIST = 'mainList';
  const STORAGE_KEY_DELETED_LIST = 'deletedList';


  useEffect(() => {
    const getListFromStorage = async () => {
      try {
        const storedList = await AsyncStorage.getItem('todoList');
        if (storedList !== null) {
          setList(JSON.parse(storedList));
        }
      } catch (error) {
        console.error('Error getting list from AsyncStorage:', error);
      }
    };
    getListFromStorage();
  }, []);

  useEffect(() => {
    const getListFromStorage = async () => {
      try {
        const storedMainList = await AsyncStorage.getItem(STORAGE_KEY_MAIN_LIST);
        if (storedMainList !== null) {
          setList(JSON.parse(storedMainList));
        }

        const storedDeletedList = await AsyncStorage.getItem(STORAGE_KEY_DELETED_LIST);
        if (storedDeletedList !== null) {
          setDeletedList(JSON.parse(storedDeletedList));
        }
      } catch (error) {
        console.error('Error getting lists from AsyncStorage:', error);
      }
    };
    getListFromStorage();
  }, []);


  async function buttonPress() {
    if (value !== "") {
      const newList = [...list, value];
      setList(newList);
      await AsyncStorage.setItem(STORAGE_KEY_MAIN_LIST, JSON.stringify(newList));
      setValue("");
      setIsVisible(!isVisible);
    }
  }


  function getInput(text) {
    setValue(text)
  }

  function toggleVisibility() {
    setIsVisible(!isVisible)
    if (menuToggle === true)
      setMenuToggle(false)
  }

  function pressRecentDelete() {
    setToggleRecentDelete(!toggleRecentDelete)
    setMenuToggle(false)
  }

  function barsPressed() {
    setMenuToggle(!menuToggle)
    setIsVisible(false)
  }

  function removeItem(index) {
    const removedItem = list[index];
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    setDeletedList(prevDeletedList => [...prevDeletedList, removedItem]);
    alert("Task moved to bin");
    AsyncStorage.setItem(STORAGE_KEY_MAIN_LIST, JSON.stringify(newList));
    AsyncStorage.setItem(STORAGE_KEY_DELETED_LIST, JSON.stringify([...deletedList, removedItem]));
  }

  function removeFromDeleteList(index) {
    const newList = [...deletedList];
    newList.splice(index, 1);
    setDeletedList(newList);
    alert("Task removed from bin");
    AsyncStorage.setItem(STORAGE_KEY_DELETED_LIST, JSON.stringify(newList));
  }

  function pressHome() {
    navigation.navigate(Welcome)
  }

  return (
    <View style={{ width: "100%", height: "100%", paddingVertical: 20, paddingHorizontal: 30, backgroundColor: "#b3dbdd" }}>

      {
        menuToggle ? (
          <View style={{
            width: "50%",
            backgroundColor: "white",
            position: 'absolute',
            zIndex: 1,
            borderRadius: 5,
            marginRight: 30,
            marginTop: 60,
            paddingHorizontal: 15,
            right: 0,
            top: 0,
          }}>
            <Text onPress={pressHome} style={{ fontSize: 16, color: "#333333", borderColor: "gray", borderBottomWidth: 0.2, paddingVertical: 10 }}>Home</Text>
            {toggleRecentDelete ? (<Text onPress={pressRecentDelete} style={{ fontSize: 16, color: "#333333", borderColor: "gray", borderBottomWidth: 0.2, paddingVertical: 10 }}>All to-dos</Text>) : (<Text onPress={pressRecentDelete} style={{ fontSize: 16, color: "#333333", borderColor: "gray", borderBottomWidth: 0.2, paddingVertical: 10 }}>Deleted</Text>)}
          </View>
        ) : null
      }

      <TouchableOpacity
        activeOpacity={0.2}
        onPress={barsPressed} style={{ alignSelf: 'flex-end', marginVertical: 10 }}>
        <FontAwesomeIcon icon={faBars} size={20} style={{ color: "black" }} />
      </TouchableOpacity>

      <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        {!toggleRecentDelete ? (<Text style={{ fontFamily: "Montserrat-Bold", fontSize: 25, fontWeight: "600", color: "black" }}>All To-Dos</Text>) : (<Text style={{ fontFamily: "Montserrat-Bold", fontSize: 25, fontWeight: "600", color: "black" }}>Recent Deleted</Text>)}
      </View>

      {
        !toggleRecentDelete ? (
          list.length !== 0 ? (
            <View style={{
              display: "flex",
              justifyContent: 'center',
              paddingVertical: 20,
              marginVertical: 0,
              gap: 10,
              backgroundColor: "#b3dbdd",
              height: "90%"
            }}>
              <Text>Tap on the task to remove</Text>
              <FlatList
                data={list}
                renderItem={({ item, index }) => (

                  <TouchableOpacity
                    onPress={() => removeItem(index)}
                    activeOpacity={0.2}
                    style={styles.item}
                  >
                    <Text key={index} style={styles.text}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
              />
            </View>
          ) : (
            <View style={{ flex: 1, width: "100%", backgroundColor: "#b3dbdd", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon size={60} icon={faFileLines} style={{ color: "gray" }} />
              <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 20, fontWeight: "600", color: "gray" }}>No to-dos</Text>
            </View>
          )
        ) : (
          deletedList.length !== 0 ? (
            <View style={{
              display: "flex",
              justifyContent: 'center',
              paddingVertical: 20,
              marginVertical: 0,
              gap: 10,
              backgroundColor: "#b3dbdd",
              height: "90%"
            }}>
              <Text>Tap on the task to remove</Text>
              <FlatList
                data={deletedList}
                renderItem={({ item, index }) => (

                  <TouchableOpacity
                    onPress={() => (removeFromDeleteList(index))}
                    activeOpacity={0.2}
                    style={styles.item}
                  >
                    <Text key={index} style={styles.text}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
              />
            </View>
          ) : (
            <View style={{ flex: 1, width: "100%", backgroundColor: "#b3dbdd", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon size={60} icon={faFileLines} style={{ color: "gray" }} />
              <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 20, fontWeight: "600", color: "gray" }}>No Tasks in bin</Text>
            </View>
          )
        )
      }

      {
        isVisible ? (
          <View style={{ flex: 1, width: "100%", height: "50%", borderWidth: 0.5, borderColor: "lightgray", borderRadius: 20, backgroundColor: "#eeeeee", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, position: 'absolute', alignSelf: 'center', bottom: "25%" }}>
            <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 20, fontWeight: "600", color: "black" }}>Add your task</Text>
            <TextInput
              value={value}
              onChangeText={getInput}
              placeholder='Enter your Goallllllllllllllllllllllllllllllllll'
              placeholderTextColor='gray'
              style={{
                borderWidth: 0.5,
                borderRadius: 5,
                width: "80%",
                textAlign: 'center',
              }}
            />
            <Text
              style={{
                fontFamily: "Montserrat-Bold",
                backgroundColor: "lightgray",
                borderWidth: 1,
                borderRadius: 5,
                width: "80%",
                padding: 10,
                textAlign: 'center',
                color: "black",
              }}
              onPress={buttonPress}>
              Save</Text>
          </View>
        ) : null
      }

      {
        !toggleRecentDelete ? (
          <TouchableOpacity
            onPress={toggleVisibility}
            activeOpacity={0.5}
            style={{
              borderRadius: 100,
              backgroundColor: "white",
              position: "absolute",
              right: 40,
              bottom: 40,
              height: 50,
              width: 50,
              transform: isVisible ? [{ rotate: '45deg' }] : [{ rotate: '0deg' }],
            }}
          >

            <View style={{ width: 50, height: 50, display: "flex", justifyContent: 'center', alignItems: 'center', borderWidth: 0.3, borderRadius: 100, borderColor: "gray", backgroundColor: "black" }}>
              <FontAwesomeIcon icon={faPlus} size={20} style={{ color: "#b3dbdd" }} />
            </View>

          </TouchableOpacity>) : null
      }
    </View >
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 10,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "black",
    fontSize: 15,
    fontFamily: "Montserrat-Medium"
  },
})

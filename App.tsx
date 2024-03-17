import { StyleSheet, View } from 'react-native'
import React from 'react'
import Todolist from './components/TodoList'
import Welcome from './components/Welcome'
import Router from './components/Routes'

export default function App() {
  return (
    <>
        <Router />
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
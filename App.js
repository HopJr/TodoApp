import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, ShadowPropTypesIOS, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Task from './src/components/Task'


const App = () => {
  const [value, setValue] = useState('')
  const [todos, setTodos] = useState([])

  handleAddTodo = () => {
    if (value.length > 0) {
      setTodos([...todos, { text: value, key: Date.now(), checked: false }])
      setValue('')
    }
  }

  handleDeleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        if (todo.key !== id) return true
      })
    )
  }

  handleChecked = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.key === id) todo.checked = !todo.checked;
        return todo;
      })
    )
  }
  return (
    <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }} source={require('./src/img/BackgroundColor.jpg')}>
      <View style={styles.container}>
        <Text style={{ marginTop: '10%', fontSize: 25, color: 'white' }}>To Do List</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            onChangeText={(value) => setValue(value)}
            placeholder={'Do it now!'}
            placeholderTextColor="white"
            value={value}
          />
          <TouchableOpacity onPress={() => handleAddTodo()}>
            <Icon name="plus" size={30} color="#1B1464" style={{ marginLeft: 20 }} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {
            todos.map((task) => (
              <Task
                text={task.text}
                key={task.key}
                checked={task.checked}
                setChecked={() => handleChecked(task.key)}
                delete={() => handleDeleteTodo(task.key)}
              />
            ))

          }
        </ScrollView>
      </View>
    </ImageBackground>
  )
}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    height: 35,
    flex: 1,
    minHeight: '10%',
    marginTop: '20%',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10
  },
  taskWrapper: {
    marginTop: '15%',
    flexDirection: 'row',
    // alignItems: 'baseline',
    borderColor: '#D0D0D0',
    borderBottomWidth: 0.5,
    width: '100%',
    alignItems: 'stretch',
    minHeight: 40,
  },
  task: {
    paddingBottom: 20,
    paddingLeft: 10,
    paddingTop: 6,
    borderColor: 'white',
    borderBottomWidth: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderColor: 'rgb(222,222,222)',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 5
  }
});
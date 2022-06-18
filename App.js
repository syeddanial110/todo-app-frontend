/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Button,
  ImageBackground,
} from 'react-native';
import Task from './src/components/Task';
import {apiGet, apiPost} from './src/utils/apiRequest';
import bgImg from './src/assets/bgimg.jpg';

const App = () => {
  const [task, setTask] = useState([]);
  const [taskItems, setTaskItems] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [editInputVal, setEditInputVal] = useState('');
  const [isEditible, setIsEditible] = useState(false);
  const [editibleID, setEditibleID] = useState(null);
  const inputRef = useRef();
  // const handleAddTask = () => {
  //   // Keyboard.dismiss();
  //   setTaskItems([...taskItems, task]);
  //   setTask(null);
  // };

  const editValueSetter = ({id, text}) => {
    setInputVal(text);
    setEditibleID(id);
    inputRef.current.focus();
  };
  const _handleInputOnChange = val => {
    setInputVal(val);
  };
  // const completeTask = index => {
  //   let itemsCopy = [...taskItems];
  //   // itemsCopy.splice(index, 1);
  //   setTaskItems(itemsCopy);
  // };

  const handleEditOnChange = val => {
    // setEditInputVal([...selectedItem, val]);
    // setEditInputVal(val);
    // setEditInputVal({...selectedItem, val});
    // setInputVal({...selectedItem, val});
    setSelectedItem({...selectedItem, val});
  };

  const createTodo = async () => {
    // console.log('inputVal', inputVal);
    try {
      // const res = await axios({
      //   method: 'POST',
      //   url: 'https://c19a-2400-adc1-1bf-e800-e970-c9c2-f6fa-cd18.in.ngrok.io/api/todo',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-type': 'application/json',
      //   },
      //   data: {title: text},
      // });
      // setTask([...task, res.data.data.data]);
      let response;
      if (!isEditible) {
        response = await axios.post(
          `https://c19a-2400-adc1-1bf-e800-e970-c9c2-f6fa-cd18.in.ngrok.io/api/todo`,
          {
            title: inputVal,
          },
        );
      } else {
        response = await axios.put(
          `https://c19a-2400-adc1-1bf-e800-e970-c9c2-f6fa-cd18.in.ngrok.io/api/todo/` +
            editibleID,
          {
            title: inputVal,
          },
        );
      }
      if (response.status === 201) {
        getTodoList();
        setIsEditible(false);
        setEditibleID(null);
        setInputVal('');
        // inputRef.current.unfocus()
        Keyboard.dismiss();
        inputVal === null;
      } else {
        throw new Error('An error has occurred');
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const getTodoList = async () => {
    try {
      const res = await axios.get(
        'https://1e54-175-107-217-239.in.ngrok.io/api/todo',
      );

      const data = res.data.data.data;
      console.log('data', data);
      setTask(data);
    } catch (error) {
      console.log('error', error);
    }
  };
  const deleteTask = async id => {
    console.log('id', id);
    try {
      const res = await axios.delete(
        'https://c19a-2400-adc1-1bf-e800-e970-c9c2-f6fa-cd18.in.ngrok.io/api/todo/' +
          id,
      );

      const data = res.data.data.data;
      console.log('data1', res);
      // setTask(data);
      if (res.status) {
        getTodoList();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateTask = async todoId => {
    try {
      const res = await axios.put(
        'https://c19a-2400-adc1-1bf-e800-e970-c9c2-f6fa-cd18.in.ngrok.io/api/todo/' +
          todoId,
      );
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);
  // console.log('editInputVal', editInputVal);
  // console.log('selectedItem', selectedItem);
  // console.log('inputVal', inputVal);

  const image = {
    uri: 'https://cdn.wallpaperhub.app/cloudcache/7/4/f/3/d/5/74f3d51cbec9db78da32e103de1b28538af1b76a.jpg',
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView style={styles.scrollViewStyle}>
          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <View style={styles.headingView}>
              <Text style={styles.sectionTitle}>Today's Tasks</Text>
            </View>

            <View style={styles.items}>
              {/* This is where the tasks will go! */}
              {task.map((item, index) => {
                return (
                  <View style={styles.taskView}>
                    <Task
                      text={item.title}
                      deleteCB={() => {
                        deleteTask(item._id);
                      }}
                      id={item._id}
                      setToggleEdit={setToggleEdit}
                      setSelectedItem={setSelectedItem}
                      editCB={setIsEditible}
                      editValueSetter={editValueSetter}
                      index={index}
                    />
                    {/* <TouchableOpacity
                    key={index}
                    onPress={() => completeTask(index)}></TouchableOpacity> */}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Write a task */}
        {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            editable
            placeholder="Write a task"
            value={inputVal}
            onChangeText={text => _handleInputOnChange(text)}></TextInput>
          <TouchableOpacity onPress={createTodo}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>{!isEditible ? '+' : '↑'}</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#4C3C6F',
    // backgroundImage: 'linear-gradient(to right, red , yellow)',
    // backgroundImage: `url(./assets/bgimg.jpg)`,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'relative',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    color: 'black',
    zIndex: 99,
  },
  updateInput: {
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    color: 'black',
    zIndex: 99,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  taskText: {
    color: 'black',
  },
  addText: {
    color: 'black',
    fontSize: 40,
  },
  scrollViewStyle: {
    // height: 10
  },
  updateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnUpdate: {
    // height: 2,
  },
  headingView: {
    backgroundColor: 'rgba(143, 143, 143,0.8)',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
  },
  taskView: {
    // boxShadow: '5px 10px black',
  },
});

export default App;

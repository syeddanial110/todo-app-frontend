import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';

const Task = props => {
  const {
    deleteCB,
    id,
    text,
    editCB,
    setToggleEdit,
    setSelectedItem,
    editValueSetter,
    index,
  } = props;

  const _handleDelete = id => {
    // console.log('id', id);
    // alert("waana delete "+text+" ?" )
    showAlert('Delete Task', 'waana delete ' + text + ' ?', id);
    //completeCB(id)
  };

  const _handleUpdate = id => {
    console.log('edited');
    setToggleEdit(true);
    editCB(true);
    editValueSetter({id: id, text: text});
    setSelectedItem({id: id, text: text});
  };

  const showAlert = (title, msg, id) =>
    Alert.alert(
      title,
      msg,
      [
        {
          text: 'Yes',
          onPress: () => deleteCB(id),
          style: 'success',
        },
        {
          text: 'Cancel',
          // onPress: () => ,
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}>
          <View style={styles.indexText}>
            <Text style={styles.squareText}>{index + 1}</Text>
          </View>
        </View>
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <View style={styles.btnDiv}>
        <Button
          style={styles.btn}
          // onPress={onPressLearnMore}
          onPress={() => _handleUpdate(id)}
          title="Edit"
          // color="#841584"
          color="#FAD02C"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          style={styles.btn}
          onPress={() => _handleDelete(id)}
          title="Delete"
          color="#FF5765"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      {/* <TouchableOpacity onPress={() => _handleDelete(id)}>
        <View style={styles.circular}></View>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: 'black',
    opacity: 0.4,
    borderRadius: 25,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  itemText: {
    maxWidth: '80%',
    color: 'black',
    fontSize: 18,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  btnDiv: {
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    // border: '5px solid black',
  },
  indexText: {
    display: 'flex',
    flexDirection: 'row',
    // width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  btn: {
    // borderWidth: 5,
    // borderColor: 'black',
    // borderStyle: 'solid',
    // borderRadius: 35,
  },
});

export default Task;

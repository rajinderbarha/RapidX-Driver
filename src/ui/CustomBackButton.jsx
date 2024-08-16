import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from '../store/LocationContext';

export default function CustomBackButton() {
  const navigation = useNavigation();
  const { reset } = useContext(LocationContext)

function pressHandler(){
  navigation.goBack();
  reset()
};


  return (
    <TouchableOpacity style={styles.button} onPress={pressHandler}>
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
    padding: 10,
  },
  text: {
    color: 'blue',
    fontSize: 18,
  },
});

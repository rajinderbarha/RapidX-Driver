import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface xx {
    onFilePicked : (file : any)=>void;
    placeholder : string
}


const DocumentPickerComponent = ({ onFilePicked, placeholder }: xx) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<any>();

// function pickDocument(){
// DocumentPicker.getDocumentAsync({}).then((result)=>{
//     if(result.assets){
//         setFileName(result.assets[0].name)
//     }
// })
// };



const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];
        setFileName(pickedFile.name);
        setFile(pickedFile.uri);
        if (onFilePicked) {
          onFilePicked(pickedFile);
        }
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={fileName}
        placeholder={placeholder}
        editable={false}
      />
      <Button title="Pick File" onPress={pickDocument} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    color : 'black'
  },
});

export default DocumentPickerComponent;

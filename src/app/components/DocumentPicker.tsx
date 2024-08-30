import React, { useContext, useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { UpdateDriverDocuments } from "../../../util/localAPIs";
import { ProfileContext } from "../../store/ProfileContext";
import LoadingCircleComponent from "./OnScreenModals/LoadingCircle";
import { colors } from "../../../constants/colors";

interface documentPicker{
  onFilePicked : (file : any)=> void;
  placeholder : string;
  documentName : string;
}

const DocumentPickerComponent = ({ onFilePicked, placeholder, documentName }: documentPicker) => {
  const [fileName, setFileName] = useState("");
  const [fileUri, setFileUri] = useState<string | null>(null);
  const {phoneNumber} = useContext(ProfileContext)
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];
        setLoading(true)
        setFileName(pickedFile.name);
        setFileUri(pickedFile.uri);
        if (onFilePicked) {
          onFilePicked(pickedFile);
        }
        const formData = new FormData();
        formData.append(documentName, {
          uri: pickedFile.uri,
          name: pickedFile.name,
          type: pickedFile.mimeType,
        } as any);
        
        await UpdateDriverDocuments(formData, phoneNumber).then(()=>setLoading(false));
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  return (
    <View style={styles.container}>
      <LoadingCircleComponent color={colors.primary} isVisible={loading} text="" />
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
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    color: "black",
  },
});

export default DocumentPickerComponent;


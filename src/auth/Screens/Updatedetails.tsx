import { Button, Text, View } from "react-native";
import DocumentPickerComponent from "../../app/components/DocumentPicker";
import { useContext } from "react";
import { useAuth } from "../../store/AuthenticationContext";


export default function UpdateDetailsScreen(){
    const {setIsApproved} = useAuth()
    function pickDocument(file: any){
      console.log('file ' , file)
    };
    
  return (
    <View>
   <DocumentPickerComponent onFilePicked={pickDocument} placeholder="Adhar Card" /> 
   <DocumentPickerComponent onFilePicked={pickDocument} placeholder="Pan Card"/> 
   <DocumentPickerComponent onFilePicked={pickDocument} placeholder="Driver License"/> 
   <Button title="Update Documents" onPress={()=>setIsApproved(true)}/>
   </View>
  );
};

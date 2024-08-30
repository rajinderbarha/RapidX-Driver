import { Button, Text, View } from "react-native";
import DocumentPickerComponent from "../../app/components/DocumentPicker";
import { useContext } from "react";
import { useAuth } from "../../store/AuthenticationContext";
import { ProfileContext } from "../../store/ProfileContext";

export default function UpdateDetailsScreen() {
  const { setIsApproved } = useAuth();
  const {setIsProfileCompleted} = useContext(ProfileContext)
  function pickDocument(file: any) {
    console.log("file ", file);
  }

  return (
    <View>
      <DocumentPickerComponent
        onFilePicked={pickDocument}
        placeholder="Adhar Card"
        documentName="adhar_card_picture"
      />
      <DocumentPickerComponent
        onFilePicked={pickDocument}
        placeholder="Pan Card"
        documentName="pan_card_picture"
      />
      <DocumentPickerComponent
        onFilePicked={pickDocument}
        placeholder="Vehicle Image"
        documentName="vehicle_image"
      />
      <DocumentPickerComponent
        onFilePicked={pickDocument}
        placeholder="Vehicle Number Plate"
        documentName="vehicle_plate_picture"
      />
      <DocumentPickerComponent
        onFilePicked={pickDocument}
        placeholder="Vehicle RC"
        documentName="vehicle_registration_card"
      />
      <DocumentPickerComponent
        onFilePicked={pickDocument}
        placeholder="Vehicle Insurance"
        documentName="vehicle_inssurance_picture"
      />
      <DocumentPickerComponent
        onFilePicked={pickDocument}
        placeholder="Vehicle Polution"
        documentName="vehicle_pollution_certificate"
      />
      <Button title="Update Documents" onPress={() => setIsProfileCompleted(true)} />
    </View>
  );
}
// const x = {
//   profile_picture,
//   vehicle_image,
//   vehicle_plate_picture,
//   vehicle_registration_card,
//   vehicle_inssurance_picture,
//   vehicle_pollution_certificate,
//   adhar_card_picture,
//   pan_card_picture,
// };

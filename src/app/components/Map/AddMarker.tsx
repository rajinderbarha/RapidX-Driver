import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

interface MapProps {
  location: {
    latitude: number;
    longitude: number;
  };
  color: string; 
  image : any
}

const AddMarker: React.FC<MapProps> = ({ location, color, image }) => {
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      anchor={{ x: 0.5, y: 0.5 }}
      calloutAnchor={{ x: 0.5, y: 0.5 }}
      pinColor={color}
    >
      {image}
    </Marker>
  );
};

export default AddMarker;

const styles = StyleSheet.create({
  markerImage: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
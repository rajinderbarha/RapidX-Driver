import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { SharedValue } from "react-native-reanimated";

interface BottomModalProps {
  onChange: (index: number) => void;
  isFocused: boolean;
  children: React.ReactNode;
  snapPoints: (string | number)[] | SharedValue<(string | number)[]>;
}

export default function CustomBottomModal({
  onChange,
  isFocused,
  children,
  snapPoints
}: PropsWithChildren<BottomModalProps>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation();

  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
    bottomSheetModalRef.current?.snapToIndex(0);
  }, []);

  useEffect(() => {
    if (isFocused) {
      openModal();
    }
  }, [isFocused, navigation]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      onChange={onChange}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      style={styles.modal}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderWidth: 10,
    // borderColor: "#ffffff",
  },
  handleIndicator: {
    backgroundColor: "#a3a3a3",
    width: 50,
    height: 5,
    borderRadius: 2.5,
  },
  modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

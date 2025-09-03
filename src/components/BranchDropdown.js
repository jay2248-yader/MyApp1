import React from "react";
import { Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function BranchDropdown({
  open,
  value,
  setOpen,
  setValue,
  error,
  fontFamily = "NotoSansLao",
}) {
  
  const branches = [
    { label: "ສາຂາ ວຽງຈັນ", value: "vientiane" },
    { label: "ສາຂາ ປາກເຊ", value: "pakse" },
    { label: "ສາຂາ ປາກຊັນ", value: "paksane" },
  ];

  return (
    <>
      <DropDownPicker
        open={open}
        value={value}
        items={branches}
        setOpen={setOpen}
        setValue={setValue}
        placeholder="ເລືອກສາຂາຮ້ານ"
        style={[
          styles.combobox,
          { fontFamily },
          error ? styles.inputError : null,
        ]}
        dropDownContainerStyle={styles.dropdown}
        textStyle={{ color: "black", fontFamily }}
      />
      {error ? (
        <Text style={[styles.errorText, { fontFamily }]}>{error}</Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  combobox: {
    marginBottom: 20,
    borderColor: "black",
    backgroundColor: "white",
  },
  dropdown: {
    borderColor: "black",
    backgroundColor: "white",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: -15,
    marginBottom: 20,
    textAlign: "left",
  },
});

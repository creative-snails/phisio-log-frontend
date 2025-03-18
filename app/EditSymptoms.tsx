import React, { useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { router } from "expo-router";

import useAppStore from "@/store/useAppStore";

registerTranslation("en-GB", enGB);

const EditSymptoms = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const [open, setOpen] = React.useState(false);
  const [selectedSymptomIndex, setSelectedSymptomIndex] = useState<number | null>(null);

  const updateSymptom = (index: number, key: string, value: string) => {
    const updatedSymptoms = healthRecord.symptoms.map((symptom, i) => {
      if (i === index) {
        return { ...symptom, [key]: value };
      }
      return symptom;
    });
    setHealthRecord({ ...healthRecord, symptoms: updatedSymptoms });
  };

  const handleSave = () => {
    for (const symptom of healthRecord.symptoms) {
      if (symptom.name.trim().length < 3) {
        if (Platform.OS === "web") {
          window.alert("Symptom name must be at least 3 characters long!");
        } else {
          Alert.alert("Symptom name must be at least 3 characters long!");
        }
        return;
      }
    }
    // Save
    console.log("Saved symptoms:", healthRecord.symptoms);
  };

  const openDatePicker = (index: number) => {
    setSelectedSymptomIndex(index);
    setOpen(true);
  };

  const onConfirmDate = (date: Date) => {
    if (selectedSymptomIndex !== null) {
      updateSymptom(selectedSymptomIndex, "startDate", date.toISOString().split("T")[0]);
    }
    setOpen(false);
  };

  return (
    <View>
      <Text style={styles.title}>Edit Symptoms</Text>
      {healthRecord.symptoms.map((symptom, index) => (
        <ScrollView
          key={index}
          style={styles.container}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="always"
        >
          <TextInput
            style={styles.textInput}
            value={symptom.name}
            onChangeText={(text) => updateSymptom(index, "name", text)}
          />
          <Button onPress={() => openDatePicker(index)} uppercase={false} mode="outlined">
            {symptom.startDate ? symptom.startDate.toString() : ""}
          </Button>
          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <Text>Save</Text>
          </Pressable>
        </ScrollView>
      ))}
      <Pressable style={styles.saveBtn} onPress={router.back}>
        <Text>Cancel</Text>
      </Pressable>
      <DatePickerModal
        locale="en-GB"
        mode="single"
        label="Select date"
        saveLabel="   SAVE"
        visible={open}
        onDismiss={() => setOpen(false)}
        date={
          selectedSymptomIndex !== null && healthRecord.symptoms[selectedSymptomIndex].startDate
            ? new Date(healthRecord.symptoms[selectedSymptomIndex].startDate)
            : new Date()
        }
        onConfirm={({ date }) => {
          if (date) {
            onConfirmDate(date);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    margin: 8,
    padding: 8,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
  saveBtn: {
    alignItems: "center",
    backgroundColor: "#FBDABB",
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: "auto",
    marginTop: 10,
    paddingVertical: 5,

    width: 100,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "auto",
    padding: 16,
  },
});

export default EditSymptoms;

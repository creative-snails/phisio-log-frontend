import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { getHealthRecord } from "./api";

import useAppStore from "@/store/useAppStore";

const HealthRecordForm = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    const fetchHealthRecord = async () => {
      try {
        const healthRecord = await getHealthRecord(1);
        setHealthRecord(healthRecord);
      } catch (error) {
        console.error("Error fetching health record:", error);
      }
    };
    fetchHealthRecord();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Record</Text>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Description</Text>
        <Text> {healthRecord.description}</Text>
        <Pressable style={styles.editButton} onPress={() => router.navigate("/EditDescription")}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Symptoms</Text>
        {healthRecord.symptoms.map((symptom, index) => (
          <View key={index}>
            <Text>Name: {symptom.name}</Text>
            <Text>Start Date: {symptom.startDate ? symptom.startDate.toString() : ""}</Text>
          </View>
        ))}
        <Pressable style={styles.editButton} onPress={() => router.navigate("/EditSymptoms")}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Current Condition</Text>
        <View>
          <Text style={styles.capitalizedText}>Status: {healthRecord.currentCondition.status}</Text>
          <Text style={styles.capitalizedText}>Severity: {healthRecord.currentCondition.severity}</Text>
          <Text style={styles.capitalizedText}>
            Improvement status: {healthRecord.currentCondition.improvementStatus}
          </Text>
        </View>
        <Pressable style={styles.editButton} onPress={() => router.navigate("/EditCurrentCondition")}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Treatments Tried</Text>
        {healthRecord.treatmentsTried?.map((treatment, index) => <Text key={index}>{treatment}</Text>)}
        <Pressable style={styles.editButton} onPress={() => router.navigate("/EditTreatments")}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Medical Consultation</Text>
        {healthRecord.medicalConsultations?.map((consultation, index) => (
          <View key={index}>
            <Text>Consultant: {consultation.consultant}</Text>
            <Text>Date: {consultation.date ? consultation.date.toString() : ""}</Text>
            <Text>Diagnosis: {consultation.diagnosis}</Text>
            <Text>Follow-up action: {consultation.followUpActions?.join(", ")}</Text>
          </View>
        ))}
        <Pressable style={styles.editButton} onPress={() => router.navigate("/EditConsultations")}>
          <Text>Edit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  capitalizedText: {
    textTransform: "capitalize",
  },
  container: {
    flex: 1,
    marginVertical: 20,
  },
  editButton: {
    alignItems: "center",
    backgroundColor: "#FBDABB",
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 5,
    width: 100,
  },
  innerContainer: {
    alignItems: "center",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
  section: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HealthRecordForm;

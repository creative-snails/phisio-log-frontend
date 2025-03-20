import { create } from "zustand";

import { HealthRecordType } from "@/types/healthRecordTypes";

interface AppStore {
  loading: boolean;
  healthRecords: HealthRecordType[];
  healthRecord: HealthRecordType;
  setHealthRecords: (healthRecords: HealthRecordType[]) => void;
  setHealthRecord: (healthRecord: HealthRecordType) => void;
  setLoading: (loading: boolean) => void;
}

const useAppStore = create<AppStore>((set) => ({
  loading: false,
  healthRecords: [],
  healthRecord: {
    description: "",
    symptoms: [],
    status: "open",
    treatmentsTried: [],
    improvementStatus: "stable",
    medicalConsultations: [],
    severity: "mild",
    updates: [],
  },
  setHealthRecords: (healthRecords: HealthRecordType[]) => set({ healthRecords }),
  setHealthRecord: (healthRecord: HealthRecordType) => set({ healthRecord }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useAppStore;

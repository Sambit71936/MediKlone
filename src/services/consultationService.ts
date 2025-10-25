import axios from 'axios';

const API_URL = 'http://localhost:3000/api/consultation';

export interface ConsultationRecord {
  patientId: string;
  doctorId: string;
  complaint: string;
  diagnosis: string;
  investigations: string[];
  prescriptions: Array<{
    medicine: string;
    dosage: string;
    duration: string;
    remarks: string;
  }>;
  notes: string;
  consultationDate?: string;
  followUpDate?: string;
  status?: 'Pending' | 'Completed';
}

export const consultationService = {
  async createConsultation(data: ConsultationRecord) {
    const response = await axios.post(API_URL, data);
    return response.data;
  },
  async getConsultations(params?: { doctorId?: string; patientId?: string }) {
    const response = await axios.get(API_URL, { params });
    return response.data;
  },
};

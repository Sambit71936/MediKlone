import mongoose from 'mongoose';

const ConsultationRecordSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  complaint: String,
  diagnosis: String,
  investigations: [String],
  prescriptions: [
    {
      medicine: String,
      dosage: String,
      duration: String,
      remarks: String,
    }
  ],
  notes: String,
  consultationDate: { type: Date, default: Date.now },
  followUpDate: Date,
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
});

export default mongoose.model('ConsultationRecord', ConsultationRecordSchema);

import mongoose from 'mongoose';

const EPrescriptionSchema = new mongoose.Schema({
  consultationId: { type: mongoose.Schema.Types.ObjectId, ref: 'ConsultationRecord', required: true },
  doctorName: String,
  doctorRegNo: String,
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  patientName: String,
  patientAge: String,
  patientGender: String,
  medicines: [
    {
      medicine: String,
      dosage: String,
      duration: String,
      remarks: String,
    }
  ],
  investigations: [String],
  notes: String,
  createdAt: { type: Date, default: Date.now },
  pdfUrl: String,
});

export default mongoose.model('EPrescription', EPrescriptionSchema);

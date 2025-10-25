

import React, { useState } from 'react';
import { consultationService, ConsultationRecord } from '@/services/consultationService';
import EPrescriptionPreview from '@/components/consultation/EPrescriptionPreview';
import { integrationService } from '@/services/integrationService';


// Dummy patient list (replace with API call to Registration DB)
const patients = [
  { id: '1', name: 'Arun Kumar', age: 35, gender: 'M', vitals: 'BP: 120/80', recentVisits: 2 },
  { id: '2', name: 'Meena Lakshmi', age: 28, gender: 'F', vitals: 'BP: 110/70', recentVisits: 1 },
];

const doctorId = 'doctor123'; // Replace with auth context

const ConsultationPage = () => {
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [form, setForm] = useState<Partial<ConsultationRecord>>({
    investigations: [],
    prescriptions: [],
    status: 'Pending',
  });
  const [prescription, setPrescription] = useState({ medicine: '', dosage: '', duration: '', remarks: '' });
  const [message, setMessage] = useState('');
  const [showPrescription, setShowPrescription] = useState(false);

  const handlePatientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const patient = patients.find(p => p.id === e.target.value);
    setSelectedPatient(patient);
    setForm(f => ({ ...f, patientId: patient?.id }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleAddPrescription = () => {
    if (prescription.medicine) {
      setForm(f => ({ ...f, prescriptions: [...(f.prescriptions || []), prescription] }));
      setPrescription({ medicine: '', dosage: '', duration: '', remarks: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return setMessage('Select a patient.');
    try {
      await consultationService.createConsultation({
        ...form,
        patientId: selectedPatient.id,
        doctorId,
      } as ConsultationRecord);
      setMessage('Consultation saved!');
      setShowPrescription(true);
      // Integrate with other modules
      if ((form.investigations || []).length > 0) {
        await integrationService.sendToDiagnostics(form.investigations!, selectedPatient.id);
        setMessage(msg => msg + ' | Sent to Diagnostics');
      }
      if ((form.prescriptions || []).length > 0) {
        await integrationService.sendToPharmacy(form.prescriptions!, selectedPatient.id);
        setMessage(msg => msg + ' | Sent to Pharmacy');
      }
      await integrationService.sendToBilling('consultationId', selectedPatient.id); // Replace with real ID
      setMessage(msg => msg + ' | Sent to Billing');
      await integrationService.sendToDischarge('Consultation summary', selectedPatient.id);
      setMessage(msg => msg + ' | Sent to Discharge');
    } catch (err) {
      setMessage('Error saving consultation.');
    }
  };

  return (
    <div className="flex gap-8">
      {/* Left Panel: Patient Info */}
      <div className="w-1/3 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Patient Info</h2>
        <select className="w-full mb-4 p-2 border" onChange={handlePatientSelect} value={selectedPatient?.id || ''}>
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name} (ID: {p.id})</option>
          ))}
        </select>
        {selectedPatient && (
          <div className="space-y-2">
            <div><b>Name:</b> {selectedPatient.name}</div>
            <div><b>Age:</b> {selectedPatient.age}</div>
            <div><b>Gender:</b> {selectedPatient.gender}</div>
            <div><b>Vitals:</b> {selectedPatient.vitals}</div>
            <div><b>Recent Visits:</b> {selectedPatient.recentVisits}</div>
          </div>
        )}
      </div>
      {/* Right Panel: Consultation Form */}
      <div className="flex-1 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Doctor Consultation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Chief Complaint / Symptoms</label>
            <textarea name="complaint" className="w-full border p-2" value={form.complaint || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Diagnosis / Findings</label>
            <textarea name="diagnosis" className="w-full border p-2" value={form.diagnosis || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Treatment Notes</label>
            <textarea name="notes" className="w-full border p-2" value={form.notes || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Investigation Orders (comma separated)</label>
            <input name="investigations" className="w-full border p-2" value={form.investigations?.join(', ') || ''} onChange={e => setForm(f => ({ ...f, investigations: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} />
          </div>
          <div>
            <label>Prescribed Medicines</label>
            <div className="flex gap-2 mb-2">
              <input placeholder="Medicine" className="border p-1" value={prescription.medicine} onChange={e => setPrescription(p => ({ ...p, medicine: e.target.value }))} />
              <input placeholder="Dosage" className="border p-1" value={prescription.dosage} onChange={e => setPrescription(p => ({ ...p, dosage: e.target.value }))} />
              <input placeholder="Duration" className="border p-1" value={prescription.duration} onChange={e => setPrescription(p => ({ ...p, duration: e.target.value }))} />
              <input placeholder="Remarks" className="border p-1" value={prescription.remarks} onChange={e => setPrescription(p => ({ ...p, remarks: e.target.value }))} />
              <button type="button" className="bg-teal-600 text-white px-2 rounded" onClick={handleAddPrescription}>Add</button>
            </div>
            <ul>
              {(form.prescriptions || []).map((med, idx) => (
                <li key={idx}>{med.medicine} - {med.dosage} - {med.duration} {med.remarks && `(${med.remarks})`}</li>
              ))}
            </ul>
          </div>
          <div>
            <label>Follow-Up Date</label>
            <input type="date" name="followUpDate" className="border p-2" value={form.followUpDate || ''} onChange={handleChange} />
          </div>
          <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded">Generate E-Prescription</button>
        </form>
        {message && <div className="mt-4 text-green-700">{message}</div>}
        {showPrescription && selectedPatient && (
          <div className="mt-8">
            <EPrescriptionPreview
              doctorName="Dr. S. Rajesh"
              doctorRegNo="TN123456"
              hospitalLogoUrl={undefined}
              patientName={selectedPatient.name}
              patientAge={selectedPatient.age.toString()}
              patientGender={selectedPatient.gender === 'M' ? 'Male' : 'Female'}
              medicines={form.prescriptions || []}
              investigations={form.investigations || []}
              notes={form.notes || ''}
              date={new Date().toLocaleDateString()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationPage;

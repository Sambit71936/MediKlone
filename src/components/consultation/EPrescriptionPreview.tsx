import React from 'react';

interface PrescriptionProps {
  doctorName: string;
  doctorRegNo: string;
  hospitalLogoUrl?: string;
  patientName: string;
  patientAge: string;
  patientGender: string;
  medicines: Array<{ medicine: string; dosage: string; duration: string; remarks?: string }>;
  investigations: string[];
  notes: string;
  date: string;
}

const EPrescriptionPreview: React.FC<PrescriptionProps> = ({
  doctorName,
  doctorRegNo,
  hospitalLogoUrl,
  patientName,
  patientAge,
  patientGender,
  medicines,
  investigations,
  notes,
  date,
}) => (
  <div className="max-w-lg mx-auto border p-6 bg-white rounded shadow">
    <div className="flex items-center mb-4">
      {hospitalLogoUrl && <img src={hospitalLogoUrl} alt="Hospital Logo" className="h-12 mr-4" />}
      <div>
        <div className="font-bold text-lg">E-Prescription</div>
        <div className="text-sm">Date: {date}</div>
      </div>
    </div>
    <div className="mb-2"><b>Doctor:</b> {doctorName} (Reg: {doctorRegNo})</div>
    <div className="mb-2"><b>Patient:</b> {patientName} | <b>Age:</b> {patientAge} | <b>Gender:</b> {patientGender}</div>
    <div className="mb-2"><b>Medicines:</b>
      <ul className="list-disc ml-6">
        {medicines.map((m, i) => (
          <li key={i}>{m.medicine} - {m.dosage} - {m.duration} {m.remarks && `(${m.remarks})`}</li>
        ))}
      </ul>
    </div>
    <div className="mb-2"><b>Investigations:</b> {investigations.join(', ') || 'None'}</div>
    <div className="mb-2"><b>Notes:</b> {notes}</div>
  </div>
);

export default EPrescriptionPreview;

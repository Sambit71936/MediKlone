import React, { useEffect, useState } from 'react';
import { consultationService, ConsultationRecord } from '@/services/consultationService';

const DoctorDashboard = () => {
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const doctorId = 'doctor123'; // Replace with auth context

  useEffect(() => {
    consultationService.getConsultations({ doctorId })
      .then(setConsultations)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">My Consultations</h2>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Patient Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Diagnosis</th>
              <th className="p-2">Prescription</th>
              <th className="p-2">Follow-Up</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((c, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{c.patientId}</td>
                <td className="p-2">{c.consultationDate ? new Date(c.consultationDate).toLocaleDateString() : ''}</td>
                <td className="p-2">{c.diagnosis}</td>
                <td className="p-2">{(c.prescriptions || []).map(p => p.medicine).join(', ')}</td>
                <td className="p-2">{c.followUpDate ? new Date(c.followUpDate).toLocaleDateString() : ''}</td>
                <td className="p-2">{c.status}</td>
                <td className="p-2">
                  <button className="bg-blue-600 text-white px-2 py-1 rounded mr-2">View / Edit</button>
                  <button className="bg-green-600 text-white px-2 py-1 rounded">Print Prescription</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorDashboard;

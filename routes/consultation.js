import express from 'express';
import ConsultationRecord from '../models/ConsultationRecord.js';

const router = express.Router();

// Create a new consultation record
router.post('/', async (req, res) => {
  try {
    const record = new ConsultationRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all consultation records (optionally filter by doctorId or patientId)
router.get('/', async (req, res) => {
  try {
    const { doctorId, patientId } = req.query;
    const filter = {};
    if (doctorId) filter.doctorId = doctorId;
    if (patientId) filter.patientId = patientId;
    const records = await ConsultationRecord.find(filter).sort({ consultationDate: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

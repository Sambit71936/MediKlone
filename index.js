// Consultation route
import consultationRoutes from './routes/consultation.js';
app.use('/api/consultation', consultationRoutes);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const feedbackSchema = new mongoose.Schema({
  text: { type: String, required: true },
  screenshot: String,
  userId: String,
  aiSummary: String,
  sentiment: String,
  rootCause: String,
  department: String,
  urgency: Number,
  category: String,
  workflowFault: String,
  actionableAdvice: String,
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

async function analyzeFeedback(text) {
  // Enhanced prompt for actionable summary and workflow fault location
  const prompt = `You are an expert hospital workflow analyst. Analyze the following feedback and return a JSON object with these fields:\n- summary: Short summary of the feedback\n- sentiment: Sentiment (positive, negative, neutral)\n- rootCause: Main root cause if any\n- department: Department involved\n- urgency: 1 (low), 2 (medium), 3 (high)\n- category: Category of issue\n- workflowFault: If any, describe where in the workflow the system is failing or could be improved.\n- actionableAdvice: Suggest a concrete action or fix for the workflow fault.\nFeedback: ${text}`;
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 300,
  });
  try {
    return JSON.parse(response.data.choices[0].message.content);
  } catch {
    return {
      summary: '',
      sentiment: '',
      rootCause: '',
      department: '',
      urgency: 2,
      category: '',
      workflowFault: '',
      actionableAdvice: '',
    };
  }
}

app.post('/api/feedback', upload.single('screenshot'), async (req, res) => {
  try {
    const { text, userId } = req.body;
    const screenshot = req.file ? req.file.path : undefined;
    const aiResult = await analyzeFeedback(text);
    const feedback = new Feedback({
      text,
      screenshot,
      userId,
      aiSummary: aiResult.summary,
      sentiment: aiResult.sentiment,
      rootCause: aiResult.rootCause,
      department: aiResult.department,
      urgency: aiResult.urgency,
      category: aiResult.category,
      workflowFault: aiResult.workflowFault,
      actionableAdvice: aiResult.actionableAdvice,
    });
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/feedback', async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

app.get('/api/feedback/analytics', async (req, res) => {
  // Example: Top issues per department, urgency heatmap, resolution stats
  const topDepartments = await Feedback.aggregate([
    { $group: { _id: '$department', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  const urgencyStats = await Feedback.aggregate([
    { $group: { _id: '$urgency', count: { $sum: 1 } } },
  ]);
  res.json({ topDepartments, urgencyStats });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

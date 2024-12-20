import express, { Application } from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import documentsRouter from './routes/documents';

// Initialize the Express application
const app: Application = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/documents', documentsRouter);

const PORT: number = parseInt(process.env.PORT || '9090', 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

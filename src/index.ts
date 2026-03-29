import express from 'express';
import { config } from './config';
import authRoutes from './routes/auth.routes';


const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});
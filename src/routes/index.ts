import express from 'express';
import authRoutes from './auth.routes';
import taskRoutes from './task.routes';

const app = express();

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes); // Add this line

export default app;
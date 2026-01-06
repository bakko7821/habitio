import express, { Application } from 'express';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import habitRoutes from './routes/habit.routes';
import cors from "cors"

const app: Application = express();

app.use(cors())

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/habits", habitRoutes);

export default app;

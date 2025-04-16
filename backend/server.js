import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false },
  })
);
app.use(
  cors({
    origin: "http://localhost:5173", // El origen permitido
    credentials: true, // Habilita el envío de cookies y credenciales
  })
);


app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirnname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${port}`);
});

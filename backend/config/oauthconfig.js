import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'https://localhost:5173'
);

// Configurar OAuth2 con el refresh token
OAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

export async function createTransporter() {
  try {
    const accessToken = await OAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
    return transporter;
  } catch (error) {
    console.error('Error creando el transporter:', error);
    throw new Error('Error al configurar el transporte de correo');
  }
}

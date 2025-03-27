import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Registro de usuario
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
      const userExists = await User.findOne({ email });

      if (userExists) {
          return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const user = await User.create({ name, email, password });

      res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
      });

  } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
          res.json({
              _id: user.id,
              name: user.name,
              email: user.email,
              token: generateToken(user._id)
          });
      } else {
          res.status(401).json({ message: 'Credenciales incorrectas' });
      }

  } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener perfil del usuario autenticado
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  if (user) {
      res.json(user);
  } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

  import User from '../models/User.js';
  import jwt from 'jsonwebtoken';
  import bcrypt from 'bcryptjs';

  // Función para generar el token
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

      if (user) {
        const token = generateToken(user._id);
        
        // Guardamos el token en una cookie segura
        res.cookie('jwt', token, {
          httpOnly: true, 
          secure: process.env.NODE_ENV === 'production', 
          sameSite: 'Strict', 
          maxAge: 30 * 24 * 60 * 60 * 1000, 
        });

        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(400).json({ message: 'Datos inválidos' });
      }

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
        const token = generateToken(user._id);

        // Guardamos el token en una cookie segura
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
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

  // Logout del usuario (elimina la cookie)
  export const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0), 
    });
    res.json({ message: 'Sesión cerrada' });
  };

  export const getAuth = async (req, res) => {
    try {
      // Verifica si hay un usuario autenticado
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
      }
  
      // Devuelve la información del usuario autenticado (sin la contraseña)
      res.status(200).json({ user: req.user });
    } catch (error) {
      res.status(500).json({ message: 'Error en la autenticación' });
    }
  };
  
  // TODO: Implementar la función para recuperar la contraseña
  export const forgotPassword = async (req, res) => {
    // Implementar la lógica para recuperar la contraseña
  };
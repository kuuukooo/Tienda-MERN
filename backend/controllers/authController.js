  import User from '../models/User.js';
  import jwt from 'jsonwebtoken';
  import bcrypt from 'bcryptjs';
  import { createTransporter } from '../config/oauthconfig.js';

  // Función para generar el token
  const generateToken = (id) => {s
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
  
  export async function recoverPassword(req, res) {
    const { email } = req.body;
  
    try {
      
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      const transporter = await createTransporter();
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Recuperación de Contraseña",
        html: `<p>Haz clic <a href="${resetLink}">aquí</a> para recuperar tu contraseña.</p>`,
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).json({ msg: "Correo enviado correctamente" });
    } catch (error) {
      console.error("Error enviando el correo:", error);
      res.status(500).json({ msg: "Error en el servidor", error });
    }
  }
  
export async function verifyToken(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ msg: "Token válido", email: decoded.email });
  } catch (error) {
    res.status(400).json({ msg: "Token inválido o expirado" });
  }
}

export async function resetPassword(req, res) {
  const { token, newPassword } = req.body;

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Buscar usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Hashear nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Guardar nueva contraseña
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "Token inválido o expirado" });
  }
}

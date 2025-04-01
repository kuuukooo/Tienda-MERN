import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
        return res.status(401).json({ message: 'No autorizado, no hay token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

export default protect;

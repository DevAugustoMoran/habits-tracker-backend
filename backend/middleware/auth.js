const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token provisto.' });
    }

    try {
        const token = authHeader.replace('Bearer ', '');
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = verified; 
        
        next(); 
    } catch (error) {
        res.status(400).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const verifyToken = (req, res, next) => {
  const tokenBearer = req.headers.authorization;
  if (!tokenBearer) {
    res.status(401).json({ message: 'No autorizado' });
  } else {
    let token = tokenBearer.split(' ')[1];
    try {
      let result = jwt.verify(token, process.env.TOKEN_KEY);
      let { user_id } = result;
      req.user_id = user_id;
      next();
    } catch (error) {
      res.status(401).json({ message: 'No Autorizado' });
    }
  }
};

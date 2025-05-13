import { ZodError } from 'zod';

export const validateRegister = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(401).json('Pirata detectado! error de validación');
  }
};

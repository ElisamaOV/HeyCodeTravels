import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string('El campo es necesario')
      .min(3, 'El nombre debe ser mayor de 3 carácteres')
      .max(50, 'El nombre debe ser menor de 50 carácteres'),
    lastname: z
      .string('El campo es necesario')
      .min(3, 'El apellido debe ser mayor de 3 carácteres')
      .max(100, 'El apellido debe ser menor de 50 carácteres'),
    email: z.string().email('El mail no es válido'),
    password: z
      .string()
      .regex(
        /^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
        'Contraseña no es válida'
      ),
    repPassword: z.string(),
  })
  .refine((data) => data.password === data.repPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['repPassword'],
  });

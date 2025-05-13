import { compareString, hashString } from '../../utils/hashUtils.js';
import userDal from './user.dal.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class UserController {
  getUser = async (req, res) => {
    try {
      const result = await userDal.getUser();
      console.log(result);

      res.status(200).json(result);
    } catch (error) {
      console.log('eeeeeeeeeeeeeeeeee', error);

      res.status(500).json({ message: { error } });
    }
  };

  register = async (req, res) => {
    try {
      const { name, lastname, email, password } = req.body;
      //1 Comprobar que el email no exista
      let result = await userDal.findUserByEmail(email);
      if (result.length) {
        throw { message: 'El usuario ya existe' };
      } else {
        const hashedPassword = await hashString(password);
        const data = { email, hashedPassword, name, lastname };
        await userDal.register(data);
        res.status(201).json({ message: 'Usuario Creado correctamente' });
      }
    } catch (error) {
      console.log('ERROR CATCH', error);

      res.status(500).json(error);
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      //Ver si el usuario existe
      const result = await userDal.findUserByEmailLogin(email);
      console.log(result);

      if (result.length === 0) {
        res
          .status(401)
          .json({ message: 'El usuario no existe o está baneado' });
      } else {
        //COMPROBAR QUE LA PASSWORD ES LA CORRECTA
        let match = await compareString(password, result[0].password);
        if (!match) {
          res.status(401).json({ message: 'Contraseña incorrecta' });
        } else {
          //EVERYTHING OKEY EL TOKEN SE TIENE QUE HACER AHORA
          const token = jwt.sign(
            { user_id: result[0].user_id },
            process.env.TOKEN_KEY,
            {
              expiresIn: '1d',
            }
          );
          res.status(200).json({ token });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'ups, error 500' });
    }
  };

  userById = async (req, res) => {
    try {
      const { user_id } = req;
      let userLogged = await userDal.findUserById(user_id);
      res.status(200).json({ user: userLogged });
    } catch (error) {
      res.status(500).json({ message: 'ups, error 500' });
    }
  };
}

export default new UserController();

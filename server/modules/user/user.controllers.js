import executeQuery from '../../config/db.js';
import { hashString } from '../../utils/hashUtils.js';
import userDal from './user.dal.js';

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
}

export default new UserController();

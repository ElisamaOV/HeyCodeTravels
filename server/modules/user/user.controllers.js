import executeQuery from '../../config/db.js';
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
      console.log(req.body);
      res.status(201).json({ message: 'Usuario Creado correctamente' });
    } catch (error) {
      res.status(500).json(error);
    }
  };
}

export default new UserController();

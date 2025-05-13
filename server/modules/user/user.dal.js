import executeQuery from '../../config/db.js';

class UserDal {
  getUser = async () => {
    try {
      let sql = 'SELECT * FROM user';
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  };

  findUserByEmail = async (email) => {
    try {
      let sql = 'SELECT user_id FROM user WHERE email = ?';
      const result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  register = async (data) => {
    try {
      const { name, lastname, hashedPassword, email } = data;
      let values = [name, lastname, email, hashedPassword];
      let sql =
        'INSERT INTO user (name, lastname, email, password) VALUES (?,?,?,?)';
      await executeQuery(sql, values);
    } catch (error) {
      throw { message: 'error de BD' };
    }
  };
}

export default new UserDal();

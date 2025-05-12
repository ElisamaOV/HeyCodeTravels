import executeQuery from '../../config/db.js';

class UserDal {
  getUser = async () => {
    try {
      let sql = 'SELECT * FROM user';
      const result = await executeQuery(sql);
      return result;
      //MANERA MÁS CLARA DEL DESTRUCTURING DE ARRAYS
      // const result = await executeQuery(sql);
      // return result[0];
    } catch (error) {
      throw error;
    }
  };
}

export default new UserDal();

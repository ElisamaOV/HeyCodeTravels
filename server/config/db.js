import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
//AÑADIR LAS VARIABLES DEL .ENV POR ESO IMPORTAMOS TAMBIEN DOTENV
dotenv.config();

export const bdPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true,
  // connectionLimit: 10,
});

//Función encargada de abrir conexion, realizar peticion y cerrar conexion
const executeQuery = async (sql, values = []) => {
  let connection;
  try {
    //abro conexión
    connection = await bdPool.getConnection();
    const [result] = await connection.query(sql, values);

    return result;
  } catch (error) {
    throw error;
  } finally {
    //libero o cierro la conexión
    if (connection) {
      connection.release();
    }
  }
};

//Prueba de que esto funciona
/* const testConnection = async () => {
  try {
    const result = await executeQuery('select 1 as test');
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
testConnection(); */
export default executeQuery;

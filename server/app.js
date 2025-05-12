// MODIFICAR E IMPORTAR LAS LIBRERÍAS QUE VAMOS A NECESITAR
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import { fileURLToPath } from 'url'; //ESTO ES PARA SACAR EL __dirname
import cors from 'cors';
import userRouter from './modules/user/user.routes.js'; //ACUERDATE DE PONER EL .JS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//middlewares
// app.use(cors({origin: "http://localhost:5173"})); ejemplo de seguridad y que solo entren cosas por ese puerto y url
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//rutas
// app.use('/admin', indexRouter);
app.use('/user', userRouter);
// app.use('/travel', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //BORRAMOS EL RENDER Y AÑADIMOS JSON ERR
  res.status(err.status || 500).json(err);
});

export default app;

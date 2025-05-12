import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';

//PARA LAZY LAS IMPORTACIONES TIENEN QUE SER DEFAULT
//componentes publicos
const Home = lazy(() => import('../pages/PublicPages/Home/Home'));
const About = lazy(() => import('../pages/PublicPages/About/About'));
const Register = lazy(() => import('../pages/PublicPages/Register/Register'));
const Login = lazy(() => import('../pages/PublicPages/Login/Login'));

//Componentes user
const UserDashboard = lazy(() =>
  import('../pages/UserPages/UserDashboard/UserDashboard')
);

//Componentes admin
const AdminDashboard = lazy(() =>
  import('../pages/AdminPages/AdminDashboard/AdminDashboard')
);

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>cargando...</h1>}>
        <Routes>
          {/* RUTAS PUBLICAS */}
          <Route element={<PublicRoutes />}>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>
          {/* RUTAS DE USER */}
          <Route element={<PrivateRoutes />}>
            <Route element={<UserLayout />}>
              <Route path="/user" element={<UserDashboard />} />
            </Route>
          </Route>
          {/* RUTAS DE ADMIN */}
          <Route element={<PrivateRoutes />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>Error not found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

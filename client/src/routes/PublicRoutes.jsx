import React from 'react';
import { Outlet } from 'react-router-dom';

//TIENE LA LÓGICA PARA DAR PERMISOS
export const PublicRoutes = () => {
  return <Outlet />;
};

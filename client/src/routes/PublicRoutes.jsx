import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContest } from '../context/AuthContextProvider';

//TIENE LA LÓGICA PARA DAR PERMISOS
export const PublicRoutes = () => {
  const { user } = useContext(AuthContest);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.type === 0) navigate('/user');
      if (user.type === 1) navigate('/admin');
    }
  }, [user]);
  return <Outlet />;
};

import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '../components/Navbars/PublicNavbar';

//DA FORMATO AL SITIO WEB

export const PublicLayout = () => {
  return (
    <>
      <header>
        <PublicNavbar />
      </header>
      <main>
        <Outlet />
      </main>
      {/* <footer>footer</footer> */}
    </>
  );
};

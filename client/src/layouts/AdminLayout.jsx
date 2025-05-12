import React from 'react';
import { AdminNavbar } from '../components/Navbars/AdminNavbar';
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <>
      <header>
        <AdminNavbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};

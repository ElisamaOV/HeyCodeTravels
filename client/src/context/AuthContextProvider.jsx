import React, { createContext, useState } from 'react';

export const AuthContest = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  return (
    <AuthContest.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContest.Provider>
  );
};

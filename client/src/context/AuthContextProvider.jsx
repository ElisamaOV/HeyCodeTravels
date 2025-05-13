import React, { createContext, useEffect, useState } from 'react';
import { fetchData } from '../helpers/axiosHelper';

export const AuthContest = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tokenLS = localStorage.getItem('token');
    if (tokenLS) {
      const fetchUser = async () => {
        try {
          const res = await fetchData('user/userById', 'get', null, {
            Authorization: `Bearer ${tokenLS}`,
          });
          setUser(res.data.user);
          setToken(tokenLS);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (loginData) => {
    const responseToken = await fetchData('user/login', 'post', loginData);
    let tokenBack = responseToken.data.token;
    const responseUser = await fetchData('user/userById', 'get', null, {
      Authorization: `bearer ${tokenBack}`,
    });
    let userBack = responseUser.data.user;
    console.log('AQUI VIENE UN USUARIOOOOOOO', userBack);
    localStorage.setItem('token', tokenBack);
    setToken(tokenBack);
    setUser(userBack);
  };

  console.log('USER DEL CONTEXT', user);
  console.log('TOKEN DEL CONTEXT', token);

  return (
    <AuthContest.Provider
      value={{ user, setUser, token, setToken, login, loading }}
    >
      {children}
    </AuthContest.Provider>
  );
};

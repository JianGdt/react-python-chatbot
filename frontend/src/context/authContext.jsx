/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useRef } from "react";
import { getUserData } from "../services/api";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hasFetchedUser = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || hasFetchedUser.current) return;
    hasFetchedUser.current = true;
    getUserData()
      .then((userData) => {
        if (userData) {
          setUser({ ...userData, token });
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setIsAuthenticated(false);
      });
  }, []);

  const login = (data) => {
    localStorage.setItem("access_token", data.access_token);
    setUser({ username: data.username, token: data.access_token });
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

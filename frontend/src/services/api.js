import { getToken, removeToken } from "../utils/authToken.jsx";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";
let userCache = null; 

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    return { error: error.message };
  }
};

export const getUserData = async () => {
  if (userCache) return userCache; 

  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/auth/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      removeToken();
      return null;
    }

    userCache = await response.json();
    return userCache;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

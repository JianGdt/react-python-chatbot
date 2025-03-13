import { create } from "zustand";
import { loginUser, registerUser, getUserData } from "../services/api.js";
import { getToken, setToken, removeToken } from "../utils/authToken.jsx";

export const useAuthStore = create((set) => ({
  user: null,
  token: getToken(),

  login: async (credentials) => {
    const data = await loginUser(credentials);
    console.log('data from store', data);
    if (data.access_token) {
      setToken(data.access_token);
      set({ user: credentials.username, token: data.access_token });
    }
    return data;
  },

  register: async (userData) => {
    return await registerUser(userData);
  },

  fetchUser: async () => {
    const data = await getUserData();
    if (data && !data.error) {
      set({ user: data.user });
    }
  },

  logout: () => {
    removeToken();
    set({ user: null, token: null });
  },
}));

import { create } from "zustand";
import axios from "axios";
import { debounce } from "lodash";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

const useMessageStore = create((set, get) => ({
  messages: [],
  loading: false,

  setLoading: (value) => set({ loading: value }),

  setMessages: (newMessages) => set({ messages: newMessages }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  handleSpeak: debounce(async (text) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      await axios.post(`${BASE_URL}/speak`, { text }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Speech error:", error);
    }
  }, 500), // Debounce by 500ms

  handleSend: async (userInput, username) => {
    if (!userInput.trim() || get().loading) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No token found! User might not be logged in.");
      return;
    }

    const userMessage = { sender: username || "You", text: userInput };
    get().addMessage(userMessage);
    set({ loading: true });

    try {
      const response = await axios.post(`${BASE_URL}/chat`,
        { query: userInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botMessage = { sender: "Chatbot", text: response.data.response };
      get().addMessage(botMessage);
      get().handleSpeak(botMessage.text);
    } catch (error) {
      console.error("Chat error:", error);
      get().addMessage({ sender: "Chatbot", text: "Error: " + error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useMessageStore;

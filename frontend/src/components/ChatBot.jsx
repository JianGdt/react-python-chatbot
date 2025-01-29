import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import useThemeStore from "../store/useThemeStore";
import ThemePicker from "./ThemePicker";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth(); 
  const { theme, themeColors } = useThemeStore();

  const handleSend = async () => {
    if (!userInput.trim() || loading) return;
    setMessages([...messages, { sender: "You", text: userInput }]);
    setUserInput("");
    setLoading(true);

    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.post(
        "https://python-api-zgil.onrender.com/chat",
        { query: userInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, { sender: "Bot", text: response.data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "Bot", text: error.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-6xl m-auto h-screen" style={{ background: themeColors[theme]?.background }}>
      <h1 className="p-4 bg-black-900 text-white text-center font-bold text-xl">AI Chatbot</h1>
      <div className="flex flex-col justify-between p-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg gap-2 mb-2 flex ${
            msg.sender === "You"
              ? "bg-blue-500 text-end justify-end items-end self-end text-white"
              : "bg-gray-300 text-black self-start justify-start items-start"
          }`}
        >
          <span>{msg.sender}:</span> {msg.text}
        </div>
      ))}
      {loading && (
        <div className="p-2 bg-gray-300 text-black self-start rounded-lg">
          <span>SimiSimi:</span> <span className="animate-pulse">...</span>
        </div>
      )}
      </div>

      <div className="p-4 flex gap-2">
      <input
      type="text"
      className="flex-grow text-black p-2 border rounded-lg"
      placeholder="Type a message..."
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
      disabled={loading}
    />
    <div>
      <ThemePicker />
    </div>
        <button
          className="p-2 bg-blue-600 text-white rounded-lg"
          onClick={handleSend}
          disabled={loading} 
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

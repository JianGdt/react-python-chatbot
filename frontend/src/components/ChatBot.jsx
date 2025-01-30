import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import { useAuth } from "@clerk/clerk-react";
import useThemeStore from "../store/useThemeStore";
import ThemePicker from "./ThemePicker";
import Navbar from "./Navbar";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const { theme, themeColors } = useThemeStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim() || loading) return;
    setMessages([...messages, { sender: "You", text: userInput }]);
    setUserInput("");
    setLoading(true);

    try {
      const token = await getToken();
      const response = await axios.post(
        "https://python-api-zgil.onrender.com/chat",
        { query: userInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(prev => [...prev, { sender: "SimSimi", text: response.data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "SimSimi", text: error.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div
    className="flex flex-col h-screen max-w-2xl m-auto shadow-lg rounded-r-2xl rounded-tl-2xl"
    style={{ background: themeColors[theme]?.background }}
  >
    <Navbar />
    <div className="flex flex-col flex-grow p-4 overflow-y-auto">
      {messages.map((msg, index) => {
        const shades = themeColors[theme]?.shades || ["#333", "#222", "#111"];
        const messageColor = shades[index % shades.length];
        return (
          <div
            key={index}
            className={`p-3 text-white text-sm my-2 max-w-sm flex ${
              msg.sender === "You"
                ? "self-end text-start rounded-l-2xl rounded-tr-2xl"
                : "self-start text-start items-start text-black rounded-r-2xl rounded-tl-2xl"
            }`}
            style={{ background: messageColor }}
          >
            <span className="mr-1">{msg.sender}:</span>
            <p className="break-words whitespace-pre-wrap truncate">{msg.text}</p>
          </div>
        );
      })}
      {loading && (
        <div className="p-2 bg-gray-300 text-black self-start rounded-lg custom-pulse">
          <span>SimSimi:</span> <span>...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  
    {/* Fixed Input Container */}
    <div className="p-4 flex items-center gap-2 w-full bg-white border-t">
      <input
        type="text"
        className="w-full text-black p-2 border rounded-lg outline-none"
        placeholder="Type a message..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={loading}
      />
      <div><ThemePicker /></div>
      <button
        className="p-2 cursor-pointer"
        onClick={handleSend}
        disabled={loading}
      >
        <IoIosSend size={30} />
      </button>
    </div>
  </div>
  
    </>
  );
}

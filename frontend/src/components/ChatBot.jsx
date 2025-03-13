import { useEffect, useRef, useState, useContext } from "react";
import { IoIosSend } from "react-icons/io";
import { IoVolumeHigh } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useThemeStore from "../store/useThemeStore";
import useMessageStore from "../store/useMessages";
import { AuthContext } from "../context/authContext";
import ThemePicker from "./ThemePicker";
import Navbar from "./Navbar";
import icon from "../assets/robot.svg";

export default function ChatBot() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const { theme, themeColors } = useThemeStore();

  const {
    messages,
    loading,
    setMessages,
    handleSend,
    handleSpeak,
  } = useMessageStore();

  useEffect(() => {
    if (!isAuthenticated) navigate("/sign-in");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (user && messages.length === 0) {
      const welcome = `Welcome ${user.username}! How can I assist you today?`;
      setMessages([{ sender: "Chatbot", text: welcome }]);
      handleSpeak(welcome);
    }
  }, [user, setMessages, handleSpeak, messages.length]);

  if (!isAuthenticated) return null;

  const onSend = () => handleSend(userInput, user?.username || "You");

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen max-w-6xl m-auto shadow-lg rounded-r-2xl rounded-tl-2xl"
        style={{ background: themeColors[theme]?.background }}>
        
        <div className="p-4 border-b bg-white flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">
            {user ? `Welcome ${user.username} to Chatbot` : "Loading..."}
          </h2>
          <ThemePicker />
        </div>

        <div className="flex flex-col flex-grow p-4 overflow-y-auto">
          {messages.map((msg, index) => {
            const shades = themeColors[theme]?.shades || ["#333", "#222", "#111"];
            const messageColor = shades[index % shades.length];

            return (
              <div key={index} className={`p-3 text-white text-sm my-2 max-w-sm flex ${
                msg.sender === (user?.username || "You")
                  ? "self-end text-start rounded-l-2xl rounded-tr-2xl"
                  : "self-start text-start items-start text-black rounded-r-2xl rounded-tl-2xl"
              }`} style={{ background: messageColor }}>
                {msg.sender === "Chatbot" ? (
                  <img src={icon} alt="Chatbot" className="mr-2" width={20} height={20} />
                ) : (
                  <span className="mr-1">{msg.sender}:</span>
                )}
                <p className="break-words whitespace-pre-wrap truncate">{msg.text}</p>
                {msg.sender === "Chatbot" && (
                  <button className="ml-2 text-black" onClick={() => handleSpeak(msg.text)}>
                    <IoVolumeHigh size={18} />
                  </button>
                )}
              </div>
            );
          })}
          {loading && (
            <div className="p-2 bg-gray-300 text-black flex self-start rounded-lg custom-pulse">
              <img src={icon} alt="Chatbot" className="mr-2" width={20} height={20} />
              <span>...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 flex items-center gap-2 w-full bg-white border-t">
          <input
            type="text"
            className="w-full text-black p-2 border rounded-lg outline-none"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            disabled={loading}
          />
          <button className="p-2 cursor-pointer" onClick={onSend} disabled={loading}>
            <IoIosSend size={30} />
          </button>
        </div>
      </div>
    </>
  );
}

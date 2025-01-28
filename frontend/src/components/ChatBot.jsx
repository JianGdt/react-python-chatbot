import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "You", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", { query: userInput });
      const botResponse = response.data.response;
      setMessages([...newMessages, { sender: "Bot", text: botResponse }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "Bot", text: error.message }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <h1 className="p-4 bg-blue-600 text-black text-center font-bold text-xl">
        Chatbot
      </h1>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg mb-2 ${msg.sender === "You" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}
            style={{ maxWidth: "70%" }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 flex gap-2">
        <input
          type="text"
          className="flex-grow text-black p-2 border rounded-lg"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="p-2 bg-blue-600 text-white rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};


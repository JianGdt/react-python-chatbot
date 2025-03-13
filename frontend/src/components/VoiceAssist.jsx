import { useState } from "react";
import axios from "axios";

const VoiceAssistant = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false; 

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Listening...");
    };

    recognition.onresult = async (event) => {
      const userSpeech = event.results[0][0].transcript;
      setText(userSpeech);
      console.log("User shesh", userSpeech);
      try {
        const res = await axios.post("http://127.0.0.1:8000/chat", { query: userSpeech });
        setResponse(res.data.response);
        await axios.post("http://127.0.0.1:8000/speak", { text: res.data.response });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "aborted") {
        console.warn("Retrying speech recognition...");
        setTimeout(() => recognition.start(), 1000); 
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Speech recognition ended.");
    };

    recognition.start();
  };

  return (
    <div className="voice-assistant p-4 flex items-center justify-center">
      <button
        onClick={handleVoiceInput}
        className={`px-4 py-2 rounded-lg shadow-lg transition ${
          isListening ? "bg-red-500" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {isListening ? "🎙️ Listening..." : "🎤 Speak"}
      </button>
      <div className="ml-4">
        <p className="text-gray-700">You said: <span className="font-semibold">{text}</span></p>
        <p className="text-gray-700">Response: <span className="font-semibold">{response}</span></p>
      </div>
    </div>
  );
};

export default VoiceAssistant;

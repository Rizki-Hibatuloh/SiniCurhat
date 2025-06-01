// src/components/CurhatAI.jsx
import { useState, useEffect, useRef } from "react";
import { getCurhatAIResponse } from "../api";

export default function CurhatAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newChat = [...chat, { sender: "user", text: userInput }];
    setChat(newChat);
    setUserInput("");
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await getCurhatAIResponse(userInput);
      setChat([
        ...newChat,
        { sender: "ai", text: response },
      ]);
    } catch (err) {
      console.error("AI Error:", err);
      setErrorMessage("Gagal menghubungi AI. Coba lagi nanti.");
      setChat([
        ...newChat,
        { sender: "ai", text: "Maaf, aku sedang sibuk sebentar 😥" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-pink-500 hover:bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-96">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 font-bold flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <span>CurhatAI 🤖</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50" ref={messagesEndRef}>
            {chat.length === 0 && (
              <p className="text-center text-gray-400 italic">Ayo mulai curhat~ 💬</p>
            )}
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "ml-auto bg-indigo-500 text-white rounded-br-none"
                    : "mr-auto bg-white text-gray-800 shadow-sm rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto bg-white text-gray-800 px-4 py-2 rounded-lg shadow-sm">
                <span className="animate-pulse">Mengetik...</span>
              </div>
            )}
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
          </div>

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t border-gray-200 flex gap-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Curhatin semuanya..."
              rows="2"
              className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-4 py-2 rounded-lg"
            >
              Kirim
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
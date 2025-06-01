// src/components/CurhatAI.jsx
import { useState, } from 'react';
import { getCurhatAIResponse } from '../api';

export default function CurhatAI() {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getCurhatAIResponse(userInput);
    setAiResponse(response.response);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">CurhatAI</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Curhatkan masalahmu..."
          className="w-full p-2 mb-2 border rounded"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Kirim Curhat
        </button>
      </form>
      {aiResponse && (
        <div className="mt-4 bg-green-100 p-4 rounded">
          <p className="font-semibold">CurhatAI says:</p>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}
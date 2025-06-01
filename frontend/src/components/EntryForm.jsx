// src/components/EntryForm.jsx
import { useState } from "react";
import { addEntry } from "../api";

export default function EntryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    const newEntry = {
      title,
      content,
      category,
    };
    await addEntry(newEntry);
    setTitle("");
    setContent("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 flex items-center gap-2">
        📝 Tulis Curhatmu
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
        <input
          type="text"
          placeholder="Misalnya: Hari ini seneng banget 😄"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 backdrop-blur-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Isi Curhat</label>
        <textarea
          placeholder="Ceritakan hari kamu... 😊"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 backdrop-blur-sm"
          rows="4"
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Pilih Kategori 💬</option>
          <option value="work">Work 🧑‍💻</option>
          <option value="diary">Diary 📔</option>
          <option value="study">Study 📚</option>
          <option value="travel">Travel ✈️</option>
          <option value="schedule">Schedule 🗓️</option>
          <option value="other">Other 🌈</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:from-pink-600 hover:to-purple-600 transform transition-all duration-200 hover:scale-105"
      >
        Simpan Entry 💌
      </button>
    </form>
  );
}
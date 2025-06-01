
import { useState } from "react";
import { addEntry } from "../api";

export default function EntryForm() {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false); // Tutup form setelah submit
  };

  return (
    <section className="mb-12">
      {/* Greeting + Tombol dalam satu container */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-50 py-8 px-6 rounded-2xl shadow-md border border-pink-200 mb-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            📘 Bagaimana harimu hari ini?
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-2 max-w-md">
            Ayo tulis ceritamu atau bagikan perasaanmu hari ini~
          </p>

          {/* Tombol */}
          <div className="mt-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              {isOpen ? "Tutup Form" : "Tulis Jurnal"}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Form */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl shadow-xl border border-pink-200 mx-auto max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
              <input
                type="text"
                placeholder="Misalnya: Hari ini seneng banget 😄"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80 backdrop-blur-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Isi Jurnal</label>
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

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 transform transition hover:scale-105"
              >
                Simpan Entry 💌
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
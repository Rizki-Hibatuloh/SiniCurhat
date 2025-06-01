// src/components/EntryList.jsx
import { useEffect, useState } from "react";
import { getEntries, deleteEntry, updateEntry } from "../api";

// Emoji per kategori
const categoryEmoji = {
  work: "🧑‍💻",
  diary: "📔",
  study: "📚",
  travel: "✈️",
  schedule: "📅",
  other: "🌈",
};

// Warna label per kategori
const categoryColor = {
  work: "bg-blue-100 text-blue-700",
  diary: "bg-pink-100 text-pink-700",
  study: "bg-purple-100 text-purple-700",
  travel: "bg-green-100 text-green-700",
  schedule: "bg-yellow-100 text-yellow-700",
  other: "bg-gray-100 text-gray-700",
};

export default function EntryList() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getEntries();
      setEntries(data);
    };
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    await deleteEntry(id);
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleEdit = async (id, updatedEntry) => {
    await updateEntry(id, updatedEntry);
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    );
  };

  return (
    <div className="space-y-6">
      {entries.length === 0 && (
        <p className="text-center text-gray-500 italic py-4">Belum ada catatan 😕</p>
      )}

      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-pink-400 transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800">{entry.title}</h3>
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColor[entry.category]}`}
            >
              {categoryEmoji[entry.category]} {entry.category}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {new Date(entry.createdAt).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="mt-3 text-gray-700 leading-relaxed">{entry.content}</p>

          <div className="mt-4 flex space-x-3">
            <button
              onClick={() => {
                const newContent = prompt("Edit curhatanmu:", entry.content);
                if (newContent) {
                  handleEdit(entry.id, { content: newContent });
                }
              }}
              className="text-sm text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDelete(entry.id)}
              className="text-sm text-red-600 hover:text-red-800 transition flex items-center gap-1"
            >
              ❌ Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
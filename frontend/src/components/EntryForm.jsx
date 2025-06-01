// src/components/EntryForm.jsx
import { useState } from 'react';
import { addEntry } from '../api';

export default function EntryForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    const newEntry = {
      title,
      content,
      category,
    };
    await addEntry(newEntry);
    setTitle('');
    setContent('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        rows="4"
      ></textarea>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="">Select Category</option>
        <option value="work">Work</option>
        <option value="diary">Diary</option>
        <option value="study">Study</option>
        <option value="travel">Travel</option>
        <option value="schedule">Schedule</option>
        <option value="other">Other</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Entry
      </button>
    </form>
  );
}
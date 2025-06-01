// src/App.jsx
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import CurhatAI from './components/CurhatAI';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 font-sans text-gray-800">
      {/* Navbar */}
      <header className="text-center py-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-tight">
          📘 My Journal
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2 italic">"Tulis, simpan, dan curhat Sama Aku~ ❤️"</p>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-pink-100">
          <EntryForm />
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-blue-100">
          <EntryList />
        </div>
      </main>

      {/* ✨ Tombol CurhatAI dipindah keluar dari main content */}
      <CurhatAI />
    </div>
  );
}
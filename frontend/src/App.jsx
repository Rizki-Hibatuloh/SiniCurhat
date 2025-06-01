
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import CurhatAI from './components/CurhatAI';

export default function App() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Journal</h1>
      <EntryForm />
      <CurhatAI />
      <EntryList />
    </div>
  );
}
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">SiniCerita</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/journal" className="hover:underline">Journal</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

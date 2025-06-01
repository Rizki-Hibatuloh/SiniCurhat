import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Journal from "./pages/Journal";   
import CurhatAI from "./pages/CurhatAI"; 


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/curhat" element={<CurhatAI />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

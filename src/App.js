import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Canvas from "./components/Canvas";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </Router>
  );
}

export default App;

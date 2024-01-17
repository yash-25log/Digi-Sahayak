import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TxtDetails from "./Pages/TxtDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="search" element={<TxtDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TxtDetails from "./Pages/TxtDetails";
import Visualize from "./Pages/Visualize";
import Detect from "./Pages/Detect";
import Advanced from "./Pages/Advanced";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="search" element={<TxtDetails />} />
          <Route path="/visualize" element={<Visualize />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/advanced-search" element={<Advanced />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

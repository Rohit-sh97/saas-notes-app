import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Notes from "./pages/Notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

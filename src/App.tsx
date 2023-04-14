import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Play from "./pages/Play";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/play" element={<Play />} />
    </Routes>
  );
}

export default App;

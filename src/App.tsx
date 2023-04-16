import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Play from "./pages/Play";
import { LevelProvider } from "./utils/context/LevelContext";

function App() {
  return (
    <LevelProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </LevelProvider>
  );
}

export default App;

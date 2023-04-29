import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Play from "./pages/Play";
import { ScoreProvider } from "./utils/context/ScoreContext";

function App() {
  return (
    <ScoreProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </ScoreProvider>
  );
}

export default App;

import LevelButtonsList from "../components/Main/LevelButtonsList";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <h1>Memory match</h1>
      <LevelButtonsList />
      <p>Jouer !</p>
    </div>
  );
}

export default Home;

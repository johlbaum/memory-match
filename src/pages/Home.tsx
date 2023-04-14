import LvlButton from "../components/Main/LvlButton";
import "../styles/home.css";

const ButtonsValues = [
  {
    lvl: "facile",
    isSelected: false,
  },
  {
    lvl: "intermédiaire",
    isSelected: false,
  },
  {
    lvl: "difficile",
    isSelected: false,
  },
];

function Home() {
  return (
    <div className="home">
      <h1>Memory match</h1>
      <p>Niveaux :</p>
      {ButtonsValues.map((buttonValue) => (
        <LvlButton
          key={buttonValue.lvl}
          lvl={buttonValue.lvl}
          isSelected={buttonValue.isSelected}
        />
      ))}
      <p>Jouer !</p>
    </div>
  );
}

export default Home;

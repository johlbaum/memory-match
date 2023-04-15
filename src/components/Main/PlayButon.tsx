import { Link } from "react-router-dom";

function PlayButon() {
  return (
    <>
      <Link to="./play">
        <button>Jouer !</button>
      </Link>
    </>
  );
}

export default PlayButon;

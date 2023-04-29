import { useContext } from "react";
import { ScoreContext } from "../../utils/context/ScoreContext";

function ScoreDisplay() {
  const { score } = useContext(ScoreContext);

  const sum = score.reduce((acc, curr) => acc + curr, 0);

  return <>Score: {sum}</>;
}

export default ScoreDisplay;

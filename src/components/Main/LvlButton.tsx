import { useState } from "react";
import "../../styles/lvlButton.css";

interface ButtonsValue {
  lvl: string;
  isSelected: boolean;
}

function LvlButton(props: ButtonsValue) {
  const [isSelected, setIsSelected] = useState([]);

  return (
    <div>
      <p
        className={
          !isSelected ? "lvl-button" : "lvl-button lvl-button-is-selected"
        }
      >
        {props.lvl}
      </p>
    </div>
  );
}

export default LvlButton;

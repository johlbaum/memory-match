import { useState } from "react";
import LevelButton from "./LevelButton";

import "../../styles/lvlButton.css";

interface ButtonValue {
  lvl: string;
  isSelected: boolean;
}

const ButtonValues = [
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

function LevelButtonsList() {
  const [buttonValues, setButtonValues] = useState(ButtonValues);

  const changeBackground = (currentButton: ButtonValue): void => {
    setButtonValues((prevButtonValues) => {
      const updatedButtonValues = prevButtonValues.map((button) => {
        if (button === currentButton) {
          return { ...button, isSelected: true };
        } else {
          return { ...button, isSelected: false };
        }
      });
      return updatedButtonValues;
    });
  };

  return (
    <div className="lvl-buttons">
      {buttonValues.map((currentButton) => {
        return (
          <LevelButton
            key={currentButton.lvl}
            isSelected={currentButton.isSelected}
            changeBackground={() => changeBackground(currentButton)}
            level={currentButton.lvl}
          />
        );
      })}
    </div>
  );
}

export default LevelButtonsList;

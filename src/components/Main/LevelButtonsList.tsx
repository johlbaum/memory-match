import { useState } from "react";
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
    <div>
      {buttonValues.map((currentButton) => {
        return (
          <p
            className={
              currentButton.isSelected ? "lvl-button-is-selected" : "lvl-button"
            }
            onClick={() => changeBackground(currentButton)}
            key={currentButton.lvl}
          >
            {currentButton.lvl}
          </p>
        );
      })}
    </div>
  );
}

export default LevelButtonsList;

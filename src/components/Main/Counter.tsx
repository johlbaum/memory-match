import React, { useEffect, Dispatch, SetStateAction } from "react";

interface CounterProps {
  timerStartingValue: number;
  setTimerStartingValue: Dispatch<SetStateAction<number>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  firstClickOnCard: boolean;
}

const Counter: React.FunctionComponent<CounterProps> = ({
  setOpenModal,
  timerStartingValue,
  setTimerStartingValue,
  firstClickOnCard,
}) => {
  console.log(firstClickOnCard);

  useEffect(() => {
    if (firstClickOnCard) {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        setTimerStartingValue((prev: number) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            setOpenModal(true);
            return 0;
          }
        });
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timerStartingValue, firstClickOnCard]);

  return <p>{timerStartingValue}</p>;
};

export default Counter;

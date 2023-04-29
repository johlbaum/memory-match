import React, { useEffect } from "react";

interface CounterProps {
  timerStartingValue: number;
  dispatch: React.Dispatch<{ type: "UPDATE_TIMER"; payload: number }>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  firstClickOnCard: boolean;
}

const Counter: React.FC<CounterProps> = ({
  setOpenModal,
  timerStartingValue,
  dispatch,
  firstClickOnCard,
}) => {
  useEffect(() => {
    if (firstClickOnCard) {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        if (timerStartingValue > 1) {
          dispatch({
            type: "UPDATE_TIMER",
            payload: timerStartingValue - 1,
          });
        } else {
          setOpenModal(true);
          dispatch({
            type: "UPDATE_TIMER",
            payload: 0,
          });
        }
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timerStartingValue, firstClickOnCard, dispatch, setOpenModal]);

  return <p>{timerStartingValue}</p>;
};

export default Counter;

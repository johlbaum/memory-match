import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

interface CounterProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const Counter: React.FunctionComponent<CounterProps> = ({ setOpenModal }) => {
  const [startingValue, setStartingValue] = useState<number>(5);

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setStartingValue((prev: number) => {
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
  }, [startingValue]);

  console.log(startingValue);

  return <p>{startingValue}</p>;
};

export default Counter;

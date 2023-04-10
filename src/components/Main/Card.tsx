//import { CardProps } from "../../types/types";
import { Dispatch, SetStateAction } from "react";

import "../../styles/card.css";

interface CardProps {
  title: string;
  img: string;
  setCardsSelection: Dispatch<SetStateAction<string[]>>;
}

const Card = (props: CardProps) => {
  const onCardClick = () => {
    props.setCardsSelection((prevArray) => [...prevArray, props.title]);
  };

  return (
    <div className="card" onClick={() => onCardClick()}>
      <img src={props.img} alt={props.title} />
      <h3>{props.title}</h3>
    </div>
  );
};

export default Card;

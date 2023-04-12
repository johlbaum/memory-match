import { Dispatch, SetStateAction, useState, MouseEventHandler } from "react";

import "../../styles/card.css";

interface CardSelection {
  id: number;
  cardTitle: string;
}
interface CardProps {
  id: number;
  title: string;
  imgFront: string;
  imgBack: string;
  setCardsSelection: Dispatch<SetStateAction<CardSelection[]>>;
}

const Card = (props: CardProps) => {
  const [activeReturnCardEffect, setActiveReturnCardEffect] = useState(false);

  const handleImageClick: MouseEventHandler<HTMLDivElement> = () => {
    setActiveReturnCardEffect(!activeReturnCardEffect);
    props.setCardsSelection((prevArray) => [
      ...prevArray,
      { id: props.id, cardTitle: props.title },
    ]);
  };

  return (
    <div className="wrapper" onClick={handleImageClick}>
      <img
        src={props.imgFront}
        alt={props.title}
        // style={{
        //   transform: activeReturnCardEffect
        //     ? "rotateY(0deg)"
        //     : "rotateY(180deg)",
        // }}
      />
      <img
        src={props.imgBack}
        alt={props.title}
        // style={{
        //   transform: activeReturnCardEffect
        //     ? "rotateY(180deg)"
        //     : "rotateY(0deg)",
        // }}
      />
    </div>
  );
};

export default Card;

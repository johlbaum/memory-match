import {
  Dispatch,
  SetStateAction,
  useState,
  MouseEventHandler,
  useEffect,
} from "react";

import "../../styles/card.css";

interface CardSelection {
  id: number;
  cardTitle: string;
}
interface CardProps {
  id: number;
  cardTitle: string;
  imgFront: string;
  imgBack: string;
  setCardsSelection: Dispatch<SetStateAction<CardSelection[]>>;
  cardsSelection: CardSelection[];
}

const Card = (props: CardProps) => {
  const [activeReturnCardEffect, setActiveReturnCardEffect] = useState(false);

  const handleImageClick: MouseEventHandler<HTMLDivElement> = () => {
    if (props.cardsSelection.length < 2) {
      const isAlreadySelectedA = props.cardsSelection.some(
        (card) => card.id === props.id && card.cardTitle === props.cardTitle
      );
      if (!isAlreadySelectedA) {
        setActiveReturnCardEffect(!activeReturnCardEffect);
        props.setCardsSelection([
          ...props.cardsSelection,
          { id: props.id, cardTitle: props.cardTitle },
        ]);
      }
    }
  };

  useEffect(() => {
    if (
      props.cardsSelection.length === 2 &&
      props.cardsSelection[0]?.id !== props.cardsSelection[1]?.id
    ) {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        setActiveReturnCardEffect(false);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [props.cardsSelection.length]);

  return (
    <div className="wrapper" onClick={handleImageClick}>
      <img
        src={props.imgFront}
        alt={props.cardTitle}
        style={{
          transform: activeReturnCardEffect
            ? "rotateY(0deg)"
            : "rotateY(180deg)",
        }}
      />
      <img
        src={props.imgBack}
        alt={props.cardTitle}
        style={{
          transform: activeReturnCardEffect
            ? "rotateY(180deg)"
            : "rotateY(0deg)",
        }}
      />
    </div>
  );
};

export default Card;

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
  isFound: boolean;
  setCardsSelection: Dispatch<SetStateAction<CardSelection[]>>;
  cardsSelection: CardSelection[];
}

const Card: React.FunctionComponent<CardProps> = ({
  cardsSelection,
  isFound,
  cardTitle,
  id,
  setCardsSelection,
  imgFront,
  imgBack,
}) => {
  const [activeReturnCardEffect, setActiveReturnCardEffect] = useState(false);

  const handleImageClick: MouseEventHandler<HTMLDivElement> = () => {
    if (cardsSelection.length < 2 && isFound !== true) {
      const isAlreadySelected = cardsSelection.some(
        (card) => card.id === id && card.cardTitle === cardTitle
      );
      if (!isAlreadySelected && cardsSelection.length < 2) {
        setActiveReturnCardEffect(true);
        setCardsSelection([
          ...cardsSelection,
          { id: id, cardTitle: cardTitle },
        ]);
      }
    }
  };

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      if (isFound !== true) {
        setActiveReturnCardEffect(false);
      }
    }, 2500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [cardsSelection]);

  return (
    <div className="wrapper" onClick={handleImageClick}>
      <img
        src={imgFront}
        alt={cardTitle}
        // style={{
        //   transform: activeReturnCardEffect
        //     ? "rotateY(0deg)"
        //     : "rotateY(180deg)",
        // }}
      />
      <img
        src={imgBack}
        alt={cardTitle}
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

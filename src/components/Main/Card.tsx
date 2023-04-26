import { Dispatch, SetStateAction, MouseEventHandler } from "react";

import "../../styles/card.css";
interface CardSelection {
  id: number;
  cardTitle: string;
}
interface CurrentCard {
  id: number;
  title: string;
  imgFront: string;
  imgBack: string;
  isFound: boolean;
  isSelected: boolean;
}
interface CardProps {
  id: number;
  cardTitle: string;
  imgFront: string;
  imgBack: string;
  isFound: boolean;
  setCardsSelection: Dispatch<SetStateAction<CardSelection[]>>;
  cardsSelection: CardSelection[];
  transitionDurationIsActive: boolean;
  dispatchSetTransitionDuration: React.Dispatch<{
    type: "RESET_TRANSITION_DURATION";
  }>;
  onCardClick: (currentCard: CurrentCard) => void;
  currentCard: CurrentCard;
  isSelected: boolean;
}

const Card: React.FunctionComponent<CardProps> = ({
  cardsSelection,
  isFound,
  cardTitle,
  id,
  setCardsSelection,
  imgFront,
  imgBack,
  transitionDurationIsActive,
  dispatchSetTransitionDuration,
  onCardClick,
  currentCard,
  isSelected,
}) => {
  const handleImageClick: MouseEventHandler<HTMLDivElement> = () => {
    dispatchSetTransitionDuration({ type: "RESET_TRANSITION_DURATION" });
    onCardClick(currentCard);
    if (cardsSelection.length < 2 && isFound !== true) {
      const isAlreadySelected = cardsSelection.some(
        (card) => card.id === id && card.cardTitle === cardTitle
      );
      if (!isAlreadySelected) {
        setCardsSelection([
          ...cardsSelection,
          { id: id, cardTitle: cardTitle },
        ]);
      }
    }
  };

  return (
    <div className="wrapper" onClick={handleImageClick}>
      <img
        src={imgFront}
        alt={cardTitle}
        style={{
          transform: isSelected ? "rotateY(0deg)" : "rotateY(180deg)",
          transitionDuration: !transitionDurationIsActive ? "0s" : "0.5s",
        }}
      />
      <img
        src={imgBack}
        alt={cardTitle}
        style={{
          transform: isSelected ? "rotateY(180deg)" : "rotateY(0deg)",
          transitionDuration: !transitionDurationIsActive ? "0s" : "0.5s",
        }}
      />
    </div>
  );
};

export default Card;
